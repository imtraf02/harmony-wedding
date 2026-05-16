"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface GalleryItem {
  src: string;
  alt: string;
  label?: string;
}

interface GalleryScrollProps {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
}

export function GalleryScroll({ items, title, subtitle }: GalleryScrollProps) {
  const loopedItems = [...items, ...items, ...items];

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // All mutable state lives in refs — zero re-renders during scroll
  const pos = useRef(0); // current translateX (px)
  const targetPos = useRef(0); // where we want to be
  const dragging = useRef(false);
  const startPtr = useRef(0);
  const startPos = useRef(0);
  const lastPtr = useRef(0);
  const lastT = useRef(0);
  const vel = useRef(0);
  const rafId = useRef<number>(null);
  const loopActive = useRef(false);

  const [visible, setVisible] = useState(false);

  // ── Entrance observer ────────────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Init: start at middle copy ───────────────────────────────────────────
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = trackRef.current;
      if (!el) return;
      const oneSet = el.scrollWidth / 3;
      pos.current = -oneSet;
      targetPos.current = -oneSet;
      el.style.transform = `translateX(${-oneSet}px)`;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // ── Core rAF loop: lerp pos → target, update DOM ─────────────────────────
  const startLoop = useCallback(() => {
    if (loopActive.current) return;
    loopActive.current = true;

    const loop = () => {
      const track = trackRef.current;
      if (!track) {
        loopActive.current = false;
        return;
      }

      // Lerp toward target for smoothness
      pos.current += (targetPos.current - pos.current) * 0.12;

      // Teleport when drifting out of middle copy
      const oneSet = track.scrollWidth / 3;
      if (pos.current < -(oneSet * 2)) {
        pos.current += oneSet;
        targetPos.current += oneSet;
      } else if (pos.current > 0) {
        pos.current -= oneSet;
        targetPos.current -= oneSet;
      }

      // Apply track transform
      track.style.transform = `translateX(${pos.current}px)`;

      // Apply per-card 3D — single getBoundingClientRect batch
      const vw = window.innerWidth;
      const cx = vw / 2;
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCx = rect.left + rect.width / 2;
        const dist = cardCx - cx;
        const absDist = Math.abs(dist);
        const maxDist = vw * 0.55;
        const t = Math.max(0, 1 - absDist / maxDist);

        const rotateY = (dist / (vw * 0.6)) * -24;
        const scale = 0.82 + t * 0.18;
        const brightness = 0.58 + t * 0.42;

        card.style.transform = `perspective(1100px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.filter = `brightness(${brightness})`;
      });

      // Stop loop when nearly settled and not dragging
      const settled = Math.abs(targetPos.current - pos.current) < 0.1;
      if (settled && !dragging.current) {
        loopActive.current = false;
        return;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
  }, []);

  // ── Momentum tick ────────────────────────────────────────────────────────
  const applyMomentum = useCallback(() => {
    let v = vel.current * 16;
    const friction = 0.92;
    const tick = () => {
      v *= friction;
      targetPos.current += v;
      startLoop();
      if (Math.abs(v) > 0.2) rafId.current = requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [startLoop]);

  // ── Pointer helpers ──────────────────────────────────────────────────────
  const ptrDown = useCallback((px: number) => {
    dragging.current = true;
    startPtr.current = px;
    startPos.current = targetPos.current;
    lastPtr.current = px;
    lastT.current = performance.now();
    vel.current = 0;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    loopActive.current = false;
  }, []);

  const ptrMove = useCallback(
    (px: number) => {
      if (!dragging.current) return;
      const now = performance.now();
      const dt = now - lastT.current;
      if (dt > 0) vel.current = (px - lastPtr.current) / dt;
      lastPtr.current = px;
      lastT.current = now;
      targetPos.current = startPos.current + (px - startPtr.current);
      startLoop();
    },
    [startLoop],
  );

  const ptrUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    applyMomentum();
  }, [applyMomentum]);

  // ── Wheel ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        targetPos.current -= e.deltaX * 1.2;
        startLoop();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [startLoop]);

  useEffect(
    () => () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-luxury py-12 md:py-32"
    >
      {/* ── Header ── */}
      {(title || subtitle) && (
        <div
          className="mx-auto mb-8 max-w-7xl px-6 sm:px-8 md:mb-16 lg:px-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.75s ease, transform 0.75s ease",
          }}
        >
          {subtitle && (
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-obsidian/50" />
              <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
                {subtitle}
              </span>
            </div>
          )}
          {title && (
            <h2 className="font-light font-sans text-3xl text-obsidian leading-tight tracking-tight md:text-5xl">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* ── Drag hint ── */}
      <div
        className="mx-auto mb-6 max-w-7xl px-6 sm:px-8 lg:px-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.75s ease 0.12s, transform 0.75s ease 0.12s",
        }}
      >
        <span
          className="font-bold text-[10px] text-smoke/55 uppercase tracking-[0.25em]"
          style={{
            display: "inline-block",
            animation: visible ? "nudge 2.2s ease-in-out infinite" : "none",
          }}
        >
          ← Kéo để xem thêm →
        </span>
      </div>

      {/* ── Track ── */}
      <div
        ref={containerRef}
        className="select-none overflow-hidden"
        style={{ cursor: dragging.current ? "grabbing" : "grab" }}
        onMouseDown={(e) => ptrDown(e.pageX)}
        onMouseMove={(e) => ptrMove(e.pageX)}
        onMouseUp={ptrUp}
        onMouseLeave={ptrUp}
        onTouchStart={(e) => ptrDown(e.touches[0].pageX)}
        onTouchMove={(e) => ptrMove(e.touches[0].pageX)}
        onTouchEnd={ptrUp}
      >
        <div
          ref={trackRef}
          className="flex gap-5 px-6 will-change-transform sm:px-8 md:gap-8 lg:px-12"
          style={{ transform: "translateX(0px)" }}
        >
          {loopedItems.map((item, index) => (
            <div
              key={index}
              // Entrance: each card slides up with stagger based on original index
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(48px)",
                transition: `opacity 0.65s ease ${0.25 + (index % items.length) * 0.055}s,
                             transform 0.65s ease ${0.25 + (index % items.length) * 0.055}s`,
                flexShrink: 0,
              }}
            >
              {/* Card inner — transform & filter managed by rAF loop */}
              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative aspect-[3/4] w-[240px] sm:w-[300px] md:w-[360px]"
                style={{
                  willChange: "transform, filter",
                  transformOrigin: "center center",
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white md:rounded-[1.75rem]">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt || "Gallery image"}
                      fill
                      className="pointer-events-none select-none object-cover"
                      sizes="(max-width: 768px) 240px, 360px"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-obsidian/5">
                      <span className="text-[10px] text-mist uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  {item.label && (
                    <div className="absolute right-4 bottom-4 left-4">
                      <span className="font-bold text-[9px] text-white/80 uppercase tracking-[0.25em]">
                        {item.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bg deco ── */}
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-[30%] right-[-8%] aspect-square w-[35%] rounded-full border border-obsidian/10" />
        <div className="absolute bottom-[10%] left-[-6%] aspect-square w-[28%] rounded-full border border-obsidian/8" />
      </div>

      <style>{`
        @keyframes nudge {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(8px); }
        }
      `}</style>
    </section>
  );
}
