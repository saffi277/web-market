package handler

import (
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/saffi277/zawan/api/internal/service"
)

type PublicHandler struct {
	systems *service.SystemService
	orders  *service.OrderService
	log     *slog.Logger
}

func NewPublicHandler(s *service.SystemService, o *service.OrderService, l *slog.Logger) *PublicHandler {
	return &PublicHandler{systems: s, orders: o, log: l}
}

func (h *PublicHandler) ListSystems(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	items, err := h.systems.List(r.Context(), service.SystemFilter{
		Category: q.Get("category"),
		Search:   q.Get("search"),
	})
	if err != nil {
		h.log.Error("list systems", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب الأنظمة")
		return
	}
	writeJSON(w, http.StatusOK, items)
}

func (h *PublicHandler) GetSystem(w http.ResponseWriter, r *http.Request) {
	s, err := h.systems.GetBySlug(r.Context(), chi.URLParam(r, "slug"))
	if handleServiceErr(w, err) {
		return
	}
	if !s.Published {
		writeErr(w, http.StatusNotFound, "غير موجود")
		return
	}
	writeJSON(w, http.StatusOK, s)
}

func (h *PublicHandler) ListCategories(w http.ResponseWriter, r *http.Request) {
	items, err := h.systems.ListCategories(r.Context())
	if err != nil {
		h.log.Error("list categories", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب التصنيفات")
		return
	}
	writeJSON(w, http.StatusOK, items)
}

func (h *PublicHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {
	in, ok := decode[service.OrderInput](w, r)
	if !ok {
		return
	}
	id, err := h.orders.Create(r.Context(), in)
	if err != nil {
		h.log.Error("create order", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر إرسال الطلب")
		return
	}
	writeJSON(w, http.StatusCreated, map[string]any{"id": id, "success": true})
}
