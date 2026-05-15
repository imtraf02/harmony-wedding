'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export interface Testimonial {
  /** Avatar of the couple */
  src?: string;
  alt?: string;
  /** e.g. "Minh & Trang" */
  couple: string;
  /** e.g. "TP. Hồ Chí Minh · Tháng 3, 2025" */
  meta?: string;
  quote: string;
  /** 1–5 */
  rating?: number;
  /** Service they used */
  service?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

// ── Star ─────────────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={`w-3 h-3 ${i < count ? 'text-gold' : 'text-obsidian/15'}`}
          fill="currentColor"
        >
          <path d="M6 0l1.35 4.15H12L8.33 6.72l1.35 4.15L6 8.4l-3.68 2.47 1.35-4.15L0 4.15h4.65z" />
        </svg>
      ))}
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
function TestimonialCard({
  t,
  index,
}: {
  t: Testimonial;
  index: number;
}) {
  return (
    <motion.div
      className="relative flex flex-col justify-between gap-6
                 bg-white/70 backdrop-blur-sm border border-white
                 rounded-2xl md:rounded-[1.5rem] p-6 md:p-8 shadow-lg shadow-obsidian/5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.75,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      }}
    >
      {/* ── Decorative quote mark ── */}
      <span
        className="absolute top-5 right-6 text-[72px] leading-none font-serif text-gold/10
                   select-none pointer-events-none"
        aria-hidden
      >
        "
      </span>

      {/* ── Top: rating + service tag ── */}
      <div className="flex items-center justify-between">
        <Stars count={t.rating ?? 5} />
        {t.service && (
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold/80 bg-gold/8 px-2.5 py-1 rounded-full border border-gold/20">
            {t.service}
          </span>
        )}
      </div>

      {/* ── Quote ── */}
      <blockquote className="flex-1 text-sm md:text-[15px] text-obsidian/75 font-light leading-relaxed italic">
        "{t.quote}"
      </blockquote>

      {/* ── Author ── */}
      <div className="flex items-center gap-3 pt-4 border-t border-obsidian/8">
        {t.src ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-md flex-shrink-0">
            <Image src={t.src} alt={t.alt ?? t.couple} fill className="object-cover" />
          </div>
        ) : (
          // Fallback monogram
          <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 ring-2 ring-white">
            <span className="text-[11px] font-bold text-gold uppercase tracking-wider">
              {t.couple.split('&')[0]?.trim()[0]}{t.couple.split('&')[1]?.trim()[0]}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-obsidian tracking-tight truncate">
            {t.couple}
          </p>
          {t.meta && (
            <p className="text-[10px] text-smoke/60 font-light mt-0.5 truncate">{t.meta}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export function Testimonials({
  testimonials,
  title = 'Phản hồi từ các cặp đôi',
  subtitle = 'Cảm nhận',
}: TestimonialsProps) {
  // Split into columns for masonry feel on desktop
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative py-20 md:py-32 bg-luxury overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <motion.div
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-px bg-gold/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {subtitle}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-light text-obsidian leading-tight tracking-tight">
              {title}
            </h2>
          </div>

          {/* Total count badge */}
          <motion.div
            className="flex items-center gap-3 md:pb-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-light text-obsidian tracking-tight">
                {testimonials.length}
                <span className="text-gold">+</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-smoke/50 mt-0.5">
                cặp đôi hài lòng
              </p>
            </div>
            <div className="w-px h-10 bg-obsidian/10" />
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-light text-obsidian tracking-tight">
                5.0<span className="text-gold text-lg">★</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-smoke/50 mt-0.5">
                đánh giá trung bình
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Masonry 3-col desktop, 1-col mobile ── */}
        {/* Desktop: 3 independent columns so cards don't have equal heights */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 items-start">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-5">
              {col.map((t, ti) => (
                <TestimonialCard key={ti} t={t} index={ci + ti * 3} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col gap-4 md:hidden">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>

      {/* ── Bg deco ── */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden opacity-25">
        <div className="absolute top-[5%] right-[-6%] w-[34%] aspect-square border border-gold/10 rounded-full" />
        <div className="absolute bottom-[8%] left-[-8%] w-[42%] aspect-square border border-gold/8 rounded-full" />
      </div>
    </section>
  );
}