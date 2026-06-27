"use client";

import { useRef } from "react";

import Image from "next/image";

import { useParallax } from "@/hooks/use-parallax";

interface ParallaxImageProps {
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
}

export function ParallaxImage({
  alt,
  className,
  imageClassName,
  priority = false,
  sizes,
  src,
}: ParallaxImageProps) {
  const imageRef = useRef<HTMLDivElement | null>(null);

  useParallax(imageRef, { amount: 34 });

  return (
    <div className={className}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-y-10 inset-x-0" ref={imageRef}>
          <Image
            alt={alt}
            className={imageClassName}
            fill
            priority={priority}
            sizes={sizes}
            src={src}
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
