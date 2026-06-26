"use client";

import type { RefObject } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

export function useScrollReveal<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  selector = "[data-reveal]",
) {
  useGSAP(
    () => {
      const scope = scopeRef.current;

      if (!scope) {
        return;
      }

      const elements = gsap.utils.toArray<HTMLElement>(selector, scope);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(elements, { autoAlpha: 1, y: 0 });
        return;
      }

      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            duration: 1.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
            y: 0,
          },
        );
      });
    },
    { scope: scopeRef },
  );
}
