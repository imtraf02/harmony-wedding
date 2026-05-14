import { buildMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/shared/contact-form';
import {
  STUDIO_NAME,
  PHONE,
  ZALO_ID,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '@/lib/constants';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Liên hệ & Đặt lịch | Harmony Studio',
  description: 'Đặt lịch chụp ảnh cưới hoặc quay phim cưới. Liên hệ để được tư vấn miễn phí và nhận báo giá phù hợp.',
  path: '/contact',
});

/* ─── Decorative diamond rule ─────────────────── */
function DiamondRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('flex items-center gap-4', className)}>
      <span className="flex-1 h-px bg-gradient-to-r from-transparent to-luxury-border" />
      <span className="w-1.5 h-1.5 border border-gold-400 rotate-45 block shrink-0" />
      <span className="flex-1 h-px bg-gradient-to-l from-transparent to-luxury-border" />
    </div>
  );
}

/* ─── Contact info item ───────────────────────── */
function InfoItem({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="flex gap-6 items-start animate-fade-in-up-luxury"
      style={{ '--delay': `${delay}ms` } as React.CSSProperties}
    >
      {/* icon box */}
      <div className="shrink-0 w-10 h-10 border border-luxury-border flex items-center justify-center text-gold-500 bg-champagne">
        {icon}
      </div>

      <div className="pt-1">
        <p className="text-label-luxury text-ash mb-2">{label}</p>
        {children}
      </div>
    </div>
  );
}

/* ─── SVG icons ───────────────────────────────── */
const PhoneIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

/* ─── Hours ───────────────────────────────────── */
const HOURS = [
  { day: 'Thứ 2 — Thứ 6', time: '09:00 – 18:00', special: false },
  { day: 'Thứ 7', time: '10:00 – 16:00', special: false },
  { day: 'Chủ nhật', time: 'Theo lịch hẹn', special: true },
];

/* ─── Page ────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-luxury">

      {/* ── Hero header ── */}
      <section className="pt-40 pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          <DiamondRule
            className="mb-16 animate-fade-in-up-luxury"
          />

          <div
            className="mb-20 animate-fade-in-up-luxury"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            <p className="text-label-luxury text-gold mb-5">Liên hệ</p>
            <h1
              className="font-cormorant font-light text-obsidian leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)' }}
            >
              Bắt đầu{' '}
              <em style={{ fontStyle: 'italic' }} className="text-gold-600">
                câu chuyện của bạn
              </em>
            </h1>
            <p
              className="text-smoke font-light leading-relaxed max-w-xl"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)' }}
            >
              Chúng tôi rất muốn nghe về kế hoạch đám cưới của bạn. Điền form
              hoặc liên hệ trực tiếp qua các kênh bên dưới để được tư vấn miễn phí.
            </p>
          </div>

        </div>
      </section>

      {/* ── Main grid ── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* gold hairline above content */}
          <div
            aria-hidden="true"
            className="h-px w-full bg-gradient-to-r from-transparent via-gold-300 to-transparent opacity-50 mb-20"
          />

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-16 xl:gap-28 items-start">

            {/* ── Left: info ── */}
            <div>

              {/* contact details */}
              <div className="space-y-10 mb-16">
                <InfoItem icon={<PhoneIcon />} label="Điện thoại & Zalo" delay={100}>
                  <a
                    href={`tel:${PHONE}`}
                    className="block text-xl font-cormorant text-obsidian hover:text-gold transition-colors duration-300"
                  >
                    {PHONE}
                  </a>
                  <span className="flex items-center gap-2 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/zalo.svg" alt="Zalo" className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-sm text-smoke">Zalo: {ZALO_ID}</span>
                  </span>
                </InfoItem>

                <InfoItem icon={<PinIcon />} label="Địa chỉ studio" delay={180}>
                  <p className="text-xl font-cormorant text-obsidian">
                    123 Wedding Street, Quận 1
                  </p>
                  <p className="text-sm text-smoke mt-1">TP. Hồ Chí Minh, Việt Nam</p>
                </InfoItem>

                <InfoItem icon={<InstagramIcon />} label="Mạng xã hội" delay={260}>
                  <div className="flex items-center gap-5 mt-1">
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-smoke hover:text-gold transition-colors duration-300"
                    >
                      <span className="w-0 h-px bg-gold-400 group-hover:w-4 transition-all duration-300" />
                      Facebook
                    </a>
                    <span aria-hidden="true" className="w-px h-3 bg-luxury-border" />
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-smoke hover:text-gold transition-colors duration-300"
                    >
                      <span className="w-0 h-px bg-gold-400 group-hover:w-4 transition-all duration-300" />
                      Instagram
                    </a>
                  </div>
                </InfoItem>
              </div>

              {/* gold hairline separator */}
              <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-gold-200 via-gold-300 to-transparent opacity-60 mb-12"
              />

              {/* Office hours */}
              <div
                className="animate-fade-in-up-luxury"
                style={{ '--delay': '320ms' } as React.CSSProperties}
              >
                <p className="text-label-luxury text-ash mb-6">Giờ làm việc</p>

                <ul className="space-y-0 divide-y divide-luxury-border-fine">
                  {HOURS.map(({ day, time, special }) => (
                    <li
                      key={day}
                      className="flex items-center justify-between py-4"
                    >
                      <span className="text-sm font-light text-smoke">{day}</span>
                      <span
                        className={cn(
                          'text-sm font-light tabular-nums',
                          special ? 'italic text-gold-600' : 'text-obsidian',
                        )}
                      >
                        {time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* brand mark */}
              <div
                className="mt-16 animate-fade-in-up-luxury"
                style={{ '--delay': '400ms' } as React.CSSProperties}
              >
                <DiamondRule className="w-32" />
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-mist mt-4">
                  {STUDIO_NAME}
                </p>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div
              className="animate-fade-in-up-luxury"
              style={{ '--delay': '160ms' } as React.CSSProperties}
            >
              {/* form wrapper */}
              <div className="relative bg-ivory border border-luxury-border shadow-[0_8px_40px_oklch(0.1_0_0/0.08)]">

                {/* top gold rule */}
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 opacity-70"
                />

                {/* form header */}
                <div className="px-8 sm:px-12 pt-10 pb-8 border-b border-luxury-border-fine">
                  <p className="text-label-luxury text-gold mb-3">Gửi yêu cầu</p>
                  <h2 className="text-2xl font-cormorant font-light text-obsidian">
                    Bắt đầu cuộc trò chuyện
                  </h2>
                </div>

                {/* form body */}
                <div className="px-8 sm:px-12 py-10">
                  <ContactForm />
                </div>

                {/* corner accent */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-gold-300 opacity-40 pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 w-12 h-12 border-l border-t border-gold-300 opacity-40 pointer-events-none"
                />
              </div>

              {/* trust note */}
              <p className="mt-6 text-center text-[10px] font-light tracking-wide text-ash">
                Thường phản hồi trong vòng{' '}
                <span className="text-obsidian font-medium">24 giờ</span>
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}