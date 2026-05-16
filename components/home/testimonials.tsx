'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface Testimonial {
  src?: string;
  alt?: string;
  couple: string;
  meta?: string;
  quote: string;
  rating?: number;
  service?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn(
            "w-3.5 h-3.5 transition-colors duration-500",
            i < count ? "text-gold" : "text-obsidian/10"
          )}
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index, className }: { t: Testimonial; index: number; className?: string }) {
  return (
    <motion.div
      className={cn(
        "group relative flex flex-col justify-between h-full min-h-[280px]",
        "bg-white border border-black/[0.03] rounded-[2rem] p-8 md:p-10",
        "shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)]",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Editorial Quote Mark */}
      <div className="absolute top-8 right-10 text-gold/10 select-none pointer-events-none group-hover:text-gold/20 transition-colors duration-700">
        <svg width="48" height="38" viewBox="0 0 48 38" fill="currentColor">
          <path d="M0 38V19.8649C0 13.3441 1.13514 8.44144 3.40541 5.15676C5.67568 1.87207 9.40541 0.151351 14.5946 0V7.2973C11.6757 7.2973 9.72973 8.35676 8.75676 10.4757C7.78378 12.5946 7.2973 15.7297 7.2973 19.8811H14.5946V38H0ZM33.4054 38V19.8649C33.4054 13.3441 34.5405 8.44144 36.8108 5.15676C39.0811 1.87207 42.8108 0.151351 48 0V7.2973C45.0811 7.2973 43.1351 8.35676 42.1622 10.4757C41.1892 12.5946 40.7027 15.7297 40.7027 19.8811H48V38H33.4054Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col items-start gap-4">
          {t.service && (
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.12em] text-gold/60 border border-gold/20 px-3 py-1 rounded-full bg-gold/[0.03]">
              {t.service}
            </span>
          )}
          <Stars count={t.rating} />
        </div>

        {/* FULL TEXT Quote - No line clamping */}
        <blockquote className="text-[17px] md:text-[20px] font-serif italic font-light text-obsidian leading-relaxed tracking-tight">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <div className="relative z-10 flex items-center gap-5 pt-8 mt-8 border-t border-black/[0.04]">
        <div className="relative size-12 rounded-full overflow-hidden ring-1 ring-black/5 flex-shrink-0 bg-luxury shadow-inner">
          {t.src ? (
            <Image src={t.src} alt={t.couple} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gold font-bold text-xs tracking-wider">
              {t.couple.split('&').map(n => n.trim().charAt(0)).join('')}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-obsidian tracking-tight">{t.couple}</h4>
          {t.meta && <p className="text-[11px] text-smoke/50 font-medium uppercase tracking-widest mt-1">{t.meta}</p>}
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials({ testimonials, title = 'Phản hồi từ các cặp đôi', subtitle = 'Cảm nhận' }: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Split into columns for masonry feel on desktop
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative py-20 md:py-36 bg-luxury overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[20%] -left-[10%] w-[40%] aspect-square border border-gold/10 rounded-full" />
        <div className="absolute bottom-[10%] -right-[5%] w-[30%] aspect-square border border-gold/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 md:mb-24">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">{subtitle}</span>
            </div>
            <h2 className="text-[clamp(2.4rem,5vw,4.5rem)] font-serif italic font-light text-obsidian leading-[1.1] tracking-tighter">
              {title}
            </h2>
          </motion.div>

          <motion.div 
            className="flex items-center gap-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-start md:items-end">
              <span className="text-3xl md:text-5xl font-light text-obsidian">{testimonials.length}<span className="text-gold">+</span></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke/50 mt-1">Cặp đôi hài lòng</span>
            </div>
            <div className="w-px h-16 bg-gold/20 hidden md:block" />
            <div className="hidden md:flex flex-col items-end">
              <span className="text-3xl md:text-5xl font-light text-obsidian">5.0<span className="text-gold text-2xl">★</span></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-smoke/50 mt-1">Đánh giá trung bình</span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Masonry Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className={cn("flex flex-col gap-8", ci === 1 ? "pt-16" : "")}>
              {col.map((t, i) => (
                <TestimonialCard key={i} t={t} index={i + ci * 10} />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet/Mobile Layout: Horizontal Carousel */}
        <div className="lg:hidden -mx-6 sm:-mx-8">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 px-6 sm:px-8 pb-12 snap-x snap-mandatory scrollbar-none"
          >
            {testimonials.map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] sm:w-[450px] snap-center">
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <motion.div 
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-[13px] text-smoke/60 font-light italic">
            &ldquo;Mỗi câu chuyện là một nguồn cảm hứng bất tận để chúng tôi hoàn thiện hơn.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}