import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { MauDoGallery } from "@/components/mau-do/mau-do-gallery";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Mẫu Váy Cưới & Veston Thiết Kế Cao Cấp | Harmony Wedding",
  description:
    "Khám phá bộ sưu tập mẫu váy cưới cao cấp dòng Harmony Soiree, veston chú rể lịch lãm phom dáng Hàn Quốc, áo dài bê quả truyền thống và hỷ phục Trung Hoa tại Trảng Bom, Đồng Nai. Tư vấn tận tâm, phom dáng chuẩn mực.",
  alternates: {
    canonical: "/mau-do",
  },
  openGraph: {
    title: "BST Váy Cưới & Veston Thiết Kế Cao Cấp | Harmony Wedding",
    description:
      "Ngắm nhìn hình ảnh thực tế BST váy cưới dòng Diamond, Ruby, Signature, veston chú rể Hàn Quốc phom dáng chuẩn, áo dài bê tráp cao cấp.",
    url: "/mau-do",
    images: [
      {
        url: "/images/mau-do/vay-cuoi-001.webp",
        width: 1200,
        height: 1600,
        alt: "Bộ sưu tập trang phục cưới Harmony Soiree & Veston",
      },
    ],
  },
};

import { MeshGradient } from "@/components/ui/mesh-gradient";

export function MauDoPage() {
  return (
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      {/* Light moving mesh gradient background */}
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Mẫu Đồ Thiết Kế", href: "/mau-do" },
        ]}
      />

      {/* Hero Header */}
      <div className="pt-32 md:pt-44 bg-transparent relative z-10">
        <div className="mx-auto max-w-[1500px] px-5 py-12 md:px-10 lg:px-16 text-center">
          <p className="mb-4 flex items-center justify-center gap-4 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Harmony Soiree & Veston
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,10vw,5.5rem)] leading-[0.9] text-black tracking-tight">
            Mẫu Váy & Vest Cưới
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-[0.92rem] leading-7 text-neutral-600 font-light">
            Được tuyển chọn tỉ mỉ với phom dáng chuẩn mực nâng tầm tôn vóc dáng. Từ những chiếc váy cưới thiết kế dòng cao cấp Signature, veston Hàn Quốc lịch lãm đến áo dài bê tráp đồng điệu nhất cho ngày cưới trọn vẹn.
          </p>
        </div>
      </div>

      <MauDoGallery />
      <Footer />
    </main>
  );
}

export default MauDoPage;
