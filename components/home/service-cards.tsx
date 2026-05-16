"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Service {
  src: string;
  images?: string[];
  alt: string;
  index?: string;
  title: string;
  description: string;
  highlights?: string[];
  href?: string;
  ctaLabel?: string;
  meta?: string;
}

interface ServiceCardsProps {
  services: Service[];
  title?: string;
  subtitle?: string;
}

// ── Card ──────────────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  isActive,
  onClick,
}: {
  service: Service;
  isActive: boolean;
  onClick?: () => void;
}) {
  const images = useMemo(() => {
    const allImages = [service.src, ...(service.images ?? [])]
      .map((image) => image.trim())
      .filter(Boolean);

    return Array.from(new Set(allImages));
  }, [service.images, service.src]);

  const [imageIndex, setImageIndex] = useState(0);
  const activeImageIndex = images.length > 0 ? imageIndex % images.length : 0;

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % images.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={cn(
        // Width: cố định trên mobile, tự stretch trên md+
        "w-[78vw] max-w-[300px] flex-shrink-0 md:w-auto md:max-w-none",
        "relative snap-start",
        "overflow-hidden rounded-[32px] bg-white transition-all duration-700",
        "flex cursor-pointer flex-col",
        "border-[8px] border-white ring-1 ring-black/[0.03]",
        isActive
          ? "z-10 scale-[1.02] shadow-[0_30px_70px_rgba(0,0,0,0.10)]"
          : "scale-100 shadow-[0_10px_40px_rgba(0,0,0,0.04)]",
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] w-full flex-shrink-0 overflow-hidden bg-whisper">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={index === activeImageIndex ? service.alt : ""}
            fill
            sizes="(max-width: 768px) 78vw, 25vw"
            className={cn(
              "object-cover transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              index === activeImageIndex
                ? "scale-105 opacity-100 blur-0"
                : "scale-100 opacity-0 blur-[2px]",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 text-white">
          <span className="font-bold text-[9px] text-white/65 uppercase tracking-[0.35em]">
            {[service.index, service.meta].filter(Boolean).join(" · ")}
          </span>

          <h3 className="font-light font-serif text-[1.7rem] italic leading-[1.05] tracking-tighter md:text-[1.9rem]">
            {service.title}
          </h3>

          <p className="line-clamp-3 font-light text-[12px] text-white/78 leading-[1.55]">
            {service.description}
          </p>

          {service.highlights && service.highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {service.highlights.slice(0, 3).map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium text-[9px] text-white/80 uppercase tracking-[0.16em] backdrop-blur"
                >
                  {highlight}
                </span>
              ))}
            </div>
          )}

          <Link
            href={service.href ?? "/pricing"}
            className="group/btn mt-2 inline-flex w-fit items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="relative font-bold text-[10px] text-white uppercase tracking-[0.28em] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/btn:after:w-full">
              {service.ctaLabel ?? "Khám phá gói"}
            </span>
            <div
              className={cn(
                "flex size-9 items-center justify-center rounded-full border transition-all duration-500",
                isActive
                  ? "border-white bg-white text-obsidian"
                  : "border-white/35 text-white group-hover/btn:bg-white group-hover/btn:text-obsidian",
              )}
            >
              →
            </div>
          </Link>
        </div>

        {images.length > 1 && (
          <div className="absolute top-4 right-4 flex gap-1.5">
            {images.map((image, index) => (
              <span
                key={`${image}-${index}`}
                className={cn(
                  "h-1 rounded-full bg-white/80 shadow-sm transition-all duration-500",
                  index === activeImageIndex ? "w-6" : "w-1.5 opacity-60",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ServiceCards({
  services,
  title = "Dịch vụ cao cấp",
  subtitle = "Dịch vụ của chúng tôi",
}: ServiceCardsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Side padding (px) for the scroll area on mobile — controls how much card
  // is visible on the edges so it never feels glued to the screen.
  const SIDE_PAD = 24; // px — matches the spacer divs below

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, children } = scrollRef.current;
    // Find card width from the first real card (index 1 because of leading spacer)
    const firstCard = children[1] as HTMLElement | undefined;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 16; // gap-4 = 16px
    const index = Math.round(scrollLeft / cardWidth);
    if (index !== activeIndex && index >= 0 && index < services.length) {
      setActiveIndex(index);
    }
  };

  const scrollTo = (idx: number) => {
    if (!scrollRef.current) return;
    const firstCard = scrollRef.current.children[1] as HTMLElement | undefined;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 16;
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setActiveIndex(idx);
  };

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-48">
      <div className="mx-auto max-w-[1600px]">
        {/* ── Header ── */}
        <div className="mb-10 px-6 sm:px-16 md:mb-24 lg:px-32 xl:px-48">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-obsidian" />
            <span className="font-bold text-[11px] text-ash uppercase tracking-[0.4em]">
              {subtitle}
            </span>
          </div>
          <h2 className="font-light font-serif text-6xl text-obsidian italic leading-[0.85] tracking-tighter md:text-9xl">
            {title}
          </h2>
        </div>

        {/* ── Mobile: horizontal scroll ── */}
        <div className="md:hidden">
          {/*
            scroll-padding-left ensures the snapped card aligns to the
            same offset as the leading spacer, so it never hugs the edge.
          */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
            style={{ scrollPaddingLeft: SIDE_PAD }}
          >
            {/* Leading spacer — gives breathing room from left edge */}
            <div
              className="flex-shrink-0"
              style={{ width: SIDE_PAD }}
              aria-hidden
            />

            {services.map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              />
            ))}

            {/* Trailing spacer — so last card doesn't snap flush to right edge */}
            <div
              className="flex-shrink-0"
              style={{ width: SIDE_PAD }}
              aria-hidden
            />
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-3.5 pb-4">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Dịch vụ ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === i
                    ? "w-12 bg-obsidian"
                    : "w-2.5 bg-obsidian/10",
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div
          className={cn(
            "hidden items-stretch gap-8 px-32 md:grid lg:px-48",
            services.length >= 4
              ? "md:grid-cols-2 xl:grid-cols-4"
              : "md:grid-cols-3",
          )}
        >
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* ── List summary ── */}
        <div className="mt-20 px-6 sm:px-16 lg:px-32 xl:px-48">
          <div className="mb-12 flex items-center gap-5">
            <span className="h-px w-16 bg-obsidian/10" />
            <span className="font-bold text-[11px] text-ash/40 uppercase tracking-[0.4em]">
              Bảng giá chi tiết
            </span>
          </div>
          <div className="flex flex-col border-black/5 border-b">
            {services.map((service, i) => (
              <Link
                key={i}
                href={service.href ?? "/pricing"}
                className="group flex items-center gap-6 border-black/5 border-t py-8 transition-all hover:bg-ash/[0.01] md:gap-8 md:py-10"
              >
                <div className="flex size-14 flex-shrink-0 items-center justify-center rounded-[20px] border border-black/5 bg-ash/5 text-lg text-obsidian transition-all duration-700 group-hover:bg-obsidian group-hover:text-white md:size-16 md:text-xl">
                  {service.index ?? String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-[18px] text-obsidian tracking-tighter md:text-[22px]">
                    {service.title}
                  </div>
                  <div className="mt-1.5 font-light text-[13px] text-ash/50 md:text-[14px]">
                    {service.meta || "Xem chi tiết dịch vụ"}
                  </div>
                </div>
                <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-obsidian/10 text-obsidian text-xl transition-all duration-500 group-hover:bg-obsidian group-hover:text-white md:size-12">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Deco */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[0.015]">
        <div className="absolute top-[10%] right-[-10%] aspect-square w-[50vw] rounded-full border border-obsidian" />
      </div>
    </section>
  );
}
