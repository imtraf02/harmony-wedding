import { getDb } from "@/lib/db";
import type { Post } from "@/types";

function parsePost(row: Record<string, unknown>): Post {
  return {
    ...(row as Omit<Post, "tags" | "is_published">),
    tags: JSON.parse((row.tags as string) || "[]"),
    is_published: Boolean(row.is_published),
  };
}

export function getPublishedPosts(): Post[] {
  const db = getDb();
  return (
    db
      .prepare(
        "SELECT * FROM posts WHERE is_published = 1 ORDER BY published_at DESC",
      )
      .all() as Record<string, unknown>[]
  ).map(parsePost);
}

export function getPostBySlug(slug: string): Post | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM posts WHERE slug = ? AND is_published = 1")
    .get(slug) as Record<string, unknown> | undefined;
  return row ? parsePost(row) : null;
}

export function getAllPostsAdmin(): Post[] {
  const db = getDb();
  return (
    db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all() as Record<
      string,
      unknown
    >[]
  ).map(parsePost);
}

export function createPost(data: Omit<Post, "id" | "created_at">): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO posts (slug, title, excerpt, content, cover_image, tags, is_published, published_at)
    VALUES (@slug, @title, @excerpt, @content, @cover_image, @tags, @is_published, @published_at)
  `).run({
    ...data,
    tags: JSON.stringify(data.tags),
    is_published: data.is_published ? 1 : 0,
  });
}

export function updatePost(
  id: number,
  data: Partial<Omit<Post, "id" | "created_at">>,
): void {
  const db = getDb();
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  for (const [key, val] of Object.entries(data)) {
    sets.push(`${key} = @${key}`);
    params[key] =
      key === "tags"
        ? JSON.stringify(val)
        : key === "is_published"
          ? val
            ? 1
            : 0
          : val;
  }
  db.prepare(`UPDATE posts SET ${sets.join(", ")} WHERE id = @id`).run(params);
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
}
