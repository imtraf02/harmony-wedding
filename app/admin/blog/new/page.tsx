import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { BlogForm } from '../../components/blog-form';

export const dynamic = 'force-dynamic';

export default function NewBlogPage() {
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
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Thêm bài viết mới</h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium mt-2">
            Tạo nội dung cho chuyên mục Journal
          </p>
        </div>
      </header>

      <BlogForm />
    </div>
  );
}
