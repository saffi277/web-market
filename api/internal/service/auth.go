package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"golang.org/x/crypto/bcrypt"

	"github.com/saffi277/zawan/api/internal/model"
)

var (
	ErrBadCredentials = errors.New("invalid credentials")
	ErrEmailTaken     = errors.New("email already registered")
	ErrDemoExpired    = errors.New("demo expired")
)

type AuthService struct {
	pool      *pgxpool.Pool
	trialDays int
}

func NewAuthService(p *pgxpool.Pool, trialDays int) *AuthService {
	return &AuthService{pool: p, trialDays: trialDays}
}

type LoginInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=128"`
}

func (svc *AuthService) Login(ctx context.Context, in LoginInput) (*model.User, error) {
	var u model.User
	var hash string
	err := svc.pool.QueryRow(ctx,
		`SELECT id, email, password_hash, name, phone, role, demo_expires_at, created_at
		 FROM users WHERE email = $1`, normalizeEmail(in.Email),
	).Scan(&u.ID, &u.Email, &hash, &u.Name, &u.Phone, &u.Role, &u.DemoExpiresAt, &u.CreatedAt)

	if errors.Is(err, pgx.ErrNoRows) {
		// Compare against a dummy hash so timing does not reveal account existence.
		_ = bcrypt.CompareHashAndPassword(
			[]byte("$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"),
			[]byte(in.Password))
		return nil, ErrBadCredentials
	}
	if err != nil {
		return nil, err
	}
	if bcrypt.CompareHashAndPassword([]byte(hash), []byte(in.Password)) != nil {
		return nil, ErrBadCredentials
	}
	if u.Role == model.RoleDemoUser && (u.DemoExpiresAt == nil || u.DemoExpiresAt.Before(time.Now())) {
		return nil, ErrDemoExpired
	}
	return &u, nil
}

type DemoRegisterInput struct {
	Name     string `json:"name" validate:"required,min=2,max=100"`
	Email    string `json:"email" validate:"required,email,max=140"`
	Phone    string `json:"phone" validate:"required,min=6,max=25"`
	Password string `json:"password" validate:"required,min=8,max=128"`
}

func (svc *AuthService) RegisterDemo(ctx context.Context, in DemoRegisterInput) (*model.User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}
	expires := time.Now().AddDate(0, 0, svc.trialDays)

	var u model.User
	err = svc.pool.QueryRow(ctx,
		`INSERT INTO users (email, password_hash, name, phone, role, demo_expires_at)
		 VALUES ($1,$2,$3,$4,'demo_user',$5)
		 RETURNING id, email, name, phone, role, demo_expires_at, created_at`,
		normalizeEmail(in.Email), string(hash), in.Name, in.Phone, expires,
	).Scan(&u.ID, &u.Email, &u.Name, &u.Phone, &u.Role, &u.DemoExpiresAt, &u.CreatedAt)

	if err != nil {
		if strings.Contains(err.Error(), "users_email_key") {
			return nil, ErrEmailTaken
		}
		return nil, err
	}
	return &u, nil
}

func (svc *AuthService) GetUser(ctx context.Context, id uuid.UUID) (*model.User, error) {
	var u model.User
	err := svc.pool.QueryRow(ctx,
		`SELECT id, email, name, phone, role, demo_expires_at, created_at FROM users WHERE id=$1`, id,
	).Scan(&u.ID, &u.Email, &u.Name, &u.Phone, &u.Role, &u.DemoExpiresAt, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return &u, err
}

// PurgeExpiredDemos removes demo accounts whose trial has ended along with
// their data (cascaded by foreign keys).
func (svc *AuthService) PurgeExpiredDemos(ctx context.Context) (int64, error) {
	tag, err := svc.pool.Exec(ctx,
		`DELETE FROM users WHERE role='demo_user' AND demo_expires_at < now()`)
	if err != nil {
		return 0, err
	}
	return tag.RowsAffected(), nil
}

func normalizeEmail(e string) string { return strings.ToLower(strings.TrimSpace(e)) }
