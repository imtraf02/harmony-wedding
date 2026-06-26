import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { ContactContent } from "@/components/contact/contact-content";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Liên Hệ Tư Vấn & Đặt Lịch Chụp Ảnh Cưới",
  description:
    "Liên hệ Harmony Wedding qua Hotline 035.725.6845, Messenger, Zalo hoặc đến studio tại 45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai. Tư vấn miễn phí.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Liên Hệ Tư Vấn | Harmony Wedding",
    description:
      "Hotline: 035.725.6845. Tư vấn miễn phí qua Messenger, Zalo hoặc đến studio tại Trảng Bom, Đồng Nai.",
    url: "/contact",
  },
};

export function ContactPage() {
  return (
    <main className="bg-[#FAF9F5] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Liên Hệ", href: "/contact" },
        ]}
      />

      {/* Decorative Watermark */}
      <div className="absolute right-[-4vw] top-[24%] -translate-y-1/2 text-[16vw] font-serif font-semibold text-black/[0.015] select-none pointer-events-none tracking-widest uppercase hidden lg:block">
        Contact
      </div>

      <div className="pt-32 pb-16 md:pt-44 md:pb-24 relative z-10">
        <div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end border-b border-black/[0.05] pb-16">
            <div>
              <p className="mb-5 flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
                Kênh liên lạc trực tiếp
                <span className="h-px w-10 bg-neutral-300" />
              </p>
              <h1 className="font-serif text-[clamp(3rem,10vw,5.5rem)] leading-[0.9] text-neutral-900 tracking-tight">
                Trao Đổi Ý Tưởng <br />
                & Báo Giá
              </h1>
            </div>
            <div className="lg:max-w-md">
              <p className="text-[0.98rem] leading-8 text-neutral-600 font-light">
                Harmony Wedding không sử dụng các biểu mẫu liên hệ tự động để đảm bảo trải nghiệm tư vấn riêng tư, nhanh chóng và trực tiếp nhất. Hãy kết nối trực tiếp với chúng tôi qua hotline hoặc các ứng dụng nhắn tin dưới đây.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactContent />

      <Footer />
    </main>
  );
}

export default ContactPage;
