#!/usr/bin/env tsx
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { getDatabasePath } from '../lib/db-path';

const DB_PATH = getDatabasePath();

async function createAdmin() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.log('\n❌ Missing arguments.');
    console.log('Usage: pnpm tsx scripts/create-admin.ts <username> <password>\n');
    process.exit(1);
  }

  // Ensure DB directory exists
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  
  const db = new Database(DB_PATH);
  
  // Ensure table exists (optional but safe)
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      username   TEXT    UNIQUE NOT NULL,
      password   TEXT    NOT NULL,
      created_at TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
    );
  `);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = db.prepare('SELECT id FROM admins WHERE username = ?').get(username) as { id: number } | undefined;

    if (existing) {
      db.prepare('UPDATE admins SET password = ? WHERE username = ?').run(hashedPassword, username);
      console.log(`✅ Password updated for existing admin user: "${username}"`);
    } else {
      db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(username, hashedPassword);
      console.log(`✅ Admin user "${username}" created successfully.`);
    }
  } catch (err) {
    console.error('❌ Error creating/updating admin user:', err);
    process.exit(1);
  } finally {
    db.close();
  }
}

createAdmin().catch(console.error);
