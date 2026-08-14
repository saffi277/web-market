package service

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saffi277/zawan/api/internal/model"
)

var ErrNotFound = errors.New("not found")

type SystemService struct{ pool *pgxpool.Pool }

func NewSystemService(p *pgxpool.Pool) *SystemService { return &SystemService{pool: p} }

const systemCols = `s.id, s.slug, s.name_ar, s.name_en, s.desc_ar, s.desc_en,
	s.category_id, c.slug, c.name_ar, s.price_usd, s.icon, s.badge, s.badge_color,
	s.features, s.screenshots, s.demo_enabled, s.display_order, s.published,
	s.created_at, s.updated_at`

func scanSystem(row pgx.Row) (*model.System, error) {
	var s model.System
	err := row.Scan(&s.ID, &s.Slug, &s.NameAr, &s.NameEn, &s.DescAr, &s.DescEn,
		&s.CategoryID, &s.CategorySlug, &s.CategoryAr, &s.PriceUSD, &s.Icon, &s.Badge, &s.BadgeColor,
		&s.Features, &s.Screenshots, &s.DemoEnabled, &s.DisplayOrder, &s.Published,
		&s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		return nil, err
	}
	return &s, nil
}

type SystemFilter struct {
	Category      string
	Search        string
	IncludeHidden bool
}

func (svc *SystemService) List(ctx context.Context, f SystemFilter) ([]model.System, error) {
	q := `SELECT ` + systemCols + ` FROM systems s LEFT JOIN categories c ON c.id = s.category_id WHERE 1=1`
	args := []any{}

	if !f.IncludeHidden {
		q += ` AND s.published = true`
	}
	if f.Category != "" && f.Category != "all" {
		args = append(args, f.Category)
		q += fmt.Sprintf(` AND c.slug = $%d`, len(args))
	}
	if f.Search != "" {
		args = append(args, "%"+strings.ToLower(f.Search)+"%")
		q += fmt.Sprintf(` AND (lower(s.name_ar) LIKE $%d OR lower(s.name_en) LIKE $%d OR lower(s.desc_ar) LIKE $%d)`,
			len(args), len(args), len(args))
	}
	q += ` ORDER BY s.display_order ASC, s.created_at DESC`

	rows, err := svc.pool.Query(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.System{}
	for rows.Next() {
		s, err := scanSystem(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, *s)
	}
	return out, rows.Err()
}

func (svc *SystemService) GetBySlug(ctx context.Context, slug string) (*model.System, error) {
	q := `SELECT ` + systemCols + ` FROM systems s LEFT JOIN categories c ON c.id = s.category_id WHERE s.slug = $1`
	s, err := scanSystem(svc.pool.QueryRow(ctx, q, slug))
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return s, err
}

type SystemInput struct {
	Slug         string   `json:"slug" validate:"required,min=2,max=80"`
	NameAr       string   `json:"nameAr" validate:"required,min=2,max=140"`
	NameEn       string   `json:"nameEn" validate:"required,min=2,max=140"`
	DescAr       string   `json:"descAr" validate:"max=2000"`
	DescEn       string   `json:"descEn" validate:"max=2000"`
	CategorySlug string   `json:"categorySlug"`
	PriceUSD     *float64 `json:"priceUsd" validate:"omitempty,gte=0"`
	Icon         string   `json:"icon" validate:"max=16"`
	Badge        *string  `json:"badge" validate:"omitempty,max=40"`
	BadgeColor   *string  `json:"badgeColor" validate:"omitempty,max=20"`
	Features     []string `json:"features" validate:"max=20,dive,max=120"`
	Screenshots  []string `json:"screenshots" validate:"max=10,dive,url"`
	DemoEnabled  bool     `json:"demoEnabled"`
	DisplayOrder int32    `json:"displayOrder"`
	Published    bool     `json:"published"`
}

func (svc *SystemService) Create(ctx context.Context, in SystemInput) (*model.System, error) {
	q := `INSERT INTO systems
		(slug, name_ar, name_en, desc_ar, desc_en, category_id, price_usd, icon,
		 badge, badge_color, features, screenshots, demo_enabled, display_order, published)
		VALUES ($1,$2,$3,$4,$5,(SELECT id FROM categories WHERE slug=$6),$7,$8,$9,$10,$11,$12,$13,$14,$15)
		RETURNING id`
	var id uuid.UUID
	err := svc.pool.QueryRow(ctx, q, in.Slug, in.NameAr, in.NameEn, in.DescAr, in.DescEn,
		nullStr(in.CategorySlug), in.PriceUSD, in.Icon, in.Badge, in.BadgeColor,
		jsonArray(in.Features), jsonArray(in.Screenshots), in.DemoEnabled, in.DisplayOrder, in.Published,
	).Scan(&id)
	if err != nil {
		return nil, err
	}
	return svc.GetBySlug(ctx, in.Slug)
}

func (svc *SystemService) Update(ctx context.Context, id uuid.UUID, in SystemInput) (*model.System, error) {
	q := `UPDATE systems SET
		slug=$2, name_ar=$3, name_en=$4, desc_ar=$5, desc_en=$6,
		category_id=(SELECT id FROM categories WHERE slug=$7), price_usd=$8, icon=$9,
		badge=$10, badge_color=$11, features=$12, screenshots=$13,
		demo_enabled=$14, display_order=$15, published=$16, updated_at=now()
		WHERE id=$1 RETURNING slug`
	var slug string
	err := svc.pool.QueryRow(ctx, q, id, in.Slug, in.NameAr, in.NameEn, in.DescAr, in.DescEn,
		nullStr(in.CategorySlug), in.PriceUSD, in.Icon, in.Badge, in.BadgeColor,
		jsonArray(in.Features), jsonArray(in.Screenshots), in.DemoEnabled, in.DisplayOrder, in.Published,
	).Scan(&slug)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return svc.GetBySlug(ctx, slug)
}

func (svc *SystemService) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := svc.pool.Exec(ctx, `DELETE FROM systems WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (svc *SystemService) ListCategories(ctx context.Context) ([]model.Category, error) {
	rows, err := svc.pool.Query(ctx,
		`SELECT id, slug, name_ar, name_en, display_order FROM categories ORDER BY display_order, name_ar`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Category{}
	for rows.Next() {
		var c model.Category
		if err := rows.Scan(&c.ID, &c.Slug, &c.NameAr, &c.NameEn, &c.DisplayOrder); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

type CategoryInput struct {
	Slug         string `json:"slug" validate:"required,min=2,max=60"`
	NameAr       string `json:"nameAr" validate:"required,min=2,max=100"`
	NameEn       string `json:"nameEn" validate:"required,min=2,max=100"`
	DisplayOrder int32  `json:"displayOrder"`
}

func (svc *SystemService) CreateCategory(ctx context.Context, in CategoryInput) (*model.Category, error) {
	var c model.Category
	err := svc.pool.QueryRow(ctx,
		`INSERT INTO categories (slug, name_ar, name_en, display_order) VALUES ($1,$2,$3,$4)
		 RETURNING id, slug, name_ar, name_en, display_order`,
		in.Slug, in.NameAr, in.NameEn, in.DisplayOrder,
	).Scan(&c.ID, &c.Slug, &c.NameAr, &c.NameEn, &c.DisplayOrder)
	return &c, err
}

func (svc *SystemService) DeleteCategory(ctx context.Context, id uuid.UUID) error {
	tag, err := svc.pool.Exec(ctx, `DELETE FROM categories WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}
