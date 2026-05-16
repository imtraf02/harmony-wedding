import { getDb } from "@/lib/db";
import type { Contact } from "@/types";

export function getAllContacts(): Contact[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
    .all() as Contact[];
}

export function getContactsByStatus(status: Contact["status"]): Contact[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM contacts WHERE status = ? ORDER BY created_at DESC")
    .all(status) as Contact[];
}

export function updateContactStatus(
  id: number,
  status: Contact["status"],
): void {
  getDb()
    .prepare("UPDATE contacts SET status = ? WHERE id = ?")
    .run(status, id);
}

export function deleteContact(id: number): void {
  getDb().prepare("DELETE FROM contacts WHERE id = ?").run(id);
}
