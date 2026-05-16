import { getDb } from "@/lib/db";
import type { Portfolio } from "@/types";

function parsePortfolio(row: Record<string, unknown>): Portfolio {
  return {
    ...(row as Omit<Portfolio, "images" | "is_featured" | "orientation">),
    images: JSON.parse((row.images as string) || "[]"),
    is_featured: Boolean(row.is_featured),
    orientation: (row.orientation as Portfolio["orientation"]) ?? "portrait",
  };
}

export function getPortfolios(
  filters: { style?: string; location?: string } = {},
): Portfolio[] {
  const db = getDb();
  let sql = "SELECT * FROM portfolios WHERE 1=1";
  const params: Record<string, string> = {};

  if (filters.style) {
    sql += " AND style = @style";
    params.style = filters.style;
  }
  if (filters.location) {
    sql += " AND location_type = @location";
    params.location = filters.location;
  }

  sql += " ORDER BY sort_order ASC, created_at DESC";

  return (db.prepare(sql).all(params) as Record<string, unknown>[]).map(
    parsePortfolio,
  );
}

export function getFeaturedPortfolios(limit = 6): Portfolio[] {
  const db = getDb();
  return (
    db
      .prepare(
        "SELECT * FROM portfolios WHERE is_featured = 1 ORDER BY sort_order ASC LIMIT ?",
      )
      .all(limit) as Record<string, unknown>[]
  ).map(parsePortfolio);
}

export function getPortfolioBySlug(slug: string): Portfolio | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM portfolios WHERE slug = ?").get(slug) as
    | Record<string, unknown>
    | undefined;
  return row ? parsePortfolio(row) : null;
}

export function createPortfolio(
  data: Omit<Portfolio, "id" | "created_at" | "updated_at">,
): Portfolio {
  const db = getDb();
  const _result = db
    .prepare(`
    INSERT INTO portfolios
      (slug, title, style, location_type, studio_slug, cover_image, images, video_url, is_featured, orientation, sort_order)
    VALUES
      (@slug, @title, @style, @location_type, @studio_slug, @cover_image, @images, @video_url, @is_featured, @orientation, @sort_order)
  `)
    .run({
      ...data,
      images: JSON.stringify(data.images),
      is_featured: data.is_featured ? 1 : 0,
    });
  return getPortfolioBySlug(data.slug)!;
}

export function updatePortfolio(
  id: number,
  data: Partial<Omit<Portfolio, "id" | "created_at">>,
): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, val] of Object.entries(data)) {
    sets.push(`${key} = @${key}`);
    params[key] =
      key === "images"
        ? JSON.stringify(val)
        : key === "is_featured"
          ? val
            ? 1
            : 0
          : val;
  }
  sets.push("updated_at = datetime('now','localtime')");
  db.prepare(`UPDATE portfolios SET ${sets.join(", ")} WHERE id = @id`).run(
    params,
  );
}

export function deletePortfolio(id: number): void {
  getDb().prepare("DELETE FROM portfolios WHERE id = ?").run(id);
}
