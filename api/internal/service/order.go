package service

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saffi277/zawan/api/internal/model"
)

type OrderService struct{ pool *pgxpool.Pool }

func NewOrderService(p *pgxpool.Pool) *OrderService { return &OrderService{pool: p} }

type OrderInput struct {
	Kind       string  `json:"kind" validate:"required,oneof=contact purchase demo_request"`
	SystemSlug string  `json:"systemSlug" validate:"max=80"`
	Name       string  `json:"name" validate:"required,min=2,max=100"`
	Email      string  `json:"email" validate:"required,email,max=140"`
	Phone      *string `json:"phone" validate:"omitempty,min=6,max=25"`
	Company    *string `json:"company" validate:"omitempty,max=120"`
	Budget     *string `json:"budget" validate:"omitempty,max=60"`
	Message    string  `json:"message" validate:"max=3000"`
}

func (svc *OrderService) Create(ctx context.Context, in OrderInput) (uuid.UUID, error) {
	var id uuid.UUID
	err := svc.pool.QueryRow(ctx,
		`INSERT INTO orders (kind, system_id, name, email, phone, company, budget, message)
		 VALUES ($1,(SELECT id FROM systems WHERE slug=$2),$3,$4,$5,$6,$7,$8) RETURNING id`,
		in.Kind, nullStr(in.SystemSlug), in.Name, in.Email, in.Phone, in.Company, in.Budget, in.Message,
	).Scan(&id)
	return id, err
}

type OrderFilter struct {
	Kind   string
	Status string
}

func (svc *OrderService) List(ctx context.Context, f OrderFilter) ([]model.Order, error) {
	q := `SELECT o.id, o.kind, o.system_id, s.name_ar, o.name, o.email, o.phone,
			o.company, o.budget, o.message, o.status, o.notes, o.created_at, o.updated_at
		  FROM orders o LEFT JOIN systems s ON s.id = o.system_id WHERE 1=1`
	args := []any{}
	if f.Kind != "" && f.Kind != "all" {
		args = append(args, f.Kind)
		q += fmt.Sprintf(` AND o.kind = $%d`, len(args))
	}
	if f.Status != "" && f.Status != "all" {
		args = append(args, f.Status)
		q += fmt.Sprintf(` AND o.status = $%d`, len(args))
	}
	q += ` ORDER BY o.created_at DESC LIMIT 500`

	rows, err := svc.pool.Query(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.Order{}
	for rows.Next() {
		var o model.Order
		if err := rows.Scan(&o.ID, &o.Kind, &o.SystemID, &o.SystemName, &o.Name, &o.Email,
			&o.Phone, &o.Company, &o.Budget, &o.Message, &o.Status, &o.Notes,
			&o.CreatedAt, &o.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, o)
	}
	return out, rows.Err()
}

type OrderPatch struct {
	Status *string `json:"status" validate:"omitempty,oneof=new contacted negotiating won lost"`
	Notes  *string `json:"notes" validate:"omitempty,max=4000"`
}

func (svc *OrderService) Patch(ctx context.Context, id uuid.UUID, p OrderPatch) error {
	tag, err := svc.pool.Exec(ctx,
		`UPDATE orders SET status = COALESCE($2, status), notes = COALESCE($3, notes),
		 updated_at = now() WHERE id = $1`, id, p.Status, p.Notes)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (svc *OrderService) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := svc.pool.Exec(ctx, `DELETE FROM orders WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (svc *OrderService) Stats(ctx context.Context) (*model.Stats, error) {
	s := &model.Stats{
		OrdersByKind:   map[string]int64{},
		OrdersByStatus: map[string]int64{},
	}

	err := svc.pool.QueryRow(ctx, `
		SELECT (SELECT count(*) FROM orders),
		       (SELECT count(*) FROM orders WHERE status='new'),
		       (SELECT count(*) FROM orders WHERE status='won'),
		       (SELECT count(*) FROM systems WHERE published),
		       (SELECT count(*) FROM users WHERE role='demo_user' AND demo_expires_at > now())
	`).Scan(&s.TotalOrders, &s.NewOrders, &s.WonOrders, &s.TotalSystems, &s.ActiveDemos)
	if err != nil {
		return nil, err
	}

	for _, spec := range []struct {
		query string
		dest  map[string]int64
	}{
		{`SELECT kind, count(*) FROM orders GROUP BY kind`, s.OrdersByKind},
		{`SELECT status, count(*) FROM orders GROUP BY status`, s.OrdersByStatus},
	} {
		rows, err := svc.pool.Query(ctx, spec.query)
		if err != nil {
			return nil, err
		}
		for rows.Next() {
			var k string
			var n int64
			if err := rows.Scan(&k, &n); err != nil {
				rows.Close()
				return nil, err
			}
			spec.dest[k] = n
		}
		rows.Close()
		if err := rows.Err(); err != nil {
			return nil, err
		}
	}
	return s, nil
}
