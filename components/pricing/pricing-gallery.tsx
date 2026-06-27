"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const pricingImages = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/bang-gia/${i + 1}.jpg`,
  alt: `Bảng giá dịch vụ Harmony Wedding - Trang ${i + 1}`,
  title: `Trang ${String(i + 1).padStart(2, "0")}`,
}));

export function PricingGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setIsZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : pricingImages.length - 1));
  }, [activeIdx]);

  const showNext = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx((prev) => (prev !== null && prev < pricingImages.length - 1 ? prev + 1 : 0));
  }, [activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, showNext, showPrev, closeLightbox]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        <p className="mb-6 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
          Catalogue & Bảng Giá
          <span className="h-px w-16 bg-black" />
        </p>
        <h2 className="mb-14 font-serif text-[clamp(2.6rem,7vw,4.8rem)] leading-[1] text-black">
          Bảng Giá Dịch Vụ Cưới Chi Tiết
        </h2>

        {/* Thumbnail Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pricingImages.map((img, idx) => (
            <article
              key={img.src}
              className="group relative cursor-pointer overflow-hidden border border-black/5 bg-neutral-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              onClick={() => setActiveIdx(idx)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  loading="lazy"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </div>
              <div className="flex items-center justify-between p-5 bg-white border-t border-black/[0.04]">
                <span className="font-serif text-lg font-medium text-neutral-900">{img.title}</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-black transition-colors">
                  Phóng to ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/98 backdrop-blur-md transition-opacity duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar controls */}
          <div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/50 to-transparent">
            <span className="font-sans text-xs tracking-widest uppercase text-white/70">
              {pricingImages[activeIdx].title} / {String(pricingImages.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden md:flex px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/10"
                type="button"
              >
                {isZoomed ? "Thu Nhỏ" : "Phóng To 1.5x"}
              </button>
              <button
                onClick={closeLightbox}
                className="grid size-11 place-items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                aria-label="Đóng bảng giá"
                type="button"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active Image viewport */}
          <div
            className={`relative flex items-center justify-center w-full h-full p-4 md:p-12 overflow-auto ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => !isZoomed && setIsZoomed(true)}
          >
            <div
              className={`relative transition-transform duration-300 select-none ${
                isZoomed ? "scale-135 md:scale-150 origin-center my-auto" : "max-w-full max-h-[78vh] aspect-[3/4] h-full"
              }`}
              onClick={(e) => {
                if (isZoomed) {
                  e.stopPropagation();
                  setIsZoomed(false);
                }
              }}
            >
              <Image
                src={pricingImages[activeIdx].src}
                alt={pricingImages[activeIdx].alt}
                fill={!isZoomed}
                width={isZoomed ? 1200 : undefined}
                height={isZoomed ? 1600 : undefined}
                className={`object-contain ${isZoomed ? "shadow-2xl" : ""}`}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Navigation Controls (Desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
            aria-label="Trang trước"
            type="button"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
            aria-label="Trang sau"
            type="button"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Mobile swipe helper text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/50 text-[0.62rem] tracking-[0.24em] uppercase pointer-events-none">
            {isZoomed ? "Kéo để xem chi tiết" : "Vuốt ngang để chuyển trang"}
          </div>
        </div>
      )}
    </section>
  );
}
