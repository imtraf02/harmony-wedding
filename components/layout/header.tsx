"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { navLinks } from "@/data/navigation";
import { EMAIL, PHONE, STUDIO_ADDRESS, STUDIO_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface NavChild {
  href: string;
  label: string;
}
interface NavLink {
  href: string;
  label: string;
  children?: NavChild[];
}

/* ─────────────────────────────────────────────
   Obsidian Divider — decorative hairline
───────────────────────────────────────────── */
function _GrayLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-px w-6 bg-linear-to-r from-transparent via-ash/50 to-transparent opacity-60",
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────────
   Desktop Dropdown
───────────────────────────────────────────── */
function DesktopDropdown({
  items,
  open,
}: {
  items: NavChild[];
  open: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-[calc(100%+16px)] left-1/2 w-52 -translate-x-1/2",
        "border border-luxury-border bg-ivory",
        "shadow-[0_8px_40px_oklch(0.1_0_0/0.10),0_2px_8px_oklch(0.1_0_0/0.06)]",
        "overflow-hidden",
        "origin-top transition-all duration-500",
        open
          ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
          : "pointer-events-none -translate-y-1 scale-y-95 opacity-0",
      )}
      role="menu"
      aria-hidden={!open}
    >
      {/* top obsidian accent */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-ash/40 to-transparent opacity-70" />

      <ul className="py-2">
        {items.map((child, i) => (
          <li key={child.href}>
            <Link
              href={child.href}
              role="menuitem"
              className={cn(
                "group flex items-center gap-3 px-5 py-3",
                "font-bold font-sans text-[9px] uppercase tracking-[0.22em]",
                "text-smoke hover:text-obsidian",
                "transition-colors duration-300",
                "hover:bg-champagne",
                i !== items.length - 1 && "border-luxury-border-fine border-b",
              )}
            >
              <span className="h-px w-0 shrink-0 bg-ash/50 transition-all duration-300 group-hover:w-3" />
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Mobile Menu
───────────────────────────────────────────── */
function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const expandableLinks = useMemo(
    () =>
      links.filter((link) => link.children?.length).map((link) => link.href),
    [links],
  );
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setExpandedItems(expandableLinks);
    } else {
      document.body.style.overflow = "";
      setExpandedItems([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, expandableLinks]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] bg-obsidian/40 backdrop-blur-md lg:hidden",
          "transition-opacity duration-700 ease-in-out",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      {/* Drawer — slides in from right */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[100] h-full w-full max-w-[85%] bg-ivory shadow-2xl sm:max-w-md lg:hidden",
          "flex flex-col",
          "cubic-bezier(0.16, 1, 0.3, 1) transition-transform duration-700",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Mobile navigation"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="font-bold font-sans text-[10px] text-obsidian uppercase tracking-[0.3em]"
          >
            {STUDIO_NAME}
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center rounded-full text-ash transition-colors duration-300 hover:bg-black/5 hover:text-obsidian"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Obsidian accent line */}
        <div className="mx-8 h-px bg-linear-to-r from-transparent via-ash/30 to-transparent opacity-40" />

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-8 py-4">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li
                key={link.href}
                className="group border-black/5 border-b last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-4">
                    <span className="font-bold font-sans text-[10px] text-ash/40 tracking-tighter">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    {link.children ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedItems((items) =>
                            items.includes(link.href)
                              ? items.filter((href) => href !== link.href)
                              : [...items, link.href],
                          )
                        }
                        className={cn(
                          "block animate-fade-in-up-luxury py-2 text-left",
                          "font-light font-sans text-obsidian text-xl uppercase tracking-[0.12em] sm:text-2xl",
                          "transition-all duration-500 hover:text-charcoal",
                        )}
                        style={
                          {
                            "--delay": `${i * 80 + 100}ms`,
                          } as React.CSSProperties
                        }
                        aria-expanded={expandedItems.includes(link.href)}
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={cn(
                          "font-light font-sans text-obsidian text-xl tracking-tight sm:text-2xl",
                          "transition-all duration-500 hover:text-charcoal",
                          "block animate-fade-in-up-luxury py-2",
                        )}
                        style={
                          {
                            "--delay": `${i * 80 + 100}ms`,
                          } as React.CSSProperties
                        }
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>

                  {link.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedItems((items) =>
                          items.includes(link.href)
                            ? items.filter((href) => href !== link.href)
                            : [...items, link.href],
                        )
                      }
                      aria-expanded={expandedItems.includes(link.href)}
                      aria-label={`Expand ${link.label}`}
                      className={cn(
                        "flex size-12 items-center justify-center rounded-full text-ash transition-all duration-500",
                        expandedItems.includes(link.href)
                          ? "rotate-180 text-obsidian"
                          : "hover:bg-black/5",
                      )}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-items */}
                {link.children && (
                  <div
                    className={cn(
                      "1, 0.3, 1)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,",
                      expandedItems.includes(link.href)
                        ? "mb-6 max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0",
                    )}
                  >
                    <ul className="space-y-3 pt-2 pl-9">
                      {link.children.map((child, j) => (
                        <li
                          key={child.href}
                          className="animate-fade-in-up-luxury"
                          style={
                            {
                              "--delay": `${j * 50 + 100}ms`,
                            } as React.CSSProperties
                          }
                        >
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-4 py-1.5 font-light font-sans text-smoke text-xl tracking-tight transition-colors duration-300 hover:text-obsidian sm:text-2xl"
                          >
                            <span className="h-px w-4 bg-ash/30" />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer info */}
        <div className="border-luxury-border-fine border-t bg-luxury-surface px-8 py-4">
          <div className="mb-4 space-y-3">
            <div>
              <p className="mb-2 font-bold text-charcoal text-xs uppercase tracking-[0.2em]">
                Liên hệ
              </p>
              <p className="font-light font-sans text-obsidian text-xs tracking-wide">
                {PHONE}
              </p>
              <p className="font-light font-sans text-obsidian text-xs tracking-wide">
                {EMAIL}
              </p>
            </div>
            <div>
              <p className="mb-2 font-bold text-charcoal text-xs uppercase tracking-[0.2em]">
                Địa chỉ
              </p>
              <p className="font-light font-sans text-obsidian text-xs leading-relaxed tracking-wide">
                {STUDIO_ADDRESS}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              "group/btn relative overflow-hidden",
              "flex w-full items-center justify-center",
              "bg-obsidian text-white",
              "px-8 py-5",
              "font-bold font-sans text-[10px] uppercase tracking-[0.3em]",
              "shadow-luxury transition-all duration-500",
              "hover:text-obsidian",
            )}
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/btn:scale-x-100" />
            <span className="relative z-10">Liên hệ đặt lịch</span>
          </Link>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Header
───────────────────────────────────────────── */
export function Header() {
  const pathname = usePathname();
  const _isHomePage = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDarkText = true; // Always use dark text as per user request

  /* scroll listener */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* close mobile on resize ≥ lg */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, []);

  /* Dropdown helpers */
  const openDropdown = useCallback((href: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(href);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 z-50 w-full",
          "transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          scrolled
            ? [
                "py-3",
                "bg-ivory/92 backdrop-blur-xl",
                "border-luxury-border-fine border-b",
                "shadow-[0_2px_24px_oklch(0.1_0_0/0.07)]",
              ].join(" ")
            : "bg-transparent py-6",
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* ── Mobile layout: logo | CTA + hamburger ── */}
          <div className="flex items-center justify-between gap-4 lg:hidden">
            {/* Logo — left */}
            <Link
              href="/"
              aria-label={`${STUDIO_NAME} — Home`}
              className="shrink-0"
            >
              <Image
                src="/logo.png"
                alt={STUDIO_NAME}
                width={160}
                height={60}
                priority
                className={cn(
                  "w-auto object-contain transition-all duration-500 ease-in-out",
                  scrolled ? "h-7" : "h-10",
                )}
              />
            </Link>

            <div className="flex items-center gap-4">
              {/* Đặt lịch — right */}
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center",
                  "px-3 py-1.5",
                  "whitespace-nowrap font-bold font-sans text-[9px] uppercase tracking-[0.2em]",
                  "transition-all duration-500",
                  "border border-obsidian/30 text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-white",
                )}
              >
                Đặt lịch
              </Link>

              {/* Hamburger — right */}
              <button
                type="button"
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "h-10 w-10",
                  "transition-colors duration-500",
                  "text-obsidian",
                  "rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian/50",
                )}
                aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
              >
                <span className="sr-only">
                  {mobileOpen ? "Đóng" : "Mở"} menu
                </span>
                <span
                  className={cn(
                    "absolute h-px w-5 bg-current transition-all duration-400",
                    mobileOpen ? "rotate-45" : "-translate-y-1.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-current transition-all duration-300",
                    mobileOpen
                      ? "scale-x-0 opacity-0"
                      : "scale-x-100 opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-current transition-all duration-400",
                    mobileOpen ? "-rotate-45" : "translate-y-1.5",
                  )}
                />
              </button>
            </div>
          </div>

          {/* ── Desktop layout: logo | nav | CTA ── */}
          <div className="hidden items-center justify-between gap-8 lg:flex">
            {/* Logo */}
            <Link
              href="/"
              aria-label={`${STUDIO_NAME} — Home`}
              className="shrink-0"
            >
              <Image
                src="/logo.png"
                alt={STUDIO_NAME}
                width={200}
                height={80}
                priority
                className={cn(
                  "w-auto object-contain transition-all duration-500 ease-in-out",
                  scrolled ? "h-8" : "h-14 xl:h-16",
                )}
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-6 xl:gap-12">
                {(navLinks as NavLink[]).map((link) => (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() =>
                      link.children && openDropdown(link.href)
                    }
                    onMouseLeave={() => link.children && closeDropdown()}
                  >
                    <Link
                      href={link.href}
                      aria-haspopup={link.children ? "true" : undefined}
                      aria-expanded={
                        link.children ? activeDropdown === link.href : undefined
                      }
                      className={cn(
                        "group flex items-center gap-1.5",
                        "whitespace-nowrap font-bold font-sans text-[10px] uppercase tracking-[0.22em]",
                        "transition-colors duration-400",
                        "py-1",
                        isDarkText
                          ? "text-obsidian hover:text-obsidian"
                          : "text-ivory/80 hover:text-white",
                      )}
                    >
                      {link.label}
                      {link.children && (
                        <svg
                          width="7"
                          height="7"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className={cn(
                            "opacity-50 transition-transform duration-400",
                            activeDropdown === link.href ? "rotate-180" : "",
                          )}
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* animated underline */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-obsidian-400 transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full"
                    />

                    {link.children && (
                      <DesktopDropdown
                        items={link.children}
                        open={activeDropdown === link.href}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA button */}
            <Link
              href="/contact"
              className={cn(
                "group/btn relative overflow-hidden",
                "inline-flex items-center justify-center",
                "px-7 py-3",
                "whitespace-nowrap font-bold font-sans text-[9px] uppercase tracking-[0.22em] sm:text-[10px]",
                "shadow-sm transition-all duration-500",
                isDarkText
                  ? "bg-obsidian text-white hover:text-obsidian"
                  : "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-obsidian",
              )}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover/btn:scale-x-100" />
              <span className="relative z-10">Đặt lịch</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks as NavLink[]}
      />
    </>
  );
}
