#!/usr/bin/env tsx
/**
 * Initialize the SQLite database from schema.sql
 * Usage: pnpm tsx scripts/init-db.ts
 */
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'database', 'wedding.db');
const SCHEMA_PATH = path.join(process.cwd(), 'database', 'schema.sql');

function init() {
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = new Database(DB_PATH);
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Execute each statement separately
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.toUpperCase().startsWith('PRAGMA'));

  console.log(`🎬 Running ${statements.length} schema statements...`);

  const tx = db.transaction(() => {
    for (const stmt of statements) {
      db.prepare(stmt).run();
    }
  });

  tx();
  db.close();
  console.log(`✅ Database initialized at ${DB_PATH}`);
}

init();
