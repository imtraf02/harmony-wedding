/* eslint-disable */
"use client";

import { useEffect, useState } from "react";

interface MeshGradientProps {
  className?: string;
  variant?: "light" | "dark";
}

export function MeshGradient({ className = "", variant = "light" }: MeshGradientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`absolute inset-0 -z-20 ${className} bg-neutral-50`} />;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-20 ${className}`}>
      {/* Base layer */}
      <div className={`absolute inset-0 transition-colors duration-700 ${
        variant === "dark" ? "bg-neutral-950" : "bg-[#fcfbfc]"
      }`} />

      {/* Floating Light Mesh Spheres */}
      <div className="absolute inset-0 opacity-70 blur-[130px] md:blur-[160px] will-change-transform">
        {/* Champagne sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: "65vw",
            height: "65vw",
            top: "-15%",
            left: "-10%",
            background: variant === "dark" 
              ? "radial-gradient(circle, rgba(94, 76, 50, 0.25) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(245, 230, 209, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "float-slow 28s infinite alternate ease-in-out",
          }}
        />

        {/* Blush Rose sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: "55vw",
            height: "55vw",
            bottom: "-10%",
            right: "-5%",
            background: variant === "dark"
              ? "radial-gradient(circle, rgba(120, 68, 80, 0.22) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(252, 218, 222, 0.75) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "float-medium 22s infinite alternate-reverse ease-in-out",
          }}
        />

        {/* Platinum Silver sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: "50vw",
            height: "50vw",
            top: "30%",
            left: "25%",
            background: variant === "dark"
              ? "radial-gradient(circle, rgba(50, 62, 75, 0.3) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(226, 232, 240, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "float-fast 18s infinite alternate ease-in-out",
          }}
        />

        {/* Subtle ivory highlight sphere */}
        <div
          className="absolute rounded-full"
          style={{
            width: "40vw",
            height: "40vw",
            bottom: "35%",
            left: "-15%",
            background: variant === "dark"
              ? "radial-gradient(circle, rgba(60, 50, 40, 0.15) 0%, rgba(0, 0, 0, 0) 70%)"
              : "radial-gradient(circle, rgba(255, 250, 240, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "float-slow 35s infinite alternate-reverse ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
