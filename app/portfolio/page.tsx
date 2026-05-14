import { Suspense } from 'react';
import { getPortfolios } from '@/lib/queries/portfolio';
import { buildMetadata } from '@/lib/metadata';
import { GalleryFilter } from '@/components/portfolio/gallery-filter';
import { MasonryGallery } from '@/components/portfolio/masonry-gallery';
import { CtaBanner } from '@/components/home/cta-banner';

/* ─── Metadata ─────────────────────────────────── */
export const metadata = buildMetadata({
  title: 'Portfolio | Những câu chuyện tình yêu qua ống kính',
  description: 'Khám phá bộ sưu tập những khoảnh khắc cưới vượt thời gian. Lọc theo phong cách (Cổ điển, Hiện đại, Nghệ thuật) hoặc địa điểm.',
  path: '/portfolio',
});

/* ─── Skeletons ─────────────────────────────────── */
function FilterSkeleton() {
  return (
    <div className="mb-20 space-y-5" aria-hidden="true">
      <div className="h-px w-full bg-luxury-border-fine" />
      <div className="flex flex-wrap gap-3 justify-center">
        {[80, 96, 88, 72, 80].map((w, i) => (
          <div
            key={i}
            className="h-8 animate-pulse bg-black/5"
            style={{ width: w }}
          />
        ))}
      </div>
      <div className="h-px w-full bg-luxury-border-fine" />
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div
      className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
      aria-hidden="true"
      aria-label="Đang tải..."
    >
      {[
        'aspect-[3/4]',
        'aspect-[3/5]',
        'aspect-[3/4]',
        'aspect-[4/5]',
        'aspect-[3/4]',
        'aspect-[3/5]',
      ].map((aspect, i) => (
        <div
          key={i}
          className={`${aspect} bg-black/5 animate-pulse break-inside-avoid`}
        />
      ))}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────── */
interface PortfolioPageProps {
  searchParams: Promise<{
    style?: string;
    location?: string;
  }>;
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { style, location } = await searchParams;

  const items = getPortfolios({
    style: style || undefined,
    location: location || undefined,
  });

  return (
    <div className="min-h-screen bg-luxury">

      {/* ── Hero section ── */}
      <section className="pt-40 pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* decorative top rule */}
          <div
            aria-hidden="true"
            className="flex items-center gap-6 mb-16 animate-fade-in-up-luxury"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            <span className="flex-1 h-px bg-gradient-to-r from-transparent to-luxury-border" />
            <span className="w-1.5 h-1.5 border border-gold-400 rotate-45 block shrink-0" />
            <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-mist shrink-0">
              Portfolio
            </span>
            <span className="w-1.5 h-1.5 border border-gold-400 rotate-45 block shrink-0" />
            <span className="flex-1 h-px bg-gradient-to-l from-transparent to-luxury-border" />
          </div>

          {/* heading block */}
          <div
            className="mb-20 max-w-3xl animate-fade-in-up-luxury"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            <p className="text-label-luxury text-gold mb-5">
              Bộ sưu tập
            </p>

            <h1 className="font-cormorant font-light text-obsidian leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)' }}
            >
              Những khoảnh khắc{' '}
              <em className="italic text-gold-600 not-italic" style={{ fontStyle: 'italic' }}>
                được ghi lại
              </em>
            </h1>

            <p className="text-smoke font-light leading-relaxed max-w-xl"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)' }}
            >
              Mỗi đám cưới là một câu chuyện độc nhất. Hãy duyệt qua portfolio để tìm thấy
              phong cách phù hợp nhất với bạn.
            </p>
          </div>

          {/* ── Filter ── */}
          <Suspense fallback={<FilterSkeleton />}>
            <GalleryFilter />
          </Suspense>

          {/* ── Gallery ── */}
          <Suspense fallback={<GallerySkeleton />}>
            <MasonryGallery items={items} />
          </Suspense>

        </div>
      </section>

      {/* ── CTA ── */}
      <div className="mt-40">
        <CtaBanner />
      </div>

    </div>
  );
}