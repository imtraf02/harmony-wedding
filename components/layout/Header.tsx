'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { navLinks } from '@/data/navigation';
import { STUDIO_NAME } from '@/lib/constants';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40' 
          : 'py-6 bg-transparent'
      }`} 
      ref={navRef as any}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-cormorant font-semibold tracking-widest uppercase hover:text-gold transition-colors" 
          aria-label={`${STUDIO_NAME} — Home`}
        >
          {STUDIO_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-10">
            {navLinks.map(link => (
              <li
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={link.href} 
                  className="text-sm font-medium tracking-wide text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.children && (
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden="true" className={`transition-transform duration-300 ${activeDropdown === link.href ? 'rotate-180' : ''}`}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                    </svg>
                  )}
                </Link>
                {link.children && activeDropdown === link.href && (
                  <ul className="absolute top-full left-0 mt-2 w-48 bg-card shadow-xl rounded-xl border border-border py-2 animate-fade-in">
                    {link.children.map(child => (
                      <li key={child.href}>
                        <Link 
                          href={child.href} 
                          className="block px-6 py-2 text-sm text-muted-foreground hover:text-gold hover:bg-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA + burger */}
        <div className="flex items-center gap-6">
          <Link 
            href="/contact" 
            className="hidden sm:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-sm"
          >
            Đặt lịch ngay
          </Link>
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-foreground"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-current transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-background z-40 p-6 animate-fade-in">
          <ul className="space-y-6">
            {navLinks.map(link => (
              <li key={link.href} className="border-b border-border pb-4">
                <Link
                  href={link.href}
                  className="text-2xl font-cormorant font-medium hover:text-gold transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className="mt-4 ml-4 space-y-4">
                    {link.children.map(child => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="text-lg font-light text-muted-foreground hover:text-gold transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center w-full rounded-full px-8 py-4 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all" 
                onClick={() => setMobileOpen(false)}
              >
                Đặt lịch ngay
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
