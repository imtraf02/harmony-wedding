"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { mauDoImages } from "@/constants/mau-do";

const IMAGES_PER_PAGE = 24;
const TABS = ["Tất cả", "Váy & Áo Dài", "Veston"];

export function MauDoGallery() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Filter images based on tab
  const getFilteredImages = useCallback(() => {
    return mauDoImages.filter(img => {
      if (activeTab === "Tất cả") return true;
      if (activeTab === "Váy & Áo Dài") return img.startsWith("vay-cuoi") || img.startsWith("ao-dai");
      if (activeTab === "Veston") return img.startsWith("vest");
      return true;
    });
  }, [activeTab]);

  const filteredImages = getFilteredImages();

  // Reset pagination when tab changes
  useEffect(() => {
    setVisibleCount(IMAGES_PER_PAGE);
    setActiveIdx(null);
  }, [activeTab]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + IMAGES_PER_PAGE, filteredImages.length));
  };

  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setIsZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx(prev => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
  }, [activeIdx, filteredImages.length]);

  const showNext = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx(prev => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
  }, [activeIdx, filteredImages.length]);

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

  // Lock body scroll when lightbox is open
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
    touchStartX.current = null;
  };

  const visibleImages = filteredImages.slice(0, visibleCount);

  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-16">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-6 py-2.5 text-[0.7rem] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab
                  ? "bg-black text-white shadow-md shadow-black/10"
                  : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-black"
              }`}
              type="button"
            >
              {tab} ({mauDoImages.filter(img => {
                if (tab === "Tất cả") return true;
                if (tab === "Váy & Áo Dài") return img.startsWith("vay-cuoi") || img.startsWith("ao-dai");
                if (tab === "Veston") return img.startsWith("vest");
                return true;
              }).length})
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visibleImages.map((imgName, idx) => {
            const isSuit = imgName.startsWith("vest");
            const isAoDai = imgName.startsWith("ao-dai");
            const tagLabel = isSuit ? "Veston" : isAoDai ? "Áo Dài" : "Váy Cưới";
            
            return (
              <article
                key={imgName}
                className="group relative cursor-pointer overflow-hidden border border-black/5 bg-neutral-50 shadow-[0_2px_12px_rgba(0,0,0,0.01)] transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
                onClick={() => setActiveIdx(idx)}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={`/images/mau-do/${imgName}`}
                    alt={`Mẫu ${tagLabel.toLowerCase()} thiết kế cao cấp Harmony Wedding - Hình ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-103"
                    sizes="(min-width: 1200px) 16vw, (min-width: 992px) 20vw, (min-width: 768px) 25vw, 33vw, 50vw"
                    loading="lazy"
                    quality={80}
                  />
                  <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-black">
                    {tagLabel}
                  </div>
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-black text-[0.62rem] font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-sm rounded-full">
                      Xem Chi Tiết ↗
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredImages.length && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="inline-flex h-12 items-center justify-center border border-black px-10 text-xs font-semibold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white transition-all duration-300"
              type="button"
            >
              Xem Thêm Mẫu Đồ ({filteredImages.length - visibleCount})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/98 backdrop-blur-md transition-opacity duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/50 to-transparent">
            <span className="font-sans text-xs tracking-widest uppercase text-white/70">
              Mẫu {activeIdx + 1} / {filteredImages.length}
            </span>
            <div className="flex items-center gap-4">
              <a
                href={`https://zalo.me/0357256845`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] bg-white text-black hover:bg-neutral-100 transition-colors border border-white"
              >
                Nhận tư vấn mẫu này
              </a>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden md:flex px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/10"
                type="button"
              >
                {isZoomed ? "Thu Nhỏ" : "Phóng To 1.5x"}
              </button>
              <button
                onClick={closeLightbox}
                className="grid size-11 place-items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                aria-label="Đóng thư viện"
                type="button"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Image Viewport */}
          <div
            className={`relative flex items-center justify-center w-full h-full p-4 md:p-12 overflow-auto ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => !isZoomed && setIsZoomed(true)}
          >
            <div
              className={`relative transition-transform duration-300 select-none ${
                isZoomed ? "scale-135 md:scale-150 origin-center my-auto" : "max-w-full max-h-[82vh] aspect-[3/4] h-full"
              }`}
              onClick={(e) => {
                if (isZoomed) {
                  e.stopPropagation();
                  setIsZoomed(false);
                }
              }}
            >
              <Image
                src={`/images/mau-do/${filteredImages[activeIdx]}`}
                alt={`Mẫu trang phục cưới thiết kế cao cấp Harmony Wedding`}
                fill={!isZoomed}
                width={isZoomed ? 900 : undefined}
                height={isZoomed ? 1200 : undefined}
                className={`object-contain ${isZoomed ? "shadow-2xl" : ""}`}
                priority
                quality={95}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
            aria-label="Mẫu trước"
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
            aria-label="Mẫu sau"
            type="button"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Mobile Swipe Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/50 text-[0.62rem] tracking-[0.24em] uppercase pointer-events-none">
            {isZoomed ? "Kéo để xem chi tiết" : "Vuốt ngang để chuyển mẫu"}
          </div>
        </div>
      )}
    </section>
  );
}
