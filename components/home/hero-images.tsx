"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
    <section className="relative overflow-hidden bg-luxury pt-20 pb-12 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="space-y-8 md:space-y-48">
          {items.map((item, index) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                key={index}
                className={cn(
                  "flex items-center gap-4 md:gap-24",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* ── Image side ── */}
                <motion.div
                  className={cn(
                    "relative aspect-[3/4] flex-shrink-0 overflow-hidden shadow-2xl",
                    "w-[55%] md:w-auto md:flex-1",
                    "rounded-2xl md:rounded-[2rem]",
                    "ring-4 ring-white",
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
                    "flex flex-col justify-center",
                    "w-[45%] md:w-auto md:flex-1",
                    isEven ? "pr-0 pl-2 md:pl-0" : "pr-2 pl-0 md:pr-0",
                  )}
                  variants={textVariants(isEven)}
                >
                  {/* Stagger các dòng text bên trong */}
                  <motion.div
                    className={cn(
                      "flex flex-col",
                      isEven ? "items-end text-right" : "items-start text-left",
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
                          "mb-6 hidden items-center gap-3 md:flex",
                          isEven ? "flex-row-reverse" : "flex-row",
                        )}
                        variants={textChildVariants}
                      >
                        <span className="h-px w-6 bg-black/20" />
                        <span className="font-bold text-[10px] text-charcoal uppercase tracking-[0.3em]">
                          {item.tag}
                        </span>
                      </motion.div>
                    )}

                    {/* Tag — mobile */}
                    {item.tag && (
                      <motion.span
                        className="mb-1.5 block font-bold text-[9px] text-charcoal uppercase tracking-[0.2em] md:hidden"
                        variants={textChildVariants}
                      >
                        {item.tag}
                      </motion.span>
                    )}

                    <motion.h2
                      className="mb-2 font-light font-sans text-base text-obsidian leading-[1.15] tracking-tight sm:text-xl md:mb-8 md:text-6xl"
                      variants={textChildVariants}
                    >
                      {item.title}
                    </motion.h2>

                    <motion.p
                      className={cn(
                        "mb-3 line-clamp-3 font-light text-[11px] text-smoke leading-relaxed sm:text-sm md:mb-10 md:line-clamp-none md:max-w-md md:text-lg",
                        isEven ? "md:text-right" : "md:text-left",
                      )}
                      variants={textChildVariants}
                    >
                      {item.description}
                    </motion.p>

                    <motion.div variants={textChildVariants}>
                      <Link
                        href={item.cta_href || "/portfolio"}
                        className="group inline-flex items-center gap-2 text-obsidian md:gap-4"
                      >
                        <span
                          className={cn(
                            "relative hidden font-bold text-[9px] uppercase tracking-[0.2em] sm:inline md:text-[11px] md:tracking-[0.25em]",
                            isEven ? "order-2" : "",
                          )}
                        >
                          {item.cta_label || "Xem chi tiết"}
                          <span
                            className={cn(
                              "absolute -bottom-1 h-px w-full scale-x-0 bg-black/30 transition-transform duration-500 group-hover:scale-x-100",
                              isEven
                                ? "right-0 origin-right"
                                : "left-0 origin-left",
                            )}
                          />
                        </span>
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-full border border-obsidian/10 text-xs transition-all duration-500 group-hover:scale-110 group-hover:border-obsidian group-hover:bg-obsidian group-hover:text-white md:size-8 md:text-base",
                            isEven ? "order-1" : "",
                          )}
                        >
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
      <div className="pointer-events-none absolute top-0 left-0 z-[-1] h-full w-full overflow-hidden opacity-30">
        <div className="absolute top-[10%] right-[-5%] aspect-square w-[40%] rounded-full border border-black/5" />
        <div className="absolute bottom-[20%] left-[-10%] aspect-square w-[50%] rounded-full border border-black/5" />
      </div>
    </section>
  );
}
