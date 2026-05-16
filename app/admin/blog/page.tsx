import { format } from "date-fns";
import { CalendarIcon, PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPostsAdmin } from "@/lib/queries/blog";
import { DeleteBlogButton } from "../components/delete-blog-button";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const posts = getAllPostsAdmin();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Quản lý Blog
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Viết và chia sẻ cẩm nang, mẹo chuẩn bị đám cưới
          </p>
        </div>
        <Button
          render={<Link href="/admin/blog/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon data-icon="inline-start" /> Thêm bài viết mới
        </Button>
      </header>

      {posts.length > 0 ? (
        <div className="grid 3xl:grid-cols-6 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posts.map((post) => {
            return (
              <article
                key={post.id}
                className="group flex h-full flex-col border border-black/5 bg-white shadow-sm transition-all duration-500 hover:shadow-luxury"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-whisper">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-serif text-ash text-sm italic">
                      Không có ảnh
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge
                      className={`rounded-none border-0 text-[8px] uppercase tracking-[0.2em] ${
                        post.is_published
                          ? "bg-obsidian/90 text-ivory"
                          : "bg-white/80 text-ash"
                      }`}
                    >
                      {post.is_published ? "Đã xuất bản" : "Bản nháp"}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em]">
                      <CalendarIcon className="size-3" />
                      {format(new Date(post.created_at), "dd/MM/yyyy")}
                    </div>
                    <h2 className="line-clamp-2 font-light text-obsidian text-xl tracking-tight">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="line-clamp-2 font-light text-sm text-smoke leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-black/5 border-t pt-4">
                    <span className="max-w-[150px] truncate text-[10px] text-mist uppercase tracking-[0.2em]">
                      {post.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-mist transition-colors hover:text-obsidian"
                        aria-label={`Sửa ${post.title}`}
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                      <DeleteBlogButton id={post.id} title={post.title} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có bài viết nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/blog/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Viết bài đầu tiên ↗
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <div className="flex items-center gap-8 border-black/5 border-t pt-4 font-medium text-[10px] text-smoke uppercase tracking-[0.15em]">
          <span>Tổng: {posts.length} bài viết</span>
          <span className="text-obsidian">
            · Đã xuất bản: {posts.filter((p) => p.is_published).length}
          </span>
          <span>· Bản nháp: {posts.filter((p) => !p.is_published).length}</span>
        </div>
      )}
    </div>
  );
}
