"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export interface FeaturedWork {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  /** 'portrait' = 3/4, 'landscape' = 4/3, 'square' = 1/1 */
  orientation?: "portrait" | "landscape" | "square";
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
function WorkCard({
  work,
  colIndex,
}: {
  work: FeaturedWork;
  colIndex: number;
}) {
  const orientation = work.orientation ?? "portrait";
  const aspectClass =
    orientation === "portrait"
      ? "aspect-[3/4]"
      : orientation === "landscape"
        ? "aspect-[4/3]"
        : "aspect-square";

  const inner = (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-ash/5 ${aspectClass}`}
    >
      {work.src ? (
        <Image
          src={work.src}
          alt={work.alt || "Featured work"}
          fill
          className="pointer-events-none select-none object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          draggable={false}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[9px] text-ash/30 uppercase tracking-[0.3em]">
            No Image
          </span>
        </div>
      )}

      {/* Scrim */}
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)",
        }}
      />

      {/* Inset ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 ring-inset" />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 translate-y-1 px-6 pt-10 pb-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        {work.category && (
          <span className="mb-2 inline-block font-extrabold text-[9px] text-white/55 uppercase tracking-[0.32em] transition-colors duration-500 group-hover:text-white/75">
            {work.category}
          </span>
        )}
        {work.title && (
          <h3 className="font-light font-serif text-lg text-white italic leading-[1.25] md:text-xl lg:text-2xl">
            {work.title}
          </h3>
        )}
      </div>

      {/* Arrow chip */}
      {work.href && (
        <div className="absolute top-5 right-5 flex size-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-sm text-white leading-none">↗</span>
        </div>
      )}
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 as const },
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: colIndex * 0.08,
    },
  };

  if (work.href) {
    return (
      <motion.div {...motionProps}>
        <Link
          href={work.href}
          className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/40"
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
  title = "Tác phẩm tiêu biểu",
  subtitle = "Portfolio",
  ctaLabel = "Khám phá tất cả tác phẩm",
  ctaHref = "/portfolio",
}: FeaturedWorksProps) {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-36">
      {/* ── Background decoration ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large ring — top-left */}
        <div className="absolute -top-[12%] -left-[8%] aspect-square w-[40vw] max-w-[560px] rounded-full border border-obsidian/[0.04]" />
        {/* Small ring — bottom-right */}
        <div className="absolute -right-[6%] -bottom-[8%] aspect-square w-[28vw] max-w-[400px] rounded-full border border-obsidian/[0.035]" />
        {/* Subtle noise texture via SVG filter — optional */}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-14">
        {/* ── Header ── */}
        <motion.div
          className="mb-12 flex flex-col gap-10 md:mb-28 md:flex-row md:items-end md:justify-between"
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
              <span className="font-bold text-[10px] text-obsidian/45 uppercase tracking-[0.32em]">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-light font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-obsidian italic leading-[1.1] tracking-tight">
              {title}
            </h2>
          </div>

          {/* Right: CTA — desktop */}
          <Link
            href={ctaHref}
            className="group hidden shrink-0 items-center gap-3 self-end pb-1 md:inline-flex"
            aria-label={ctaLabel}
          >
            <span className="relative font-bold text-[11px] text-obsidian uppercase tracking-[0.28em]">
              {ctaLabel}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-obsidian transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </span>
            <span className="flex size-[42px] items-center justify-center rounded-full border border-obsidian/15 text-base text-obsidian transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-obsidian group-hover:bg-obsidian group-hover:text-white">
              →
            </span>
          </Link>
        </motion.div>

        {/* ── Masonry grid — explicit flex columns so aspect-ratio is always respected ── */}
        <div className="hidden items-start gap-5 md:gap-7 lg:flex">
          {splitIntoColumns(works, 3).map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-5 md:gap-7">
              {col.map((work, i) => (
                <WorkCard
                  key={work.href ?? `${work.src}-${i}`}
                  work={work}
                  colIndex={ci}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="hidden items-start gap-5 sm:flex lg:hidden">
          {splitIntoColumns(works, 2).map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-5">
              {col.map((work, i) => (
                <WorkCard
                  key={work.href ?? `${work.src}-${i}`}
                  work={work}
                  colIndex={ci}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 sm:hidden">
          {works.map((work, i) => (
            <WorkCard
              key={work.href ?? `${work.src}-${i}`}
              work={work}
              colIndex={0}
            />
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
            <span className="relative font-bold text-[10px] uppercase tracking-[0.28em]">
              {ctaLabel}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-obsidian transition-transform duration-500 group-hover:scale-x-100" />
            </span>
            <span className="flex size-[42px] items-center justify-center rounded-full border border-obsidian/15 text-base transition-all duration-500 group-hover:bg-obsidian group-hover:text-white">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
