'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface HeroVideoProps {
  src      : string;
  poster   : string;
  title    : string;
  ctaLabel : string;
  ctaHref  : string;
}

export function HeroVideo({ src, poster, title, ctaLabel, ctaHref }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-label="Hero">
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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] font-medium mb-6 animate-fade-in">
          Nhiếp ảnh & Quay phim cưới chuyên nghiệp
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] animate-fade-in-up">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-light text-zinc-200 max-w-2xl mx-auto mb-12 italic animate-fade-in-up [animation-delay:0.1s]">
          Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ điệu cuối cùng.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:0.2s]">
          <Link 
            href={ctaHref} 
            className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base font-medium bg-gold text-white hover:opacity-90 shadow-lg shadow-gold/20 transition-all" 
            id="hero-cta-primary"
          >
            {ctaLabel}
          </Link>
          <Link 
            href="/portfolio" 
            className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base font-medium border border-white/30 text-white hover:bg-white hover:text-black backdrop-blur-sm transition-all" 
            id="hero-cta-portfolio"
          >
            Xem Portfolio
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50" aria-hidden="true">
        <span className="w-px h-12 bg-white" />
      </div>
    </section>
  );
}
