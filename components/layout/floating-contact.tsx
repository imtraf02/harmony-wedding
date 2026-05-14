'use client';

import { PHONE, ZALO_ID } from '@/lib/constants';

export function FloatingContact() {
  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4" aria-label="Quick contact options">
      {/* Zalo */}
      <a
        href={`https://zalo.me/${ZALO_ID}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on Zalo"
        id="floating-zalo-btn"
      >
        <img src="/zalo.svg" alt="Zalo" className='size-10' />
      </a>
    </div>
  );
}
