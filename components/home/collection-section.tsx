"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { gsap, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

export interface CollectionPreviewImage {
  src: string;
  label: string;
}

export function CollectionSection({ previewImages }: { previewImages: CollectionPreviewImage[] }) {
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
    <section className="relative isolate overflow-hidden py-20 lg:py-28 bg-[#faf9f6]" ref={sectionRef}>

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
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-14">
          {previewImages.map((img) => (
            <Link
              href="/mau-do"
              key={img.src}
              className="collection-reveal block"
            >
              <GlassCard
                variant="light"
                intensity="low"
                borderStrength="low"
                hoverable
                className="group relative aspect-[3/4] w-full overflow-hidden border border-white/30 bg-white/20 shadow-xs cursor-pointer rounded-2xl"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={`Mẫu váy thiết kế Harmony Wedding - ${img.label}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1200px) 16vw, (min-width: 768px) 33vw, 50vw"
                    quality={85}
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white">
                    {img.label} ➔
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* CTA Link Button */}
        <div className="collection-reveal text-center">
          <GlassButton
            variant="light"
            href="/mau-do"
            className="!px-10 border-black/10 hover:border-black/30"
          >
            Xem Thư Viện Váy & Áo Dài
          </GlassButton>
        </div>

      </div>
    </section>
  );
}
