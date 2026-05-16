"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LOCATION_TYPES, PORTFOLIO_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ─── Labels ──────────────────────────────────── */
const STYLE_LABELS: Record<string, string> = {
  vintage: "Cổ điển",
  modern: "Hiện đại",
  fineart: "Nghệ thuật",
  romantic: "Lãng mạn",
};

const LOCATION_LABELS: Record<string, string> = {
  studio: "Studio",
  outdoor: "Ngoại cảnh",
  destination: "Du lịch",
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
        "relative px-5 py-2 font-bold text-[9px] uppercase tracking-[0.22em]",
        "transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/40",
        active
          ? [
              "bg-transparent text-obsidian",
              "after:absolute after:inset-0 after:border after:border-obsidian-400",
              "before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:bg-linear-to-r before:from-transparent before:via-obsidian-400 before:to-transparent",
            ].join(" ")
          : [
              "bg-transparent text-ash",
              "hover:text-obsidian",
              "after:absolute after:inset-0 after:border after:border-transparent after:hover:border-luxury-border",
            ].join(" "),
      )}
    >
      {/* active: obsidian fill bg */}
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-obsidian-50 to-champagne opacity-80"
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
    <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-6">
      <span className="shrink-0 text-center font-bold text-[9px] text-ash uppercase tracking-[0.28em]">
        {label}
      </span>
      {/* hairline */}
      <span
        aria-hidden="true"
        className="hidden h-4 w-px bg-linear-to-b from-transparent via-luxury-border to-transparent sm:block"
      />
      <div className="flex flex-wrap justify-center gap-2">{children}</div>
    </div>
  );
}

/* ─── GalleryFilter ────────────────────────────── */
export function GalleryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const style = searchParams.get("style") ?? "";
  const location = searchParams.get("location") ?? "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/portfolio?${params.toString()}`);
  };

  return (
    <search aria-label="Lọc portfolio" className="mb-8 md:mb-20">
      {/* top obsidian hairline */}
      <div
        aria-hidden="true"
        className="mb-4 h-px w-full bg-linear-to-r from-transparent via-obsidian-300 to-transparent opacity-60 md:mb-10"
      />

      <div className="flex flex-col items-center gap-3">
        {/* Phong cách */}
        <FilterGroup label="Phong cách">
          <FilterPill
            active={!style}
            onClick={() => update("style", "")}
            id="filter-style-all"
          >
            Tất cả
          </FilterPill>
          {PORTFOLIO_STYLES.map((s) => (
            <FilterPill
              key={s}
              active={style === s}
              onClick={() => update("style", s)}
              id={`filter-style-${s}`}
            >
              {STYLE_LABELS[s] ?? s}
            </FilterPill>
          ))}
        </FilterGroup>

        {/* middle separator */}
        <div
          aria-hidden="true"
          className="flex w-full items-center gap-4 sm:w-auto"
        >
          <span className="h-px flex-1 bg-luxury-border-fine" />
          <span className="text-[8px] text-mist uppercase tracking-[0.3em]">
            ·
          </span>
          <span className="h-px flex-1 bg-luxury-border-fine" />
        </div>

        {/* Địa điểm */}
        <FilterGroup label="Địa điểm">
          <FilterPill
            active={!location}
            onClick={() => update("location", "")}
            id="filter-location-all"
          >
            Tất cả
          </FilterPill>
          {LOCATION_TYPES.map((l) => (
            <FilterPill
              key={l}
              active={location === l}
              onClick={() => update("location", l)}
              id={`filter-location-${l}`}
            >
              {LOCATION_LABELS[l] ?? l}
            </FilterPill>
          ))}
        </FilterGroup>
      </div>

      {/* bottom obsidian hairline */}
      <div
        aria-hidden="true"
        className="mt-4 h-px w-full bg-linear-to-r from-transparent via-obsidian-300 to-transparent opacity-60 md:mt-10"
      />
    </search>
  );
}
