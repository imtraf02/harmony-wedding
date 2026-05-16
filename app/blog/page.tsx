import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/queries/blog';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';

export const metadata = {
  title: 'Blog | Harmony Wedding',
  description: 'Những câu chuyện tình yêu, kinh nghiệm chụp ảnh cưới và xu hướng mới nhất.',
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <main className="min-h-screen bg-luxury pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Journal</span>
            <span className="w-12 h-px bg-gold" />
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-serif italic font-light text-obsidian leading-[1.1] tracking-tighter mb-6">
            Những Câu Chuyện
          </h1>
          <p className="text-sm md:text-base text-obsidian/60 font-light leading-relaxed">
            Nơi lưu giữ những cảm xúc chân thật, kinh nghiệm quý báu và xu hướng cưới mới nhất từ Harmony Studio.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden border border-black/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                {/* Image */}
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-obsidian/5">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-obsidian/20 font-serif italic">
                      No Image
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-obsidian shadow-sm">
                        {post.tags[0]}
                      </span>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-8 md:p-10">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-smoke/60 mb-4">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <time dateTime={post.published_at || post.created_at}>
                      {format(new Date(post.published_at || post.created_at), 'dd MMMM, yyyy', { locale: vi })}
                    </time>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block mb-4">
                    <h2 className="text-xl md:text-2xl font-serif text-obsidian leading-snug group-hover:text-gold transition-colors duration-500 line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-obsidian/70 font-light leading-relaxed mb-8 line-clamp-3 flex-1">
                    {post.excerpt || 'Đọc tiếp bài viết để khám phá thêm nội dung chi tiết...'}
                  </p>

                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-obsidian group-hover:text-gold transition-colors duration-500 mt-auto"
                  >
                    Đọc tiếp
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 border border-black/[0.03] rounded-[2rem]">
            <p className="text-obsidian/50 font-light text-lg">Chưa có bài viết nào được xuất bản.</p>
          </div>
        )}
      </div>
    </main>
  );
}
