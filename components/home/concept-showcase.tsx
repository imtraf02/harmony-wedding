"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";

const CONCEPTS = [
  {
    src: "/images/services/phong-su-cuoi.jpg",
    alt: "Poster Chụp ảnh phóng sự cưới - Harmony Wedding"
  },
  {
    src: "/images/services/phong-su-ngay-cuoi.jpg",
    alt: "Poster Happy Wedding Day - Harmony Wedding"
  },
  {
    src: "/images/services/concept-studio.jpg",
    alt: "Poster Váy cưới Harmony Wedding"
  }
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
          stagger: 0.15,
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
        {/* Clean Concept Poster Cards Grid — No headers or overlay text */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {CONCEPTS.map((concept) => (
            <Link 
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("ContactClick", { concept: concept.src })}
              key={concept.src} 
              className="concept-item group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100 shadow-md sm:shadow-xl border border-black/5 aspect-[9/16] w-full max-w-[360px] mx-auto transition-transform duration-500 hover:translate-y-[-6px] cursor-pointer"
            >
              {/* Raw Background Image */}
              <Image
                src={concept.src}
                alt={concept.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
