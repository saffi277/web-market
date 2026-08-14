package handler

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/saffi277/zawan/api/internal/config"
	mw "github.com/saffi277/zawan/api/internal/middleware"
	"github.com/saffi277/zawan/api/internal/model"
	"github.com/saffi277/zawan/api/internal/service"
)

type AuthHandler struct {
	auth *service.AuthService
	cfg  *config.Config
	log  *slog.Logger
}

func NewAuthHandler(a *service.AuthService, c *config.Config, l *slog.Logger) *AuthHandler {
	return &AuthHandler{auth: a, cfg: c, log: l}
}

type sessionResponse struct {
	Token string      `json:"token"`
	User  *model.User `json:"user"`
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	in, ok := decode[service.LoginInput](w, r)
	if !ok {
		return
	}
	u, err := h.auth.Login(r.Context(), in)
	if handleServiceErr(w, err) {
		return
	}
	h.issue(w, u)
}

func (h *AuthHandler) RegisterDemo(w http.ResponseWriter, r *http.Request) {
	in, ok := decode[service.DemoRegisterInput](w, r)
	if !ok {
		return
	}
	u, err := h.auth.RegisterDemo(r.Context(), in)
	if handleServiceErr(w, err) {
		return
	}
	h.issue(w, u)
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	claims, ok := mw.ClaimsFrom(r.Context())
	if !ok {
		writeErr(w, http.StatusUnauthorized, "مطلوب تسجيل الدخول")
		return
	}
	u, err := h.auth.GetUser(r.Context(), claims.UserID)
	if handleServiceErr(w, err) {
		return
	}
	if u.Role == model.RoleDemoUser && (u.DemoExpiresAt == nil || u.DemoExpiresAt.Before(time.Now())) {
		writeErr(w, http.StatusForbidden, "انتهت فترة التجربة")
		return
	}
	writeJSON(w, http.StatusOK, u)
}

func (h *AuthHandler) issue(w http.ResponseWriter, u *model.User) {
	ttl := h.cfg.AdminTokenTTL
	if u.Role == model.RoleDemoUser {
		ttl = h.cfg.DemoTokenTTL
	}
	token, err := mw.IssueToken(h.cfg.JWTSecret, u.ID, u.Email, u.Name, u.Role, ttl)
	if err != nil {
		h.log.Error("issue token", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر إنشاء الجلسة")
		return
	}
	writeJSON(w, http.StatusOK, sessionResponse{Token: token, User: u})
}
