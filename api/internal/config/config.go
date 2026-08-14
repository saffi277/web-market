package config

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Port           string
	DatabaseURL    string
	JWTSecret      []byte
	AllowedOrigins []string
	AdminTokenTTL  time.Duration
	DemoTokenTTL   time.Duration
	DemoTrialDays  int
}

func Load() (*Config, error) {
	_ = godotenv.Load()

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_URL is required")
	}

	secret := os.Getenv("JWT_SECRET")
	if len(secret) < 32 {
		return nil, fmt.Errorf("JWT_SECRET must be at least 32 characters")
	}

	origins := strings.Split(getenv("ALLOWED_ORIGINS", "http://localhost:3000"), ",")
	for i := range origins {
		origins[i] = strings.TrimSpace(origins[i])
	}

	return &Config{
		Port:           getenv("PORT", "8080"),
		DatabaseURL:    dbURL,
		JWTSecret:      []byte(secret),
		AllowedOrigins: origins,
		AdminTokenTTL:  24 * time.Hour,
		DemoTokenTTL:   7 * 24 * time.Hour,
		DemoTrialDays:  7,
	}, nil
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
