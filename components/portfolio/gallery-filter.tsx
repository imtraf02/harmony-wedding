'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PORTFOLIO_STYLES, LOCATION_TYPES } from '@/lib/constants';

/* ─── Labels ──────────────────────────────────── */
const STYLE_LABELS: Record<string, string> = {
  vintage: 'Cổ điển',
  modern: 'Hiện đại',
  fineart: 'Nghệ thuật',
  romantic: 'Lãng mạn',
};

const LOCATION_LABELS: Record<string, string> = {
  studio: 'Studio',
  outdoor: 'Ngoại cảnh',
  destination: 'Du lịch',
};

/* ─── FilterPill ───────────────────────────────── */
function FilterPill({
  active,
  onClick,
  children,
  id,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'relative px-5 py-2 text-[9px] font-bold uppercase tracking-[0.22em]',
        'transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40',
        active
          ? [
            'text-obsidian bg-transparent',
            'after:absolute after:inset-0 after:border after:border-gold-400',
            'before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-gold-400 before:to-transparent',
          ].join(' ')
          : [
            'text-ash bg-transparent',
            'hover:text-gold',
            'after:absolute after:inset-0 after:border after:border-transparent after:hover:border-luxury-border',
          ].join(' '),
      )}
    >
      {/* active: gold fill bg */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-gold-50 to-champagne opacity-80 pointer-events-none"
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ─── FilterGroup ──────────────────────────────── */
function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-ash shrink-0 sm:w-24 sm:text-right">
        {label}
      </span>
      {/* hairline */}
      <span
        aria-hidden="true"
        className="hidden sm:block h-4 w-px bg-gradient-to-b from-transparent via-luxury-border to-transparent"
      />
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

/* ─── GalleryFilter ────────────────────────────── */
export function GalleryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const style = searchParams.get('style') ?? '';
  const location = searchParams.get('location') ?? '';

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/portfolio?${params.toString()}`);
  };

  return (
    <div
      role="search"
      aria-label="Lọc portfolio"
      className="mb-20"
    >
      {/* top gold hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-transparent mb-10 opacity-60"
      />

      <div className="flex flex-col gap-5 items-start sm:items-center">
        {/* Phong cách */}
        <FilterGroup label="Phong cách">
          <FilterPill
            active={!style}
            onClick={() => update('style', '')}
            id="filter-style-all"
          >
            Tất cả
          </FilterPill>
          {PORTFOLIO_STYLES.map(s => (
            <FilterPill
              key={s}
              active={style === s}
              onClick={() => update('style', s)}
              id={`filter-style-${s}`}
            >
              {STYLE_LABELS[s] ?? s}
            </FilterPill>
          ))}
        </FilterGroup>

        {/* middle separator */}
        <div
          aria-hidden="true"
          className="w-full sm:w-auto flex items-center gap-4"
        >
          <span className="flex-1 h-px bg-luxury-border-fine" />
          <span className="text-[8px] uppercase tracking-[0.3em] text-mist">·</span>
          <span className="flex-1 h-px bg-luxury-border-fine" />
        </div>

        {/* Địa điểm */}
        <FilterGroup label="Địa điểm">
          <FilterPill
            active={!location}
            onClick={() => update('location', '')}
            id="filter-location-all"
          >
            Tất cả
          </FilterPill>
          {LOCATION_TYPES.map(l => (
            <FilterPill
              key={l}
              active={location === l}
              onClick={() => update('location', l)}
              id={`filter-location-${l}`}
            >
              {LOCATION_LABELS[l] ?? l}
            </FilterPill>
          ))}
        </FilterGroup>
      </div>

      {/* bottom gold hairline */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-transparent mt-10 opacity-60"
      />
    </div>
  );
}