import Link from "next/link";
import { footerLinks } from "@/data/navigation";
import {
  FACEBOOK_URL,
  PHONE,
  STUDIO_ADDRESS,
  STUDIO_NAME,
  TIKTOK_URL,
  ZALO_ID,
} from "@/lib/constants";

/* ─────────────────────────────────────────────────────────────
   Art Deco Luxury Editorial Footer
   
   Signature element: studio name as a full-width typographic
   watermark — barely-there, spanning the entire footer top.
   
   Ornament system: thin obsidian rules + diamond dividers.
   Layout: 12-col asymmetric grid with generous negative space.
───────────────────────────────────────────────────────────── */

function ObsidianDiamond() {
  return (
    <span
      className="inline-block size-[5px] shrink-0 rotate-45 bg-ivory"
      aria-hidden="true"
    />
  );
}

function OrnamentRule() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-ivory/20" />
      <ObsidianDiamond />
      <span className="h-px w-10 bg-ivory/55" />
      <ObsidianDiamond />
      <span className="h-px flex-1 bg-ivory/20" />
    </div>
  );
}

// Zalo icon redrawn as ivory paths
function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="11"
      viewBox="0 0 56 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 .5h12L0 16v2.5h14V16H3.5L16 .5V0H0v.5z" fill="currentColor" />
      <path
        d="M31.5 18.5h1.8V0h-2.2v16.2h-5.4c-1.8 0-3-1.4-3-5.2 0-3.8 1.2-5.2 3-5.2h1.2V3.5h-1.4C22 3.5 19 6.5 19 11c0 4.6 3 8 6.5 8l6-.5z"
        fill="currentColor"
      />
      <path d="M35 0v18.5h9v-2.5h-6.5V0H35z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M49.5 3.5C45.9 3.5 43 6.8 43 11c0 4.2 2.9 7.5 6.5 7.5S56 15.2 56 11c0-4.2-2.9-7.5-6.5-7.5zm0 12.6c-2.2 0-4-2.3-4-5.1s1.8-5.1 4-5.1 4 2.3 4 5.1-1.8 5.1-4 5.1z"
        fill="currentColor"
      />
    </svg>
  );
}

// TikTok icon — ivory paths
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.2-.82.41-1.4 1.25-1.55 2.15-.09.76-.04 1.54.21 2.27.35.85 1.07 1.54 1.92 1.87.74.29 1.55.32 2.33.12.82-.2 1.57-.69 2.05-1.38.31-.47.46-1.01.5-1.57.02-2.31.01-4.62.01-6.93 0-3.95-.02-7.9 0-11.85z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: FACEBOOK_URL,
    label: "Facebook",
    icon: (
      <svg
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: TIKTOK_URL,
    label: "TikTok",
    icon: <TikTokIcon />,
  },
  {
    href: `https://zalo.me/${ZALO_ID}`,
    label: "Zalo",
    icon: <ZaloIcon />,
  },
  {
    href: `tel:${PHONE}`,
    label: "Điện thoại",
    icon: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const GOOGLE_MAP_URL = "https://maps.app.goo.gl/Ny9QSqj9tk5o5C7Z7";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-ivory/5 border-t bg-obsidian text-ivory">
      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* ── Top vignette fade ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-60"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      {/* ══════════════════════════════════════════════════════
          WATERMARK — full-width studio name behind everything
      ══════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex select-none items-start justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="whitespace-nowrap font-black font-sans text-ivory uppercase leading-none tracking-[0.28em]"
          style={{
            fontSize: "clamp(80px, 14vw, 200px)",
            opacity: 0.028,
            transform: "translateY(-8%)",
            letterSpacing: "0.22em",
          }}
        >
          {STUDIO_NAME}
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-0 sm:px-8 lg:px-12">
        {/* Top ornament */}
        <OrnamentRule />

        {/* ── Grid ── */}
        <div className="mt-20 mb-20 grid grid-cols-12 gap-x-8 gap-y-16 text-center md:text-left">
          {/* Brand — 4 cols */}
          <div className="col-span-12 flex flex-col items-center gap-8 md:col-span-4 md:items-start">
            {/* Studio name */}
            <div>
              <Link
                href="/"
                className="group inline-block"
                aria-label={`${STUDIO_NAME} — trang chủ`}
              >
                <span className="mb-2 block font-semibold text-[11px] text-ivory/75 uppercase tracking-[0.55em] transition-opacity duration-500 group-hover:opacity-100">
                  Studio
                </span>
                <span className="block font-black font-sans text-3xl text-ivory uppercase tracking-[0.24em] transition-opacity duration-500 group-hover:opacity-80">
                  {STUDIO_NAME}
                </span>
              </Link>
            </div>

            {/* Thin obsidian rule */}
            <span className="block h-px w-12 bg-ivory/55" aria-hidden="true" />

            {/* Tagline */}
            <p className="max-w-xs font-light text-[13px] text-ivory/75 leading-[1.9]">
              Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ
              điệu cuối cùng.
            </p>

            {/* Address */}
            <div className="flex items-center gap-3 font-light text-[12px] text-ivory/60 italic">
              <ObsidianDiamond />
              <address className="not-italic">{STUDIO_ADDRESS}</address>
            </div>

            {/* Social row */}
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden border border-ivory/25 text-ivory/80 transition-all duration-500 hover:scale-110 hover:border-ivory hover:text-obsidian active:scale-95"
                >
                  {/* High-contrast Ivory fill on hover */}
                  <span className="absolute inset-0 scale-0 bg-ivory transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100" />
                  <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Spacer — 1 col */}
          <div className="hidden md:col-span-1 md:block" />

          {/* Links — 7 cols split into 3 sub-columns */}
          <div className="col-span-12 grid grid-cols-1 gap-12 sm:grid-cols-3 md:col-span-7 md:gap-8">
            {footerLinks.map((section) => (
              <div key={section.heading}>
                <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
                  <ObsidianDiamond />
                  <h3 className="font-bold text-[9px] text-ivory uppercase tracking-[0.45em]">
                    {section.heading}
                  </h3>
                </div>
                <ul className="space-y-[18px]">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-center gap-2 text-[12px] text-ivory/75 tracking-[0.06em] transition-all duration-400 hover:text-ivory md:justify-start"
                      >
                        <span className="block h-px w-0 shrink-0 bg-ivory transition-all duration-400 group-hover:w-3" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact column */}
            <div>
              <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
                <ObsidianDiamond />
                <h3 className="font-bold text-[9px] text-ivory uppercase tracking-[0.45em]">
                  Liên hệ
                </h3>
              </div>
              <ul className="space-y-[18px]">
                <li>
                  <a
                    href={`tel:${PHONE}`}
                    className="group flex items-center justify-center gap-2 text-[12px] text-ivory/75 tracking-[0.06em] transition-all duration-400 hover:text-ivory md:justify-start"
                  >
                    <span className="block h-px w-0 shrink-0 bg-ivory transition-all duration-400 group-hover:w-3" />
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a
                    href={GOOGLE_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 text-[12px] text-ivory/75 tracking-[0.06em] transition-all duration-400 hover:text-ivory md:justify-start"
                  >
                    <span className="block h-px w-0 shrink-0 bg-ivory transition-all duration-400 group-hover:w-3" />
                    <span className="max-w-[200px] truncate">
                      {STUDIO_ADDRESS}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://zalo.me/${ZALO_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 text-[12px] text-ivory/75 tracking-[0.06em] transition-all duration-400 hover:text-ivory md:justify-start"
                  >
                    <span className="block h-px w-0 shrink-0 bg-ivory transition-all duration-400 group-hover:w-3" />
                    Zalo Chat
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="group flex items-center justify-center gap-2 text-[12px] text-ivory/75 tracking-[0.06em] transition-all duration-400 hover:text-ivory md:justify-start"
                  >
                    <span className="block h-px w-0 shrink-0 bg-ivory transition-all duration-400 group-hover:w-3" />
                    Gửi lời nhắn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom ornament */}
        <OrnamentRule />

        {/* ── Copyright bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-[9px] text-ivory/45 uppercase tracking-[0.5em]">
            © {year} {STUDIO_NAME}
          </p>

          <p className="text-[9px] text-ivory/45 uppercase tracking-[0.4em]">
            Crafted with Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
