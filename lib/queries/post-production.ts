import { getDb } from "@/lib/db";
import type { PostProduction } from "@/types";

function parsePostProduction(row: Record<string, unknown>): PostProduction {
  return {
    ...(row as Omit<PostProduction, "is_featured" | "is_active">),
    is_featured: Boolean(row.is_featured),
    is_active: Boolean(row.is_active),
  };
}

export function getPostProductions(
  filters: { category?: string; activeOnly?: boolean } = {},
): PostProduction[] {
  const db = getDb();
  let sql = "SELECT * FROM post_productions WHERE 1=1";
  const params: Record<string, string> = {};

  if (filters.activeOnly) {
    sql += " AND is_active = 1";
  }

  if (filters.category) {
    sql += " AND category = @category";
    params.category = filters.category;
  }

  sql += " ORDER BY sort_order ASC, created_at DESC";

  return (db.prepare(sql).all(params) as Record<string, unknown>[]).map(
    parsePostProduction,
  );
}

export function getFeaturedPostProductions(limit = 6): PostProduction[] {
  const db = getDb();
  return (
    db
      .prepare(
        "SELECT * FROM post_productions WHERE is_active = 1 AND is_featured = 1 ORDER BY sort_order ASC, created_at DESC LIMIT ?",
      )
      .all(limit) as Record<string, unknown>[]
  ).map(parsePostProduction);
}

export function getPostProductionById(id: number): PostProduction | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM post_productions WHERE id = ?")
    .get(id) as Record<string, unknown> | undefined;
  return row ? parsePostProduction(row) : null;
}

export function getPostProductionBySlug(slug: string): PostProduction | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM post_productions WHERE slug = ?")
    .get(slug) as Record<string, unknown> | undefined;
  return row ? parsePostProduction(row) : null;
}

export function createPostProduction(
  data: Omit<PostProduction, "id" | "created_at" | "updated_at">,
): PostProduction {
  const db = getDb();
  const result = db
    .prepare(`
      INSERT INTO post_productions
        (slug, title, description, category, video_url, poster_image, orientation, is_featured, is_active, sort_order)
      VALUES
        (@slug, @title, @description, @category, @video_url, @poster_image, @orientation, @is_featured, @is_active, @sort_order)
    `)
    .run({
      ...data,
      is_featured: data.is_featured ? 1 : 0,
      is_active: data.is_active ? 1 : 0,
    });

  const item = getPostProductionById(result.lastInsertRowid as number);
  if (!item) throw new Error("Không thể tạo mục hậu kỳ");
  return item;
}

export function updatePostProduction(
  id: number,
  data: Partial<Omit<PostProduction, "id" | "created_at">>,
): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, val] of Object.entries(data)) {
    sets.push(`${key} = @${key}`);
    params[key] =
      key === "is_featured" || key === "is_active" ? (val ? 1 : 0) : val;
  }

  if (sets.length === 0) return;
  sets.push("updated_at = datetime('now','localtime')");

  db.prepare(
    `UPDATE post_productions SET ${sets.join(", ")} WHERE id = @id`,
  ).run(params);
}

export function deletePostProduction(id: number): void {
  getDb().prepare("DELETE FROM post_productions WHERE id = ?").run(id);
}

export function reorderPostProductions(orderedIds: number[]): void {
  const db = getDb();
  const stmt = db.prepare(
    "UPDATE post_productions SET sort_order = @order WHERE id = @id",
  );
  const tx = db.transaction((ids: number[]) => {
    ids.forEach((id, index) => {
      stmt.run({ id, order: index });
    });
  });
  tx(orderedIds);
}
