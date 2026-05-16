import path from "node:path";

const DEFAULT_DEV_DB_PATH = path.join(process.cwd(), "database", "wedding.db");

export function getDatabasePath() {
  const configuredPath =
    process.env.DATABASE_PATH || process.env.SQLITE_DB_PATH;
  const dbPath = configuredPath || DEFAULT_DEV_DB_PATH;

  return path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);
}
