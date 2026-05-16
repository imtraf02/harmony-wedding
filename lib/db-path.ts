import path from 'path';

const DEFAULT_DEV_DB_PATH = path.join(process.cwd(), 'database', 'wedding.db');
const DEFAULT_PROD_DB_PATH = '/var/lib/wedding/wedding.db';

export function getDatabasePath() {
  const configuredPath = process.env.DATABASE_PATH || process.env.SQLITE_DB_PATH;
  const dbPath = configuredPath || (process.env.NODE_ENV === 'production' ? DEFAULT_PROD_DB_PATH : DEFAULT_DEV_DB_PATH);

  return path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
}
