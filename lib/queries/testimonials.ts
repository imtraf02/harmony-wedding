import { getDb } from '@/lib/db';
import type { Testimonial } from '@/types';

function parseTestimonial(row: Record<string, unknown>): Testimonial {
  return {
    ...(row as Omit<Testimonial, 'is_active'>),
    is_active: Boolean(row.is_active),
  };
}

export function createTestimonial(data: Omit<Testimonial, 'id'>) {
  const db = getDb();
  return db.prepare(`
    INSERT INTO testimonials (couple_name, content, rating, avatar, service, wedding_year, is_active, sort_order)
    VALUES (@couple_name, @content, @rating, @avatar, @service, @wedding_year, @is_active, @sort_order)
  `).run({ ...data, is_active: data.is_active ? 1 : 0 });
}

export function getAllTestimonials() {
  const db = getDb();
  return (db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id DESC').all() as Record<string, unknown>[]).map(parseTestimonial);
}

export function getActiveTestimonials(limit = 10) {
  const db = getDb();
  return (db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT ?').all(limit) as Record<string, unknown>[]).map(parseTestimonial);
}

export function getTestimonialById(id: number): Testimonial | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  return row ? parseTestimonial(row) : null;
}

export function updateTestimonial(id: number, data: Partial<Omit<Testimonial, 'id'>>): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, val] of Object.entries(data)) {
    sets.push(`${key} = @${key}`);
    params[key] = key === 'is_active' ? (val ? 1 : 0) : val;
  }

  if (sets.length === 0) return;
  db.prepare(`UPDATE testimonials SET ${sets.join(', ')} WHERE id = @id`).run(params);
}

export function deleteTestimonial(id: number): void {
  getDb().prepare('DELETE FROM testimonials WHERE id = ?').run(id);
}
