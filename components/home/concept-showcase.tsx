"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";

const CONCEPTS = [
  { src: "/images/home/concept-1.webp", alt: "Mẫu Concept Phóng Sự Cưới 1 - Harmony Wedding" },
  { src: "/images/home/concept-2.webp", alt: "Mẫu Concept Phóng Sự Cưới 2 - Harmony Wedding" },
  { src: "/images/home/concept-3.webp", alt: "Mẫu Concept Phóng Sự Cưới 3 - Harmony Wedding" },
  { src: "/images/home/concept-4.webp", alt: "Mẫu Concept Phóng Sự Cưới 4 - Harmony Wedding" },
  { src: "/images/home/concept-5.webp", alt: "Mẫu Concept Phóng Sự Cưới 5 - Harmony Wedding" },
  { src: "/images/home/concept-6.webp", alt: "Mẫu Concept Phóng Sự Cưới 6 - Harmony Wedding" }
];

export function ConceptShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const messengerUrl = siteConfig.links.messenger;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".concept-item", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".concept-item",
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
      id="signature-concepts"
    >
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        {/* Responsive Grid — 3 columns on desktop, 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {CONCEPTS.map((concept) => (
            <Link 
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("ContactClick", { concept: concept.src })}
              key={concept.src} 
              className="concept-item group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-md sm:shadow-xl border border-black/5 aspect-[9/16] w-full max-w-[360px] mx-auto transition-transform duration-500 hover:translate-y-[-6px] cursor-pointer"
            >
              {/* High-quality WebP Image (quality=95 for maximum sharpness without bloat) */}
              <Image
                src={concept.src}
                alt={concept.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, 50vw"
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
