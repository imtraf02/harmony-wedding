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
    console.log('Usage: pnpm tsx scripts/create-admin.ts <username> <password>');
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)').run(username, hashedPassword);
    console.log(`✅ Admin user "${username}" created successfully.`);
  } catch (err) {
    console.error('❌ Error creating admin:', (err as Error).message);
  } finally {
    db.close();
  }
}

createAdmin();
