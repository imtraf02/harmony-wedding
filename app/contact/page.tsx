import Link from "next/link";
import { ContactForm } from "@/components/shared/contact-form";
import {
  FACEBOOK_URL,
  PHONE,
  STUDIO_NAME,
  TIKTOK_URL,
  ZALO_ID,
} from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Liên hệ & Đặt lịch | Harmony Studio",
  description:
    "Đặt lịch chụp ảnh cưới hoặc quay phim cưới. Liên hệ để được tư vấn miễn phí và nhận báo giá phù hợp.",
  path: "/contact",
});

const contactDetails = [
  {
    label: "Hotline & Zalo",
    value: PHONE,
    detail: `Zalo: ${ZALO_ID}`,
    href: `tel:${PHONE}`,
  },
  {
    label: "Studio",
    value: "45 Đường Cuối Chợ Đông Hoà",
    detail: "Trảng Bom, Đồng Nai",
    href: "/studios",
  },
  {
    label: "Giờ tư vấn",
    value: "09:00 - 18:00",
    detail: "Chủ nhật theo lịch hẹn",
    href: null,
  },
];

const GOOGLE_MAP_URL = "https://maps.app.goo.gl/Ny9QSqj9tk5o5C7Z7";

const processSteps = [
  "Gửi yêu cầu tư vấn",
  "Trao đổi concept và lịch trình",
  "Chốt gói dịch vụ phù hợp",
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <section className="pt-24 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="relative min-h-[640px] overflow-hidden bg-obsidian text-ivory shadow-luxury">
              <div
                className="absolute inset-x-0 top-0 h-px bg-ivory/20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-y-0 right-0 w-px bg-ivory/10"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/25 to-transparent"
                aria-hidden="true"
              />

              <div className="relative z-10 flex min-h-[640px] flex-col justify-between p-7 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-ivory/40" />
                  <span className="font-bold text-[10px] text-ivory/80 uppercase tracking-[0.3em]">
                    {STUDIO_NAME}
                  </span>
                </div>

                <div className="max-w-xl">
                  <p className="mb-5 font-bold text-[10px] text-ivory/80 uppercase tracking-[0.3em]">
                    Liên hệ & đặt lịch
                  </p>
                  <h1
                    className="font-light font-sans leading-[1.02] tracking-tight"
                    style={{ fontSize: "clamp(3rem, 5.5vw, 5.25rem)" }}
                  >
                    Bắt đầu câu chuyện cưới của bạn
                  </h1>
                  <p className="mt-8 max-w-md font-light text-base text-ivory/82 leading-relaxed">
                    Chia sẻ ngày cưới, địa điểm và phong cách bạn mong muốn.
                    Ekip sẽ phản hồi với gợi ý gói dịch vụ phù hợp.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {processSteps.map((step, index) => (
                    <div key={step} className="border-white/20 border-t pt-4">
                      <span className="font-bold text-[10px] text-ivory/80 uppercase tracking-[0.25em]">
                        0{index + 1}
                      </span>
                      <p className="mt-2 font-light text-ivory/85 text-sm leading-snug">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-black/5 bg-white shadow-luxury">
              <div className="border-black/5 border-b px-6 py-7 sm:px-10 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-3 text-label-luxury text-smoke">
                      Form tư vấn
                    </p>
                    <h2 className="font-light font-sans text-3xl text-obsidian tracking-tight md:text-4xl">
                      Gửi thông tin đặt lịch
                    </h2>
                  </div>
                  <div className="border-black/10 border-t pt-3 font-bold text-[10px] text-ash uppercase tracking-[0.2em]">
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
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {contactDetails.map((item, index) => {
              const content = (
                <div className="h-full border border-black/5 bg-white p-7 transition-all duration-500 hover:shadow-luxury">
                  <p className="mb-8 font-bold text-[10px] text-ash/60 uppercase tracking-[0.28em]">
                    0{index + 1}
                  </p>
                  <p className="font-bold text-[10px] text-ash/65 uppercase tracking-[0.25em]">
                    {item.label}
                  </p>
                  <p className="mt-3 font-light text-obsidian text-xl">
                    {item.value}
                  </p>
                  <p className="mt-2 font-light text-ash/70 text-sm">
                    {item.detail}
                  </p>
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

          <div className="mt-10 flex flex-col gap-4 border-black/5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-light text-sm text-smoke">
              Bạn cũng có thể nhắn trực tiếp qua mạng xã hội để gửi moodboard
              hoặc lịch trình sơ bộ.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href={GOOGLE_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-obsidian px-5 py-3 font-bold text-[11px] text-obsidian uppercase tracking-[0.22em] transition-colors hover:bg-obsidian hover:text-white"
              >
                Google Map
              </Link>
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-[11px] text-charcoal uppercase tracking-[0.22em] transition-colors hover:text-obsidian"
              >
                Facebook
              </Link>
              <Link
                href={TIKTOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold text-[11px] text-charcoal uppercase tracking-[0.22em] transition-colors hover:text-obsidian"
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
