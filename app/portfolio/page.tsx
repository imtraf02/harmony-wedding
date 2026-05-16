import { Suspense } from "react";
import { CtaBanner } from "@/components/home/cta-banner";
import { GalleryFilter } from "@/components/portfolio/gallery-filter";
import { MasonryGallery } from "@/components/portfolio/masonry-gallery";
import { buildMetadata } from "@/lib/metadata";
import { getPortfolios } from "@/lib/queries/portfolio";

/* ─── Metadata ─────────────────────────────────── */
export const metadata = buildMetadata({
  title: "Portfolio | Những câu chuyện tình yêu qua ống kính",
  description:
    "Khám phá bộ sưu tập những khoảnh khắc cưới vượt thời gian. Lọc theo phong cách (Cổ điển, Hiện đại, Nghệ thuật) hoặc địa điểm.",
  path: "/portfolio",
});

/* ─── Skeletons ─────────────────────────────────── */
function FilterSkeleton() {
  return (
    <div className="mb-20 space-y-5" aria-hidden="true">
      <div className="h-px w-full bg-luxury-border-fine" />
      <div className="flex flex-wrap justify-center gap-3">
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
      className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3"
      role="status"
      aria-label="Đang tải..."
    >
      {[
        "aspect-[3/4]",
        "aspect-[3/5]",
        "aspect-[3/4]",
        "aspect-[4/5]",
        "aspect-[3/4]",
        "aspect-[3/5]",
      ].map((aspect, i) => (
        <div
          key={i}
          className={`${aspect} animate-pulse break-inside-avoid bg-black/5`}
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

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { style, location } = await searchParams;

  const items = getPortfolios({
    style: style || undefined,
    location: location || undefined,
  });

  return (
    <div className="min-h-screen bg-luxury">
      {/* ── Hero section ── */}
      <section className="pt-24 pb-0 md:pt-40">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* decorative top rule */}
          <div
            aria-hidden="true"
            className="mb-6 flex animate-fade-in-up-luxury items-center gap-6 md:mb-16"
            style={{ "--delay": "0ms" } as React.CSSProperties}
          >
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-luxury-border" />
            <span className="block h-1.5 w-1.5 shrink-0 rotate-45 border border-obsidian-400" />
            <span className="shrink-0 font-bold text-[8px] text-mist uppercase tracking-[0.32em]">
              Portfolio
            </span>
            <span className="block h-1.5 w-1.5 shrink-0 rotate-45 border border-obsidian-400" />
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-luxury-border" />
          </div>

          <div
            className="mx-auto mb-8 max-w-3xl animate-fade-in-up-luxury text-center md:mb-20"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            <p className="mb-5 text-label-luxury text-obsidian">Bộ sưu tập</p>

            <h1
              className="mb-8 font-light font-sans text-obsidian leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)" }}
            >
              Những khoảnh khắc{" "}
              <em className="text-obsidian-600 not-italic">được ghi lại</em>
            </h1>

            <p
              className="mx-auto max-w-xl font-light text-smoke leading-relaxed"
              style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)" }}
            >
              Mỗi đám cưới là một câu chuyện độc nhất. Hãy duyệt qua portfolio
              để tìm thấy phong cách phù hợp nhất với bạn.
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
