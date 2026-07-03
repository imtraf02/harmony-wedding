"use client";

import { useRef } from "react";
import Link from "next/link";

import { services } from "@/constants/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { Icon } from "@/components/home/icon";

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
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
          stagger: 0.12,
          y: 0,
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className="bg-neutral-950 text-white" id="services" ref={sectionRef}>
      <div className="mx-auto max-w-[1720px] px-5 pt-12 md:px-10 lg:hidden">
        <p className="flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
          Dịch vụ của chúng tôi
          <span className="h-px flex-1 bg-white/15" />
        </p>
      </div>
      <div className="mx-auto grid max-w-[1720px] grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-2 sm:divide-y-0 md:px-10 lg:grid-cols-5 lg:gap-y-4 lg:px-16 lg:py-10">
        {services.map((service, index) => (
          <Link
            href="/services"
            className={`service-item flex items-center gap-5 py-6 md:p-6 lg:min-h-24 lg:p-8 cursor-pointer hover:bg-white/5 transition-all duration-300 ${
              index >= 4 ? "hidden sm:flex" : "flex"
            } ${
              index % 5 !== 4 && index !== services.length - 1 ? "lg:border-r lg:border-white/10" : ""
            } ${
              index < 5 ? "lg:border-b lg:border-white/10" : ""
            }`}
            key={service.title}
          >
            <Icon className="size-8 shrink-0 text-white" name={service.icon} />
            <div>
              <h2 className="text-[0.78rem] font-semibold uppercase tracking-[0.24em]">
                {service.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile view-more button */}
      <div className="flex sm:hidden justify-center pb-10 px-5">
        <Link
          href="/services"
          className="w-full flex h-12 items-center justify-center border border-white/20 hover:border-white text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300"
        >
          Xem tất cả dịch vụ
        </Link>
      </div>
    </section>
  );
}
