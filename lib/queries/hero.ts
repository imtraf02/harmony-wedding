import { getDb } from "../db";

export interface HeroSlide {
  id: number;
  src: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_label: string | null;
  cta_href: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export function getHeroSlides() {
  const db = getDb();
  const items = db
    .prepare(
      "SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC",
    )
    .all() as any[];
  return items.map((item) => ({
    ...item,
    is_active: item.is_active === 1,
  })) as HeroSlide[];
}

export function getAllHeroSlides() {
  const db = getDb();
  const items = db
    .prepare("SELECT * FROM hero_slides ORDER BY sort_order ASC")
    .all() as any[];
  return items.map((item) => ({
    ...item,
    is_active: item.is_active === 1,
  })) as HeroSlide[];
}

export function getHeroSlideById(id: number) {
  const db = getDb();
  const item = db
    .prepare("SELECT * FROM hero_slides WHERE id = ?")
    .get(id) as any;
  if (!item) return null;
  return {
    ...item,
    is_active: item.is_active === 1,
  } as HeroSlide;
}

export function createHeroSlide(data: Omit<HeroSlide, "id" | "created_at">) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO hero_slides (src, title, subtitle, description, cta_label, cta_href, sort_order, is_active)
    VALUES (@src, @title, @subtitle, @description, @cta_label, @cta_href, @sort_order, @is_active)
  `);
  return stmt.run({
    ...data,
    is_active: data.is_active ? 1 : 0,
  });
}

export function updateHeroSlide(
  id: number,
  data: Partial<Omit<HeroSlide, "id" | "created_at">>,
) {
  const db = getDb();
  const sets = Object.keys(data)
    .map((key) => `${key} = @${key}`)
    .join(", ");
  const stmt = db.prepare(`UPDATE hero_slides SET ${sets} WHERE id = @id`);

  const params: any = { ...data, id };
  if ("is_active" in params) params.is_active = params.is_active ? 1 : 0;

  return stmt.run(params);
}

export function deleteHeroSlide(id: number) {
  const db = getDb();
  return db.prepare("DELETE FROM hero_slides WHERE id = ?").run(id);
}
