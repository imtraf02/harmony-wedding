import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Portfolio } from "@/types";

interface MasonryGalleryProps {
  items: Portfolio[];
}

const STYLE_LABELS: Record<string, string> = {
  vintage: "Cổ điển",
  modern: "Hiện đại",
  fineart: "Nghệ thuật",
  romantic: "Lãng mạn",
};

/* ─── Empty State ──────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-32">
      {/* decorative lines */}
      <div aria-hidden="true" className="flex w-48 items-center gap-4">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-luxury-border" />
        <span className="block h-1.5 w-1.5 rotate-45 border border-obsidian-400" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-luxury-border" />
      </div>
      <p className="text-center font-bold text-[10px] text-ash uppercase tracking-[0.28em]">
        Không tìm thấy album
      </p>
      <p className="max-w-xs text-center font-light font-sans text-mist text-sm">
        Thử điều chỉnh bộ lọc để khám phá thêm những khoảnh khắc khác.
      </p>
      <div aria-hidden="true" className="flex w-48 items-center gap-4">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-luxury-border" />
        <span className="block h-1.5 w-1.5 rotate-45 border border-obsidian-400" />
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-luxury-border" />
      </div>
    </div>
  );
}

/* ─── MasonryGallery ───────────────────────────── */
export function MasonryGallery({ items }: MasonryGalleryProps) {
  if (!items.length) return <EmptyState />;

  return (
    <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 xl:gap-6 xl:space-y-6">
      {items.map((item, i) => (
        <Link
          key={item.id}
          href={`/portfolio/${item.slug}`}
          id={`masonry-item-${item.slug}`}
          aria-label={`Xem album: ${item.title}`}
          className={cn(
            "relative block break-inside-avoid overflow-hidden",
            "group",
            // stagger entrance
            "animate-fade-in-up-luxury",
          )}
          style={
            { "--delay": `${Math.min(i, 8) * 80}ms` } as React.CSSProperties
          }
        >
          {/* image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={item.cover_image}
              alt={item.title}
              fill
              priority={i < 6}
              loading={i < 6 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="scale-100 object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />

            {/* overlay gradient */}
            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0",
                "bg-linear-to-t from-obsidian/85 via-obsidian/20 to-transparent",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-600",
              )}
            />

            {/* content reveal */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col justify-end p-7",
                "translate-y-3 group-hover:translate-y-0",
                "opacity-0 group-hover:opacity-100",
                "transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              )}
            >
              {/* style tag */}
              <div className="mb-3 flex items-center gap-2">
                <span aria-hidden="true" className="h-px w-3 bg-obsidian-400" />
                <span className="font-bold text-[8px] text-obsidian-300 uppercase tracking-[0.28em]">
                  {STYLE_LABELS[item.style] ?? item.style}
                </span>
              </div>

              {/* title */}
              <h3 className="font-light font-sans text-ivory text-xl leading-snug sm:text-2xl">
                {item.title}
              </h3>

              {/* cta hint */}
              <div className="mt-4 flex items-center gap-2">
                <span className="font-bold text-[8px] text-white/50 uppercase tracking-[0.22em]">
                  Xem album
                </span>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="translate-x-0 text-obsidian-400 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* obsidian bottom border that grows in on hover */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-obsidian-400 to-obsidian-600 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full"
          />
        </Link>
      ))}
    </div>
  );
}
