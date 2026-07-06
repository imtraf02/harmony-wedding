"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { portfolioItems } from "@/constants/data";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".portfolio-copy, .portfolio-card, .portfolio-card img", {
          autoAlpha: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (contextData) => {
          const isMobile = contextData.conditions?.mobile;

          gsap.fromTo(
            ".portfolio-copy",
            { autoAlpha: 0, y: isMobile ? 40 : 34 },
            {
              autoAlpha: 1,
              duration: isMobile ? 0.78 : 0.95,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 76%",
                once: true,
              },
              y: 0,
            }
          );

          if (isMobile) {
            gsap.fromTo(
              ".portfolio-card",
              { autoAlpha: 0, y: 40 },
              {
                autoAlpha: 1,
                duration: 0.78,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ".portfolio-viewport",
                  start: "top 78%",
                  once: true,
                },
                stagger: 0.12,
                y: 0,
              }
            );

            // Horizontal Parallax ScrollTrigger for mobile swiper
            const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
            cards.forEach((card) => {
              const img = card.querySelector("img");
              if (img) {
                gsap.fromTo(
                  img,
                  { scale: 1.12, xPercent: -7 },
                  {
                    scale: 1.12,
                    xPercent: 7,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      scroller: ".portfolio-viewport",
                      horizontal: true,
                      scrub: 0.1, // extremely responsive on mobile to avoid lag
                      start: "left right",
                      end: "right left",
                    },
                  }
                );
              }
            });

            return;
          }

          const viewport =
            section.querySelector<HTMLElement>(".portfolio-viewport");
          const cursor = cursorRef.current;

          if (!viewport) {
            return;
          }

          const getDistance = () =>
            Math.max(0, track.scrollWidth - viewport.clientWidth);

          gsap.fromTo(
            ".portfolio-card",
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: {
                trigger: section,
                start: "top 64%",
                once: true,
              },
              stagger: 0.12,
              y: 0,
            }
          );

          const horizontalScroll = gsap.to(track, {
            ease: "none",
            scrollTrigger: {
              end: () => `+=${Math.max(getDistance(), 1)}`,
              invalidateOnRefresh: true,
              pin: section,
              scrub: 1,
              start: "top top",
              trigger: section,
            },
            x: () => -getDistance(),
          });

          let onMouseMove: ((e: MouseEvent) => void) | undefined;
          let onMouseEnter: (() => void) | undefined;
          let onMouseLeave: (() => void) | undefined;

          // High-fidelity custom drag cursor that follows the mouse with spring lag
          if (cursor) {
            const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
            const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

            onMouseMove = (e: MouseEvent) => {
              xTo(e.clientX);
              yTo(e.clientY);
            };

            onMouseEnter = () => {
              gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "power2.out" });
            };

            onMouseLeave = () => {
              gsap.to(cursor, { autoAlpha: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
            };

            viewport.addEventListener("mousemove", onMouseMove);
            viewport.addEventListener("mouseenter", onMouseEnter);
            viewport.addEventListener("mouseleave", onMouseLeave);
          }

          // Refresh ScrollTrigger once all images have loaded to ensure scrollWidth is correct
          const images = track.querySelectorAll("img");
          let loadedCount = 0;
          const onImageLoad = () => {
            loadedCount++;
            if (loadedCount === images.length) {
              ScrollTrigger.refresh();
            }
          };

          images.forEach((img) => {
            if (img.complete) {
              onImageLoad();
            } else {
              img.addEventListener("load", onImageLoad);
            }
          });

          // Perform an initial refresh
          ScrollTrigger.refresh();

          return () => {
            images.forEach((img) => img.removeEventListener("load", onImageLoad));
            horizontalScroll.scrollTrigger?.kill();
            horizontalScroll.kill();
            if (viewport) {
              if (onMouseMove) viewport.removeEventListener("mousemove", onMouseMove);
              if (onMouseEnter) viewport.removeEventListener("mouseenter", onMouseEnter);
              if (onMouseLeave) viewport.removeEventListener("mouseleave", onMouseLeave);
            }
          };
        }
      );

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="relative isolate overflow-hidden bg-neutral-950 py-20 text-white lg:min-h-screen lg:py-0"
      id="portfolio"
      ref={sectionRef}
    >
      {/* Ambient dark moving mesh gradient */}
      <MeshGradient variant="dark" className="opacity-35" />

      {/* Floating custom glass drag cursor - desktop only */}
      <div
        ref={cursorRef}
        style={{ opacity: 0, visibility: "hidden" }}
        className="pointer-events-none fixed left-0 top-0 z-50 hidden size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/12 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-white shadow-xl backdrop-blur-md lg:flex"
      >
        Kéo Ngang
      </div>

      <div className="mx-auto grid max-w-[1720px] gap-14 px-5 md:px-10 lg:min-h-screen lg:grid-cols-[0.34fr_0.66fr] lg:items-center lg:px-16">
        <div className="portfolio-copy lg:max-w-[470px]">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-white/50">
            Album cưới
            <span className="h-px w-16 bg-white/20" />
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,12vw,4.2rem)] leading-[0.98] text-white lg:text-[clamp(2.5rem,4vw,5rem)]">
            Những Câu Chuyện Tình Yêu Được Kể Bằng Hình Ảnh
          </h2>
          <p className="mt-8 max-w-sm text-base leading-8 text-white/70">
            Từng album được biên tập như một chương ký ức, giữ lại ánh sáng,
            không khí và nhịp cảm xúc riêng của mỗi cặp đôi.
          </p>
          <Link
            className="mt-10 inline-flex items-center gap-5 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white hover:text-neutral-300 transition-colors"
            href="/portfolio"
          >
            Xem Tất Cả
            <span className="h-px w-12 bg-white" />
          </Link>
        </div>

        {/* Viewport has lg:cursor-none so the custom indicator takes over */}
        <div className="portfolio-viewport lg:cursor-none -mx-5 overflow-x-auto px-5 snap-x snap-mandatory scrollbar-none md:-mx-10 md:px-10 lg:mx-0 lg:overflow-hidden lg:px-0">
          <div
            className="flex gap-5 pb-4 lg:w-max lg:flex-row lg:gap-8 lg:pb-0"
            ref={trackRef}
          >
            {portfolioItems.map((item, index) => {
              const cardClasses =
                "portfolio-card group relative block aspect-[1365/2048] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-900 md:w-[45vw] md:max-w-[400px] lg:h-[72vh] lg:w-[48vh] lg:max-w-none lg:shrink-0 cursor-pointer border border-white/8 hover:border-white/20 shadow-lg transition-all duration-500";

              const innerContent = (
                <>
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Image
                      alt={item.alt}
                      className="object-cover lg:transition lg:duration-700 lg:group-hover:scale-[1.04]"
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      src={item.image}
                      priority={index < 3}
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                  
                  {/* Floating Liquid Glass Info Tag */}
                  <div className="absolute inset-x-4 bottom-4 z-10">
                    <GlassCard
                      variant="dark"
                      intensity="medium"
                      borderStrength="low"
                      className="px-5 py-3 border border-white/10 !rounded-xl shadow-md translate-y-1 group-hover:translate-y-0 transition-transform duration-500"
                    >
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white">
                        {item.location}
                      </p>
                      <p className="mt-1 text-[0.58rem] font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                        Xem Album ➔
                      </p>
                    </GlassCard>
                  </div>
                </>
              );

              if (item.slug) {
                return (
                  <Link
                    href={`/portfolio/${item.slug}`}
                    key={`${item.location}-${item.image}`}
                    className={cardClasses}
                  >
                    {innerContent}
                  </Link>
                );
              }

              return (
                <div
                  key={`${item.location}-${item.image}`}
                  className={cardClasses}
                >
                  {innerContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
