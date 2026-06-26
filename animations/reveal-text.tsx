"use client";

import { useRef } from "react";
import type { ElementType } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

type RevealTextTag = "h1" | "h2" | "p";

interface RevealTextProps {
  as?: RevealTextTag;
  className?: string;
  lines: string[];
}

export function RevealText({
  as = "h2",
  className,
  lines,
}: RevealTextProps) {
  const rootRef = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null);
  const Component: ElementType = as;

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".reveal-line", { yPercent: 0, autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        ".reveal-line",
        { autoAlpha: 0, yPercent: 112 },
        {
          autoAlpha: 1,
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.12,
          yPercent: 0,
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <Component ref={rootRef} className={className}>
      {lines.map((line) => (
        <span className="block overflow-hidden" key={line}>
          <span className="reveal-line block will-change-transform">{line}</span>
        </span>
      ))}
    </Component>
  );
}
