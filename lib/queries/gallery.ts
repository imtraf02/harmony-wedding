import { getDb } from "@/lib/db";
import type { GalleryItem } from "@/types";

function parseGalleryItem(row: Record<string, unknown>): GalleryItem {
  return {
    ...(row as Omit<GalleryItem, "is_active">),
    is_active: Boolean(row.is_active),
  };
}

// ── Public queries ────────────────────────────────────────────────────────────

/** Homepage: only active items ordered by sort_order */
export function getActiveGalleryItems(limit = 20): GalleryItem[] {
  const db = getDb();
  return (
    db
      .prepare(
        "SELECT * FROM gallery_items WHERE is_active = 1 ORDER BY sort_order ASC, id ASC LIMIT ?",
      )
      .all(limit) as Record<string, unknown>[]
  ).map(parseGalleryItem);
}

// ── Admin queries ─────────────────────────────────────────────────────────────

/** Admin list: all items */
export function getAllGalleryItems(): GalleryItem[] {
  const db = getDb();
  return (
    db
      .prepare("SELECT * FROM gallery_items ORDER BY sort_order ASC, id ASC")
      .all() as Record<string, unknown>[]
  ).map(parseGalleryItem);
}

export function getGalleryItemById(id: number): GalleryItem | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM gallery_items WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  return row ? parseGalleryItem(row) : null;
}

// ── Mutations ─────────────────────────────────────────────────────────────────

export function createGalleryItem(
  data: Omit<GalleryItem, "id" | "created_at">,
): GalleryItem {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO gallery_items (src, alt, label, sort_order, is_active)
       VALUES (@src, @alt, @label, @sort_order, @is_active)`,
    )
    .run({ ...data, is_active: data.is_active ? 1 : 0 });
  return getGalleryItemById(result.lastInsertRowid as number)!;
}

export function updateGalleryItem(
  id: number,
  data: Partial<Omit<GalleryItem, "id" | "created_at">>,
): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, val] of Object.entries(data)) {
    sets.push(`${key} = @${key}`);
    params[key] = key === "is_active" ? (val ? 1 : 0) : val;
  }

  if (sets.length === 0) return;
  db.prepare(`UPDATE gallery_items SET ${sets.join(", ")} WHERE id = @id`).run(
    params,
  );
}

export function deleteGalleryItem(id: number): void {
  getDb().prepare("DELETE FROM gallery_items WHERE id = ?").run(id);
}

/** Bulk reorder: pass ordered array of ids */
export function reorderGalleryItems(orderedIds: number[]): void {
  const db = getDb();
  const stmt = db.prepare(
    "UPDATE gallery_items SET sort_order = @order WHERE id = @id",
  );
  const tx = db.transaction((ids: number[]) => {
    ids.forEach((id, index) => {
      stmt.run({ id, order: index });
    });
  });
  tx(orderedIds);
}
