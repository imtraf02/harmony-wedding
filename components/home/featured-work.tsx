'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface FeaturedWork {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  /** 'portrait' = 2/3, 'landscape' = 3/2, 'square' = 1/1 */
  orientation?: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
  href?: string;
}

interface FeaturedWorksProps {
  works: FeaturedWork[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// ── Single card ───────────────────────────────────────────────────────────────
function WorkCard({ work, index, colIndex }: { work: FeaturedWork; index: number; colIndex: number }) {
  const orientation = work.orientation ?? 'portrait';

  // paddingBottom trick = the only reliable way to enforce aspect ratio
  // inside a flex column where height is not constrained by parent.
  const paddingBottom =
    orientation === 'portrait' ? '150%'   // 2:3
      : orientation === 'landscape' ? '66.666%' // 3:2
        : '100%';                                 // 1:1

  const inner = (
    // Outer: sets the aspect ratio via padding-bottom hack
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom }}>
      {/* Inner: absolutely fills the padding space */}
      <div className="absolute inset-0 bg-ash/5">
        {work.src ? (
          <Image
            src={work.src}
            alt={work.alt || 'Featured work'}
            fill
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              group-hover:scale-[1.06] pointer-events-none select-none"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-ash/30">No Image</span>
          </div>
        )}

        {/* Scrim */}
        <div
          className="absolute inset-0 transition-opacity duration-700 opacity-70 group-hover:opacity-90"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)' }}
        />

        {/* Inset ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />

        {/* Text */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 pt-10 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {work.category && (
            <span className="mb-2 inline-block text-[9px] font-extrabold uppercase tracking-[0.32em] text-white/55 group-hover:text-white/75 transition-colors duration-500">
              {work.category}
            </span>
          )}
          {work.title && (
            <h3 className="font-serif italic font-light leading-[1.25] text-white text-lg md:text-xl lg:text-2xl">
              {work.title}
            </h3>
          )}
        </div>

        {/* Arrow chip */}
        {work.href && (
          <div className="absolute top-5 right-5 size-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500">
            <span className="text-white text-sm leading-none">↗</span>
          </div>
        )}
      </div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 as const },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: colIndex * 0.08 },
  };

  if (work.href) {
    return (
      <motion.div {...motionProps}>
        <Link
          href={work.href}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/40 rounded-2xl"
          aria-label={work.title || work.alt}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div className="group" {...motionProps}>
      {inner}
    </motion.div>
  );
}

// ── Split works into N columns (left-to-right fill) ───────────────────────────
function splitIntoColumns<T>(items: T[], numCols: number): T[][] {
  const cols: T[][] = Array.from({ length: numCols }, () => []);
  items.forEach((item, i) => cols[i % numCols].push(item));
  return cols;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function FeaturedWorks({
  works,
  title = 'Tác phẩm tiêu biểu',
  subtitle = 'Portfolio',
  ctaLabel = 'Khám phá tất cả tác phẩm',
  ctaHref = '/portfolio',
}: FeaturedWorksProps) {
  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">

      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large ring — top-left */}
        <div
          className="absolute -top-[12%] -left-[8%] w-[40vw] max-w-[560px] aspect-square
            rounded-full border border-obsidian/[0.04]"
        />
        {/* Small ring — bottom-right */}
        <div
          className="absolute -bottom-[8%] -right-[6%] w-[28vw] max-w-[400px] aspect-square
            rounded-full border border-obsidian/[0.035]"
        />
        {/* Subtle noise texture via SVG filter — optional */}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-14">

        {/* ── Header ── */}
        <motion.div
          className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: label + title */}
          <div className="space-y-5">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center gap-2">
                <span className="block h-px w-10 bg-obsidian/20" />
                <span className="block size-1.5 rounded-full bg-obsidian/25" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-obsidian/45">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif italic font-light text-obsidian leading-[1.1] tracking-tight
              text-[clamp(2.4rem,5vw,4.5rem)]">
              {title}
            </h2>
          </div>

          {/* Right: CTA — desktop */}
          <Link
            href={ctaHref}
            className="group hidden md:inline-flex items-center gap-3 flex-shrink-0 self-end pb-1"
            aria-label={ctaLabel}
          >
            <span className="relative text-[11px] font-bold uppercase tracking-[0.28em] text-obsidian">
              {ctaLabel}
              <span
                className="absolute -bottom-0.5 left-0 w-full h-px bg-obsidian
                  origin-left scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
            </span>
            <span
              className="size-[42px] flex items-center justify-center rounded-full border border-obsidian/15
                text-obsidian text-base
                group-hover:bg-obsidian group-hover:text-white group-hover:border-obsidian
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* ── Masonry grid — explicit flex columns so aspect-ratio is always respected ── */}
        <div className="hidden lg:flex gap-5 md:gap-7 items-start">
          {splitIntoColumns(works, 3).map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-5 md:gap-7">
              {col.map((work, i) => (
                <WorkCard key={i} work={work} index={i} colIndex={ci} />
              ))}
            </div>
          ))}
        </div>
        <div className="hidden sm:flex lg:hidden gap-5 items-start">
          {splitIntoColumns(works, 2).map((col, ci) => (
            <div key={ci} className="flex-1 flex flex-col gap-5">
              {col.map((work, i) => (
                <WorkCard key={i} work={work} index={i} colIndex={ci} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex sm:hidden flex-col gap-5">
          {works.map((work, i) => (
            <WorkCard key={i} work={work} index={i} colIndex={0} />
          ))}
        </div>

        {/* ── CTA — mobile ── */}
        <motion.div
          className="mt-14 flex justify-center md:hidden"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-3 text-obsidian"
          >
            <span className="relative text-[10px] font-bold uppercase tracking-[0.28em]">
              {ctaLabel}
              <span
                className="absolute -bottom-0.5 left-0 w-full h-px bg-obsidian
                  origin-left scale-x-0 group-hover:scale-x-100
                  transition-transform duration-500"
              />
            </span>
            <span
              className="size-[42px] flex items-center justify-center rounded-full border border-obsidian/15
                group-hover:bg-obsidian group-hover:text-white transition-all duration-500 text-base"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}