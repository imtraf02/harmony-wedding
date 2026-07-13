"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";

const POSTERS = [
  { src: "/images/home/poster-1.webp", alt: "Poster Dịch Vụ Cưới 1 - Harmony Wedding" },
  { src: "/images/home/poster-2.webp", alt: "Poster Dịch Vụ Cưới 2 - Harmony Wedding" },
  { src: "/images/home/poster-3.webp", alt: "Poster Dịch Vụ Cưới 3 - Harmony Wedding" },
  { src: "/images/home/poster-4.webp", alt: "Poster Dịch Vụ Cưới 4 - Harmony Wedding" },
  { src: "/images/home/poster-5.webp", alt: "Poster Dịch Vụ Cưới 5 - Harmony Wedding" },
  { src: "/images/home/poster-6.webp", alt: "Poster Dịch Vụ Cưới 6 - Harmony Wedding" }
];

export function ServicePosters() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const messengerUrl = siteConfig.links.messenger;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".poster-item", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".poster-item",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
          stagger: 0.12,
          y: 0,
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section 
      className="relative isolate overflow-hidden py-16 lg:py-24 bg-[#faf9f6]" 
      ref={sectionRef}
      id="service-posters"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        {/* Clean Poster Cards — Horizontal Scroll on Mobile, Grid on Tablet/Desktop */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-none -mx-5 px-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:mx-0 sm:px-0 max-w-6xl mx-auto">
          {POSTERS.map((poster) => (
            <Link 
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("ContactClick", { poster: poster.src })}
              key={poster.src} 
              className="poster-item group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-md sm:shadow-xl border border-black/5 aspect-[9/16] w-[260px] shrink-0 sm:w-full sm:max-w-[360px] mx-auto transition-transform duration-500 hover:translate-y-[-6px] cursor-pointer"
            >
              {/* High-quality WebP Image (quality=95 for maximum sharpness without compression artifacts) */}
              <Image
                src={poster.src}
                alt={poster.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 640px) 33vw, 260px"
                quality={95}
                priority
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
