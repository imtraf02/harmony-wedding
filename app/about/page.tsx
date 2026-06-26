import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { TeamGrid } from "@/components/about/team-grid";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Về Chúng Tôi - Đội Ngũ Harmony Wedding",
  description:
    "Tìm hiểu về Harmony Wedding - Studio chụp ảnh cưới nghệ thuật tại Đồng Nai với hơn 13 năm kinh nghiệm. Đội ngũ nhiếp ảnh gia, quay phim và makeup chuyên nghiệp.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Về Chúng Tôi - Đội Ngũ Harmony Wedding",
    description:
      "Tìm hiểu về Harmony Wedding - Studio chụp ảnh cưới nghệ thuật tại Đồng Nai với hơn 13 năm kinh nghiệm.",
    url: "/about",
    images: [
      {
        url: "/images/home/about-us.webp",
        width: 1200,
        height: 630,
        alt: "Đội ngũ Harmony Wedding - Studio cưới cao cấp Đồng Nai",
      },
    ],
  },
};

export function AboutPage() {
  return (
    <main className="bg-white text-black" id="top">
      <Header variant="solid" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Về Chúng Tôi", href: "/about" },
        ]}
      />

      {/* Editorial Hero (Typography-First) */}
      <section className="pt-28 md:pt-40 bg-neutral-50 border-b border-black/[0.04] pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
            Câu chuyện thương hiệu
            <span className="h-px w-16 bg-black" />
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,10vw,5.5rem)] leading-[0.9] text-black max-w-4xl">
            Gìn Giữ Từng Nhịp Thở Của Tình Yêu & Những Cảm Xúc Nguyên Bản
          </h1>
          <div className="mt-12 grid gap-8 md:grid-cols-[1.5fr_1fr] border-t border-black/10 pt-12">
            <div>
              <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-800 italic">
                "Chúng tôi tin rằng, bức ảnh đẹp nhất không phải là bức ảnh được
                tạo dáng hoàn hảo nhất, mà là bức ảnh lưu giữ được nhiều cảm
                xúc thật nhất."
              </p>
            </div>
            <div>
              <p className="text-sm leading-7 text-neutral-600 font-light">
                Harmony được thành lập với mong muốn lưu giữ trọn vẹn những
                nhịp thở của tình yêu, những khoảnh khắc nhẹ nhàng mà sâu lắng
                nhất. Chúng tôi không chụp những nụ cười công nghiệp hay những
                tư thế cứng nhắc, mà đi tìm sự mộc mạc và chân thực vốn có của
                hai bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Profile Grid */}
      <TeamGrid />

      <Footer />
    </main>
  );
}

export default AboutPage;
