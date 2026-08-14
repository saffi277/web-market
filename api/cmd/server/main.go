package main

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/saffi277/zawan/api/internal/config"
	"github.com/saffi277/zawan/api/internal/db"
	"github.com/saffi277/zawan/api/internal/handler"
	"github.com/saffi277/zawan/api/internal/service"
)

func main() {
	log := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelInfo}))

	cfg, err := config.Load()
	if err != nil {
		log.Error("config", "err", err)
		os.Exit(1)
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Error("database", "err", err)
		os.Exit(1)
	}
	defer pool.Close()

	authSvc := service.NewAuthService(pool, cfg.DemoTrialDays)
	demoSvc := service.NewDemoService(pool)

	router := handler.NewRouter(handler.Deps{
		Config:  cfg,
		Logger:  log,
		Systems: service.NewSystemService(pool),
		Orders:  service.NewOrderService(pool),
		Auth:    authSvc,
		Demo:    demoSvc,
	})

	go runDemoJanitor(ctx, authSvc, demoSvc, log)

	srv := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           router,
		ReadHeaderTimeout: 10 * time.Second,
		ReadTimeout:       30 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       90 * time.Second,
	}

	go func() {
		log.Info("server listening", "port", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Error("listen", "err", err)
			stop()
		}
	}()

	<-ctx.Done()
	log.Info("shutting down")

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Error("shutdown", "err", err)
	}
}

// runDemoJanitor clears sandbox writes and expired trial accounts once a day so
// every new visitor meets the same clean demo.
func runDemoJanitor(ctx context.Context, auth *service.AuthService, demo *service.DemoService, log *slog.Logger) {
	ticker := time.NewTicker(24 * time.Hour)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			purged, err := auth.PurgeExpiredDemos(ctx)
			if err != nil {
				log.Error("purge expired demos", "err", err)
			}
			cleared, err := demo.Reset(ctx)
			if err != nil {
				log.Error("reset demo data", "err", err)
			}
			log.Info("demo janitor ran", "purgedAccounts", purged, "clearedRecords", cleared)
		}
	}
}
