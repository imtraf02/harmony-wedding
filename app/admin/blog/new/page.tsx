import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { BlogForm } from "../../components/blog-form";

export const dynamic = "force-dynamic";

export default function NewBlogPage() {
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
            Thêm bài viết mới
          </h1>
          <p className="mt-2 font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Tạo nội dung cho chuyên mục Journal
          </p>
        </div>
      </header>

      <BlogForm />
    </div>
  );
}
