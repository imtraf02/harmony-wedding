'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { PORTFOLIO_STYLES, LOCATION_TYPES } from '@/lib/constants';

const STYLE_LABELS: Record<string, string> = {
  vintage : 'Cổ điển',
  modern  : 'Hiện đại',
  fineart : 'Nghệ thuật',
  romantic: 'Lãng mạn',
};

const LOCATION_LABELS: Record<string, string> = {
  studio     : 'Phòng Studio',
  outdoor    : 'Ngoại cảnh',
  destination: 'Điểm du lịch',
};

export function GalleryFilter() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const style        = searchParams.get('style')    ?? '';
  const location     = searchParams.get('location') ?? '';

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/portfolio?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16" role="search" aria-label="Lọc portfolio">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-zinc-400 mr-2">Phong cách:</span>
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full border ${
            !style 
              ? 'text-gold border-gold/20 bg-gold/5' 
              : 'text-zinc-500 hover:text-gold border-transparent hover:border-gold/20'
          }`}
          onClick={() => update('style', '')}
          aria-pressed={!style}
          id="filter-style-all"
        >
          Tất cả
        </button>
        {PORTFOLIO_STYLES.map(s => (
          <button
            key={s}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-full border ${
              style === s 
                ? 'text-gold border-gold/20 bg-gold/5' 
                : 'text-zinc-500 hover:text-gold border-transparent hover:border-gold/20'
            }`}
            onClick={() => update('style', s)}
            aria-pressed={style === s}
            id={`filter-style-${s}`}
          >
            {STYLE_LABELS[s]}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-zinc-400 mr-2">Địa điểm:</span>
        <button
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-full border ${
            !location 
              ? 'text-gold border-gold/20 bg-gold/5' 
              : 'text-zinc-500 hover:text-gold border-transparent hover:border-gold/20'
          }`}
          onClick={() => update('location', '')}
          aria-pressed={!location}
          id="filter-location-all"
        >
          Tất cả
        </button>
        {LOCATION_TYPES.map(l => (
          <button
            key={l}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-full border ${
              location === l 
                ? 'text-gold border-gold/20 bg-gold/5' 
                : 'text-zinc-500 hover:text-gold border-transparent hover:border-gold/20'
            }`}
            onClick={() => update('location', l)}
            aria-pressed={location === l}
            id={`filter-location-${l}`}
          >
            {LOCATION_LABELS[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
