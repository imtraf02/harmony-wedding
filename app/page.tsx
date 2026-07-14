import type { Metadata } from "next";

import { AboutSection } from "@/components/home/about-section";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { HeroSection } from "@/components/home/hero-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { CollectionSection } from "@/components/home/collection-section";
import { ServicesBar } from "@/components/home/services-bar";
import { ServicePosters } from "@/components/home/service-posters";
import { StoryTimeline } from "@/components/home/story-timeline";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { PricingSection } from "@/components/home/pricing-section";
import { BookingSection } from "@/components/home/booking-section";

import { getShowcaseItems, getTimelineSteps, getHomeData } from "@/lib/content";
import type { TestimonialItem } from "@/types/home";

export async function generateMetadata(): Promise<Metadata> {
  const homeData = await getHomeData();
  return {
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: homeData.seo.title,
      description: homeData.seo.description,
      url: "/",
      images: [
        {
          url: homeData.hero.image,
          width: 1920,
          height: 1080,
          alt: "Harmony Wedding - Studio chụp ảnh cưới cao cấp tại Đồng Nai",
        },
      ],
    },
  };
}

const rawPreviewImages = [
  { src: "/images/mau-do/vay-cuoi-037.webp", label: "Váy Cưới Signature" },
  { src: "/images/mau-do/vay-cuoi-148.webp", label: "Váy Cưới Premium" },
  { src: "/images/mau-do/vay-cuoi-149.webp", label: "Váy Cưới Diamond" },
  { src: "/images/mau-do/vay-cuoi-150.webp", label: "Váy Cưới Luxury" },
  { src: "/images/mau-do/vay-cuoi-151.webp", label: "Váy Cưới Royal" },
  { src: "/images/mau-do/vay-cuoi-152.webp", label: "Váy Cưới Limited" }
];

export async function HomePage() {
  const homeData = await getHomeData();
  const portfolioItems = await getShowcaseItems("portfolio_item");
  const timelineSteps = await getTimelineSteps();

  const heroImage = homeData.hero.image;
  const aboutImage = homeData.about.image;
  const processImage = homeData.timeline.processImage;
  const reelAnGardenImage = "/images/reel-an-garden.png";
  const reelWeddingDayImage = "/images/reel-wedding-day.png";

  return (
    <main className="bg-white text-neutral-950">
      <Header />
      <HeroSection heroImage={heroImage} />
      <ServicesBar />
      <PortfolioSection items={portfolioItems} />
      <ServicePosters />
      <CollectionSection previewImages={rawPreviewImages} />
      <AboutSection aboutImage={aboutImage} />
      <StoryTimeline processImage={processImage} steps={timelineSteps} />
      <PricingSection />
      <TestimonialsSection
        items={homeData.testimonials as TestimonialItem[]}
        reelAnGardenImage={reelAnGardenImage}
        reelWeddingDayImage={reelWeddingDayImage}
      />
      <BookingSection />
      <Footer />
    </main>
  );
}

export default HomePage;
