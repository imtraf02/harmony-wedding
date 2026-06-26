"use client";

import { useRef } from "react";

import Link from "next/link";

import { RevealText } from "@/animations/reveal-text";
import { ParallaxImage } from "@/animations/parallax-image";
import { weddingImages } from "@/constants/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".hero-fade, .hero-image-shell", {
          autoAlpha: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        () => {
          const timeline = gsap.timeline({
            defaults: { ease: "power4.out" },
          });

          timeline
            .fromTo(
              ".hero-image-shell",
              { autoAlpha: 0, scale: 1.08 },
              { autoAlpha: 1, duration: 1.05, scale: 1 },
              0.08,
            )
            .fromTo(
              ".hero-fade",
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, duration: 0.82, stagger: 0.08, y: 0 },
              0.34,
            );
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      className="relative isolate min-h-[100dvh] overflow-hidden bg-neutral-100 text-black"
      id="home"
      ref={sectionRef}
    >
      <div className="hero-image-shell absolute inset-0 -z-10 overflow-hidden bg-neutral-200">
        <ParallaxImage
          alt="Cặp đôi bên xe cổ trong bộ ảnh cưới ngoại cảnh - Harmony Wedding"
          className="relative h-full w-full"
          imageClassName="object-cover object-[63%_center]"
          priority
          sizes="100vw"
          src={weddingImages.hero}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.86)_23%,rgba(255,255,255,0.34)_48%,rgba(255,255,255,0)_74%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.74)_0%,rgba(255,255,255,0)_34%,rgba(255,255,255,0.18)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[100dvh] max-w-[1720px] items-center px-5 pb-24 pt-32 md:px-10 lg:px-16 lg:pb-16 lg:pt-24">
        <div className="relative z-10 w-full max-w-[620px] md:ml-[7vw] lg:ml-[8vw]">
          <div className="hero-fade mb-6 flex items-center gap-4 font-serif text-sm text-black">
            <span>01</span>
            <span className="h-px w-8 bg-black/60" />
            <span>04</span>
          </div>
          <p className="hero-fade mb-6 flex items-center gap-6 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-neutral-700">
            Harmony Wedding
            <span className="h-px w-14 bg-black" />
          </p>
          <RevealText
            as="h1"
            className="font-serif text-[clamp(2.8rem,11vw,4.5rem)] md:text-[clamp(3.7rem,16vw,6.5rem)] lg:text-[clamp(4.4rem,7.2vw,8.4rem)] leading-[0.95] tracking-normal text-black pb-1"
            lines={["Timeless", "Love Stories"]}
          />
          <span className="hero-fade mt-5 block h-px w-16 bg-black/65" />
          <p className="hero-fade mt-6 max-w-[28rem] text-[0.92rem] leading-7 text-neutral-700 md:text-base md:leading-8">
            Chúng tôi lưu giữ những khoảnh khắc khiến bạn nghẹn ngào và biến
            chúng thành ký ức vượt thời gian.
          </p>
          <div className="hero-fade mt-8 flex flex-row items-center gap-4">
            <Link
              className="inline-flex h-[3rem] items-center justify-center bg-black px-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-neutral-800 md:h-[3.25rem] md:px-8 md:text-[0.72rem]"
              href="#portfolio"
            >
              Xem Album
            </Link>
            <Link
              className="inline-flex h-[3rem] items-center justify-center gap-2 px-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-black transition-colors hover:text-neutral-600 md:h-[3.25rem] md:gap-3 md:px-2 md:text-[0.72rem]"
              href="/contact"
            >
              <span className="grid size-6 place-items-center rounded-full border border-black md:size-7">
                <span className="ml-0.5 h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-black md:border-y-[5px] md:border-l-[7px]" />
              </span>
              Tư Vấn Ngay
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-5 text-[0.72rem] text-neutral-500 md:flex lg:left-10">
        {["01", "02", "03", "04"].map((item, index) => (
          <span
            className={
              index === 0
                ? "text-black before:block before:h-9 before:w-px before:bg-black before:content-['']"
                : ""
            }
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="hero-fade absolute bottom-8 left-5 flex flex-col items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-neutral-700 md:left-10 lg:left-16 lg:flex-row lg:gap-5">
        Cuộn xuống
        <span className="grid size-8 place-items-center rounded-full border border-black/20">
          <span className="h-3 w-px bg-black after:mt-2 after:block after:size-1.5 after:-translate-x-[3px] after:rotate-45 after:border-b after:border-r after:border-black after:content-['']" />
        </span>
      </div>
    </section>
  );
}
