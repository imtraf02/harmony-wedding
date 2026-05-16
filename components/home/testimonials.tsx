"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

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
            "h-3.5 w-3.5 transition-colors duration-500",
            i < count ? "text-obsidian" : "text-obsidian/10",
          )}
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  index,
  className,
}: {
  t: Testimonial;
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "group relative flex h-full min-h-[280px] flex-col justify-between",
        "rounded-[2rem] border border-black/[0.03] bg-white p-8 md:p-10",
        "shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)]",
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Editorial Quote Mark */}
      <div className="pointer-events-none absolute top-8 right-10 select-none text-obsidian/10 transition-colors duration-700 group-hover:text-obsidian/20">
        <svg width="48" height="38" viewBox="0 0 48 38" fill="currentColor">
          <path d="M0 38V19.8649C0 13.3441 1.13514 8.44144 3.40541 5.15676C5.67568 1.87207 9.40541 0.151351 14.5946 0V7.2973C11.6757 7.2973 9.72973 8.35676 8.75676 10.4757C7.78378 12.5946 7.2973 15.7297 7.2973 19.8811H14.5946V38H0ZM33.4054 38V19.8649C33.4054 13.3441 34.5405 8.44144 36.8108 5.15676C39.0811 1.87207 42.8108 0.151351 48 0V7.2973C45.0811 7.2973 43.1351 8.35676 42.1622 10.4757C41.1892 12.5946 40.7027 15.7297 40.7027 19.8811H48V38H33.4054Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col items-start gap-4">
          {t.service && (
            <span className="inline-block rounded-full border border-obsidian/20 bg-obsidian/[0.03] px-3 py-1 font-bold text-[9px] text-obsidian/60 uppercase tracking-[0.12em]">
              {t.service}
            </span>
          )}
          <Stars count={t.rating} />
        </div>

        {/* FULL TEXT Quote - No line clamping */}
        <blockquote className="font-light font-serif text-[17px] text-obsidian italic leading-relaxed tracking-tight md:text-[20px]">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
      </div>

      <div className="relative z-10 mt-8 flex items-center gap-5 border-black/[0.04] border-t pt-8">
        <div className="relative size-12 flex-shrink-0 overflow-hidden rounded-full bg-luxury shadow-inner ring-1 ring-black/5">
          {t.src ? (
            <Image
              src={t.src}
              alt={t.couple}
              fill
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-bold text-obsidian text-xs tracking-wider">
              {t.couple
                .split("&")
                .map((n) => n.trim().charAt(0))
                .join("")}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-obsidian text-sm tracking-tight">
            {t.couple}
          </h4>
          {t.meta && (
            <p className="mt-1 font-medium text-[11px] text-smoke/50 uppercase tracking-widest">
              {t.meta}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials({
  testimonials,
  title = "Phản hồi từ các cặp đôi",
  subtitle = "Cảm nhận",
}: TestimonialsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Split into columns for masonry feel on desktop
  const col1 = testimonials.filter((_, i) => i % 3 === 0);
  const col2 = testimonials.filter((_, i) => i % 3 === 1);
  const col3 = testimonials.filter((_, i) => i % 3 === 2);

  return (
    <section className="relative overflow-hidden bg-luxury py-20 md:py-36">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-[20%] -left-[10%] aspect-square w-[40%] rounded-full border border-obsidian/10" />
        <div className="absolute -right-[5%] bottom-[10%] aspect-square w-[30%] rounded-full border border-obsidian/5" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col justify-between gap-12 md:mb-24 md:flex-row md:items-end">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-obsidian" />
              <span className="font-bold text-[11px] text-obsidian uppercase tracking-[0.4em]">
                {subtitle}
              </span>
            </div>
            <h2 className="font-light font-serif text-[clamp(2.4rem,5vw,4.5rem)] text-obsidian italic leading-[1.1] tracking-tighter">
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
              <span className="font-light text-3xl text-obsidian md:text-5xl">
                {testimonials.length}
                <span className="text-obsidian">+</span>
              </span>
              <span className="mt-1 font-bold text-[10px] text-smoke/50 uppercase tracking-[0.2em]">
                Cặp đôi hài lòng
              </span>
            </div>
            <div className="hidden h-16 w-px bg-obsidian/20 md:block" />
            <div className="hidden flex-col items-end md:flex">
              <span className="font-light text-3xl text-obsidian md:text-5xl">
                5.0<span className="text-2xl text-obsidian">★</span>
              </span>
              <span className="mt-1 font-bold text-[10px] text-smoke/50 uppercase tracking-[0.2em]">
                Đánh giá trung bình
              </span>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Masonry Grid */}
        <div className="hidden grid-cols-3 items-start gap-8 lg:grid">
          {[col1, col2, col3].map((col, ci) => (
            <div
              key={ci}
              className={cn("flex flex-col gap-8", ci === 1 ? "pt-16" : "")}
            >
              {col.map((t, i) => (
                <TestimonialCard key={i} t={t} index={i + ci * 10} />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet/Mobile Layout: Horizontal Carousel */}
        <div className="-mx-6 sm:-mx-8 lg:hidden">
          <div
            ref={scrollRef}
            className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-12 sm:px-8"
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="w-[85vw] flex-shrink-0 snap-center sm:w-[450px]"
              >
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <motion.div
          className="mt-16 text-center md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-light text-[13px] text-smoke/60 italic">
            &ldquo;Mỗi câu chuyện là một nguồn cảm hứng bất tận để chúng tôi
            hoàn thiện hơn.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
