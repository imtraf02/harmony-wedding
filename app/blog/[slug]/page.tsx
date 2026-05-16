import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not Found" };
  }

  return {
    title: `${post.title} | Harmony Wedding`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-luxury pt-32 pb-24">
      <article className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        {/* Back Link */}
        <div className="mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-bold text-[11px] text-obsidian/60 uppercase tracking-[0.2em] transition-colors duration-500 hover:text-obsidian"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Quay lại Journal
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16 text-center md:mb-24">
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-obsidian/20 bg-obsidian/[0.03] px-4 py-1.5 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mx-auto mb-8 max-w-3xl font-light font-serif text-[clamp(2rem,5vw,4rem)] text-obsidian italic leading-[1.1] tracking-tighter">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-6 font-medium text-[12px] text-smoke/70 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={post.published_at || post.created_at}>
                {format(
                  new Date(post.published_at || post.created_at),
                  "dd MMMM, yyyy",
                  { locale: vi },
                )}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-obsidian/50" />
              <span>Harmony Studio</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-obsidian/5 md:mb-24 md:aspect-[2.35/1]">
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
          className="prose prose-lg md:prose-xl prose-stone mx-auto prose-h2:mt-12 prose-h2:mb-6 max-w-2xl prose-img:rounded-[1.5rem] prose-blockquote:border-l-obsidian prose-blockquote:font-serif prose-headings:font-light prose-headings:font-serif prose-p:font-light prose-a:text-obsidian prose-blockquote:text-obsidian/70 prose-h2:text-3xl prose-h2:text-obsidian prose-p:text-obsidian/80 prose-blockquote:italic prose-p:leading-relaxed prose-headings:tracking-tight prose-img:shadow-lg prose-a:transition-colors hover:prose-a:text-obsidian-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer/Share/Author area can go here later */}
        <div className="mx-auto mt-24 max-w-2xl border-black/[0.05] border-t pt-12 text-center">
          <p className="font-light text-[13px] text-smoke/60 italic">
            &ldquo;Cảm ơn bạn đã đọc bài viết này. Hy vọng những chia sẻ từ
            Harmony Studio sẽ giúp ích cho ngày trọng đại của bạn.&rdquo;
          </p>
        </div>
      </article>
    </main>
  );
}
