import { getFeaturedPortfolios } from '@/lib/queries/portfolio';
import { getActiveGalleryItems } from '@/lib/queries/gallery';
import { getActiveTestimonials } from '@/lib/queries/testimonials';
import { getHeroSlides } from '@/lib/queries/hero';
import { HeroImages } from '@/components/home/hero-images';
import { ServiceCards } from '@/components/home/service-cards';
import { Testimonials } from '@/components/home/testimonials';
import { CtaBanner } from '@/components/home/cta-banner';
import { JsonLd, localBusinessSchema, websiteSchema } from '@/components/shared/json-ld';
import { GalleryScroll } from '@/components/home/galleryscroll';
import { FeaturedWorks, type FeaturedWork } from '@/components/home/featured-work';
import type { Testimonial as TestimonialComponent } from '@/components/home/testimonials';



// ─── Style → category label map ───────────────────────────────────────────────
const STYLE_LABEL: Record<string, string> = {
  vintage: 'Vintage',
  modern: 'Modern',
  fineart: 'Fine Art',
  romantic: 'Romantic',
};

export default async function Home() {

  // Fetch DB data in parallel
  const [dbPortfolios, dbTestimonials, dbGallery, dbHero] = await Promise.all([
    getFeaturedPortfolios(12),
    getActiveTestimonials(10),
    getActiveGalleryItems(20),
    getHeroSlides(),
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

  const heroItems = dbHero.map(slide => ({
    src: slide.src,
    alt: slide.title || 'Harmony Hero',
    tag: slide.subtitle || undefined,
    title: slide.title || '',
    description: slide.description || '',
    cta_label: slide.cta_label || undefined,
    cta_href: slide.cta_href || undefined,
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
        services={[
          {
            index: '01',
            src: '/img/wedding.jpg',
            alt: 'Gói Ngày Cưới',
            title: 'Gói Ngày Cưới',
            description: 'Trọn gói từ trang phục, makeup đến chụp ảnh phóng sự. Có các gói Diamond, Ruby, Signature...',
            highlights: ['Trọn gói 1 ngày / 2 ngày', 'Combo tiết kiệm chỉ từ 4.9tr', 'Thợ chụp/quay lẻ linh hoạt'],
            href: '/services',
          },
          {
            index: '02',
            src: '/img/prewedding.jpg',
            alt: 'Album Pre-wedding',
            title: 'Album Pre-wedding',
            description: 'Chụp ảnh trước đám cưới tại Studio, Phim trường hoặc các tour ngoại cảnh đi xa chuyên nghiệp.',
            highlights: ['Studio Concept độc quyền', 'Ngoại cảnh Đà Lạt, Vĩnh Hy...', 'Album photobook cao cấp'],
            href: '/services',
          },
          {
            index: '03',
            src: '/img/cinematic.jpg',
            alt: 'Dịch vụ Thuê lẻ',
            title: 'Dịch vụ Thuê lẻ',
            description: 'Thuê lẻ Váy cưới, Vest, Áo dài, Makeup cô dâu/sui gia và các dịch vụ in ấn rửa ảnh.',
            highlights: ['Thuê Hỷ Phục cặp', 'Makeup tận nơi', 'In ảnh ép gỗ, photobook'],
            href: '/pricing',
          },
        ]}
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
