"use client";

import { useRef } from "react";
import Link from "next/link";

import { services } from "@/constants/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/home/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";

export function ServicesBar() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".service-item", { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".service-item",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          duration: 0.85,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
          stagger: 0.08,
          y: 0,
        }
      );
    },
    { scope: sectionRef }
  );

  // Take the first 5 services to show in the bar, or map all of them beautifully
  const displayServices = services.slice(0, 5);

  return (
    <section 
      className="relative isolate overflow-hidden bg-neutral-950 py-12 md:py-16 text-white" 
      id="services" 
      ref={sectionRef}
    >
      {/* Dark moving mesh gradient underneath */}
      <MeshGradient variant="dark" className="opacity-40" />

      <div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-white/50">
            Dịch vụ của chúng tôi
            <span className="h-px w-16 bg-white/15" />
          </p>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors duration-300"
          >
            Tất cả dịch vụ ➔
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pt-2 pb-4 scrollbar-none -mx-5 px-5 sm:grid sm:grid-cols-2 sm:mx-0 sm:px-0 lg:grid-cols-5">
          {displayServices.map((service) => (
            <Link href="/services" key={service.title} className="service-item block shrink-0 w-[285px] sm:w-auto">
              <GlassCard
                variant="dark"
                intensity="low"
                borderStrength="low"
                hoverable
                className="flex items-center gap-5 p-6 h-24 border border-white/8 hover:border-white/20 hover:bg-white/10 group cursor-pointer"
              >
                <div className="grid size-12 shrink-0 place-items-center rounded-full bg-white/5 text-white/80 group-hover:bg-white/15 group-hover:text-white transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <Icon className="size-6 transition-transform duration-500 group-hover:scale-108" name={service.icon} />
                </div>
                <div>
                  <h3 className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-[0.64rem] text-neutral-400 line-clamp-1 group-hover:text-neutral-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* Mobile View More */}
        <div className="mt-8 flex sm:hidden justify-center">
          <Link
            href="/services"
            className="w-full flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition-all duration-300"
          >
            Xem tất cả dịch vụ
          </Link>
        </div>
      </div>
    </section>
  );
}
