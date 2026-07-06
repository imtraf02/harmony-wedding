import type { Metadata } from "next";

import { Header } from "@/components/home/header";
import { Footer } from "@/components/home/footer";
import { TeamGrid } from "@/components/about/team-grid";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

import { MeshGradient } from "@/components/ui/mesh-gradient";
import { GlassCard } from "@/components/ui/glass-card";

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
    <main className="bg-[#fcfbfc] text-black min-h-screen relative overflow-hidden" id="top">
      <Header variant="solid" />
      {/* Light moving mesh gradient background */}
      <MeshGradient variant="light" className="opacity-75" />

      <BreadcrumbJsonLd
        items={[
          { name: "Trang Chủ", href: "/" },
          { name: "Về Chúng Tôi", href: "/about" },
        ]}
      />

      {/* Editorial Hero (Typography-First) */}
      <section className="pt-32 md:pt-44 bg-transparent pb-16 md:pb-24 relative z-10">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
          <p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
            Câu chuyện thương hiệu
            <span className="h-px w-16 bg-neutral-300" />
          </p>
          <h1 className="font-serif text-[clamp(3.2rem,10vw,5.5rem)] leading-[0.9] text-black max-w-4xl tracking-tight">
            Gìn Giữ Từng Nhịp Thở Của Tình Yêu & Những Cảm Xúc Nguyên Bản
          </h1>

          <GlassCard
            variant="light"
            intensity="low"
            borderStrength="low"
            className="mt-12 p-8 md:p-12 border border-white/40 shadow-xs rounded-3xl"
          >
            <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] items-center">
              <div>
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-neutral-800 italic">
                  "Chúng tôi tin rằng, bức ảnh đẹp nhất không phải là bức ảnh được
                  tạo dáng hoàn hảo nhất, mà là bức ảnh lưu giữ được nhiều cảm
                  xúc thật nhất."
                </p>
              </div>
              <div>
                <p className="text-sm leading-7 text-neutral-600 font-light border-l border-black/5 pl-6">
                  Harmony được thành lập với mong muốn lưu giữ trọn vẹn những
                  nhịp thở của tình yêu, những khoảnh khắc nhẹ nhàng mà sâu lắng
                  nhất. Chúng tôi không chụp những nụ cười công nghiệp hay những
                  tư thế cứng nhắc, mà đi tìm sự mộc mạc và chân thực vốn có của
                  hai bạn.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Team Profile Grid */}
      <TeamGrid />

      <Footer />
    </main>
  );
}

export default AboutPage;
