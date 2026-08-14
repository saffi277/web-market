package handler

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimw "github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"github.com/saffi277/zawan/api/internal/config"
	mw "github.com/saffi277/zawan/api/internal/middleware"
	"github.com/saffi277/zawan/api/internal/model"
	"github.com/saffi277/zawan/api/internal/service"
)

type Deps struct {
	Config  *config.Config
	Logger  *slog.Logger
	Systems *service.SystemService
	Orders  *service.OrderService
	Auth    *service.AuthService
	Demo    *service.DemoService
}

func NewRouter(d Deps) http.Handler {
	pub := NewPublicHandler(d.Systems, d.Orders, d.Logger)
	auth := NewAuthHandler(d.Auth, d.Config, d.Logger)
	admin := NewAdminHandler(d.Systems, d.Orders, d.Demo, d.Auth, d.Logger)
	demo := NewDemoHandler(d.Demo, d.Auth, d.Logger)

	r := chi.NewRouter()
	r.Use(chimw.RequestID, chimw.RealIP, chimw.Recoverer)
	r.Use(chimw.Timeout(30 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   d.Config.AllowedOrigins,
		AllowedMethods:   []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/health", func(w http.ResponseWriter, _ *http.Request) {
			writeJSON(w, http.StatusOK, map[string]any{"status": "ok", "time": time.Now()})
		})

		// Public reads — generous limit.
		r.Group(func(r chi.Router) {
			r.Use(mw.RateLimit(120, 40))
			r.Get("/systems", pub.ListSystems)
			r.Get("/systems/{slug}", pub.GetSystem)
			r.Get("/categories", pub.ListCategories)
		})

		// Writes and auth — tight limit to blunt spam and credential stuffing.
		r.Group(func(r chi.Router) {
			r.Use(mw.RateLimit(10, 5))
			r.Post("/orders", pub.CreateOrder)
			r.Post("/auth/login", auth.Login)
			r.Post("/demo/register", auth.RegisterDemo)
		})

		r.Group(func(r chi.Router) {
			r.Use(mw.RequireRole(d.Config.JWTSecret))
			r.Get("/auth/me", auth.Me)
		})

		r.Route("/demo", func(r chi.Router) {
			r.Use(mw.RequireRole(d.Config.JWTSecret, model.RoleDemoUser, model.RoleAdmin))
			r.Get("/{system}/data", demo.ListData)
			r.Post("/{system}/data", demo.CreateData)
			r.Delete("/{system}/data/{id}", demo.DeleteData)
		})

		r.Route("/admin", func(r chi.Router) {
			r.Use(mw.RequireRole(d.Config.JWTSecret, model.RoleAdmin))

			r.Get("/stats", admin.Stats)

			r.Get("/orders", admin.ListOrders)
			r.Patch("/orders/{id}", admin.PatchOrder)
			r.Delete("/orders/{id}", admin.DeleteOrder)

			r.Get("/systems", admin.ListSystems)
			r.Post("/systems", admin.CreateSystem)
			r.Put("/systems/{id}", admin.UpdateSystem)
			r.Delete("/systems/{id}", admin.DeleteSystem)

			r.Post("/categories", admin.CreateCategory)
			r.Delete("/categories/{id}", admin.DeleteCategory)

			r.Post("/demo/reset", admin.ResetDemo)
		})
	})

	return r
}
