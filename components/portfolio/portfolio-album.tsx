"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./lightbox";

interface PortfolioAlbumProps {
  images: string[];
  title: string;
}

/* ─── ZoomIcon ─────────────────────────────────── */
function ZoomIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

/* ─── PortfolioAlbum ───────────────────────────── */
export function PortfolioAlbum({ images, title }: PortfolioAlbumProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-20">
      {/* section label */}
      <div className="mb-12 flex items-center gap-5">
        <span className="font-bold text-[9px] text-ash uppercase tracking-[0.28em]">
          Bộ ảnh
        </span>
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-gradient-to-r from-luxury-border to-transparent"
        />
        <span className="font-bold text-[9px] text-ash uppercase tabular-nums tracking-[0.28em]">
          {String(images.length).padStart(2, "0")} ảnh
        </span>
      </div>

      {/* masonry layout */}
      <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            aria-label={`Xem ảnh ${i + 1} — ${title}`}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              "group relative mb-4 block w-full overflow-hidden sm:mb-5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/50",
              "animate-fade-in-up-luxury",
            )}
            style={
              { "--delay": `${Math.min(i, 9) * 60}ms` } as React.CSSProperties
            }
          >
            {/* wrapper without fixed aspect ratio */}
            <div className="relative h-full w-full overflow-hidden bg-whisper">
              <Image
                src={img}
                alt={`${title} — ảnh ${i + 1}`}
                width={800}
                height={800}
                loading={i < 6 ? "eager" : "lazy"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={cn(
                  "h-auto w-full object-cover",
                  "transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                  "scale-100 group-hover:scale-105",
                )}
              />

              {/* hover overlay */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "bg-obsidian/30",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-400",
                )}
              >
                {/* zoom icon ring */}
                <div
                  className={cn(
                    "flex items-center justify-center",
                    "h-10 w-10 border border-white/50",
                    "text-white/90",
                    "scale-75 group-hover:scale-100",
                    "transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  )}
                >
                  <ZoomIcon />
                </div>
              </div>

              {/* index badge — subtle, bottom-right */}
              <div
                aria-hidden="true"
                className={cn(
                  "absolute right-3 bottom-3",
                  "font-bold text-[8px] uppercase tracking-[0.22em]",
                  "text-white/50",
                  "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            {/* obsidian border sweep on hover */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-obsidian-400 to-obsidian-600 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
