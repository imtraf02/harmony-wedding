#!/usr/bin/env tsx
import { createStudio } from '../lib/queries/studios';
import { getDb } from '../lib/db';
import { getPortfolios } from '../lib/queries/portfolio';

async function seedStudios() {
  console.log('Seeding Studios...');
  const db = getDb();
  
  // Clear existing items
  db.prepare('DELETE FROM studios').run();

  const portfolios = getPortfolios();
  
  // Main Studio
  createStudio({
    slug: 'harmony-studio-trang-bom',
    name: 'Harmony Studio Trảng Bom',
    type: 'studio',
    address: '45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai',
    city: 'Đồng Nai',
    description: 'Studio chính của Harmony tại Đồng Nai, với không gian rộng rãi và nhiều góc chụp concept đa dạng. Chúng tôi cung cấp dịch vụ trọn gói từ trang điểm, trang phục đến hậu kỳ chuyên nghiệp.',
    highlights: ['Trang thiết bị hiện đại', 'Makeup chuyên nghiệp', 'Phòng thay đồ riêng tư', 'Bối cảnh đa dạng'],
    images: portfolios.find(p => p.slug.includes('studio'))?.images.slice(0, 5) || [],
    map_embed_url: null,
    best_time: 'Cả ngày',
    is_active: true,
    sort_order: 1
  });
  console.log('✅ Added Main Studio: Harmony Studio Trảng Bom');

  // Film sets / Outdoor locations from portfolios
  const locations = [
    { name: 'Phim Trường An Garden', slug: 'phim-truong-an-garden', type: 'studio', addr: 'Quận 9, TP. HCM' },
    { name: 'Phim Trường Sunny Garden', slug: 'phim-truong-sunny-garden', type: 'studio', addr: 'Quận 9, TP. HCM' },
    { name: 'Phim Trường Vũ Garden', slug: 'phim-truong-vu-garden', type: 'studio', addr: 'Lái Thiêu, Bình Dương' },
    { name: 'Đường Phố Hồ Chí Minh', slug: 'duong-pho-ho-chi-minh', type: 'outdoor', addr: 'Trung tâm Quận 1 & Quận 3, TP. HCM' }
  ];

  let order = 2;
  for (const loc of locations) {
    const portfolio = portfolios.find(p => p.slug === loc.slug);
    createStudio({
      slug: loc.slug,
      name: loc.name,
      type: loc.type as any,
      address: loc.addr,
      city: loc.addr.split(', ').pop() || '',
      description: `Địa điểm chụp ảnh cưới lý tưởng tại ${loc.name}. Không gian mang phong cách hiện đại kết hợp thiên nhiên, mang lại những khung hình lãng mạn và đẳng cấp cho các cặp đôi.`,
      highlights: ['Không gian rộng rãi', 'Kiến trúc độc đáo', 'Nhiều góc chụp đẹp', 'Ánh sáng tự nhiên tốt'],
      images: portfolio?.images.slice(0, 5) || [],
      map_embed_url: null,
      best_time: loc.type === 'outdoor' ? 'Sáng sớm hoặc Chiều tà' : 'Cả ngày',
      is_active: true,
      sort_order: order++
    });
    console.log(`✅ Added Location: ${loc.name}`);
  }

  console.log('\n🎉 Studio seeding complete!');
}

seedStudios().catch(console.error);
