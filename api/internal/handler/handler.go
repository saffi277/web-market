package handler

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"

	"github.com/saffi277/zawan/api/internal/service"
)

var validate = validator.New(validator.WithRequiredStructEnabled())

const maxBodyBytes = 1 << 20 // 1MB

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if v != nil {
		_ = json.NewEncoder(w).Encode(v)
	}
}

func writeErr(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

// decode reads, size-limits and validates a JSON request body.
func decode[T any](w http.ResponseWriter, r *http.Request) (T, bool) {
	var v T
	r.Body = http.MaxBytesReader(w, r.Body, maxBodyBytes)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	if err := dec.Decode(&v); err != nil {
		if errors.Is(err, io.EOF) {
			writeErr(w, http.StatusBadRequest, "الطلب فارغ")
		} else {
			writeErr(w, http.StatusBadRequest, "صيغة البيانات غير صحيحة")
		}
		return v, false
	}
	if err := validate.Struct(v); err != nil {
		writeErr(w, http.StatusUnprocessableEntity, validationMessage(err))
		return v, false
	}
	return v, true
}

func validationMessage(err error) string {
	var ve validator.ValidationErrors
	if !errors.As(err, &ve) || len(ve) == 0 {
		return "البيانات المُدخلة غير صالحة"
	}
	fields := make([]string, 0, len(ve))
	for _, e := range ve {
		fields = append(fields, e.Field())
	}
	return "حقول غير صالحة: " + strings.Join(fields, "، ")
}

func parseUUID(w http.ResponseWriter, raw string) (uuid.UUID, bool) {
	id, err := uuid.Parse(raw)
	if err != nil {
		writeErr(w, http.StatusBadRequest, "معرّف غير صالح")
		return uuid.Nil, false
	}
	return id, true
}

// handleServiceErr maps a service error onto an HTTP response. It reports
// whether the error was handled, so callers can return early.
func handleServiceErr(w http.ResponseWriter, err error) bool {
	switch {
	case err == nil:
		return false
	case errors.Is(err, service.ErrNotFound):
		writeErr(w, http.StatusNotFound, "غير موجود")
	case errors.Is(err, service.ErrEmailTaken):
		writeErr(w, http.StatusConflict, "هذا البريد مسجّل مسبقاً")
	case errors.Is(err, service.ErrBadCredentials):
		writeErr(w, http.StatusUnauthorized, "بيانات الدخول غير صحيحة")
	case errors.Is(err, service.ErrDemoExpired):
		writeErr(w, http.StatusForbidden, "انتهت فترة التجربة")
	default:
		writeErr(w, http.StatusInternalServerError, "حدث خطأ في الخادم")
	}
	return true
}
