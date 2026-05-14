'use client';

import { SectionTitle } from '@/components/shared/section-title';
import type { Testimonial } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface TestimonialsProps {
  items: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-[3px] mb-5" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13" height="13" viewBox="0 0 16 16"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke={i < rating ? 'none' : 'currentColor'}
          strokeWidth="1.5"
          aria-hidden="true"
          className={i < rating ? 'text-[#C9A96E] opacity-90' : 'text-muted/20'}
        >
          <path d="M8 1l1.854 3.756L14 5.411l-3 2.923.708 4.131L8 10.354 4.292 12.465 5 8.334 2 5.411l4.146-.655L8 1z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex-shrink-0 border border-border/40 bg-muted/30 flex items-center justify-center text-[11px] font-medium tracking-wider text-muted-foreground">
      {src
        ? <img src={src} alt={name} className="w-full h-full object-cover grayscale-[30%]" loading="lazy" />
        : initials
      }
    </div>
  );
}

function serviceLabel(service?: string) {
  if (service === 'photography') return 'Chụp ảnh';
  if (service === 'videography') return 'Quay phim';
  return 'Đám cưới';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Testimonials({ items }: TestimonialsProps) {
  if (!items.length) return null;

  return (
    <section className="py-24 md:py-40 bg-luxury" aria-label="Đánh giá từ khách hàng">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <motion.div 
          className="space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-label-luxury text-gold">Phản hồi từ các cặp đôi</p>
          <h2 className="text-display font-cormorant font-light text-obsidian leading-tight">
            Những câu chuyện tình yêu<br />& <em className="italic">Sự tin tưởng</em>
          </h2>
        </motion.div>

        <motion.div
          className="flex overflow-x-auto gap-8 pb-12 mt-16 snap-x snap-mandatory scrollbar-hide"
          role="list"
          aria-label="Đánh giá từ khách hàng"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map(t => (
            <motion.article
              key={t.id}
              variants={itemVariants}
              role="listitem"
              className="relative flex-shrink-0 w-full md:w-[480px] p-12 snap-start bg-luxury-surface border border-black/5 rounded-none transition-all duration-700 hover:bg-white hover:shadow-luxury group"
            >
              <span
                className="absolute top-6 left-10 font-cormorant text-[8rem] leading-none text-gold/[0.08] select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className="flex gap-1 mb-8" aria-label={`${t.rating} trên 5 sao`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="14" height="14" viewBox="0 0 16 16"
                    fill={i < t.rating ? 'currentColor' : 'none'}
                    stroke={i < t.rating ? 'none' : 'currentColor'}
                    strokeWidth="1.2"
                    aria-hidden="true"
                    className={cn("transition-colors duration-500", i < t.rating ? 'text-gold' : 'text-mist')}
                  >
                    <path d="M8 1l1.854 3.756L14 5.411l-3 2.923.708 4.131L8 10.354 4.292 12.465 5 8.334 2 5.411l4.146-.655L8 1z" />
                  </svg>
                ))}
              </div>

              <blockquote className="relative z-10 font-cormorant text-[1.25rem] font-light italic leading-relaxed text-obsidian mb-10">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              <div className="w-10 h-px bg-gold/20 mb-8" />

              <footer className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white border border-black/5 flex items-center justify-center text-[10px] font-bold tracking-[0.2em] text-ash shadow-sm">
                  {t.couple_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-obsidian leading-tight">
                    {t.couple_name}
                  </p>
                  {t.wedding_year && (
                    <p className="text-[10px] font-normal tracking-[0.2em] uppercase text-mist mt-1.5">
                      {serviceLabel(t.service ?? "")} · {t.wedding_year}
                    </p>
                  )}
                </div>
              </footer>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}