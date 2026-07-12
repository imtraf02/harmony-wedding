"use client";

import { useRef } from "react";
import Link from "next/link";

import { RevealText } from "@/animations/reveal-text";
import { ParallaxImage } from "@/animations/parallax-image";
import { gsap, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { trackContactChannel } from "@/lib/tracking";

export function HeroSection({ heroImage }: { heroImage: string }) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".hero-fade, .hero-image-shell, .hero-card-container", {
          autoAlpha: 1,
          scale: 1,
          y: 0,
        });
        return;
      }

      const media = gsap.matchMedia();
      const listeners: Array<{ btn: HTMLElement; type: string; handler: EventListenerOrEventListenerObject }> = [];

      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (contextData) => {
          const isMobile = contextData.conditions?.mobile;

          const timeline = gsap.timeline({
            defaults: { ease: "power4.out" },
          });

          timeline
            .fromTo(
              ".hero-image-shell",
              { autoAlpha: 0, scale: 1.08 },
              { autoAlpha: 1, duration: 1.2, scale: 1 },
              0.08
            )
            .fromTo(
              ".hero-card-container",
              { autoAlpha: 0, y: 40, scale: 0.98 },
              { autoAlpha: 1, duration: 1.05, y: 0, scale: 1 },
              0.25
            )
            .fromTo(
              ".hero-fade",
              { autoAlpha: 0, y: 15 },
              { autoAlpha: 1, duration: 0.75, stagger: 0.06, y: 0 },
              0.55
            );

          if (!isMobile) {
            // High-fidelity magnetic hover physics for primary buttons on desktop
            const magneticBtns = gsap.utils.toArray<HTMLElement>(".hero-magnetic-btn");
            
            magneticBtns.forEach((btn) => {
              const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
              const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });

              const onMouseMove = (e: MouseEvent) => {
                const rect = btn.getBoundingClientRect();
                const btnX = rect.left + rect.width / 2;
                const btnY = rect.top + rect.height / 2;
                const distanceX = e.clientX - btnX;
                const distanceY = e.clientY - btnY;
                
                // Spring follow within a 30% ratio
                xTo(distanceX * 0.3);
                yTo(distanceY * 0.3);
              };

              const onMouseLeave = () => {
                xTo(0);
                yTo(0);
              };

              btn.addEventListener("mousemove", onMouseMove as EventListener);
              btn.addEventListener("mouseleave", onMouseLeave as EventListener);

              listeners.push(
                { btn, type: "mousemove", handler: onMouseMove as EventListener },
                { btn, type: "mouseleave", handler: onMouseLeave as EventListener }
              );
            });
          }
        }
      );

      return () => {
        media.revert();
        // Manual cleanup of event listeners to avoid context recursion issues
        listeners.forEach(({ btn, type, handler }) => {
          btn.removeEventListener(type, handler);
        });
      };
    },
    { scope: sectionRef }
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
          src={heroImage}
        />
        {/* Ambient champagne blush mesh overlaying the photography */}
        <MeshGradient variant="light" className="opacity-35 mix-blend-color-burn" />
        
        {/* Refractive gradient masks */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.72)_25%,rgba(255,255,255,0.1)_55%,rgba(255,255,255,0)_85%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_35%,rgba(255,255,255,0.25)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[100dvh] max-w-[1720px] items-center px-4 pb-24 pt-32 md:px-10 lg:px-16 lg:pb-16 lg:pt-24">
        <div className="hero-card-container w-full max-w-[640px] md:ml-[7vw] lg:ml-[8vw]">
          <GlassCard
            variant="light"
            intensity="medium"
            borderStrength="medium"
            className="w-full px-6 py-8 md:px-12 md:py-14 border border-white/30 shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-3xl"
          >
            <p className="hero-fade mb-5 flex items-center gap-6 text-[0.68rem] font-bold uppercase tracking-[0.32em] text-neutral-700">
              Harmony Wedding
              <span className="h-px w-14 bg-neutral-400" />
            </p>
            
            <RevealText
              as="h1"
              className="font-serif text-[clamp(1.85rem,7.5vw,3rem)] md:text-[clamp(3.2rem,14vw,5.5rem)] lg:text-[clamp(3.8rem,6.5vw,7rem)] leading-[1.15] tracking-normal text-black pb-1"
              lines={["Khoảnh Khắc Cưới", "Tự Nhiên & Tinh Tế"]}
            />
            
            <span className="hero-fade mt-5 block h-px w-16 bg-neutral-300" />
            
            <p className="hero-fade mt-6 max-w-[28rem] text-[0.92rem] leading-7 text-neutral-600 md:text-[0.98rem] md:leading-8">
              Tụi mình chụp theo cách hai bạn thật sự sống — không pose cứng, không cảm xúc giả tạo. Chỉ là hai bạn, đúng như ngày đó.
            </p>
            
            <div className="hero-fade mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <GlassButton
                variant="dark"
                href="https://m.me/61550358332202?ref=tu_van_15phut"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-magnetic-btn w-full sm:w-auto !py-3.5 !px-8 !whitespace-normal !tracking-wider text-center"
                onClick={() => trackContactChannel("Messenger", "https://m.me/61550358332202?ref=tu_van_15phut")}
              >
                Đặt lịch tư vấn 15 phút
              </GlassButton>
              <Link
                href="#portfolio"
                className="group/link hero-magnetic-btn flex items-center justify-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neutral-800 hover:text-neutral-500 transition-colors py-3"
              >
                Xem album tác phẩm
                <span className="font-serif text-sm transition-transform duration-300 group-hover/link:translate-x-1">➔</span>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
