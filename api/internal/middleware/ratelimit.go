package middleware

import (
	"encoding/json"
	"net"
	"net/http"
	"sync"
	"time"
)

type visitor struct {
	tokens   float64
	lastSeen time.Time
}

// RateLimit applies a per-IP token bucket allowing `rate` requests per minute
// with a burst of `burst`.
func RateLimit(rate, burst int) func(http.Handler) http.Handler {
	var (
		mu       sync.Mutex
		visitors = make(map[string]*visitor)
		perSec   = float64(rate) / 60.0
	)

	go func() {
		for range time.Tick(3 * time.Minute) {
			mu.Lock()
			for ip, v := range visitors {
				if time.Since(v.lastSeen) > 10*time.Minute {
					delete(visitors, ip)
				}
			}
			mu.Unlock()
		}
	}()

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip := clientIP(r)

			mu.Lock()
			v, ok := visitors[ip]
			now := time.Now()
			if !ok {
				v = &visitor{tokens: float64(burst), lastSeen: now}
				visitors[ip] = v
			} else {
				v.tokens += now.Sub(v.lastSeen).Seconds() * perSec
				if v.tokens > float64(burst) {
					v.tokens = float64(burst)
				}
				v.lastSeen = now
			}
			allowed := v.tokens >= 1
			if allowed {
				v.tokens--
			}
			mu.Unlock()

			if !allowed {
				w.Header().Set("Content-Type", "application/json; charset=utf-8")
				w.Header().Set("Retry-After", "60")
				w.WriteHeader(http.StatusTooManyRequests)
				_ = json.NewEncoder(w).Encode(map[string]string{"error": "طلبات كثيرة، حاول بعد قليل"})
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func clientIP(r *http.Request) string {
	if fwd := r.Header.Get("X-Forwarded-For"); fwd != "" {
		if i := len(fwd); i > 0 {
			for j := 0; j < len(fwd); j++ {
				if fwd[j] == ',' {
					return fwd[:j]
				}
			}
			return fwd
		}
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
