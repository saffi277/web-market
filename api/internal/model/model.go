package model

import (
	"encoding/json"
	"time"

	"github.com/google/uuid"
)

const (
	RoleAdmin    = "admin"
	RoleDemoUser = "demo_user"
	RoleCustomer = "customer"
)

type User struct {
	ID            uuid.UUID  `json:"id"`
	Email         string     `json:"email"`
	Name          string     `json:"name"`
	Phone         *string    `json:"phone,omitempty"`
	Role          string     `json:"role"`
	DemoExpiresAt *time.Time `json:"demoExpiresAt,omitempty"`
	CreatedAt     time.Time  `json:"createdAt"`
}

type Category struct {
	ID           uuid.UUID `json:"id"`
	Slug         string    `json:"slug"`
	NameAr       string    `json:"nameAr"`
	NameEn       string    `json:"nameEn"`
	DisplayOrder int32     `json:"displayOrder"`
}

type System struct {
	ID           uuid.UUID       `json:"id"`
	Slug         string          `json:"slug"`
	NameAr       string          `json:"nameAr"`
	NameEn       string          `json:"nameEn"`
	DescAr       string          `json:"descAr"`
	DescEn       string          `json:"descEn"`
	CategoryID   *uuid.UUID      `json:"categoryId,omitempty"`
	CategorySlug *string         `json:"categorySlug,omitempty"`
	CategoryAr   *string         `json:"categoryAr,omitempty"`
	PriceUSD     *float64        `json:"priceUsd,omitempty"`
	Icon         string          `json:"icon"`
	Badge        *string         `json:"badge,omitempty"`
	BadgeColor   *string         `json:"badgeColor,omitempty"`
	Features     json.RawMessage `json:"features"`
	Screenshots  json.RawMessage `json:"screenshots"`
	DemoEnabled  bool            `json:"demoEnabled"`
	DisplayOrder int32           `json:"displayOrder"`
	Published    bool            `json:"published"`
	CreatedAt    time.Time       `json:"createdAt"`
	UpdatedAt    time.Time       `json:"updatedAt"`
}

type Order struct {
	ID         uuid.UUID  `json:"id"`
	Kind       string     `json:"kind"`
	SystemID   *uuid.UUID `json:"systemId,omitempty"`
	SystemName *string    `json:"systemName,omitempty"`
	Name       string     `json:"name"`
	Email      string     `json:"email"`
	Phone      *string    `json:"phone,omitempty"`
	Company    *string    `json:"company,omitempty"`
	Budget     *string    `json:"budget,omitempty"`
	Message    string     `json:"message"`
	Status     string     `json:"status"`
	Notes      string     `json:"notes"`
	CreatedAt  time.Time  `json:"createdAt"`
	UpdatedAt  time.Time  `json:"updatedAt"`
}

type DemoRecord struct {
	ID         uuid.UUID       `json:"id"`
	SystemID   uuid.UUID       `json:"systemId"`
	EntityType string          `json:"entityType"`
	Payload    json.RawMessage `json:"payload"`
	IsSeed     bool            `json:"isSeed"`
	CreatedAt  time.Time       `json:"createdAt"`
}

type Stats struct {
	TotalOrders    int64            `json:"totalOrders"`
	NewOrders      int64            `json:"newOrders"`
	WonOrders      int64            `json:"wonOrders"`
	TotalSystems   int64            `json:"totalSystems"`
	ActiveDemos    int64            `json:"activeDemos"`
	OrdersByKind   map[string]int64 `json:"ordersByKind"`
	OrdersByStatus map[string]int64 `json:"ordersByStatus"`
}
