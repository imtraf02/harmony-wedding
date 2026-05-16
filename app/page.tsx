import { CtaBanner } from "@/components/home/cta-banner";
import {
  type FeaturedWork,
  FeaturedWorks,
} from "@/components/home/featured-work";
import { GalleryScroll } from "@/components/home/galleryscroll";
import { HeroImages } from "@/components/home/hero-images";
import {
  type Service as ServiceCardItem,
  ServiceCards,
} from "@/components/home/service-cards";
import type { Testimonial as TestimonialComponent } from "@/components/home/testimonials";
import { Testimonials } from "@/components/home/testimonials";
import {
  JsonLd,
  localBusinessSchema,
  websiteSchema,
} from "@/components/shared/json-ld";
import { getActiveGalleryItems } from "@/lib/queries/gallery";
import { getHeroSlides } from "@/lib/queries/hero";
import { getFeaturedPortfolios } from "@/lib/queries/portfolio";
import { getActiveServices } from "@/lib/queries/services";
import { getActiveTestimonials } from "@/lib/queries/testimonials";

// ─── Style → category label map ───────────────────────────────────────────────
const STYLE_LABEL: Record<string, string> = {
  vintage: "Vintage",
  modern: "Modern",
  fineart: "Fine Art",
  romantic: "Romantic",
};

export default async function Home() {
  // Fetch DB data in parallel
  const [dbPortfolios, dbTestimonials, dbGallery, dbHero, dbServices] =
    await Promise.all([
      getFeaturedPortfolios(12),
      getActiveTestimonials(10),
      getActiveGalleryItems(20),
      getHeroSlides(),
      getActiveServices(),
    ]);

  // ── Map DB rows → component shapes ────────────────────────────────────────

  const galleryItems = dbGallery.map((p) => ({
    src: p.src,
    alt: p.alt,
    label: p.label ?? undefined,
  }));

  // FeaturedWorks: preserve each portfolio's saved cover orientation.
  const featuredWorks: FeaturedWork[] = dbPortfolios.map((p, i) => ({
    src: p.cover_image,
    alt: p.title,
    title: p.title,
    category: STYLE_LABEL[p.style] ?? p.style,
    orientation: p.orientation,
    featured: p.is_featured && i % 4 === 1, // feature every 4th item that is marked featured
    href: `/portfolio/${p.slug}`,
  }));

  // Testimonials: map DB Testimonial → component Testimonial prop shape
  const testimonialItems: TestimonialComponent[] = dbTestimonials.map((t) => ({
    couple: t.couple_name,
    meta: t.wedding_year ? `${t.wedding_year}` : undefined,
    quote: t.content,
    rating: t.rating as 1 | 2 | 3 | 4 | 5,
    service: t.service ?? undefined,
    src: t.avatar ?? undefined,
  }));

  const heroItems = dbHero.map((slide) => ({
    src: slide.src,
    alt: slide.title || "Harmony Hero",
    tag: slide.subtitle || undefined,
    title: slide.title || "",
    description: slide.description || "",
    cta_label: slide.cta_label || undefined,
    cta_href: slide.cta_href || undefined,
  }));

  const serviceItems: ServiceCardItem[] = dbServices.map((service, index) => ({
    index: String(index + 1).padStart(2, "0"),
    src: service.hero_image,
    images:
      service.demo_images.length > 0
        ? service.demo_images
        : [service.hero_image],
    alt: service.title,
    title: service.title,
    description: service.description,
    highlights: service.features,
    href: service.detail_href || "/services",
    ctaLabel: "Xem chi tiết",
    meta: service.subtitle || undefined,
  }));

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={websiteSchema} />

      <HeroImages items={heroItems} />
      <GalleryScroll
        title="Khoảnh khắc đẹp"
        subtitle="Bộ sưu tập"
        items={galleryItems}
      />

      <FeaturedWorks
        title="Tác phẩm tiêu biểu"
        subtitle="Portfolio"
        ctaHref="/portfolio"
        works={featuredWorks}
      />

      <ServiceCards
        title="Dịch vụ chụp ảnh"
        subtitle="Chúng tôi cung cấp"
        services={serviceItems}
      />

      <Testimonials
        title="Phản hồi từ các cặp đôi"
        subtitle="Cảm nhận"
        testimonials={testimonialItems}
      />

      <CtaBanner />
    </>
  );
}
