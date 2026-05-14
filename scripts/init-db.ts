#!/usr/bin/env tsx
/**
 * Initialize the SQLite database from schema.sql
 * Usage: pnpm tsx scripts/init-db.ts
 */
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH     = path.join(process.cwd(), 'database', 'wedding.db');
const SCHEMA_PATH = path.join(process.cwd(), 'database', 'schema.sql');

function init() {
  const dbDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db     = new Database(DB_PATH);
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Execute each statement separately
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  const tx = db.transaction(() => {
    for (const stmt of statements) {
      try {
        db.prepare(stmt).run();
      } catch (err) {
        // PRAGMA statements return data, not run-able; ignore those errors
        if (!(err as Error).message.includes('not an error')) {
          console.warn(`Warning on statement: ${stmt.slice(0, 60)}...`);
          console.warn((err as Error).message);
        }
      }
    }
  });

  tx();
  db.close();
  console.log(`✅ Database initialized at ${DB_PATH}`);
}

init();
