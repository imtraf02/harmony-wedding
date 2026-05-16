'use client';
import { PHONE, ZALO_ID, FACEBOOK_URL } from '@/lib/constants';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';
import { useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   iOS 26 / visionOS  —  AUTHENTIC LIQUID GLASS
   ═══════════════════════════════════════════════════════════════════

   The real iOS glass is LIGHT, not dark.  Contrast comes from:
     • A near-pure-white specular rim at the very top edge
     • Heavy backdrop-blur that frosts whatever is behind
     • A soft diffused drop-shadow that lifts the pill off the page
     • Dark (near-black) icons on the bright surface

   Six-layer construction (bottom → top)
   ──────────────────────────────────────
   1. BLUR PLATE     backdrop-filter blur(40px) saturate(200%)
   2. TINT FILL      rgba(255,255,255, 0.38) — the glass body
   3. CONCAVE LENS   inner gradient: lighter top, darker bottom
   4. SPECULAR RIM   inset 0 1.5px 0 rgba(255,255,255,0.98)  ← THE signature
   5. CAUSTIC SMEAR  pointer-tracked radial that drifts across the face
   6. ICON           dark rgba(0,0,0, 0.72)

   No coloured glows — authentic iOS glass carries no service tints.
   ═══════════════════════════════════════════════════════════════════ */

// Zalo "ZALO" wordmark redrawn as dark paths to sit on light glass
function ZaloGlassIcon() {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 56 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Z */}
      <path
        d="M0 .5h12L0 16v2.5h14V16H3.5L16 .5V0H0v.5z"
        fill="rgba(0,0,0,0.72)"
      />
      {/* A */}
      <path
        d="M31.5 18.5h1.8V0h-2.2v16.2h-5.4c-1.8 0-3-1.4-3-5.2 0-3.8 1.2-5.2 3-5.2h1.2V3.5h-1.4C22 3.5 19 6.5 19 11c0 4.6 3 8 6.5 8l6-.5z"
        fill="rgba(0,0,0,0.72)"
      />
      {/* L */}
      <path d="M35 0v18.5h9v-2.5h-6.5V0H35z" fill="rgba(0,0,0,0.72)" />
      {/* O */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.5 3.5C45.9 3.5 43 6.8 43 11c0 4.2 2.9 7.5 6.5 7.5S56 15.2 56 11c0-4.2-2.9-7.5-6.5-7.5zm0 12.6c-2.2 0-4-2.3-4-5.1s1.8-5.1 4-5.1 4 2.3 4 5.1-1.8 5.1-4 5.1z"
        fill="rgba(0,0,0,0.72)"
      />
    </svg>
  );
}

// The single shared glass shadow — no colour tint, pure iOS
const GLASS_SHADOW = [
  // specular rim — the #1 signature of iOS liquid glass
  'inset 0 1.5px 0 rgba(255,255,255,0.98)',
  // left micro-specular
  'inset 1px 0 0 rgba(255,255,255,0.45)',
  // bottom inner shadow — creates the concave lens depth
  'inset 0 -1px 0 rgba(0,0,0,0.07)',
  // main float shadow
  '0 8px 40px rgba(0,0,0,0.13)',
  // tight close shadow
  '0 2px 6px rgba(0,0,0,0.07)',
].join(', ');

const GLASS_SHADOW_HOVER = [
  'inset 0 1.5px 0 rgba(255,255,255,0.98)',
  'inset 1px 0 0 rgba(255,255,255,0.55)',
  'inset 0 -1px 0 rgba(0,0,0,0.05)',
  '0 12px 48px rgba(0,0,0,0.17)',
  '0 4px 10px rgba(0,0,0,0.09)',
].join(', ');

function LiquidOrb({
  href,
  label,
  icon,
  delay,
  isPrimary,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  isPrimary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const rawX = useMotionValue(0.35);
  const rawY = useMotionValue(0.28);
  const sx = useSpring(rawX, { stiffness: 160, damping: 24 });
  const sy = useSpring(rawY, { stiffness: 160, damping: 24 });
  // caustic smear tracks pointer but stays subtle on light glass
  const smX = useTransform(sx, [0, 1], ['-42%', '42%']);
  const smY = useTransform(sy, [0, 1], ['-42%', '42%']);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { rawX.set(0.35); rawY.set(0.28); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, x: 28, scale: 0.68 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.1, x: -4 }}
      whileTap={{ scale: 0.88 }}
      className="group relative size-12 md:size-[54px] flex items-center justify-center rounded-full"
      style={{
        // ① BLUR PLATE + TINT FILL
        background: 'rgba(255, 255, 255, 0.38)',
        backdropFilter: 'blur(40px) saturate(200%) brightness(1.06)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.06)',
        // ② BORDER — bright white, not transparent
        border: '1px solid rgba(255,255,255,0.72)',
        // ③ SPECULAR + SHADOW stack
        boxShadow: GLASS_SHADOW,
        transition: 'box-shadow .35s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = GLASS_SHADOW_HOVER;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = GLASS_SHADOW;
      }}
    >
      {/* ④ CONCAVE LENS GRADIENT — lighter top, darker bottom */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'linear-gradient(175deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.0) 45%, rgba(0,0,0,0.04) 100%)',
        }}
      />

      {/* ⑤ CAUSTIC SMEAR — soft white blob that follows the cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 38% 28%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.12) 45%, transparent 72%)',
          x: smX,
          y: smY,
          opacity: 0.65,
        }}
      />

      {/* Subtle hover brightening */}
      <div className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'rgba(255,255,255,0.12)' }}
      />

      {/* ⑥ ICON — dark on light glass */}
      <div className="relative z-10 flex items-center justify-center">
        {icon}
      </div>

      {/* TOOLTIP — same iOS glass construction */}
      <span
        className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-2xl
          text-[10px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap
          opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-[400ms]"
        style={{
          background: 'rgba(255,255,255,0.40)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.72)',
          color: 'rgba(0,0,0,0.65)',
          boxShadow: [
            'inset 0 1.5px 0 rgba(255,255,255,0.95)',
            '0 4px 20px rgba(0,0,0,0.10)',
            '0 1px 4px rgba(0,0,0,0.06)',
          ].join(', '),
        }}
      >
        {label}
      </span>

      {/* PULSE — for primary CTA, uses glass-white ring */}
      {isPrimary && (
        <>
          <span className="absolute inset-0 rounded-full border border-black/10 animate-ping" />
          <span
            className="absolute inset-[-6px] rounded-full border border-black/05 animate-ping"
            style={{ animationDelay: '0.5s' }}
          />
        </>
      )}

      {/* TAP RIPPLE */}
      <span className="absolute inset-0 rounded-full bg-black/06 scale-0 group-active:scale-100 group-active:opacity-0 transition-all duration-500" />
    </motion.a>
  );
}

export function FloatingContact() {
  const items = [
    {
      id: 'messenger',
      icon: (
        <MessageCircle
          className="size-5"
          strokeWidth={1.8}
          style={{ color: 'rgba(0,0,0,0.72)', filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.6))' }}
        />
      ),
      href: FACEBOOK_URL,
      label: 'Messenger',
      isPrimary: true,
    },
    {
      id: 'phone',
      icon: (
        <Phone
          className="size-5"
          strokeWidth={1.8}
          style={{ color: 'rgba(0,0,0,0.72)', filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.6))' }}
        />
      ),
      href: `tel:${PHONE}`,
      label: 'Gọi ngay',
    },
    {
      id: 'zalo',
      icon: <ZaloGlassIcon />,
      href: `https://zalo.me/${ZALO_ID}`,
      label: 'Zalo',
    }
  ];

  return (
    <div
      className="fixed bottom-8 right-6 md:bottom-12 md:right-10 z-[70] flex flex-col gap-3"
      aria-label="Liên hệ nhanh"
    >
      {items.map((item, idx) => (
        <LiquidOrb
          key={item.id}
          href={item.href}
          label={item.label}
          icon={item.icon}
          delay={idx * 0.13}
          isPrimary={item.isPrimary}
        />
      ))}
    </div>
  );
}