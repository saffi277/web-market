package handler

import (
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"

	mw "github.com/saffi277/zawan/api/internal/middleware"
	"github.com/saffi277/zawan/api/internal/service"
)

type DemoHandler struct {
	demo *service.DemoService
	auth *service.AuthService
	log  *slog.Logger
}

func NewDemoHandler(d *service.DemoService, a *service.AuthService, l *slog.Logger) *DemoHandler {
	return &DemoHandler{demo: d, auth: a, log: l}
}

func (h *DemoHandler) ListData(w http.ResponseWriter, r *http.Request) {
	claims, ok := mw.ClaimsFrom(r.Context())
	if !ok {
		writeErr(w, http.StatusUnauthorized, "مطلوب تسجيل الدخول")
		return
	}
	items, err := h.demo.List(r.Context(), chi.URLParam(r, "system"),
		r.URL.Query().Get("entityType"), claims.UserID)
	if err != nil {
		h.log.Error("list demo data", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب البيانات")
		return
	}
	writeJSON(w, http.StatusOK, items)
}

func (h *DemoHandler) CreateData(w http.ResponseWriter, r *http.Request) {
	claims, ok := mw.ClaimsFrom(r.Context())
	if !ok {
		writeErr(w, http.StatusUnauthorized, "مطلوب تسجيل الدخول")
		return
	}
	in, ok := decode[service.DemoRecordInput](w, r)
	if !ok {
		return
	}
	rec, err := h.demo.Create(r.Context(), chi.URLParam(r, "system"), claims.UserID, in)
	if err != nil {
		h.log.Error("create demo data", "err", err)
		writeErr(w, http.StatusBadRequest, "تعذّر حفظ البيانات")
		return
	}
	writeJSON(w, http.StatusCreated, rec)
}

func (h *DemoHandler) DeleteData(w http.ResponseWriter, r *http.Request) {
	claims, ok := mw.ClaimsFrom(r.Context())
	if !ok {
		writeErr(w, http.StatusUnauthorized, "مطلوب تسجيل الدخول")
		return
	}
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	if handleServiceErr(w, h.demo.Delete(r.Context(), id, claims.UserID)) {
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}
