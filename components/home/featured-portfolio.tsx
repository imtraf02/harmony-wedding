"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Portfolio } from "@/types";

interface FeaturedPortfolioProps {
  items: Portfolio[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const STYLE_LABELS: Record<string, string> = {
  vintage: "Cổ điển",
  modern: "Hiện đại",
  fineart: "Nghệ thuật",
  romantic: "Lãng mạn",
};

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  if (!items.length) return null;

  return (
    <section
      className="overflow-hidden bg-white py-24 md:py-40"
      aria-label="Featured portfolios"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* ── Header ── */}
        <div className="mb-16 text-center md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-obsidian/20" />
              <span className="font-bold text-[10px] text-obsidian/50 uppercase tracking-[0.3em]">
                Portfolio
              </span>
              <span className="h-px w-8 bg-obsidian/20" />
            </div>
            <h2 className="font-light font-serif text-4xl text-obsidian italic tracking-tight md:text-6xl">
              Những câu chuyện <em className="not-italic">tiêu biểu</em>
            </h2>
            <p className="mx-auto max-w-xl font-light text-ash text-sm leading-relaxed md:text-base">
              Mỗi bộ ảnh là một hành trình cảm xúc, lưu giữ những khoảnh khắc
              hạnh phúc nhất.
            </p>
          </motion.div>
        </div>

        {/* ── Grid Layout (Matching Masonry Style of Portfolio Page) ── */}
        <motion.div
          className="columns-1 gap-6 space-y-6 sm:columns-2 md:gap-8 md:space-y-8 lg:columns-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.slice(0, 6).map((item, i) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="break-inside-avoid"
            >
              <Link
                href={`/portfolio/${item.slug}`}
                className="group relative block overflow-hidden rounded-[24px] border border-black/5 bg-ash/5 md:rounded-[32px]"
              >
                {/* Image container with fixed 3/4 ratio - ensures consistent height in columns */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.cover_image}
                    alt={item.title}
                    fill
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content Reveal */}
                  <div className="absolute inset-0 flex translate-y-3 flex-col justify-end p-8 transition-all duration-500 group-hover:translate-y-0">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="h-px w-4 bg-white/40" />
                      <span className="font-bold text-[9px] text-white/70 uppercase tracking-[0.25em]">
                        {STYLE_LABELS[item.style] ?? item.style}
                      </span>
                    </div>
                    <h3 className="font-light font-serif text-2xl text-white italic leading-tight md:text-3xl">
                      {item.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      <span className="font-bold text-[8px] text-white/50 uppercase tracking-[0.2em]">
                        Xem album
                      </span>
                      <span className="text-white/60">→</span>
                    </div>
                  </div>
                </div>

                {/* Animated Bottom Border */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-obsidian transition-all duration-700 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All ── */}
        <div className="mt-20 flex justify-center md:mt-32">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-4 rounded-full border border-black/10 px-12 py-5 font-bold font-sans text-[10px] text-obsidian uppercase tracking-[0.3em] shadow-sm transition-all duration-500 hover:bg-obsidian hover:text-white"
          >
            Khám phá tất cả tác phẩm
            <span className="text-lg" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
