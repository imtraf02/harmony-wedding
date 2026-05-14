import { getFeaturedPortfolios } from '@/lib/queries/portfolio';
import { getActiveTestimonials } from '@/lib/queries/testimonials';
import { HeroVideo }           from '@/components/home/hero-video';
import { ServiceCards }        from '@/components/home/service-cards';
import { FeaturedPortfolio }   from '@/components/home/featured-portfolio';
import { Testimonials }        from '@/components/home/testimonials';
import { CtaBanner }           from '@/components/home/cta-banner';
import { JsonLd, localBusinessSchema } from '@/components/shared/json-ld';

export default async function Home() {
  // Fetch data for the homepage
  // Note: These will return empty arrays if the database is not yet seeded
  const featuredPortfolios = getFeaturedPortfolios(6);
  const testimonials       = getActiveTestimonials();

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <HeroVideo
        src="/videos/hero-bg.mp4"
        poster="/uploads/portfolio/hero-poster.webp"
        title="Khoảnh khắc Hạnh phúc"
        ctaLabel="Đặt lịch ngay"
        ctaHref="/contact"
      />

      <ServiceCards />

      <FeaturedPortfolio items={featuredPortfolios} />

      <Testimonials items={testimonials} />

      <CtaBanner />
    </>
  );
}
