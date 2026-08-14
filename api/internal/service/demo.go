package service

import (
	"context"
	"encoding/json"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"github.com/saffi277/zawan/api/internal/model"
)

type DemoService struct{ pool *pgxpool.Pool }

func NewDemoService(p *pgxpool.Pool) *DemoService { return &DemoService{pool: p} }

// List returns the seed rows for a system merged with rows the given demo user
// created themselves.
func (svc *DemoService) List(ctx context.Context, systemSlug, entityType string, ownerID uuid.UUID) ([]model.DemoRecord, error) {
	rows, err := svc.pool.Query(ctx,
		`SELECT d.id, d.system_id, d.entity_type, d.payload, d.is_seed, d.created_at
		 FROM demo_data d
		 JOIN systems s ON s.id = d.system_id
		 WHERE s.slug = $1
		   AND ($2 = '' OR d.entity_type = $2)
		   AND (d.is_seed OR d.owner_id = $3)
		 ORDER BY d.is_seed DESC, d.created_at DESC
		 LIMIT 500`,
		systemSlug, entityType, ownerID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	out := []model.DemoRecord{}
	for rows.Next() {
		var d model.DemoRecord
		if err := rows.Scan(&d.ID, &d.SystemID, &d.EntityType, &d.Payload, &d.IsSeed, &d.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, d)
	}
	return out, rows.Err()
}

type DemoRecordInput struct {
	EntityType string          `json:"entityType" validate:"required,min=2,max=40"`
	Payload    json.RawMessage `json:"payload" validate:"required"`
}

func (svc *DemoService) Create(ctx context.Context, systemSlug string, ownerID uuid.UUID, in DemoRecordInput) (*model.DemoRecord, error) {
	var d model.DemoRecord
	err := svc.pool.QueryRow(ctx,
		`INSERT INTO demo_data (system_id, owner_id, entity_type, payload, is_seed)
		 VALUES ((SELECT id FROM systems WHERE slug=$1), $2, $3, $4, false)
		 RETURNING id, system_id, entity_type, payload, is_seed, created_at`,
		systemSlug, ownerID, in.EntityType, []byte(in.Payload),
	).Scan(&d.ID, &d.SystemID, &d.EntityType, &d.Payload, &d.IsSeed, &d.CreatedAt)
	return &d, err
}

// Delete removes a record, but only one the caller created — seed rows are
// shared across all demo users and must stay intact.
func (svc *DemoService) Delete(ctx context.Context, id, ownerID uuid.UUID) error {
	tag, err := svc.pool.Exec(ctx,
		`DELETE FROM demo_data WHERE id=$1 AND owner_id=$2 AND is_seed = false`, id, ownerID)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

// Reset clears every non-seed row, returning all demo sandboxes to a clean state.
func (svc *DemoService) Reset(ctx context.Context) (int64, error) {
	tag, err := svc.pool.Exec(ctx, `DELETE FROM demo_data WHERE is_seed = false`)
	if err != nil {
		return 0, err
	}
	return tag.RowsAffected(), nil
}
