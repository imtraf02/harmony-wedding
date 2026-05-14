'use client';

import Link from 'next/link';
import Image from 'next/image';
import { SectionTitle } from '@/components/shared/section-title';
import type { Portfolio } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface FeaturedPortfolioProps {
  items: Portfolio[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  if (!items.length) return null;

  return (
    <section className="py-24 md:py-40 bg-obsidian text-ivory overflow-hidden" aria-label="Featured portfolio">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <motion.div 
          className="space-y-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="text-label-luxury text-gold">Tác phẩm tiêu biểu</p>
          <h2 className="text-display font-cormorant font-light text-ivory">Những câu chuyện <em className="italic">nổi bật</em></h2>
          <p className="text-ivory/40 font-light leading-relaxed max-w-xl">
            Cùng điểm lại những khoảnh khắc hạnh phúc mà chúng tôi đã có vinh dự được đồng hành và lưu giữ.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:[grid-template-columns:2fr_1fr_1fr] md:[grid-template-rows:1fr_1fr] gap-[3px] h-auto md:h-[700px] mt-14"
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.slice(0, 5).map((item, i) => (
            <motion.div 
              key={item.id} 
              variants={itemVariants}
              className={cn(
                i === 0 ? 'md:col-start-1 md:row-start-1 md:row-end-3' : ''
              )}
            >
              <Link
                href={`/portfolio/${item.slug}`}
                role="listitem"
                aria-label={`Xem portfolio: ${item.title}`}
                className={cn(
                  'relative overflow-hidden group bg-obsidian/50 block w-full h-full',
                  'aspect-[4/5] md:aspect-auto md:h-full',
                  'after:absolute after:inset-0 after:border after:border-gold/0',
                  'after:transition-all after:duration-700 hover:after:border-gold/20'
                )}
              >
                {/* Image */}
                <div className="absolute inset-0 transition-transform duration-[1500ms] cubic-bezier(0.2, 1, 0.3, 1) group-hover:scale-[1.08]">
                  {item.cover_image ? (
                    <Image
                      src={item.cover_image}
                      alt={item.title}
                      fill
                      priority={i === 0}
                      sizes={
                        i === 0
                          ? '(max-width: 768px) 100vw, 50vw'
                          : '(max-width: 768px) 100vw, 25vw'
                      }
                      className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-obsidian flex items-center justify-center text-gold/20 text-[10px] tracking-[0.3em] uppercase">
                      No Image
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div
                  className="
                    absolute inset-0 flex flex-col justify-end p-10
                    bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-all duration-700 translate-y-4 group-hover:translate-y-0
                  "
                >
                  {item.style && (
                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold mb-2 font-jost">
                      {item.style}
                    </p>
                  )}
                  <h3 className="text-headline font-cormorant font-light text-ivory leading-tight">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/portfolio"
            className="
              inline-flex items-center gap-3
              text-[10px] font-bold uppercase tracking-[0.25em]
              text-gold font-jost
              border border-gold/30 px-12 py-5 rounded-none
              hover:bg-gold hover:text-obsidian hover:border-gold
              transition-all duration-500 shadow-luxury
            "
          >
            Xem tất cả tác phẩm
            <span className="text-sm transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}