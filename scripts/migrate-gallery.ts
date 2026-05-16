/**
 * Migration: adds `gallery_items` table and `orientation` column to `portfolios`.
 * Safe to run multiple times (idempotent).
 *
 *   npx tsx scripts/migrate-gallery.ts
 */
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { getDatabasePath } from '../lib/db-path';

const DB_PATH = getDatabasePath();
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── 1. Create gallery_items table ────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS gallery_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    src        TEXT    NOT NULL,
    alt        TEXT    NOT NULL DEFAULT '',
    label      TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active  INTEGER NOT NULL DEFAULT 1,
    created_at TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
  );
  CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active, sort_order);
`);

// ── 2. Add `orientation` to portfolios (idempotent via pragma) ───────────────
const cols = db.pragma('table_info(portfolios)') as { name: string }[];
const hasOrientation = cols.some((c) => c.name === 'orientation');
if (!hasOrientation) {
  db.exec(`
    ALTER TABLE portfolios ADD COLUMN orientation TEXT NOT NULL DEFAULT 'portrait'
      CHECK(orientation IN ('portrait','landscape','square'));
  `);
  console.log('✓ Added column portfolios.orientation');
} else {
  console.log('· portfolios.orientation already exists — skipped');
}

console.log('✓ gallery_items table ready');
console.log('Migration complete.');
db.close();
