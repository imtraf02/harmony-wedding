"use client";

import React, { ForwardedRef, forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "mixed";
  intensity?: "low" | "medium" | "high";
  hoverable?: boolean;
  borderStrength?: "low" | "medium" | "high";
}

export const GlassCard = forwardRef(
  (
    {
      children,
      className = "",
      variant = "light",
      intensity = "medium",
      hoverable = false,
      borderStrength = "medium",
      ...props
    }: GlassCardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // Determine background opacities and blur intensities based on configuration
    const blurClass = {
      low: "backdrop-blur-sm",
      medium: "backdrop-blur-md",
      high: "backdrop-blur-xl md:backdrop-blur-2xl",
    }[intensity];

    const bgClass = {
      light: {
        low: "bg-white/40",
        medium: "bg-white/60",
        high: "bg-white/75",
      },
      dark: {
        low: "bg-neutral-900/35",
        medium: "bg-neutral-900/50",
        high: "bg-neutral-950/70",
      },
      mixed: {
        low: "bg-white/25 dark:bg-neutral-900/30",
        medium: "bg-white/45 dark:bg-neutral-900/50",
        high: "bg-white/65 dark:bg-neutral-950/70",
      },
    }[variant][intensity];

    const borderClass = {
      light: {
        low: "border-white/10",
        medium: "border-white/25",
        high: "border-white/40",
      },
      dark: {
        low: "border-white/5",
        medium: "border-white/12",
        high: "border-white/20",
      },
      mixed: {
        low: "border-white/10 dark:border-white/5",
        medium: "border-white/20 dark:border-white/10",
        high: "border-white/35 dark:border-white/18",
      },
    }[variant][borderStrength];

    // Refraction inner shadow
    const innerShadowClass = variant === "dark"
      ? "shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.25)]"
      : "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_40px_rgba(0,0,0,0.04)]";

    const hoverClass = hoverable
      ? "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:border-white/25 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
      : "transition-all duration-300";

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-2xl border ${borderClass} ${bgClass} ${blurClass} ${innerShadowClass} ${hoverClass} ${className}`}
        {...props}
      >
        {/* Ambient liquid highlight sweep overlay inside the card (sheen effect) */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.06] bg-linear-to-tr from-transparent via-white to-transparent" />
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
