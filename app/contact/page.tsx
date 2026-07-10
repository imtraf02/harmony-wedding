import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { ContactContent } from "@/components/contact/contact-content";
import { BookingForm } from "@/components/contact/booking-form";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { MeshGradient } from "@/components/ui/mesh-gradient";

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
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      {/* Light moving mesh gradient background */}
      <MeshGradient variant="light" className="opacity-75" />

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
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start border-b border-black/[0.05] pb-20">
            <div>
              <p className="mb-5 flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
                Kênh liên lạc trực tiếp
                <span className="h-px w-10 bg-neutral-300" />
              </p>
              <h1 className="font-serif text-[clamp(3rem,8vw,5rem)] leading-[0.98] text-neutral-900 tracking-tight mb-8">
                Trao Đổi Ý Tưởng <br />
                & Báo Giá
              </h1>
              <p className="text-[0.96rem] leading-8 text-neutral-500 font-light max-w-lg mb-10">
                Harmony Wedding trân trọng cơ hội đồng hành và ghi dấu những khoảnh khắc đẹp trong cuộc đời hai bạn. Hãy kết nối trực tiếp với chúng tôi qua các kênh hotline, mạng xã hội, hoặc gửi yêu cầu tư vấn nhanh bên cạnh để nhận concept và báo giá chi tiết.
              </p>
            </div>
            <div>
              <BookingForm formName="Form Trang Liên Hệ" />
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
