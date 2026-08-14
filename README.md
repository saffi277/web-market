# ZAWAN

منصة شركة ZAWAN — عرض الأنظمة البرمجية، استقبال الطلبات، وتجربة الأنظمة قبل الشراء.

## البنية

```
api/    خادم Go (chi + pgx + PostgreSQL)
web/    واجهة Next.js 16 + TypeScript + Tailwind v4
```

## التشغيل محلياً

### 1. قاعدة البيانات

```bash
sudo pg_ctlcluster 16 main start
sudo -u postgres psql -c "CREATE USER zawan WITH PASSWORD 'zawan123' CREATEDB;"
sudo -u postgres psql -c "CREATE DATABASE zawan OWNER zawan;"
```

### 2. الباك ايند

```bash
cd api
cp .env.example .env      # عدّل القيم
ADMIN_PASSWORD='كلمة-مرور-قوية' go run ./cmd/seed   # ينشئ الجداول والبيانات الأولية
go run ./cmd/server                                  # http://localhost:8080
```

### 3. الفرونت ايند

```bash
cd web
npm install
npm run dev               # http://localhost:3000
```

## الصفحات

| المسار | الوصف |
|---|---|
| `/` | الرئيسية |
| `/systems` | كل الأنظمة مع بحث وفلترة |
| `/systems/[slug]` | تفاصيل نظام + طلب شراء |
| `/services` | الخدمات |
| `/contact` | التواصل |
| `/demo/[system]` | تجربة النظام (تسجيل ودخول) |
| `/admin` | لوحة الإدارة |

## لوحة الإدارة

تسجيل الدخول بحساب الإدارة الذي أنشأه `cmd/seed`. من اللوحة يمكن:

- متابعة الطلبات (تواصل / شراء / طلب تجربة) وتغيير حالتها وكتابة ملاحظات
- إضافة وتعديل وحذف الأنظمة — تظهر في الموقع فوراً بلا تعديل كود
- تفعيل الديمو لأي نظام
- إعادة تهيئة بيانات التجربة

## الديمو

كل زائر يسجّل حساباً تجريبياً صالحاً 7 أيام. يرى بيانات وهمية مشتركة، وأي شيء
يضيفه يبقى خاصاً به. مهمة يومية داخل الخادم تحذف الحسابات المنتهية وتمسح
الكتابات لتعود التجربة نظيفة.
