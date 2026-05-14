'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Lightbox } from './lightbox';

interface PortfolioAlbumProps {
  images: string[];
  title: string;
}

/* ─── ZoomIcon ─────────────────────────────────── */
function ZoomIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  );
}

/* ─── PortfolioAlbum ───────────────────────────── */
export function PortfolioAlbum({ images, title }: PortfolioAlbumProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-20">

      {/* section label */}
      <div className="flex items-center gap-5 mb-12">
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ash">
          Bộ ảnh
        </span>
        <div
          aria-hidden="true"
          className="flex-1 h-px bg-gradient-to-r from-luxury-border to-transparent"
        />
        <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ash tabular-nums">
          {String(images.length).padStart(2, '0')} ảnh
        </span>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            aria-label={`Xem ảnh ${i + 1} — ${title}`}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              'relative group overflow-hidden',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50',
              // first image is featured — spans 2 columns on lg
              i === 0 && 'sm:col-span-2 lg:col-span-2',
              // animate in with stagger
              'animate-fade-in-up-luxury',
            )}
            style={{ '--delay': `${Math.min(i, 9) * 60}ms` } as React.CSSProperties}
          >
            {/* aspect ratio wrapper */}
            <div
              className={cn(
                'relative overflow-hidden',
                i === 0 ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-square',
              )}
            >
              <Image
                src={img}
                alt={`${title} — ảnh ${i + 1}`}
                fill
                loading={i < 6 ? 'eager' : 'lazy'}
                sizes={
                  i === 0
                    ? '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                style={{ objectFit: 'cover' }}
                className={cn(
                  'transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                  'scale-100 group-hover:scale-105',
                  'grayscale-[15%] group-hover:grayscale-0',
                )}
              />

              {/* hover overlay */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'bg-obsidian/30',
                  'opacity-0 group-hover:opacity-100',
                  'transition-opacity duration-400',
                )}
              >
                {/* zoom icon ring */}
                <div
                  className={cn(
                    'flex items-center justify-center',
                    'w-10 h-10 border border-white/50',
                    'text-white/90',
                    'scale-75 group-hover:scale-100',
                    'transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                  )}
                >
                  <ZoomIcon />
                </div>
              </div>

              {/* index badge — subtle, bottom-right */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute bottom-3 right-3',
                  'text-[8px] font-bold uppercase tracking-[0.22em]',
                  'text-white/50',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* gold border sweep on hover */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-gold-400 to-gold-600 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}