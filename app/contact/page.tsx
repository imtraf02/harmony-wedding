import { buildMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/shared/contact-form';
import {
  STUDIO_NAME,
  PHONE,
  ZALO_ID,
  FACEBOOK_URL,
  TIKTOK_URL,
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PinIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.8.2-.82.41-1.4 1.25-1.55 2.15-.09.76-.04 1.54.21 2.27.35.85 1.07 1.54 1.92 1.87.74.29 1.55.32 2.33.12.82-.2 1.57-.69 2.05-1.38.31-.47.46-1.01.5-1.57.02-2.31.01-4.62.01-6.93 0-3.95-.02-7.9 0-11.85z" />
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
              className="font-sans font-light text-obsidian leading-[1.05] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)' }}
            >
              Bắt đầu{' '}
              <em className="text-gold-600 not-italic">
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
                    className="block text-xl font-sans text-obsidian hover:text-gold transition-colors duration-300"
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
                  <p className="text-xl font-sans text-obsidian">
                    123 Wedding Street, Quận 1
                  </p>
                  <p className="text-sm text-smoke mt-1">TP. Hồ Chí Minh, Việt Nam</p>
                </InfoItem>

                <InfoItem icon={<TikTokIcon />} label="Mạng xã hội" delay={260}>
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
                      href={TIKTOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm text-smoke hover:text-gold transition-colors duration-300"
                    >
                      <span className="w-0 h-px bg-gold-400 group-hover:w-4 transition-all duration-300" />
                      TikTok
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
                          special ? 'text-gold-600' : 'text-obsidian',
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
                  <h2 className="text-2xl font-sans font-light text-obsidian">
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