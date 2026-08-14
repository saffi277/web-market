CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name          TEXT NOT NULL,
  phone         TEXT,
  role          TEXT NOT NULL DEFAULT 'demo_user' CHECK (role IN ('admin','demo_user','customer')),
  demo_expires_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  name_ar       TEXT NOT NULL,
  name_en       TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS systems (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL UNIQUE,
  name_ar       TEXT NOT NULL,
  name_en       TEXT NOT NULL,
  desc_ar       TEXT NOT NULL DEFAULT '',
  desc_en       TEXT NOT NULL DEFAULT '',
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  price_usd     NUMERIC(10,2),
  icon          TEXT NOT NULL DEFAULT '',
  badge         TEXT,
  badge_color   TEXT,
  features      JSONB NOT NULL DEFAULT '[]'::jsonb,
  screenshots   JSONB NOT NULL DEFAULT '[]'::jsonb,
  demo_enabled  BOOLEAN NOT NULL DEFAULT false,
  display_order INT NOT NULL DEFAULT 0,
  published     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind       TEXT NOT NULL CHECK (kind IN ('contact','purchase','demo_request')),
  system_id  UUID REFERENCES systems(id) ON DELETE SET NULL,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  company    TEXT,
  budget     TEXT,
  message    TEXT NOT NULL DEFAULT '',
  status     TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','negotiating','won','lost')),
  notes      TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS demo_data (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  system_id   UUID NOT NULL REFERENCES systems(id) ON DELETE CASCADE,
  owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,
  payload     JSONB NOT NULL,
  is_seed     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_systems_published ON systems(published, display_order);
CREATE INDEX IF NOT EXISTS idx_orders_kind_status ON orders(kind, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_data_lookup ON demo_data(system_id, entity_type, owner_id);
CREATE INDEX IF NOT EXISTS idx_users_demo_expiry ON users(demo_expires_at) WHERE demo_expires_at IS NOT NULL;
