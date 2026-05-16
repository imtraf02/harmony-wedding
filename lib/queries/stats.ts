import { getDb } from "@/lib/db";

export function getDashboardStats() {
  const db = getDb();

  const portfolios = db
    .prepare("SELECT COUNT(*) as count FROM portfolios")
    .get() as any;
  const contacts = db
    .prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'")
    .get() as any;
  const totalContacts = db
    .prepare("SELECT COUNT(*) as count FROM contacts")
    .get() as any;
  const testimonials = db
    .prepare("SELECT COUNT(*) as count FROM testimonials")
    .get() as any;

  return {
    portfolioCount: portfolios.count,
    newContactCount: contacts.count,
    totalContacts: totalContacts.count,
    testimonialCount: testimonials.count,
  };
}

export function getRecentContacts(limit = 5) {
  const db = getDb();
  return db
    .prepare("SELECT * FROM contacts ORDER BY created_at DESC LIMIT ?")
    .all(limit) as any[];
}
