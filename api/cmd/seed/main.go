package main

import (
	"context"
	"log"
	"os"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/saffi277/zawan/api/internal/config"
	"github.com/saffi277/zawan/api/internal/db"
)

// Seeds the admin account, baseline categories and a starter catalogue so a
// fresh database is immediately usable. Safe to re-run.
func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("config: %v", err)
	}

	adminEmail := getenv("ADMIN_EMAIL", "admin@zawan.dev")
	adminPass := os.Getenv("ADMIN_PASSWORD")
	if len(adminPass) < 8 {
		log.Fatal("ADMIN_PASSWORD must be set and at least 8 characters")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	pool, err := db.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("database: %v", err)
	}
	defer pool.Close()

	schema, err := os.ReadFile("migrations/001_init.sql")
	if err != nil {
		log.Fatalf("read migration: %v", err)
	}
	if _, err := pool.Exec(ctx, string(schema)); err != nil {
		log.Fatalf("apply schema: %v", err)
	}
	log.Println("schema applied")

	hash, err := bcrypt.GenerateFromPassword([]byte(adminPass), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("hash password: %v", err)
	}
	if _, err := pool.Exec(ctx,
		`INSERT INTO users (email, password_hash, name, role) VALUES ($1,$2,$3,'admin')
		 ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'admin'`,
		adminEmail, string(hash), "ZAWAN Admin"); err != nil {
		log.Fatalf("seed admin: %v", err)
	}
	log.Printf("admin ready: %s", adminEmail)

	categories := [][3]string{
		{"business", "إدارة الأعمال", "Business Management"},
		{"ecommerce", "التجارة الإلكترونية", "E-Commerce"},
		{"hr", "الموارد البشرية", "Human Resources"},
		{"accounting", "المحاسبة والمالية", "Accounting & Finance"},
	}
	for i, c := range categories {
		if _, err := pool.Exec(ctx,
			`INSERT INTO categories (slug, name_ar, name_en, display_order) VALUES ($1,$2,$3,$4)
			 ON CONFLICT (slug) DO NOTHING`, c[0], c[1], c[2], i); err != nil {
			log.Fatalf("seed category %s: %v", c[0], err)
		}
	}
	log.Printf("categories ready: %d", len(categories))

	systems := []struct {
		slug, nameAr, nameEn, descAr, cat, icon, badge, badgeColor, features string
		price                                                                float64
		demo                                                                 bool
	}{
		{"pos", "نظام نقاط البيع", "Point of Sale",
			"نظام POS سريع وموثوق لإدارة المبيعات في المحلات التجارية والمطاعم مع دعم الباركود والشيفتات.",
			"business", "🧾", "الأكثر طلباً", "#a855f7",
			`["واجهة سريعة","دعم الباركود","إدارة الشيفتات","تقارير يومية"]`, 249, true},
		{"sales-crm", "نظام إدارة المبيعات", "Sales Management",
			"نظام متكامل لإدارة المبيعات والعملاء والفواتير مع تقارير تفصيلية وتحليلات فورية.",
			"business", "📊", "", "",
			`["إدارة العملاء CRM","الفواتير الإلكترونية","تقارير المبيعات","تتبع المخزون"]`, 299, false},
		{"store", "منصة التجارة الإلكترونية", "E-Commerce Platform",
			"متجر إلكتروني احترافي بواجهة أنيقة ودعم للدفع الإلكتروني وإدارة المنتجات والطلبات.",
			"ecommerce", "🛍️", "جديد", "#06b6d4",
			`["بوابات دفع متعددة","إدارة المنتجات","تتبع الطلبات","تطبيق الجوال"]`, 499, false},
		{"hr-suite", "نظام الموارد البشرية", "HR Management",
			"إدارة الموظفين والرواتب والإجازات والحضور والانصراف في نظام واحد.",
			"hr", "👥", "", "",
			`["ملفات الموظفين","الرواتب","الإجازات","الحضور والانصراف"]`, 349, false},
		{"accounting", "نظام المحاسبة والمالية", "Accounting & Finance",
			"نظام محاسبي متكامل يدعم الميزانية العمومية وقوائم الدخل والتقارير المالية.",
			"accounting", "💰", "", "",
			`["قوائم الدخل","الميزانية العمومية","ضريبة القيمة المضافة","تقارير مالية"]`, 349, false},
	}
	for i, s := range systems {
		var badge, badgeColor any
		if s.badge != "" {
			badge, badgeColor = s.badge, s.badgeColor
		}
		if _, err := pool.Exec(ctx,
			`INSERT INTO systems (slug, name_ar, name_en, desc_ar, desc_en, category_id,
				price_usd, icon, badge, badge_color, features, demo_enabled, display_order, published)
			 VALUES ($1,$2,$3,$4,'',(SELECT id FROM categories WHERE slug=$5),$6,$7,$8,$9,$10,$11,$12,true)
			 ON CONFLICT (slug) DO NOTHING`,
			s.slug, s.nameAr, s.nameEn, s.descAr, s.cat, s.price, s.icon,
			badge, badgeColor, s.features, s.demo, i); err != nil {
			log.Fatalf("seed system %s: %v", s.slug, err)
		}
	}
	log.Printf("systems ready: %d", len(systems))

	seedDemoData(ctx, pool)
	log.Println("seed complete")
}

func getenv(k, fallback string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return fallback
}
