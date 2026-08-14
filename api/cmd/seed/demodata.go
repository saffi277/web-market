package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

// seedDemoData installs the shared sample records every demo visitor sees.
func seedDemoData(ctx context.Context, pool *pgxpool.Pool) {
	if _, err := pool.Exec(ctx, `DELETE FROM demo_data WHERE is_seed = true`); err != nil {
		log.Fatalf("clear demo seed: %v", err)
	}

	rows := []struct{ entity, payload string }{
		{"product", `{"name":"قهوة عربية","sku":"CF-001","price":5000,"stock":120,"category":"مشروبات"}`},
		{"product", `{"name":"شاي أخضر","sku":"TE-002","price":3000,"stock":85,"category":"مشروبات"}`},
		{"product", `{"name":"كيك شوكولاتة","sku":"CK-003","price":8000,"stock":24,"category":"حلويات"}`},
		{"product", `{"name":"عصير برتقال","sku":"JC-004","price":4000,"stock":60,"category":"مشروبات"}`},
		{"product", `{"name":"ساندويچ دجاج","sku":"SW-005","price":7500,"stock":40,"category":"وجبات"}`},

		{"sale", `{"invoiceNo":"INV-1001","customer":"زبون نقدي","total":18000,"items":4,"date":"2026-06-15","paymentMethod":"نقد"}`},
		{"sale", `{"invoiceNo":"INV-1002","customer":"أحمد علي","total":25500,"items":6,"date":"2026-06-15","paymentMethod":"بطاقة"}`},
		{"sale", `{"invoiceNo":"INV-1003","customer":"زبون نقدي","total":9000,"items":2,"date":"2026-06-16","paymentMethod":"نقد"}`},
		{"sale", `{"invoiceNo":"INV-1004","customer":"مطعم الشام","total":112000,"items":18,"date":"2026-06-16","paymentMethod":"آجل"}`},

		{"customer", `{"name":"أحمد علي","phone":"07701234567","city":"بغداد","totalSpent":145000,"orders":12}`},
		{"customer", `{"name":"مطعم الشام","phone":"07709876543","city":"أربيل","totalSpent":890000,"orders":34}`},
		{"customer", `{"name":"سارة محمد","phone":"07705558888","city":"البصرة","totalSpent":67000,"orders":7}`},
	}

	for _, r := range rows {
		if _, err := pool.Exec(ctx,
			`INSERT INTO demo_data (system_id, owner_id, entity_type, payload, is_seed)
			 VALUES ((SELECT id FROM systems WHERE slug='pos'), NULL, $1, $2, true)`,
			r.entity, r.payload); err != nil {
			log.Fatalf("seed demo row: %v", err)
		}
	}
	log.Printf("demo seed rows ready: %d", len(rows))
}
