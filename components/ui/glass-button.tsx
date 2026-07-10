"use client";

import React from "react";
import Link from "next/link";

interface GlassButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "light" | "dark" | "gold";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export function GlassButton({
  children,
  className = "",
  onClick,
  href,
  type = "button",
  variant = "light",
  disabled = false,
  target,
  rel,
}: GlassButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.22em] whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-hidden active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

  const variantClasses = {
    light:
      "border border-white/20 bg-white/12 text-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_30px_rgba(0,0,0,0.02)] backdrop-blur-md hover:border-white/40 hover:bg-white/22 hover:text-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]",
    dark:
      "border border-white/8 bg-neutral-900/60 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md hover:border-white/20 hover:bg-neutral-900/80 hover:text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]",
    gold:
      "border border-amber-500/20 bg-amber-500/10 text-amber-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_30px_rgba(180,120,50,0.04)] backdrop-blur-md hover:border-amber-500/35 hover:bg-amber-500/20 hover:text-amber-950 hover:shadow-[0_12px_40px_rgba(180,120,50,0.12)] dark:text-amber-200 dark:hover:text-amber-100",
  }[variant];

  const content = (
    <>
      {/* Liquid sheen sweep overlay */}
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  );
}
