import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import type { Post } from "@/types";
import { BlogForm } from "../../../components/blog-form";

export const dynamic = "force-dynamic";

function getPostById(id: number): Post | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as
    | Record<string, unknown>
    | undefined;
  if (!row) return null;
  return {
    ...(row as Omit<Post, "tags" | "is_published">),
    tags: JSON.parse((row.tags as string) || "[]"),
    is_published: Boolean(row.is_published),
  };
}

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postId = Number(id);

  if (Number.isNaN(postId)) {
    notFound();
  }

  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl space-y-12">
      <header className="space-y-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center font-medium text-sm text-smoke uppercase tracking-widest transition-colors hover:text-obsidian"
        >
          <ChevronLeftIcon className="mr-1 h-4 w-4" />
          Quay lại danh sách
        </Link>
        <div>
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Sửa bài viết
          </h1>
          <p className="mt-2 font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Cập nhật nội dung cho: {post.title}
          </p>
        </div>
      </header>

      <BlogForm initialData={post} />
    </div>
  );
}
