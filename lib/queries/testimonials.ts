import { getDb } from '@/lib/db';
import type { Testimonial } from '@/types';

export function createTestimonial(data: Omit<Testimonial, 'id'>) {
  const db = getDb();
  return db.prepare(`
    INSERT INTO testimonials (couple_name, content, rating, avatar, service, wedding_year, is_active, sort_order)
    VALUES (@couple_name, @content, @rating, @avatar, @service, @wedding_year, @is_active, @sort_order)
  `).run(data);
}

export function getAllTestimonials() {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials ORDER BY sort_order ASC, id DESC').all() as Testimonial[];
}

export function getActiveTestimonials(limit = 10) {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id DESC LIMIT ?').all(limit) as Testimonial[];
}
