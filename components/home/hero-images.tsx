'use client';

import { motion, Variants } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroImageItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  tag?: string;
  cta_label?: string;
  cta_href?: string;
}

interface HeroImagesProps {
  items: HeroImageItem[];
}

// Variants cho từng row
const rowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const imageVariants = (isEven: boolean): Variants => ({
  hidden: { opacity: 0, x: isEven ? 80 : -80, scale: 0.97 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
});

const textVariants = (isEven: boolean): Variants => ({
  hidden: { opacity: 0, x: isEven ? -40 : 40, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
});

// Variants cho từng dòng text bên trong (tag, title, desc, cta)
const textChildVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

const textBlockVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export function HeroImages({ items }: HeroImagesProps) {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-luxury">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="space-y-8 md:space-y-48">
          {items.map((item, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={index}
                className={cn(
                  'flex items-center gap-4 md:gap-24',
                  isEven ? 'flex-row-reverse' : 'flex-row'
                )}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* ── Image side ── */}
                <motion.div
                  className={cn(
                    'relative aspect-[3/4] overflow-hidden shadow-2xl flex-shrink-0',
                    'w-[55%] md:w-auto md:flex-1',
                    'rounded-2xl md:rounded-[2rem]',
                    'ring-4 ring-white'
                  )}
                  variants={imageVariants(isEven)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                    sizes="(max-width: 768px) 55vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-obsidian/5" />
                </motion.div>

                {/* ── Text side ── */}
                <motion.div
                  className={cn(
                    'flex flex-col justify-center',
                    'w-[45%] md:w-auto md:flex-1',
                    isEven ? 'pr-0 pl-2 md:pl-0' : 'pl-0 pr-2 md:pr-0'
                  )}
                  variants={textVariants(isEven)}
                >
                  {/* Stagger các dòng text bên trong */}
                  <motion.div
                    className={cn(
                      "flex flex-col",
                      isEven ? "items-end text-right" : "items-start text-left"
                    )}
                    variants={textBlockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {/* Tag — desktop */}
                    {item.tag && (
                      <motion.div
                        className={cn(
                          "hidden md:flex items-center gap-3 mb-6",
                          isEven ? "flex-row-reverse" : "flex-row"
                        )}
                        variants={textChildVariants}
                      >
                        <span className="w-6 h-px bg-gold/50" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                          {item.tag}
                        </span>
                      </motion.div>
                    )}

                    {/* Tag — mobile */}
                    {item.tag && (
                      <motion.span
                        className="md:hidden text-[9px] font-bold uppercase tracking-[0.2em] text-gold mb-1.5 block"
                        variants={textChildVariants}
                      >
                        {item.tag}
                      </motion.span>
                    )}

                    <motion.h2
                      className="text-base sm:text-xl md:text-6xl font-sans font-light text-obsidian mb-2 md:mb-8 leading-[1.15] tracking-tight"
                      variants={textChildVariants}
                    >
                      {item.title}
                    </motion.h2>

                    <motion.p
                      className={cn(
                        "text-[11px] sm:text-sm md:text-lg text-smoke font-light leading-relaxed mb-3 md:mb-10 md:max-w-md line-clamp-3 md:line-clamp-none",
                        isEven ? "md:text-right" : "md:text-left"
                      )}
                      variants={textChildVariants}
                    >
                      {item.description}
                    </motion.p>

                    <motion.div variants={textChildVariants}>
                      <Link
                        href={item.cta_href || "/portfolio"}
                        className="group inline-flex items-center gap-2 md:gap-4 text-obsidian"
                      >
                        <span className={cn(
                          "relative hidden sm:inline text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em]",
                          isEven ? "order-2" : ""
                        )}>
                          {item.cta_label || "Xem chi tiết"}
                          <span className={cn(
                            "absolute -bottom-1 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500",
                            isEven ? "right-0 origin-right" : "left-0 origin-left"
                          )} />
                        </span>
                        <span className={cn(
                          "size-6 md:size-8 flex items-center justify-center border border-obsidian/10 rounded-full group-hover:bg-gold group-hover:border-gold group-hover:text-obsidian transition-all duration-500 text-xs md:text-base",
                          isEven ? "order-1" : ""
                        )}>
                          →
                        </span>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden opacity-30">
        <div className="absolute top-[10%] right-[-5%] w-[40%] aspect-square border border-gold/10 rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] aspect-square border border-gold/5 rounded-full" />
      </div>
    </section>
  );
}