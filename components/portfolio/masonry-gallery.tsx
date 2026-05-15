import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Portfolio } from '@/types';

interface MasonryGalleryProps {
  items: Portfolio[];
}

const STYLE_LABELS: Record<string, string> = {
  vintage: 'Cổ điển',
  modern: 'Hiện đại',
  fineart: 'Nghệ thuật',
  romantic: 'Lãng mạn',
};

/* ─── Empty State ──────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      {/* decorative lines */}
      <div aria-hidden="true" className="flex items-center gap-4 w-48">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-luxury-border" />
        <span className="w-1.5 h-1.5 border border-gold-400 rotate-45 block" />
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-luxury-border" />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-ash text-center">
        Không tìm thấy album
      </p>
      <p className="text-sm font-sans font-light  text-mist text-center max-w-xs">
        Thử điều chỉnh bộ lọc để khám phá thêm những khoảnh khắc khác.
      </p>
      <div aria-hidden="true" className="flex items-center gap-4 w-48">
        <span className="flex-1 h-px bg-gradient-to-r from-transparent to-luxury-border" />
        <span className="w-1.5 h-1.5 border border-gold-400 rotate-45 block" />
        <span className="flex-1 h-px bg-gradient-to-l from-transparent to-luxury-border" />
      </div>
    </div>
  );
}

/* ─── MasonryGallery ───────────────────────────── */
export function MasonryGallery({ items }: MasonryGalleryProps) {
  if (!items.length) return <EmptyState />;

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 xl:gap-6 space-y-5 xl:space-y-6">
      {items.map((item, i) => (
        <Link
          key={item.id}
          href={`/portfolio/${item.slug}`}
          id={`masonry-item-${item.slug}`}
          aria-label={`Xem album: ${item.title}`}
          className={cn(
            'relative break-inside-avoid block overflow-hidden',
            'group',
            // stagger entrance
            'animate-fade-in-up-luxury',
          )}
          style={{ '--delay': `${Math.min(i, 8) * 80}ms` } as React.CSSProperties}
        >
          {/* image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={item.cover_image}
              alt={item.title}
              fill
              priority={i < 6}
              loading={i < 6 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] scale-100 group-hover:scale-105"
            />

            {/* overlay gradient */}
            <div
              aria-hidden="true"
              className={cn(
                'absolute inset-0',
                'bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent',
                'opacity-0 group-hover:opacity-100',
                'transition-opacity duration-600',
              )}
            />

            {/* content reveal */}
            <div
              className={cn(
                'absolute inset-0 flex flex-col justify-end p-7',
                'translate-y-3 group-hover:translate-y-0',
                'opacity-0 group-hover:opacity-100',
                'transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
              )}
            >
              {/* style tag */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  aria-hidden="true"
                  className="w-3 h-px bg-gold-400"
                />
                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-gold-300">
                  {STYLE_LABELS[item.style] ?? item.style}
                </span>
              </div>

              {/* title */}
              <h3 className="text-xl sm:text-2xl font-sans font-light text-ivory leading-snug">
                {item.title}
              </h3>

              {/* cta hint */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/50">
                  Xem album
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold-400 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* gold bottom border that grows in on hover */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          />
        </Link>
      ))}
    </div>
  );
}