// Every statement is idempotent (IF NOT EXISTS), so the whole list is safe to
// run on every cold start. New columns on existing tables must be added as
// their own `ALTER TABLE … ADD COLUMN IF NOT EXISTS` statement at the end —
// CREATE TABLE IF NOT EXISTS is a no-op once a table exists in production.
export const SCHEMA_STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Admin',
    status TEXT NOT NULL DEFAULT 'Active',
    reset_token TEXT,
    reset_token_expires TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS admin_users_email_unique ON admin_users (lower(email)) WHERE email IS NOT NULL`,

  // user_id/username/role are a snapshot (no FK) so history survives a user
  // being deleted later.
  `CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    username TEXT,
    role TEXT,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    resource_id TEXT,
    details TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    event_date DATE NOT NULL,
    location TEXT,
    description TEXT NOT NULL DEFAULT '',
    link_href TEXT NOT NULL DEFAULT '/news-events',
    link_label TEXT NOT NULL DEFAULT 'Learn More',
    image_url TEXT,
    image_alt TEXT,
    pillar TEXT NOT NULL DEFAULT 'general',
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_location TEXT,
    body TEXT NOT NULL DEFAULT '',
    image_url TEXT,
    image_alt TEXT,
    link_href TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS board_members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    member_group TEXT NOT NULL DEFAULT 'Director',
    photo_url TEXT,
    bio TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS career_roles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  `CREATE TABLE IF NOT EXISTS social_links (
    id SERIAL PRIMARY KEY,
    platform TEXT NOT NULL,
    label TEXT,
    url TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,

  // Public form submissions (contact, volunteer, mentoring, newsletter).
  `CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    form_type TEXT NOT NULL,
    name TEXT,
    email TEXT,
    phone TEXT,
    topic TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS submissions_type_created ON submissions (form_type, created_at DESC)`,

  `CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    pathname TEXT,
    filename TEXT,
    content_type TEXT,
    size_bytes INTEGER,
    uploaded_by TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
];
