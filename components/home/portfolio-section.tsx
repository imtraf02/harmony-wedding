"use client";

import { useRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { portfolioItems } from "@/constants/data";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

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
        (context) => {
          const isMobile = context.conditions?.mobile;

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
            },
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
              },
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
                      scrub: true,
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
            },
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
          };
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="overflow-hidden bg-black py-20 text-white lg:min-h-screen lg:bg-white lg:py-0 lg:text-black"
      id="portfolio"
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-[1720px] gap-14 px-5 md:px-10 lg:min-h-screen lg:grid-cols-[0.34fr_0.66fr] lg:items-center lg:px-16">
        <div className="portfolio-copy lg:max-w-[470px]">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/68 lg:text-neutral-600">
            Album cưới
            <span className="h-px w-16 bg-white/55 lg:bg-black" />
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,12vw,4.2rem)] leading-[0.98] text-white lg:text-[clamp(2.5rem,4vw,5rem)] lg:text-black">
            Những Câu Chuyện Tình Yêu Được Kể Bằng Hình Ảnh
          </h2>
          <p className="mt-8 max-w-sm text-base leading-8 text-white/72 lg:text-neutral-600">
            Từng album được biên tập như một chương ký ức, giữ lại ánh sáng,
            không khí và nhịp cảm xúc riêng của mỗi cặp đôi.
          </p>
          <Link
            className="mt-10 inline-flex items-center gap-5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white lg:text-black"
            href="/portfolio"
          >
            Xem Tất Cả
            <span className="h-px w-12 bg-white lg:bg-black" />
          </Link>
        </div>

        <div className="portfolio-viewport -mx-5 overflow-x-auto px-5 snap-x snap-mandatory scrollbar-none md:-mx-10 md:px-10 lg:mx-0 lg:overflow-hidden lg:px-0">
          <div
            className="flex gap-5 pb-4 lg:w-max lg:flex-row lg:gap-8 lg:pb-0"
            ref={trackRef}
          >
            {portfolioItems.map((item, index) => {
              const cardClasses =
                "portfolio-card group relative block aspect-[1365/2048] w-[78vw] shrink-0 snap-start overflow-hidden rounded-md bg-neutral-900 md:w-[45vw] md:max-w-[400px] lg:h-[72vh] lg:w-[48vh] lg:max-w-none lg:shrink-0 lg:rounded-none lg:bg-neutral-100 cursor-pointer";

              const innerContent = (
                <>
                  <Image
                    alt={item.alt}
                    className="object-cover lg:transition lg:duration-700 lg:group-hover:scale-[1.03]"
                    fill
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    src={item.image}
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_48%,rgba(0,0,0,0.74)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white">
                      {item.location}
                    </p>
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
