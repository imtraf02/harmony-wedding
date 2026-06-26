import type { Metadata } from "next";

import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { ServicesPageContent } from "@/components/services/services-page-content";
import {
  BreadcrumbJsonLd,
  ServiceJsonLd,
  FAQJsonLd,
} from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Dịch Vụ Cưới Trọn Gói - Chụp Ảnh, Quay Phim, Makeup, Thuê Vest & Váy",
  description:
    "Dịch vụ cưới trọn gói Harmony Wedding: chụp ảnh cưới nghệ thuật, quay phim highlight, trang điểm cô dâu, thuê vest & váy cưới cao cấp, tổ chức tiệc cưới tại Đồng Nai.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Dịch Vụ Cưới Trọn Gói | Harmony Wedding",
    description:
      "Chụp ảnh cưới, quay phim cưới, trang điểm cô dâu, thuê vest & váy cưới, tổ chức tiệc cưới trọn gói tại Đồng Nai.",
    url: "/services",
    images: [
      {
        url: "/images/services/services-hero.png",
        width: 1200,
        height: 630,
        alt: "Dịch vụ cưới trọn gói Harmony Wedding",
      },
    ],
  },
};

export function ServicesPage() {
  return (
    <main className="bg-white text-black" id="top">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Dịch Vụ", href: "/services" },
        ]}
      />
      <ServiceJsonLd />
      <FAQJsonLd
        questions={[
          {
            question: "Nên đặt lịch trước bao lâu?",
            answer:
              "Tối thiểu 4-6 tuần để có đủ thời gian tư vấn concept, chọn lịch chụp và chuẩn bị trang phục.",
          },
          {
            question: "Có hỗ trợ chọn địa điểm chụp không?",
            answer:
              "Có. Ekip sẽ đề xuất studio, ngoại cảnh hoặc địa điểm riêng theo phong cách bạn muốn.",
          },
          {
            question: "Khi nào nhận ảnh hoàn thiện?",
            answer:
              "Thời gian bàn giao phụ thuộc gói dịch vụ, thông thường từ 1-2 tuần sau khi chọn ảnh.",
          },
        ]}
      />

      <ServicesPageContent />
      <Footer />
    </main>
  );
}

export default ServicesPage;
