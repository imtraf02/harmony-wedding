'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

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
    const pos = useRef(0);   // current translateX (px)
    const targetPos = useRef(0);   // where we want to be
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
            ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
            { threshold: 0.12 }
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
            if (!track) { loopActive.current = false; return; }

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

    const ptrMove = useCallback((px: number) => {
        if (!dragging.current) return;
        const now = performance.now();
        const dt = now - lastT.current;
        if (dt > 0) vel.current = (px - lastPtr.current) / dt;
        lastPtr.current = px;
        lastT.current = now;
        targetPos.current = startPos.current + (px - startPtr.current);
        startLoop();
    }, [startLoop]);

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
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [startLoop]);

    useEffect(() => () => { if (rafId.current) cancelAnimationFrame(rafId.current); }, []);

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-luxury overflow-hidden">

            {/* ── Header ── */}
            {(title || subtitle) && (
                <div
                    className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12 md:mb-16"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(28px)',
                        transition: 'opacity 0.75s ease, transform 0.75s ease',
                    }}
                >
                    {subtitle && (
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-gold/50" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                                {subtitle}
                            </span>
                        </div>
                    )}
                    {title && (
                        <h2 className="text-3xl md:text-5xl font-sans font-light text-obsidian leading-tight tracking-tight">
                            {title}
                        </h2>
                    )}
                </div>
            )}

            {/* ── Drag hint ── */}
            <div
                className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-6"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(16px)',
                    transition: 'opacity 0.75s ease 0.12s, transform 0.75s ease 0.12s',
                }}
            >
                <span
                    className="text-[10px] font-bold uppercase tracking-[0.25em] text-smoke/55"
                    style={{ display: 'inline-block', animation: visible ? 'nudge 2.2s ease-in-out infinite' : 'none' }}
                >
                    ← Kéo để xem thêm →
                </span>
            </div>

            {/* ── Track ── */}
            <div
                ref={containerRef}
                className="overflow-hidden select-none"
                style={{ cursor: dragging.current ? 'grabbing' : 'grab' }}
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
                    className="flex gap-5 md:gap-8 px-6 sm:px-8 lg:px-12 will-change-transform"
                    style={{ transform: 'translateX(0px)' }}
                >
                    {loopedItems.map((item, index) => (
                        <div
                            key={index}
                            // Entrance: each card slides up with stagger based on original index
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? 'translateY(0)' : 'translateY(48px)',
                                transition: `opacity 0.65s ease ${0.25 + (index % items.length) * 0.055}s,
                             transform 0.65s ease ${0.25 + (index % items.length) * 0.055}s`,
                                flexShrink: 0,
                            }}
                        >
                            {/* Card inner — transform & filter managed by rAF loop */}
                            <div
                                ref={(el) => { cardRefs.current[index] = el; }}
                                className="relative w-[240px] sm:w-[300px] md:w-[360px] aspect-[3/4]"
                                style={{ willChange: 'transform, filter', transformOrigin: 'center center' }}
                            >
                                <div className="w-full h-full rounded-2xl md:rounded-[1.75rem] overflow-hidden shadow-2xl ring-4 ring-white relative">
                                    {item.src ? (
                                        <Image
                                            src={item.src}
                                            alt={item.alt || 'Gallery image'}
                                            fill
                                            className="object-cover pointer-events-none select-none"
                                            sizes="(max-width: 768px) 240px, 360px"
                                            draggable={false}
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-obsidian/5 flex items-center justify-center">
                                            <span className="text-[10px] uppercase tracking-widest text-mist">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                                    {item.label && (
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/80">
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
            <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden opacity-20">
                <div className="absolute top-[30%] right-[-8%] w-[35%] aspect-square border border-gold/10 rounded-full" />
                <div className="absolute bottom-[10%] left-[-6%] w-[28%] aspect-square border border-gold/8 rounded-full" />
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