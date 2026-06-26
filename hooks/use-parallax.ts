"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

interface UseParallaxOptions {
  amount?: number;
  disabledBelow?: number;
}

export function useParallax<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  options: UseParallaxOptions = {},
) {
  const { amount = 54, disabledBelow = 768 } = options;

  useGSAP(
    () => {
      const target = targetRef.current;

      if (!target) {
        return;
      }

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion || window.innerWidth < disabledBelow) {
        gsap.set(target, { y: 0 });
        return;
      }

      const media = gsap.matchMedia();

      media.add(`(min-width: ${disabledBelow}px)`, () => {
        gsap.fromTo(
          target,
          { y: -amount },
          {
            ease: "none",
            scrollTrigger: {
              trigger: target,
              scrub: 1.1,
              start: "top bottom",
              end: "bottom top",
            },
            y: amount,
          },
        );
      });

      return () => media.revert();
    },
    { dependencies: [amount, disabledBelow], scope: targetRef },
  );
}
