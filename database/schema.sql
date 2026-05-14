PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;
PRAGMA synchronous  = NORMAL;

CREATE TABLE IF NOT EXISTS portfolios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    UNIQUE NOT NULL,
  title         TEXT    NOT NULL,
  style         TEXT    NOT NULL CHECK(style IN ('vintage','modern','fineart','romantic')),
  location_type TEXT    NOT NULL DEFAULT 'studio'
                        CHECK(location_type IN ('studio','outdoor','destination')),
  studio_slug   TEXT    REFERENCES studios(slug) ON DELETE SET NULL,
  cover_image   TEXT    NOT NULL,
  images        TEXT    NOT NULL DEFAULT '[]',
  video_url     TEXT,
  is_featured   INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
  updated_at    TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_portfolios_style    ON portfolios(style);
CREATE INDEX IF NOT EXISTS idx_portfolios_featured ON portfolios(is_featured);

CREATE TABLE IF NOT EXISTS studios (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT    UNIQUE NOT NULL,
  name          TEXT    NOT NULL,
  type          TEXT    NOT NULL DEFAULT 'studio'
                        CHECK(type IN ('studio','outdoor','destination')),
  address       TEXT,
  city          TEXT    NOT NULL,
  description   TEXT,
  highlights    TEXT    NOT NULL DEFAULT '[]',
  images        TEXT    NOT NULL DEFAULT '[]',
  map_embed_url TEXT,
  best_time     TEXT,
  is_active     INTEGER NOT NULL DEFAULT 1,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT    UNIQUE NOT NULL,
  title        TEXT    NOT NULL,
  excerpt      TEXT,
  content      TEXT    NOT NULL DEFAULT '',
  cover_image  TEXT,
  tags         TEXT    NOT NULL DEFAULT '[]',
  is_published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, published_at DESC);

CREATE TABLE IF NOT EXISTS contacts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  phone        TEXT    NOT NULL,
  email        TEXT,
  service      TEXT    NOT NULL DEFAULT 'photography'
                       CHECK(service IN ('photography','videography','wedding-film','combo')),
  wedding_date TEXT,
  guest_count  INTEGER,
  message      TEXT,
  status       TEXT    NOT NULL DEFAULT 'new'
                       CHECK(status IN ('new','contacted','booked','completed','cancelled')),
  ip_address   TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status, created_at DESC);

CREATE TABLE IF NOT EXISTS testimonials (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  couple_name  TEXT    NOT NULL,
  content      TEXT    NOT NULL,
  rating       INTEGER NOT NULL DEFAULT 5 CHECK(rating BETWEEN 1 AND 5),
  avatar       TEXT,
  service      TEXT,
  wedding_year INTEGER,
  is_active    INTEGER NOT NULL DEFAULT 1,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS admins (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  username   TEXT    UNIQUE NOT NULL,
  password   TEXT    NOT NULL,
  created_at TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
);
