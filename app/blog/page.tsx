import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/queries/blog";

export const metadata = {
  title: "Blog | Harmony Wedding",
  description:
    "Những câu chuyện tình yêu, kinh nghiệm chụp ảnh cưới và xu hướng mới nhất.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <main className="min-h-screen bg-luxury pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-obsidian" />
            <span className="font-bold text-[11px] text-obsidian uppercase tracking-[0.4em]">
              Journal
            </span>
            <span className="h-px w-12 bg-obsidian" />
          </div>
          <h1 className="mb-6 font-light font-serif text-[clamp(2.5rem,5vw,4.5rem)] text-obsidian italic leading-[1.1] tracking-tighter">
            Những Câu Chuyện
          </h1>
          <p className="font-light text-obsidian/60 text-sm leading-relaxed md:text-base">
            Nơi lưu giữ những cảm xúc chân thật, kinh nghiệm quý báu và xu hướng
            cưới mới nhất từ Harmony Studio.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-black/[0.03] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)]"
              >
                {/* Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[4/3] overflow-hidden bg-obsidian/5"
                >
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-obsidian/20 italic">
                      No Image
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 font-bold text-[9px] text-obsidian uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
                        {post.tags[0]}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-1 flex-col p-8 md:p-10">
                  <div className="mb-4 flex items-center gap-2 font-medium text-[11px] text-smoke/60 uppercase tracking-widest">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <time dateTime={post.published_at || post.created_at}>
                      {format(
                        new Date(post.published_at || post.created_at),
                        "dd MMMM, yyyy",
                        { locale: vi },
                      )}
                    </time>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mb-4 block">
                    <h2 className="line-clamp-2 font-serif text-obsidian text-xl leading-snug transition-colors duration-500 group-hover:text-obsidian md:text-2xl">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="mb-8 line-clamp-3 flex-1 font-light text-obsidian/70 text-sm leading-relaxed">
                    {post.excerpt ||
                      "Đọc tiếp bài viết để khám phá thêm nội dung chi tiết..."}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex items-center gap-2 font-bold text-[11px] text-obsidian uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-obsidian"
                  >
                    Đọc tiếp
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-black/[0.03] bg-white/50 py-24 text-center">
            <p className="font-light text-lg text-obsidian/50">
              Chưa có bài viết nào được xuất bản.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
