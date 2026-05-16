import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/shared/contact-form';
import {
  FACEBOOK_URL,
  PHONE,
  STUDIO_NAME,
  TIKTOK_URL,
  ZALO_ID,
} from '@/lib/constants';

export const metadata = buildMetadata({
  title: 'Liên hệ & Đặt lịch | Harmony Studio',
  description: 'Đặt lịch chụp ảnh cưới hoặc quay phim cưới. Liên hệ để được tư vấn miễn phí và nhận báo giá phù hợp.',
  path: '/contact',
});

const contactDetails = [
  {
    label: 'Hotline & Zalo',
    value: PHONE,
    detail: `Zalo: ${ZALO_ID}`,
    href: `tel:${PHONE}`,
  },
  {
    label: 'Studio',
    value: '45 Đường Cuối Chợ Đông Hoà',
    detail: 'Trảng Bom, Đồng Nai',
    href: '/studios',
  },
  {
    label: 'Giờ tư vấn',
    value: '09:00 - 18:00',
    detail: 'Chủ nhật theo lịch hẹn',
    href: null,
  },
];

const processSteps = [
  'Gửi yêu cầu tư vấn',
  'Trao đổi concept và lịch trình',
  'Chốt gói dịch vụ phù hợp',
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-luxury">
      <section className="pt-24 md:pt-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
            <div className="relative min-h-[640px] overflow-hidden bg-obsidian text-ivory shadow-luxury">
              <div className="absolute inset-x-0 top-0 h-px bg-ivory/70" aria-hidden="true" />
              <div className="absolute inset-y-0 right-0 w-px bg-ivory/25" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />

              <div className="relative z-10 flex min-h-[640px] flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-ivory/70" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/80">
                    {STUDIO_NAME}
                  </span>
                </div>

                <div className="max-w-xl">
                  <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.3em] text-ivory/80">
                    Liên hệ & đặt lịch
                  </p>
                  <h1
                    className="font-sans font-light leading-[1.02] tracking-tight"
                    style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
                  >
                    Bắt đầu câu chuyện cưới của bạn
                  </h1>
                  <p className="mt-8 max-w-md text-base font-light leading-relaxed text-ivory/82">
                    Chia sẻ ngày cưới, địa điểm và phong cách bạn mong muốn. Ekip sẽ phản hồi với gợi ý gói dịch vụ phù hợp.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {processSteps.map((step, index) => (
                    <div key={step} className="border-t border-white/20 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/80">
                        0{index + 1}
                      </span>
                      <p className="mt-2 text-sm font-light leading-snug text-ivory/85">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-ivory border border-black/5 shadow-luxury">
              <div className="border-b border-black/5 px-6 py-7 sm:px-10 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-label-luxury text-obsidian/65 mb-3">Form tư vấn</p>
                    <h2 className="text-3xl md:text-4xl font-sans font-light text-obsidian tracking-tight">
                      Gửi thông tin đặt lịch
                    </h2>
                  </div>
                  <div className="border-t border-black/20 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian/70">
                    Phản hồi trong 24h
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 sm:px-10 lg:px-12 lg:py-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {contactDetails.map((item, index) => {
              const content = (
                <div className="h-full border border-black/5 bg-white p-7 transition-all duration-500 hover:shadow-luxury">
                  <p className="mb-8 text-[10px] font-bold uppercase tracking-[0.28em] text-obsidian/60">
                    0{index + 1}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-obsidian/65">
                    {item.label}
                  </p>
                  <p className="mt-3 text-xl font-light text-obsidian">{item.value}</p>
                  <p className="mt-2 text-sm font-light text-obsidian/70">{item.detail}</p>
                </div>
              );

              return item.href ? (
                <Link key={item.label} href={item.href} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.label}>{content}</div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-light text-obsidian/70">
              Bạn cũng có thể nhắn trực tiếp qua mạng xã hội để gửi moodboard hoặc lịch trình sơ bộ.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-obsidian/75 hover:text-obsidian transition-colors"
              >
                Facebook
              </Link>
              <Link
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-obsidian/75 hover:text-obsidian transition-colors"
              >
                TikTok
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
