import Link from 'next/link';
import { footerLinks } from '@/data/navigation';
import { STUDIO_NAME, PHONE, FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-20 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid md:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="text-2xl font-cormorant font-semibold tracking-widest uppercase mb-6 block">
            {STUDIO_NAME}
          </Link>
          <p className="text-zinc-500 text-sm font-light leading-relaxed mb-8">
            Lưu giữ khoảnh khắc vượt thời gian — từ cái nhìn đầu tiên đến vũ điệu cuối cùng.
          </p>
          <div className="flex gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-gold hover:border-gold transition-all">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-gold hover:border-gold transition-all">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href={`tel:${PHONE}`} aria-label="Phone" className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-gold hover:border-gold transition-all">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        {footerLinks.map(section => (
          <div key={section.heading}>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-8 text-zinc-400">{section.heading}</h3>
            <ul className="space-y-4">
              {section.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-600 hover:text-gold transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact info */}
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-8 text-zinc-400">Liên hệ</h3>
          <ul className="space-y-4">
            <li>
              <a href={`tel:${PHONE}`} className="text-sm text-zinc-600 hover:text-gold transition-colors block">{PHONE}</a>
            </li>
            <li>
              <a
                href={`https://zalo.me/${process.env.NEXT_PUBLIC_ZALO_ID}`}
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:text-gold transition-colors block"
              >
                Zalo Chat
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-zinc-600 hover:text-gold transition-colors block">Gửi lời nhắn</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 border-t border-zinc-100 text-center text-xs text-zinc-400 tracking-widest uppercase">
        <p>© {year} {STUDIO_NAME}. Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}
