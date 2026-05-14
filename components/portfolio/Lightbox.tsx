'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface LightboxProps {
  images      : string[];
  initialIndex: number;
  onClose     : () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  // Touch swipe
  let touchStartX = 0;
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <div
        className="lightbox__img-wrap"
        onClick={e => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Image ${current + 1} of ${images.length}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* Controls */}
      <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox" id="lightbox-close">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <path d="M6 6l16 16M22 6L6 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {images.length > 1 && (
        <>
          <button className="lightbox__prev" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous image" id="lightbox-prev">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M18 6L10 14l8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next image" id="lightbox-next">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M10 6l8 8-8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </>
      )}

      <div className="lightbox__counter" aria-live="polite">
        {current + 1} / {images.length}
      </div>
    </div>,
    document.body,
  );
}
