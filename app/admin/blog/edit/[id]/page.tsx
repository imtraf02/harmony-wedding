import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeftIcon } from 'lucide-react';
import { BlogForm } from '../../../components/blog-form';
import { getDb } from '@/lib/db';
import type { Post } from '@/types';

export const dynamic = 'force-dynamic';

function getPostById(id: number): Post | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    ...(row as Omit<Post, 'tags' | 'is_published'>),
    tags: JSON.parse((row.tags as string) || '[]'),
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
    <div className="space-y-12 max-w-5xl">
      <header className="space-y-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center text-sm text-smoke hover:text-gold transition-colors font-medium uppercase tracking-widest"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Quay lại danh sách
        </Link>
        <div>
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Sửa bài viết</h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium mt-2">
            Cập nhật nội dung cho: {post.title}
          </p>
        </div>
      </header>

      <BlogForm initialData={post} />
    </div>
  );
}
