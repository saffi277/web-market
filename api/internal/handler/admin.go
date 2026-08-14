package handler

import (
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/saffi277/zawan/api/internal/service"
)

type AdminHandler struct {
	systems *service.SystemService
	orders  *service.OrderService
	demo    *service.DemoService
	auth    *service.AuthService
	log     *slog.Logger
}

func NewAdminHandler(s *service.SystemService, o *service.OrderService,
	d *service.DemoService, a *service.AuthService, l *slog.Logger) *AdminHandler {
	return &AdminHandler{systems: s, orders: o, demo: d, auth: a, log: l}
}

// ---- orders ----

func (h *AdminHandler) ListOrders(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	items, err := h.orders.List(r.Context(), service.OrderFilter{
		Kind:   q.Get("kind"),
		Status: q.Get("status"),
	})
	if err != nil {
		h.log.Error("list orders", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب الطلبات")
		return
	}
	writeJSON(w, http.StatusOK, items)
}

func (h *AdminHandler) PatchOrder(w http.ResponseWriter, r *http.Request) {
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	in, ok := decode[service.OrderPatch](w, r)
	if !ok {
		return
	}
	if handleServiceErr(w, h.orders.Patch(r.Context(), id, in)) {
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func (h *AdminHandler) DeleteOrder(w http.ResponseWriter, r *http.Request) {
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	if handleServiceErr(w, h.orders.Delete(r.Context(), id)) {
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

func (h *AdminHandler) Stats(w http.ResponseWriter, r *http.Request) {
	s, err := h.orders.Stats(r.Context())
	if err != nil {
		h.log.Error("stats", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب الإحصائيات")
		return
	}
	writeJSON(w, http.StatusOK, s)
}

// ---- systems ----

func (h *AdminHandler) ListSystems(w http.ResponseWriter, r *http.Request) {
	items, err := h.systems.List(r.Context(), service.SystemFilter{IncludeHidden: true})
	if err != nil {
		h.log.Error("admin list systems", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر جلب الأنظمة")
		return
	}
	writeJSON(w, http.StatusOK, items)
}

func (h *AdminHandler) CreateSystem(w http.ResponseWriter, r *http.Request) {
	in, ok := decode[service.SystemInput](w, r)
	if !ok {
		return
	}
	s, err := h.systems.Create(r.Context(), in)
	if err != nil {
		h.log.Error("create system", "err", err)
		writeErr(w, http.StatusBadRequest, "تعذّر إنشاء النظام — تأكّد أن المعرّف (slug) غير مستخدم")
		return
	}
	writeJSON(w, http.StatusCreated, s)
}

func (h *AdminHandler) UpdateSystem(w http.ResponseWriter, r *http.Request) {
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	in, ok := decode[service.SystemInput](w, r)
	if !ok {
		return
	}
	s, err := h.systems.Update(r.Context(), id, in)
	if handleServiceErr(w, err) {
		return
	}
	writeJSON(w, http.StatusOK, s)
}

func (h *AdminHandler) DeleteSystem(w http.ResponseWriter, r *http.Request) {
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	if handleServiceErr(w, h.systems.Delete(r.Context(), id)) {
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

// ---- categories ----

func (h *AdminHandler) CreateCategory(w http.ResponseWriter, r *http.Request) {
	in, ok := decode[service.CategoryInput](w, r)
	if !ok {
		return
	}
	c, err := h.systems.CreateCategory(r.Context(), in)
	if err != nil {
		h.log.Error("create category", "err", err)
		writeErr(w, http.StatusBadRequest, "تعذّر إنشاء التصنيف")
		return
	}
	writeJSON(w, http.StatusCreated, c)
}

func (h *AdminHandler) DeleteCategory(w http.ResponseWriter, r *http.Request) {
	id, ok := parseUUID(w, chi.URLParam(r, "id"))
	if !ok {
		return
	}
	if handleServiceErr(w, h.systems.DeleteCategory(r.Context(), id)) {
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"success": true})
}

// ---- demo maintenance ----

func (h *AdminHandler) ResetDemo(w http.ResponseWriter, r *http.Request) {
	cleared, err := h.demo.Reset(r.Context())
	if err != nil {
		h.log.Error("reset demo", "err", err)
		writeErr(w, http.StatusInternalServerError, "تعذّر إعادة التهيئة")
		return
	}
	purged, err := h.auth.PurgeExpiredDemos(r.Context())
	if err != nil {
		h.log.Error("purge demos", "err", err)
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"clearedRecords": cleared,
		"purgedAccounts": purged,
	})
}
