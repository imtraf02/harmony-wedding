"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
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
    <section className="bg-transparent py-10 lg:py-16 relative z-10">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        
        {/* Navigation Tabs - Swipeable Glass pills */}
        <div className="flex justify-center mb-10 md:mb-16">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none bg-neutral-100/50 p-1.5 rounded-full border border-black/[0.03] max-w-full flex-nowrap px-1.5 py-1.5 shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-2 px-5 text-[0.66rem] md:text-[0.72rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? "bg-black text-white shadow-xs"
                    : "text-neutral-500 hover:text-black"
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
        </div>

        {/* Gallery Grid - Upgraded to Liquid Glass p-1 cards */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visibleImages.map((imgName, idx) => {
            const isSuit = imgName.startsWith("vest");
            const isAoDai = imgName.startsWith("ao-dai");
            const tagLabel = isSuit ? "Veston" : isAoDai ? "Áo Dài" : "Váy Cưới";
            
            return (
              <GlassCard
                key={imgName}
                variant="light"
                intensity="low"
                borderStrength="low"
                hoverable
                className="group relative cursor-pointer shadow-xs p-1 rounded-2xl"
                onClick={() => setActiveIdx(idx)}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={`/images/mau-do/${imgName}`}
                    alt={`Mẫu ${tagLabel.toLowerCase()} thiết kế cao cấp Harmony Wedding - Hình ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 1200px) 16vw, (min-width: 992px) 20vw, (min-width: 768px) 25vw, 33vw, 50vw"
                    loading="lazy"
                    quality={80}
                  />
                  {/* Category overlay - w-fit capsule glass badge */}
                  <GlassCard
                    variant="light"
                    intensity="high"
                    borderStrength="medium"
                    className="absolute top-2 left-2 w-fit px-2.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-neutral-800 rounded-full shadow-xs border border-white/40"
                  >
                    {tagLabel}
                  </GlassCard>
                  {/* Frosted glass "Xem chi tiết" hover overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/70 backdrop-blur-md text-neutral-800 text-[0.62rem] font-bold uppercase tracking-[0.2em] px-4 py-2 shadow-xs rounded-full border border-white/40">
                      Phóng to ↗
                    </span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Load More Button - GlassButton */}
        {visibleCount < filteredImages.length && (
          <div className="mt-16 text-center">
            <GlassButton
              onClick={loadMore}
              variant="dark"
              className="w-full sm:w-auto !py-3 !px-10 text-[0.68rem] tracking-[0.22em]"
            >
              Xem thêm mẫu đồ ({filteredImages.length - visibleCount})
            </GlassButton>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/60 to-transparent">
            <span className="font-sans text-[0.62rem] font-bold tracking-[0.24em] uppercase text-white/70">
              Mẫu {activeIdx + 1} &mdash; {filteredImages.length}
            </span>
            <div className="flex items-center gap-4">
              <GlassButton
                href="https://zalo.me/0357256845"
                onClick={() => window.open("https://zalo.me/0357256845", "_blank")}
                variant="light"
                className="!py-2 !px-5 text-[0.62rem] tracking-[0.18em] border-white/30 hover:text-black"
              >
                Nhận tư vấn mẫu này ➔
              </GlassButton>
              <GlassCard
                variant="light"
                intensity="high"
                borderStrength="medium"
                className="hidden md:flex px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] border border-white/30 text-white rounded-full hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {isZoomed ? "Thu Nhỏ" : "Phóng To 1.5x"}
              </GlassCard>
              <GlassCard
                variant="light"
                intensity="high"
                borderStrength="medium"
                className="grid size-10 place-items-center border border-white/30 text-white rounded-full hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
                onClick={closeLightbox}
              >
                <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </GlassCard>
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
                isZoomed ? "scale-120 md:scale-135 origin-center my-auto" : "max-w-full max-h-[82vh] aspect-[3/4] h-full"
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
          <GlassCard
            variant="light"
            intensity="high"
            borderStrength="medium"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 size-12 items-center justify-center border border-white/30 text-white rounded-full hover:bg-white/25 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </GlassCard>
          
          <GlassCard
            variant="light"
            intensity="high"
            borderStrength="medium"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 size-12 items-center justify-center border border-white/30 text-white rounded-full hover:bg-white/25 active:scale-95 transition-all cursor-pointer shadow-md"
          >
            <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </GlassCard>

          {/* Mobile Swipe Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/50 text-[0.62rem] tracking-[0.24em] uppercase pointer-events-none">
            {isZoomed ? "Kéo để xem chi tiết" : "Vuốt ngang để chuyển mẫu"}
          </div>
        </div>
      )}
    </section>
  );
}
