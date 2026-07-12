"use client";

import { useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function ContactCta() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollReveal(sectionRef);

  return (
    <section
      className="relative isolate min-h-[78vh] overflow-hidden bg-black py-20 text-white md:py-32"
      id="contact"
      ref={sectionRef}
    >
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:96px_96px]" />
      <div className="relative mx-auto grid max-w-[1500px] gap-16 px-5 md:px-10 lg:grid-cols-[1fr_0.42fr] lg:px-16">
        <div data-reveal>
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/60">
            Liên hệ với chúng tôi
            <span className="h-px w-16 bg-white" />
          </p>
          <h2 className="max-w-5xl font-serif text-[clamp(2.7rem,12vw,4.6rem)] leading-[0.96] lg:text-[clamp(3rem,7vw,8.2rem)] lg:leading-[0.9]">
            Chúng Tôi Luôn Sẵn Sàng Lắng Nghe Và Đồng Hành Cùng Bạn
          </h2>
          <Link
            className="mt-10 inline-flex h-14 w-full items-center justify-center bg-white px-9 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-neutral-200 sm:w-auto"
            href={`tel:${siteConfig.links.phone}`}
          >
            Đặt Lịch Tư Vấn
          </Link>
        </div>

        <div
          className="self-end border-t border-white/18 pt-8 text-sm leading-8 text-white/72 lg:border-l lg:border-t-0 lg:pl-10"
          data-reveal
        >
          <p>
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/38">
              Hotline
            </span>
            {siteConfig.links.phone} · {siteConfig.links.phoneSecondary}
          </p>
          <p className="mt-7">
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/38">
              Zalo
            </span>
            {siteConfig.links.phone} (Gia Hân)
          </p>
          <p className="mt-7">
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/38">
              Facebook
            </span>
            Harmony Wedding
          </p>
          <p className="mt-7">
            <span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/38">
              Studio
            </span>
            {siteConfig.address}
          </p>
        </div>
      </div>
    </section>
  );
}
