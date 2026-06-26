import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { PricingGallery } from "@/components/pricing/pricing-gallery";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Bảng Giá Dịch Vụ Cưới Trọn Gói 2025 - 2026",
  description:
    "Bảng giá dịch vụ cưới trọn gói Harmony Wedding 2025-2026. Xem catalogue chi tiết các gói chụp ảnh cưới ngoại cảnh, studio, phim highlight, thuê vest & váy cưới và ngày cưới. Cam kết không phát sinh.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Bảng Giá Dịch Vụ Cưới Trọn Gói | Harmony Wedding",
    description:
      "Bảng giá minh bạch, không phát sinh. Xem catalogue chi tiết các gói chụp ảnh cưới, quay phim, makeup, thuê vest & váy cưới.",
    url: "/pricing",
    images: [
      {
        url: "/images/bang-gia/1.jpg",
        width: 1200,
        height: 1600,
        alt: "Bảng giá dịch vụ cưới Harmony Wedding",
      },
    ],
  },
};

export function PricingPage() {
  return (
    <main className="bg-white text-black" id="top">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Bảng Giá", href: "/pricing" },
        ]}
      />

      <div className="pt-24 md:pt-32 bg-neutral-50 border-b border-black/[0.04]">
        <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 lg:px-16 text-center">
          <h1 className="font-serif text-[clamp(3.2rem,14vw,6.5rem)] leading-[0.86] text-black">
            Báo Giá Cưới
          </h1>
          <p className="mt-6 mx-auto max-w-lg text-[0.92rem] leading-7 text-neutral-600">
            Tinh tế, trọn vẹn và minh bạch. Harmony cam kết không phát sinh chi
            phí và đồng hành sâu sắc nhất cùng câu chuyện của bạn.
          </p>
        </div>
      </div>
      <PricingGallery />
      <Footer />
    </main>
  );
}

export default PricingPage;
