'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Portfolio } from '@/types';
import { cn } from '@/lib/utils';
import { motion, type Variants } from 'motion/react';

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
  vintage: 'Cổ điển',
  modern: 'Hiện đại',
  fineart: 'Nghệ thuật',
  romantic: 'Lãng mạn',
};

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  if (!items.length) return null;

  return (
    <section className="py-24 md:py-40 bg-white overflow-hidden" aria-label="Featured portfolios">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
             <div className="flex items-center justify-center gap-3 mb-4">
                <span className="w-8 h-px bg-obsidian/20" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-obsidian/50">Portfolio</span>
                <span className="w-8 h-px bg-obsidian/20" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif italic font-light text-obsidian tracking-tight">
              Những câu chuyện <em className="not-italic">tiêu biểu</em>
            </h2>
            <p className="max-w-xl mx-auto text-ash font-light leading-relaxed text-sm md:text-base">
              Mỗi bộ ảnh là một hành trình cảm xúc, lưu giữ những khoảnh khắc hạnh phúc nhất.
            </p>
          </motion.div>
        </div>

        {/* ── Grid Layout (Matching Masonry Style of Portfolio Page) ── */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {items.slice(0, 6).map((item, i) => (
            <motion.div key={item.id} variants={itemVariants} className="break-inside-avoid">
              <Link
                href={`/portfolio/${item.slug}`}
                className="group relative block overflow-hidden rounded-[24px] md:rounded-[32px] border border-black/5 bg-ash/5"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content Reveal */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-4 h-px bg-white/40" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/70">
                        {STYLE_LABELS[item.style] ?? item.style}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif italic font-light text-white leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/50">Xem album</span>
                      <span className="text-white/60">→</span>
                    </div>
                  </div>
                </div>

                {/* Animated Bottom Border */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-obsidian group-hover:w-full transition-all duration-700" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── View All ── */}
        <div className="mt-20 md:mt-32 flex justify-center">
          <Link
            href="/portfolio"
            className="
              inline-flex items-center gap-4
              text-[10px] font-bold uppercase tracking-[0.3em]
              text-obsidian font-sans
              border border-black/10 px-12 py-5 rounded-full
              hover:bg-obsidian hover:text-white
              transition-all duration-500 shadow-sm
            "
          >
            Khám phá tất cả tác phẩm
            <span className="text-lg" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}