'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/data/navigation';
import { STUDIO_NAME, PHONE, EMAIL, STUDIO_ADDRESS } from '@/lib/constants';
import { cn } from '@/lib/utils';

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
   Gold Divider — decorative hairline
───────────────────────────────────────────── */
function GoldLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block h-px w-6 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60',
        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────────
   Desktop Dropdown
───────────────────────────────────────────── */
function DesktopDropdown({
  children,
  open,
}: {
  children: NavChild[];
  open: boolean;
}) {
  return (
    <div
      className={cn(
        'absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-52',
        'bg-ivory border border-luxury-border',
        'shadow-[0_8px_40px_oklch(0.1_0_0/0.10),0_2px_8px_oklch(0.1_0_0/0.06)]',
        'overflow-hidden',
        'transition-all duration-500 origin-top',
        open
          ? 'opacity-100 scale-y-100 pointer-events-auto translate-y-0'
          : 'opacity-0 scale-y-95 pointer-events-none -translate-y-1',
      )}
      role="menu"
      aria-hidden={!open}
    >
      {/* top gold accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-70" />

      <ul className="py-2">
        {children.map((child, i) => (
          <li key={child.href}>
            <Link
              href={child.href}
              role="menuitem"
              className={cn(
                'group flex items-center gap-3 px-5 py-3',
                'text-[9px] font-sans font-bold uppercase tracking-[0.22em]',
                'text-smoke hover:text-gold',
                'transition-colors duration-300',
                'hover:bg-champagne',
                i !== children.length - 1 && 'border-b border-luxury-border-fine',
              )}
            >
              <span className="w-0 h-px bg-gold-400 group-hover:w-3 transition-all duration-300 shrink-0" />
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'lg:hidden fixed inset-0 bg-obsidian/40 backdrop-blur-md z-[90]',
          'transition-opacity duration-700 ease-in-out',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />

      {/* Drawer — slides in from right */}
      <div
        className={cn(
          'lg:hidden fixed top-0 right-0 h-full w-full max-w-[85%] sm:max-w-md bg-ivory z-[100] shadow-2xl',
          'flex flex-col',
          'transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1)',
          open ? 'translate-x-0' : 'translate-x-full',
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
            className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-obsidian"
          >
            {STUDIO_NAME}
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="size-10 flex items-center justify-center text-ash hover:text-gold transition-colors duration-300 rounded-full hover:bg-black/5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Gold accent line */}
        <div className="mx-8 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-40" />

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-8 py-4">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={link.href} className="group border-b border-black/5 last:border-0">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-sans font-bold text-gold/40 tracking-tighter">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <Link
                      href={link.href}
                      onClick={link.children ? undefined : onClose}
                      className={cn(
                        'text-3xl sm:text-4xl font-sans font-light text-obsidian tracking-tight',
                        'hover:text-gold transition-all duration-500',
                        'animate-fade-in-up-luxury block py-2',
                      )}
                      style={{ '--delay': `${i * 80 + 100}ms` } as React.CSSProperties}
                    >
                      {link.label}
                    </Link>
                  </div>

                  {link.children && (
                    <button
                      onClick={() =>
                        setExpandedItem(v => (v === link.href ? null : link.href))
                      }
                      aria-expanded={expandedItem === link.href}
                      aria-label={`Expand ${link.label}`}
                      className={cn(
                        "size-12 flex items-center justify-center text-ash transition-all duration-500 rounded-full",
                        expandedItem === link.href ? "bg-gold/10 text-gold rotate-180" : "hover:bg-black/5"
                      )}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sub-items */}
                {link.children && (
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)]',
                      expandedItem === link.href
                        ? 'max-h-[500px] opacity-100 mb-6'
                        : 'max-h-0 opacity-0',
                    )}
                  >
                    <ul className="pl-9 space-y-4 pt-2">
                      {link.children.map((child, j) => (
                        <li
                          key={child.href}
                          className="animate-fade-in-up-luxury"
                          style={{ '--delay': `${j * 50 + 100}ms` } as React.CSSProperties}
                        >
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-4 text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-smoke hover:text-gold transition-colors duration-300"
                          >
                            <span className="w-4 h-px bg-gold/30" />
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
        <div className="px-8 py-4 bg-luxury-surface border-t border-luxury-border-fine">
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-2">Liên hệ</p>
              <p className="text-xs font-sans font-light text-obsidian tracking-wide">{PHONE}</p>
              <p className="text-xs font-sans font-light text-obsidian tracking-wide">{EMAIL}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold font-bold mb-2">Địa chỉ</p>
              <p className="text-xs font-sans font-light text-obsidian tracking-wide leading-relaxed">
                {STUDIO_ADDRESS}
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              'flex items-center justify-center w-full',
              'bg-obsidian text-ivory',
              'py-5 px-8',
              'text-[10px] font-sans font-bold uppercase tracking-[0.3em]',
              'hover:bg-gold hover:text-obsidian',
              'transition-all duration-500 shadow-luxury',
            )}
          >
            Liên hệ đặt lịch
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
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDarkText = true; // Always use dark text as per user request

  /* scroll listener */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* close mobile on resize ≥ lg */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  /* close mobile on route change */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          'fixed top-0 left-0 w-full z-50',
          'transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
          scrolled
            ? [
              'py-3',
              'bg-ivory/92 backdrop-blur-xl',
              'border-b border-luxury-border-fine',
              'shadow-[0_2px_24px_oklch(0.1_0_0/0.07)]',
            ].join(' ')
            : 'py-6 bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* ── Mobile layout: logo | CTA + hamburger ── */}
          <div className="flex lg:hidden items-center justify-between gap-4">
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
                  'w-auto object-contain transition-all duration-500 ease-in-out',
                  scrolled ? 'h-7' : 'h-10'
                )}
              />
            </Link>

            <div className="flex items-center gap-4">
              {/* Đặt lịch — right */}
              <Link
                href="/contact"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-3 py-1.5',
                  'text-[9px] font-sans font-bold uppercase tracking-[0.2em] whitespace-nowrap',
                  'transition-all duration-500',
                  'text-obsidian border border-obsidian/30 hover:border-gold hover:text-gold',
                )}
              >
                Đặt lịch
              </Link>

              {/* Hamburger — right */}
              <button
                className={cn(
                  'relative flex flex-col items-center justify-center',
                  'w-10 h-10',
                  'transition-colors duration-500',
                  'text-obsidian',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded',
                )}
                aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen(v => !v)}
              >
                <span className="sr-only">{mobileOpen ? 'Đóng' : 'Mở'} menu</span>
                <span
                  className={cn(
                    'absolute w-5 h-px bg-current transition-all duration-400',
                    mobileOpen ? 'rotate-45' : '-translate-y-1.5',
                  )}
                />
                <span
                  className={cn(
                    'absolute w-5 h-px bg-current transition-all duration-300',
                    mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100',
                  )}
                />
                <span
                  className={cn(
                    'absolute w-5 h-px bg-current transition-all duration-400',
                    mobileOpen ? '-rotate-45' : 'translate-y-1.5',
                  )}
                />
              </button>
            </div>
          </div>

          {/* ── Desktop layout: logo | nav | CTA ── */}
          <div className="hidden lg:flex items-center justify-between gap-8">

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
                  'w-auto object-contain transition-all duration-500 ease-in-out',
                  scrolled ? 'h-8' : 'h-14 xl:h-16'
                )}
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation">
              <ul className="flex items-center gap-6 xl:gap-12">
                {(navLinks as NavLink[]).map(link => (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => link.children && openDropdown(link.href)}
                    onMouseLeave={() => link.children && closeDropdown()}
                  >
                    <Link
                      href={link.href}
                      aria-haspopup={link.children ? 'true' : undefined}
                      aria-expanded={link.children ? activeDropdown === link.href : undefined}
                      className={cn(
                        'group flex items-center gap-1.5',
                        'text-[10px] font-sans font-bold uppercase tracking-[0.22em] whitespace-nowrap',
                        'transition-colors duration-400',
                        'py-1',
                        isDarkText ? 'text-obsidian hover:text-gold' : 'text-ivory/80 hover:text-white',
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
                            'transition-transform duration-400 opacity-50',
                            activeDropdown === link.href ? 'rotate-180' : '',
                          )}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>

                    {/* animated underline */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-0 bg-gold-400 group-hover:w-full transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    />

                    {link.children && (
                      <DesktopDropdown
                        children={link.children}
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
                'inline-flex items-center justify-center',
                'relative overflow-hidden',
                'px-7 py-3',
                'text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.22em] whitespace-nowrap',
                'transition-all duration-500',
                isDarkText
                  ? 'bg-obsidian text-ivory'
                  : 'bg-ivory/10 backdrop-blur-md text-ivory border border-ivory/20 hover:bg-ivory hover:text-obsidian',
                isDarkText && 'before:absolute before:inset-0 before:bg-gold before:origin-left before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
                isDarkText && 'hover:text-obsidian',
                '[&>span]:relative [&>span]:z-10',
              )}
            >
              <span>Đặt lịch</span>
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