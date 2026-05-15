import { getFeaturedPortfolios } from '@/lib/queries/portfolio';
import { getActiveGalleryItems } from '@/lib/queries/gallery';
import { getActiveTestimonials } from '@/lib/queries/testimonials';
import { getHeroSlides } from '@/lib/queries/hero';
import { HeroImages } from '@/components/home/hero-images';
import { ServiceCards } from '@/components/home/service-cards';
import { Testimonials } from '@/components/home/testimonials';
import { CtaBanner } from '@/components/home/cta-banner';
import { JsonLd, localBusinessSchema } from '@/components/shared/json-ld';
import { GalleryScroll } from '@/components/home/galleryscroll';
import { FeaturedWorks, type FeaturedWork } from '@/components/home/featured-work';
import type { Testimonial as TestimonialComponent } from '@/components/home/testimonials';

// ─── Static fallbacks (used when the DB tables are empty) ────────────────────

const STATIC_GALLERY_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000', alt: 'Lễ đường ngoài trời', label: 'The Ceremony' },
  { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000', alt: 'Cặp đôi trong rừng', label: 'Pre Wedding' },
  { src: 'https://images.unsplash.com/photo-1494913148647-353ae514b35e?q=80&w=1000', alt: 'Nụ hôn dưới ánh hoàng hôn', label: 'Cinematic' },
  { src: 'https://images.unsplash.com/photo-1522673607200-164883eecd0c?q=80&w=1000', alt: 'Cận cảnh hoa cưới', label: 'The Details' },
  { src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000', alt: 'Cặp đôi khiêu vũ', label: 'First Dance' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1000', alt: 'Nhẫn cưới và phụ kiện', label: 'Essentials' },
  { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1000', alt: 'Khoảnh khắc đen trắng', label: 'Timeless' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=1000', alt: 'Cô dâu chuẩn bị', label: 'Editorial' },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000', alt: 'Bàn tiệc tối', label: 'The Venue' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000', alt: 'Cặp đôi trên bãi biển', label: 'Outdoor' },
];

const STATIC_WORKS: FeaturedWork[] = [
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop', alt: 'Portrait 1', category: 'Pre Wedding', title: 'Hoàng & Linh', orientation: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?q=80&w=1200&auto=format&fit=crop', alt: 'Featured 1', category: 'Pre Wedding', title: 'Minh & Trang', orientation: 'landscape', featured: true },
  { src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop', alt: 'Landscape 1', category: 'Cinematic', orientation: 'landscape' },
  { src: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop', alt: 'Portrait 2', category: 'Editorial', orientation: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop', alt: 'Square 1', category: 'Details', orientation: 'square' },
  { src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop', alt: 'Portrait 3', category: 'Candids', orientation: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1200&auto=format&fit=crop', alt: 'Featured 2', category: 'Destination', title: 'Hải & Yến', orientation: 'landscape', featured: true },
  { src: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=800&auto=format&fit=crop', alt: 'Landscape 2', category: 'Black & White', orientation: 'landscape' },
  { src: 'https://images.unsplash.com/photo-1513271923719-87775404a211?q=80&w=800&auto=format&fit=crop', alt: 'Portrait 4', category: 'Pre Wedding', orientation: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=800&auto=format&fit=crop', alt: 'Square 2', category: 'Emotions', orientation: 'square' },
  { src: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=800&auto=format&fit=crop', alt: 'Portrait 5', category: 'Luxury', orientation: 'portrait' },
  { src: 'https://images.unsplash.com/photo-1465495910483-3451e6088431?q=80&w=800&auto=format&fit=crop', alt: 'Landscape 3', category: 'Cinematic', orientation: 'landscape' },
];

const STATIC_TESTIMONIALS: TestimonialComponent[] = [
  {
    couple: 'Minh & Trang',
    meta: 'TP. Hồ Chí Minh · Tháng 3, 2025',
    service: 'Phóng sự cưới',
    rating: 5,
    quote: 'Ekip rất chuyên nghiệp và tận tâm. Những bức ảnh vượt xa kỳ vọng của chúng mình — cảm xúc thật, màu sắc đẹp, khoảnh khắc tự nhiên.',
    src: '/img/couple-1.jpg',
  },
  {
    couple: 'Hoàng & Linh',
    meta: 'Đà Lạt · Tháng 12, 2024',
    service: 'Pre Wedding',
    rating: 5,
    quote: 'Bộ ảnh pre-wedding ở Đà Lạt đẹp hơn mình tưởng tượng rất nhiều. Anh chị ekip rất vui vẻ, giúp mình thoải mái trước ống kính.',
  },
];

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

  // GalleryScroll: Uses new `gallery_items` table (fallback to static if empty)
  const galleryItems = dbGallery.length > 0
    ? dbGallery.map((p) => ({
        src: p.src,
        alt: p.alt,
        label: p.label ?? undefined,
      }))
    : STATIC_GALLERY_ITEMS;

  // FeaturedWorks: same portfolios, alternate portrait/landscape per row
  const ORIENTATIONS: FeaturedWork['orientation'][] = ['portrait', 'landscape', 'portrait', 'landscape', 'square', 'portrait'];
  const featuredWorks: FeaturedWork[] = dbPortfolios.length > 0
    ? dbPortfolios.map((p, i) => ({
        src: p.cover_image,
        alt: p.title,
        title: p.title,
        category: STYLE_LABEL[p.style] ?? p.style,
        orientation: ORIENTATIONS[i % ORIENTATIONS.length],
        featured: p.is_featured && i % 4 === 1, // feature every 4th item that is marked featured
        href: `/portfolio/${p.slug}`,
      }))
    : STATIC_WORKS;

  // Testimonials: map DB Testimonial → component Testimonial prop shape
  const testimonialItems: TestimonialComponent[] = dbTestimonials.length > 0
    ? dbTestimonials.map((t) => ({
        couple: t.couple_name,
        meta: t.wedding_year ? `${t.wedding_year}` : undefined,
        quote: t.content,
        rating: t.rating as 1 | 2 | 3 | 4 | 5,
        service: t.service ?? undefined,
        src: t.avatar ?? undefined,
      }))
    : STATIC_TESTIMONIALS;

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
