'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';

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

export function HeroVideo({ src, poster, title, ctaLabel, ctaHref }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay muted loop playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/70" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          aria-hidden="true"
          variants={itemVariants}
        >
          <span className="inline-block w-7 h-px bg-gold/50" />
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-gold">
            Nhiếp ảnh &amp; Quay phim cưới
          </p>
          <span className="inline-block w-7 h-px bg-gold/50" />
        </motion.div>

        <motion.h1
          className="font-extralight text-[clamp(3.2rem,9vw,6rem)] leading-[0.9] tracking-[-0.02em] text-ivory mb-7"
          variants={itemVariants}
        >
          {title}
        </motion.h1>

        <motion.p
          className="font-light  text-[1.15rem] leading-[1.8] text-ivory/50 max-w-xl mx-auto mb-12 tracking-[0.01em]"
          variants={itemVariants}
        >
          Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ điệu cuối cùng.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
        >
          <Link
            href={ctaHref}
            className="
              inline-flex items-center justify-center
              text-[10px] font-bold uppercase tracking-[0.25em]
              bg-gold text-obsidian
              px-12 py-5 rounded-none
              hover:bg-ivory hover:text-obsidian
              transition-all duration-500 shadow-luxury
            "
          >
            {ctaLabel}
          </Link>
          <Link
            href="/portfolio"
            className="
              inline-flex items-center gap-2
              text-[10px] font-bold uppercase tracking-[0.25em]
              text-ivory/70
              border border-ivory/20 px-10 py-[19px] rounded-none
              hover:text-ivory hover:border-ivory/50
              transition-all duration-500
            "
          >
            Xem Portfolio
            <span aria-hidden="true">→</span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[8px] font-medium tracking-[0.25em] uppercase text-ivory/30">
          Cuộn xuống
        </span>
        <span className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-gold-pulse" />
      </motion.div>
    </section>
  );
}