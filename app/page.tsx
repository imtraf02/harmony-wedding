import type { Metadata } from "next";

import { AboutSection } from "@/components/home/about-section";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { CollectionSection } from "@/components/home/collection-section";
import { ServicesBar } from "@/components/home/services-bar";
import { StoryTimeline } from "@/components/home/story-timeline";
import { TestimonialsSection } from "@/components/home/testimonials-section";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Harmony Wedding | Chụp Ảnh Cưới Đồng Nai - Khoảnh Khắc Trọn Đời",
    description:
      "Studio cưới cao cấp tại Đồng Nai. Chuyên chụp ảnh cưới nghệ thuật, quay phim cưới, trang điểm cô dâu, thuê vest & váy cưới và tổ chức tiệc cưới trọn gói.",
    url: "/",
    images: [
      {
        url: "/images/home/hero-banner.webp",
        width: 1920,
        height: 1080,
        alt: "Harmony Wedding - Studio chụp ảnh cưới cao cấp tại Đồng Nai",
      },
    ],
  },
};

export function HomePage() {
  return (
    <main className="bg-white text-neutral-950">
      <Header />
      <HeroSection />
      <ServicesBar />
      <PortfolioSection />
      <CollectionSection />
      <AboutSection />
      <StoryTimeline />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}

export default HomePage;
