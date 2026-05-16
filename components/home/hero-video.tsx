"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  title: string;
  ctaLabel: string;
  ctaHref: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroVideo({
  src,
  poster,
  title,
  ctaLabel,
  ctaHref,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/70" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-8 flex items-center justify-center gap-3"
          aria-hidden="true"
          variants={itemVariants}
        >
          <span className="inline-block h-px w-7 bg-white/30" />
          <p className="font-medium text-[10px] text-white/80 uppercase tracking-[0.28em]">
            Nhiếp ảnh &amp; Quay phim cưới
          </p>
          <span className="inline-block h-px w-7 bg-white/30" />
        </motion.div>

        <motion.h1
          className="mb-7 font-extralight text-[clamp(3.2rem,9vw,6rem)] text-ivory leading-[0.9] tracking-[-0.02em]"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mx-auto mb-12 max-w-xl font-light text-[1.15rem] text-ivory/50 leading-[1.8] tracking-[0.01em]"
          variants={itemVariants}
        >
          Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ điệu
          cuối cùng.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={itemVariants}
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-none bg-white px-12 py-5 font-bold text-[10px] text-obsidian uppercase tracking-[0.25em] shadow-luxury transition-all duration-500 hover:bg-obsidian hover:text-white"
          >
            {ctaLabel}
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-none border border-ivory/20 px-10 py-[19px] font-bold text-[10px] text-ivory/70 uppercase tracking-[0.25em] transition-all duration-500 hover:border-ivory/50 hover:text-ivory"
          >
            Xem Portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-medium text-[8px] text-ivory/30 uppercase tracking-[0.25em]">
          Cuộn xuống
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}
