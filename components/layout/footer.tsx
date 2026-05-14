import Link from 'next/link';
import { footerLinks } from '@/data/navigation';
import { STUDIO_NAME, PHONE, FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-24 md:py-32 bg-obsidian text-ivory border-t border-ivory/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-4 gap-16 mb-20">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-cormorant font-bold tracking-[0.3em] uppercase mb-8 block text-ivory">
            {STUDIO_NAME}
          </Link>
          <p className="text-ivory/50 text-[13px] font-light leading-relaxed mb-10 italic">
            Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ điệu cuối cùng.
          </p>
          <div className="flex gap-5">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-500">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-500">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href={`tel:${PHONE}`} aria-label="Phone" className="w-12 h-12 border border-ivory/10 flex items-center justify-center text-ivory/40 hover:text-gold hover:border-gold transition-all duration-500">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        {footerLinks.map(section => (
          <div key={section.heading}>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-gold">{section.heading}</h3>
            <ul className="space-y-5">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[12px] font-medium tracking-wide text-ivory/60 hover:text-gold transition-all duration-500">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact info */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-gold">Liên hệ</h3>
          <ul className="space-y-5">
            <li>
              <a href={`tel:${PHONE}`} className="text-[12px] font-medium tracking-wide text-ivory/60 hover:text-gold transition-all duration-500 block">{PHONE}</a>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/zalo.svg" alt="Zalo" className="w-full h-full" />
              </div>
              <a
                href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_ID}`}
                target="_blank" rel="noopener noreferrer"
                className="text-[12px] font-medium tracking-wide text-ivory/60 hover:text-gold transition-all duration-500 block"
              >
                Zalo Chat
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-[12px] font-medium tracking-wide text-ivory/60 hover:text-gold transition-all duration-500 block">Gửi lời nhắn</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 border-t border-ivory/5 text-center">
        <p className="text-[9px] text-ivory/30 tracking-[0.4em] uppercase">© {year} {STUDIO_NAME} — Crafted with Excellence</p>
      </div>
    </footer>
  );
}
