import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug } from '@/lib/queries/blog';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ArrowLeftIcon, CalendarIcon } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: `${post.title} | Harmony Wedding`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-luxury pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Back Link */}
        <div className="mb-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-obsidian/60 hover:text-gold transition-colors duration-500"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Quay lại Journal
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16 md:mb-24 text-center">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {post.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 px-4 py-1.5 rounded-full bg-gold/[0.03]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-[clamp(2rem,5vw,4rem)] font-serif italic font-light text-obsidian leading-[1.1] tracking-tighter mb-8 max-w-3xl mx-auto">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-[12px] font-medium uppercase tracking-widest text-smoke/70">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <time dateTime={post.published_at || post.created_at}>
                {format(new Date(post.published_at || post.created_at), 'dd MMMM, yyyy', { locale: vi })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span>Harmony Studio</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative w-full aspect-[21/9] md:aspect-[2.35/1] rounded-[2rem] overflow-hidden mb-16 md:mb-24 shadow-2xl shadow-obsidian/5">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg md:prose-xl prose-stone mx-auto 
                     prose-headings:font-serif prose-headings:font-light prose-headings:tracking-tight 
                     prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-obsidian
                     prose-p:text-obsidian/80 prose-p:leading-relaxed prose-p:font-light
                     prose-a:text-gold hover:prose-a:text-gold-600 prose-a:transition-colors
                     prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-obsidian/70 prose-blockquote:border-l-gold
                     prose-img:rounded-[1.5rem] prose-img:shadow-lg
                     max-w-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer/Share/Author area can go here later */}
        <div className="mt-24 pt-12 border-t border-black/[0.05] text-center max-w-2xl mx-auto">
          <p className="text-[13px] text-smoke/60 font-light italic">
            &ldquo;Cảm ơn bạn đã đọc bài viết này. Hy vọng những chia sẻ từ Harmony Studio sẽ giúp ích cho ngày trọng đại của bạn.&rdquo;
          </p>
        </div>

      </article>
    </main>
  );
}
