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
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 bg-[#0068FF] hover:bg-[#0056d2]"
        aria-label="Chat on Zalo"
        id="floating-zalo-btn"
      >
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <rect width="48" height="48" rx="12" fill="#0068FF"/>
          <text x="24" y="32" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">Z</text>
        </svg>
      </a>
      {/* Phone */}
      <a
        href={`tel:${PHONE}`}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 bg-gold-500 hover:bg-gold-600"
        aria-label={`Call ${PHONE}`}
        id="floating-phone-btn"
      >
        <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
    </div>
  );
}
