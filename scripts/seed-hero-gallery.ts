#!/usr/bin/env tsx
import { getPortfolios } from '../lib/queries/portfolio';
import { createHeroSlide } from '../lib/queries/hero';
import { createGalleryItem } from '../lib/queries/gallery';
import { getDb } from '../lib/db';

async function seedHeroAndGallery() {
  console.log('Seeding Hero Slides and Gallery...');
  const db = getDb();
  
  // Clear existing items if any
  db.prepare('DELETE FROM hero_slides').run();
  db.prepare('DELETE FROM gallery_items').run();

  const portfolios = getPortfolios();
  
  if (portfolios.length === 0) {
    console.log('No portfolios found to generate hero/gallery from. Please run seed-images.ts first.');
    return;
  }

  let heroCount = 1;
  let galleryCount = 1;

  for (const portfolio of portfolios) {
    // Add the cover image as a hero slide
    if (portfolio.cover_image && heroCount <= 5) {
      createHeroSlide({
        src: portfolio.cover_image,
        title: portfolio.title,
        subtitle: `Đẳng cấp & Tinh tế`,
        description: `Trải nghiệm dịch vụ chụp ảnh cưới chuyên nghiệp tại ${portfolio.title}`,
        cta_label: 'Xem Chi Tiết',
        cta_href: `/portfolio/${portfolio.slug}`,
        sort_order: heroCount,
        is_active: true
      });
      console.log(`✅ Added Hero Slide ${heroCount}: ${portfolio.title}`);
      heroCount++;
    }

    // Add first 4 images from each portfolio to the gallery
    const images = portfolio.images || [];
    for (let i = 0; i < Math.min(4, images.length); i++) {
      createGalleryItem({
        src: images[i],
        alt: `${portfolio.title} - Image ${i + 1}`,
        label: portfolio.title,
        sort_order: galleryCount,
        is_active: true
      });
      galleryCount++;
    }
    console.log(`✅ Added 4 Gallery Items from: ${portfolio.title}`);
  }

  console.log('\n🎉 Hero and Gallery seeding complete!');
}

seedHeroAndGallery().catch(console.error);
