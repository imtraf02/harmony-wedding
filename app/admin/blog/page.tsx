import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllPostsAdmin } from '@/lib/queries/blog';
import { DeleteBlogButton } from '../components/delete-blog-button';
import { PencilIcon, PlusIcon, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default function AdminBlogPage() {
  const posts = getAllPostsAdmin();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Quản lý Blog
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Viết và chia sẻ cẩm nang, mẹo chuẩn bị đám cưới
          </p>
        </div>
        <Button
          render={<Link href="/admin/blog/new" />}
          nativeButton={false}
          className="bg-obsidian text-ivory px-10 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          <PlusIcon data-icon="inline-start" /> Thêm bài viết mới
        </Button>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6">
          {posts.map((post) => {
            return (
              <article
                key={post.id}
                className="group bg-white border border-black/5 shadow-sm hover:shadow-luxury transition-all duration-500 flex flex-col h-full"
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
                    <div className="w-full h-full flex items-center justify-center text-ash text-sm italic font-serif">
                      Không có ảnh
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={`rounded-none border-0 text-[8px] uppercase tracking-[0.2em] ${
                      post.is_published ? 'bg-gold/90 text-ivory' : 'bg-white/80 text-ash'
                    }`}>
                      {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                      <CalendarIcon className="size-3" />
                      {format(new Date(post.created_at), 'dd/MM/yyyy')}
                    </div>
                    <h2 className="text-xl font-light text-obsidian tracking-tight line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-smoke text-sm font-light leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-black/5 pt-4 mt-auto">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-mist truncate max-w-[150px]">
                      {post.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="p-2 text-mist hover:text-gold transition-colors"
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
        <div className="py-40 text-center border border-dashed border-black/10">
          <p className="text-smoke font-light text-xl tracking-wide mb-8">
            Chưa có bài viết nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/blog/new" />}
            nativeButton={false}
            className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
          >
            Viết bài đầu tiên ↗
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <div className="flex items-center gap-8 pt-4 border-t border-black/5 text-[10px] uppercase tracking-[0.15em] text-smoke font-medium">
          <span>Tổng: {posts.length} bài viết</span>
          <span className="text-gold">· Đã xuất bản: {posts.filter((p) => p.is_published).length}</span>
          <span>· Bản nháp: {posts.filter((p) => !p.is_published).length}</span>
        </div>
      )}
    </div>
  );
}
