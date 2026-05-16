"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

function ServiceShowcaseCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const images = useMemo(() => {
    const allImages = [service.hero_image, ...service.demo_images]
      .map((image) => image.trim())
      .filter(Boolean);

    return Array.from(new Set(allImages));
  }, [service.demo_images, service.hero_image]);

  const [imageIndex, setImageIndex] = useState(0);
  const activeImageIndex = images.length > 0 ? imageIndex % images.length : 0;

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = window.setInterval(() => {
      setImageIndex((current) => (current + 1) % images.length);
    }, 3400);

    return () => window.clearInterval(interval);
  }, [images.length]);

  const isEven = index % 2 === 1;

  return (
    <article
      className={cn(
        "flex flex-col items-center gap-10 md:gap-16",
        isEven ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      <Link
        href={service.detail_href || `/services/${service.slug}`}
        className="group relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-[2rem] bg-obsidian shadow-2xl"
      >
        {images.map((image, imageIndexItem) => (
          <Image
            key={image}
            src={image}
            alt={imageIndexItem === activeImageIndex ? service.title : ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover transition-[opacity,transform,filter] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              imageIndexItem === activeImageIndex
                ? "scale-105 opacity-100 blur-0"
                : "scale-100 opacity-0 blur-[2px]",
            )}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        {images.length > 1 && (
          <div className="absolute top-5 right-5 flex gap-1.5">
            {images.map((image, imageIndexItem) => (
              <span
                key={`${image}-${imageIndexItem}`}
                className={cn(
                  "h-1 rounded-full bg-white/80 shadow-sm transition-all duration-500",
                  imageIndexItem === activeImageIndex
                    ? "w-7"
                    : "w-1.5 opacity-60",
                )}
              />
            ))}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-black/10" />
            <span className="font-bold text-[10px] text-ash uppercase tracking-[0.2em]">
              {service.subtitle}
            </span>
          </div>

          <h2 className="font-light font-sans text-3xl text-obsidian leading-tight tracking-tight md:text-5xl">
            {service.title}
          </h2>
        </div>

        <p className="font-light text-lg text-smoke leading-relaxed">
          {service.description}
        </p>

        {service.features.length > 0 && (
          <ul className="grid grid-cols-1 gap-4">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-obsidian/40" />
                <span className="font-light text-ash text-sm tracking-wide">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-6 pt-2 md:gap-10">
          {service.detail_href !== "/pricing" && (
            <Link
              href={service.detail_href || `/services/${service.slug}`}
              className="group/btn inline-flex items-center gap-4 text-obsidian"
            >
              <span className="relative font-bold text-[11px] uppercase tracking-[0.25em]">
                Chi tiết dịch vụ
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-obsidian transition-transform duration-500 group-hover/btn:scale-x-100" />
              </span>
              <span className="flex size-10 items-center justify-center rounded-full border border-obsidian/10 text-lg transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:bg-obsidian group-hover/btn:text-white">
                →
              </span>
            </Link>
          )}

          <Link
            href={service.pricing_href}
            className="group/btn inline-flex items-center gap-4 text-obsidian"
          >
            <span className="relative font-bold text-[11px] uppercase tracking-[0.25em]">
              Xem bảng giá
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-obsidian transition-transform duration-500 group-hover/btn:scale-x-100" />
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-obsidian/20 text-lg transition-all duration-500 group-hover/btn:scale-110 group-hover/btn:bg-obsidian group-hover/btn:text-white">
              $
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceShowcase({ services }: { services: Service[] }) {
  return (
    <div className="flex flex-col gap-28 md:gap-32">
      {services.map((service, index) => (
        <ServiceShowcaseCard key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}
