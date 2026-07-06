"use client";

import { useRef } from "react";

import { testimonials } from "@/constants/data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useScrollReveal(sectionRef);

  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 py-24 text-white md:py-32" ref={sectionRef}>
      {/* Dark moving mesh gradient in background */}
      <MeshGradient variant="dark" className="opacity-45" />

      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div data-reveal>
            <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-white/50">
              Cảm nhận
              <span className="h-px w-16 bg-white/20" />
            </p>
            <h2 className="max-w-3xl font-serif text-[clamp(2.45rem,4.5vw,5rem)] leading-[0.98]">
              Khi Kỷ Niệm Được Nhìn Lại Bằng Sự An Tâm
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <GlassCard
              key={item.name}
              variant="dark"
              intensity="medium"
              borderStrength="low"
              hoverable
              className="flex flex-col justify-between p-8 border border-white/8 hover:border-white/18 shadow-lg rounded-2xl"
              data-reveal
            >
              <div>
                <span className="block font-serif text-5xl leading-none text-white/20 mb-4">“</span>
                <blockquote className="font-serif text-[1.12rem] font-light leading-relaxed text-white/90 italic">
                  {item.quote}
                </blockquote>
              </div>
              <div className="mt-8 border-t border-white/8 pt-5">
                <cite className="font-serif text-[1.1rem] not-italic font-medium text-white block">
                  {item.name}
                </cite>
                <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  {item.role}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
