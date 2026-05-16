"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

/* ─── Icon buttons ─────────────────────────────── */
function LightboxBtn({
  onClick,
  label,
  children,
  className,
}: {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "group flex items-center justify-center",
        "h-11 w-11",
        "border border-white/20 bg-obsidian/40 backdrop-blur-sm",
        "text-white/70 hover:border-obsidian-400/60 hover:bg-obsidian/70 hover:text-white",
        "transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/50",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ─── Lightbox ─────────────────────────────────── */
export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [animDir, setAnimDir] = useState<"left" | "right" | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const touchStartX = useRef(0);

  /* mount fade-in */
  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const prev = useCallback(() => {
    setAnimDir("right");
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setAnimDir("left");
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  /* clear anim direction after transition */
  useEffect(() => {
    if (!animDir) return;
    const t = setTimeout(() => setAnimDir(null), 400);
    return () => clearTimeout(t);
  }, [animDir]);

  /* keyboard + scroll lock */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [prev, next, handleClose]); // eslint-disable-line

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  /* touch swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className={cn(
        "fixed inset-0 z-[200] flex flex-col",
        "bg-obsidian/96 backdrop-blur-md",
        "transition-opacity duration-300",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between border-white/8 border-b px-6 py-5 sm:px-10">
        {/* counter */}
        <div
          aria-live="polite"
          className="font-bold text-[9px] text-white/40 uppercase tracking-[0.28em]"
        >
          <span className="font-normal font-sans text-base text-obsidian-300">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mx-2 text-white/20">/</span>
          <span>{String(images.length).padStart(2, "0")}</span>
        </div>

        {/* obsidian hairline */}
        <div
          aria-hidden="true"
          className="mx-8 hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent sm:block"
        />

        {/* close */}
        <LightboxBtn
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          label="Đóng"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </LightboxBtn>
      </div>

      {/* ── Image area ── */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-20"
        onClick={handleClose}
      >
        {/* image container */}
        <div
          className={cn(
            "relative h-full w-full",
            "transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
            animDir === "left" && "-translate-x-4 opacity-80",
            animDir === "right" && "translate-x-4 opacity-80",
            !animDir && "translate-x-0 opacity-100",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={current}
            src={images[current]}
            alt={`Ảnh ${current + 1} / ${images.length}`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "contain" }}
            className="select-none"
          />
        </div>

        {/* Prev / Next — only if multiple */}
        {images.length > 1 && (
          <>
            <button
              id="lightbox-prev"
              type="button"
              aria-label="Ảnh trước"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className={cn(
                "absolute top-1/2 left-4 -translate-y-1/2 sm:left-6",
                "group hidden items-center justify-center sm:flex",
                "h-16 w-11 sm:h-20 sm:w-12",
                "border border-white/15 bg-obsidian/50 backdrop-blur-sm",
                "text-white/60 hover:border-obsidian-400/50 hover:bg-obsidian/80 hover:text-white",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/50",
              )}
            >
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M10 2L2 10l8 8" />
              </svg>
            </button>
            <button
              id="lightbox-next"
              type="button"
              aria-label="Ảnh tiếp"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className={cn(
                "absolute top-1/2 right-4 -translate-y-1/2 sm:right-6",
                "group hidden items-center justify-center sm:flex",
                "h-16 w-11 sm:h-20 sm:w-12",
                "border border-white/15 bg-obsidian/50 backdrop-blur-sm",
                "text-white/60 hover:border-obsidian-400/50 hover:bg-obsidian/80 hover:text-white",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/50",
              )}
            >
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 2l8 8-8 8" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div className="shrink-0 border-white/8 border-t px-6 py-4 sm:px-10">
          <div className="scrollbar-hide flex items-center justify-center gap-2 overflow-x-auto">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Xem ảnh ${i + 1}`}
                aria-current={i === current}
                onClick={() => {
                  setAnimDir(i > current ? "left" : "right");
                  setCurrent(i);
                }}
                className={cn(
                  "relative h-12 w-12 shrink-0 overflow-hidden sm:h-14 sm:w-14",
                  "border transition-all duration-300",
                  i === current
                    ? "scale-105 border-obsidian-400 opacity-100"
                    : "border-white/15 opacity-40 hover:border-white/40 hover:opacity-70",
                )}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  sizes="56px"
                  style={{ objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
}
