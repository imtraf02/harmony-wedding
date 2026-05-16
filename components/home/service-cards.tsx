'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Service {
  src: string;
  alt: string;
  index?: string;
  title: string;
  description: string;
  highlights?: string[];
  href?: string;
  ctaLabel?: string;
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
  return (
    <div
      className={cn(
        // Width: cố định trên mobile, tự stretch trên md+
        'flex-shrink-0 w-[78vw] max-w-[300px] md:w-auto md:max-w-none',
        'min-h-[520px] snap-start relative',
        'bg-white rounded-[32px] overflow-hidden transition-all duration-700',
        'flex flex-col cursor-pointer',
        'border-[8px] border-white ring-1 ring-black/[0.03]',
        isActive
          ? 'shadow-[0_30px_70px_rgba(0,0,0,0.10)] scale-[1.03] z-10'
          : 'shadow-[0_10px_40px_rgba(0,0,0,0.04)] opacity-90 scale-100'
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full h-[240px] overflow-hidden flex-shrink-0">
        <Image
          src={service.src}
          alt={service.alt}
          fill
          className={cn(
            'object-cover transition-transform duration-1000',
            isActive ? 'scale-110' : 'scale-100'
          )}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 35%, rgba(255,255,255,0.15) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* Body */}
      <div className="flex-1 bg-white p-7 pt-4 pb-10 flex flex-col gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-obsidian/30">
          {service.index}
        </span>

        <h3 className="font-serif italic text-[1.6rem] md:text-[1.8rem] font-light text-obsidian leading-[1.1] tracking-tighter">
          {service.title}
        </h3>

        <p className="text-[13px] text-ash font-light leading-[1.6] line-clamp-3">
          {service.description}
        </p>

        <div className="h-px bg-obsidian/10 w-16 my-1" />

        <div
          className={cn(
            'flex flex-col gap-3 overflow-hidden transition-all duration-500',
            isActive ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0'
          )}
        >
          {service.highlights?.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-5 h-px bg-obsidian/15 flex-shrink-0" />
              <span className="text-[11.5px] text-ash/80 font-light tracking-wide">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <Link
            href={service.href ?? '/pricing'}
            className="flex items-center gap-5 group/btn"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-[0.3em] text-obsidian relative',
                'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-obsidian after:transition-all after:duration-500',
                isActive ? 'after:w-full' : 'after:w-0'
              )}
            >
              {service.ctaLabel ?? 'Khám phá gói'}
            </span>
            <div
              className={cn(
                'size-10 rounded-full border flex items-center justify-center transition-all duration-500',
                isActive
                  ? 'bg-obsidian border-obsidian text-white'
                  : 'border-obsidian/10 text-obsidian'
              )}
            >
              →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function ServiceCards({
  services,
  subtitle = 'Dịch vụ của chúng tôi',
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
    scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveIndex(idx);
  };

  return (
    <section className="relative py-16 md:py-48 bg-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto">

        {/* ── Header ── */}
        <div className="mb-10 md:mb-24 px-6 sm:px-16 lg:px-32 xl:px-48">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px bg-obsidian" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-obsidian/50">
              {subtitle}
            </span>
          </div>
          <h2 className="font-serif italic text-6xl md:text-9xl font-light text-obsidian leading-[0.85] tracking-tighter">
            Dịch vụ<br className="md:hidden" /> cao cấp
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
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-none"
            style={{ scrollPaddingLeft: SIDE_PAD }}
          >
            {/* Leading spacer — gives breathing room from left edge */}
            <div className="flex-shrink-0" style={{ width: SIDE_PAD }} aria-hidden />

            {services.map((service, i) => (
              <ServiceCard
                key={i}
                service={service}
                isActive={activeIndex === i}
                onClick={() => setActiveIndex(i)}
              />
            ))}

            {/* Trailing spacer — so last card doesn't snap flush to right edge */}
            <div className="flex-shrink-0" style={{ width: SIDE_PAD }} aria-hidden />
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3.5 mt-8 pb-4">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Dịch vụ ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  activeIndex === i ? 'w-12 bg-obsidian' : 'w-2.5 bg-obsidian/10'
                )}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: 3-column grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-8 px-32 lg:px-48 items-stretch">
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
        <div className="px-6 sm:px-16 lg:px-32 xl:px-48 mt-20">
          <div className="flex items-center gap-5 mb-12">
            <span className="w-16 h-px bg-obsidian/10" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-ash/40">
              Bảng giá chi tiết
            </span>
          </div>
          <div className="flex flex-col border-b border-black/5">
            {services.map((service, i) => (
              <Link
                key={i}
                href={service.href ?? '/pricing'}
                className="group flex items-center gap-6 md:gap-8 py-8 md:py-10 border-t border-black/5 transition-all hover:bg-ash/[0.01]"
              >
                <div className="size-14 md:size-16 rounded-[20px] bg-ash/5 border border-black/5 flex items-center justify-center text-2xl md:text-3xl text-obsidian group-hover:bg-obsidian group-hover:text-white transition-all duration-700 flex-shrink-0">
                  {i === 0 ? '📷' : i === 1 ? '💍' : '🎬'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[18px] md:text-[22px] font-medium text-obsidian tracking-tighter truncate">
                    {service.title}
                  </div>
                  <div className="text-[13px] md:text-[14px] text-ash/50 font-light mt-1.5">
                    {i === 0 ? 'Từ 15,000,000 ₫' : i === 1 ? 'Từ 8,500,000 ₫' : 'Từ 1,700,000 ₫'}
                  </div>
                </div>
                <div className="size-11 md:size-12 rounded-full border border-obsidian/10 flex items-center justify-center text-xl text-obsidian group-hover:bg-obsidian group-hover:text-white transition-all duration-500 flex-shrink-0">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Deco */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.015]">
        <div className="absolute top-[10%] right-[-10%] w-[50vw] aspect-square border border-obsidian rounded-full" />
      </div>
    </section>
  );
}