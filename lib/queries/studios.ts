import { getDb } from '@/lib/db';
import type { Studio } from '@/types';

function parseStudio(row: Record<string, unknown>): Studio {
  return {
    ...(row as Omit<Studio, 'highlights' | 'images' | 'is_active'>),
    highlights: JSON.parse((row.highlights as string) || '[]'),
    images    : JSON.parse((row.images     as string) || '[]'),
    is_active : Boolean(row.is_active),
  };
}

export function getAllStudios(): Studio[] {
  const db = getDb();
  return (db.prepare(
    'SELECT * FROM studios WHERE is_active = 1 ORDER BY sort_order ASC'
  ).all() as Record<string, unknown>[]).map(parseStudio);
}

export function getStudioBySlug(slug: string): Studio | null {
  const db  = getDb();
  const row = db.prepare('SELECT * FROM studios WHERE slug = ?').get(slug) as Record<string, unknown> | undefined;
  return row ? parseStudio(row) : null;
}

export function getStudioById(id: number): Studio | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM studios WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  return row ? parseStudio(row) : null;
}

export function getAllStudiosAdmin(): Studio[] {
  const db = getDb();
  return (db.prepare(
    'SELECT * FROM studios ORDER BY sort_order ASC'
  ).all() as Record<string, unknown>[]).map(parseStudio);
}

export function createStudio(data: Omit<Studio, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO studios (slug, name, type, address, city, description, highlights, images, map_embed_url, best_time, is_active, sort_order)
    VALUES (@slug, @name, @type, @address, @city, @description, @highlights, @images, @map_embed_url, @best_time, @is_active, @sort_order)
  `).run({
    ...data,
    highlights: JSON.stringify(data.highlights),
    images: JSON.stringify(data.images),
    is_active: data.is_active ? 1 : 0,
  });
}

export function updateStudio(id: number, data: Omit<Studio, 'id'>): void {
  const db = getDb();
  db.prepare(`
    UPDATE studios SET
      slug = @slug,
      name = @name,
      type = @type,
      address = @address,
      city = @city,
      description = @description,
      highlights = @highlights,
      images = @images,
      map_embed_url = @map_embed_url,
      best_time = @best_time,
      is_active = @is_active,
      sort_order = @sort_order
    WHERE id = @id
  `).run({
    id,
    ...data,
    highlights: JSON.stringify(data.highlights),
    images: JSON.stringify(data.images),
    is_active: data.is_active ? 1 : 0,
  });
}

export function upsertStudio(data: Omit<Studio, 'id'>): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO studios (slug, name, type, address, city, description, highlights, images, map_embed_url, best_time, is_active, sort_order)
    VALUES (@slug, @name, @type, @address, @city, @description, @highlights, @images, @map_embed_url, @best_time, @is_active, @sort_order)
    ON CONFLICT(slug) DO UPDATE SET
      name = excluded.name, type = excluded.type, address = excluded.address,
      city = excluded.city, description = excluded.description,
      highlights = excluded.highlights, images = excluded.images,
      map_embed_url = excluded.map_embed_url, best_time = excluded.best_time,
      is_active = excluded.is_active, sort_order = excluded.sort_order
  `).run({
    ...data,
    highlights: JSON.stringify(data.highlights),
    images    : JSON.stringify(data.images),
    is_active : data.is_active ? 1 : 0,
  });
}

export function deleteStudio(id: number): void {
  getDb().prepare('DELETE FROM studios WHERE id = ?').run(id);
}
