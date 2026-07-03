"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const PREVIEW_IMAGES = [
  { src: "vay-cuoi-001.webp", label: "Váy Cưới Signature" },
  { src: "vay-cuoi-002.webp", label: "Váy Cưới Premium" },
  { src: "ao-dai-003.webp", label: "Áo Dài Thêu Tay" },
  { src: "vay-cuoi-005.webp", label: "Váy Cưới Diamond" },
  { src: "vay-cuoi-006.webp", label: "Váy Cưới Luxury" },
  { src: "ao-dai-008.webp", label: "Áo Dài Truyền Thống" }
];

export function CollectionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".collection-reveal", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".collection-reveal",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          duration: 0.9,
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
    <section className="bg-neutral-50 py-20 lg:py-28" ref={sectionRef}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="collection-reveal mb-14 text-center">
          <p className="mb-4 flex items-center justify-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Harmony Soiree
            <span className="h-px w-8 bg-neutral-300" />
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,6vw,3.6rem)] leading-[1.1] text-black">
            Kiệt Tác Váy Cưới Cho Ngày Trọng Đại
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-600">
            Khám phá bộ sưu tập váy cưới thiết kế cao cấp dòng Harmony Soiree, cùng các mẫu áo dài truyền thống thêu tay tỉ mỉ và sang trọng nhất.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-14">
          {PREVIEW_IMAGES.map((img, idx) => (
            <Link
              href="/mau-do"
              key={img.src}
              className="collection-reveal group relative aspect-[3/4] w-full overflow-hidden border border-black/5 bg-white shadow-xs transition-all duration-500 hover:shadow-md cursor-pointer"
            >
              <Image
                src={`/images/mau-do/${img.src}`}
                alt={`Mẫu váy thiết kế Harmony Wedding - ${img.label}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-103"
                sizes="(min-width: 1200px) 16vw, (min-width: 768px) 33vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[0.62rem] font-bold uppercase tracking-wider text-white">
                  {img.label} ➔
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Link Button */}
        <div className="collection-reveal text-center">
          <Link
            className="inline-flex items-center justify-center border border-black px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white transition-all duration-300"
            href="/mau-do"
          >
            Xem Thư Viện Váy & Áo Dài
          </Link>
        </div>

      </div>
    </section>
  );
}
