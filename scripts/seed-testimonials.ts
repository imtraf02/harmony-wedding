#!/usr/bin/env tsx
import { createTestimonial } from '../lib/queries/testimonials';
import { getDb } from '../lib/db';
import type { Testimonial } from '../types';

const sampleTestimonials: Omit<Testimonial, 'id'>[] = [
  {
    couple_name: "Minh & Hằng",
    content: "Đội ngũ vô cùng nhiệt tình và chuyên nghiệp. Ảnh chụp rất tự nhiên, chúng mình cực kì ưng ý với bộ ảnh cưới này. Cảm ơn Harmony Studio rất nhiều!",
    rating: 5,
    avatar: null,
    service: "Chụp ảnh cưới (Studio & Ngoại cảnh)",
    wedding_year: 2025,
    is_active: true,
    sort_order: 1
  },
  {
    couple_name: "Tuấn & Lan",
    content: "Dịch vụ quá tuyệt vời! Cả ekip đã tạo cho hai đứa một không gian rất thoải mái trong suốt buổi chụp. Mình đặc biệt thích phong cách blend màu phim của studio.",
    rating: 5,
    avatar: null,
    service: "Combo Chụp & Quay Pre-Wedding",
    wedding_year: 2024,
    is_active: true,
    sort_order: 2
  },
  {
    couple_name: "Hải & Yến",
    content: "Vợ chồng mình chọn Harmony sau khi xem qua rất nhiều portfolio của các bên. Và quả thực là một quyết định đúng đắn. Hình ảnh đẹp ngoài mong đợi và video cưới cực kì xịn xò.",
    rating: 5,
    avatar: null,
    service: "Quay phim phóng sự cưới",
    wedding_year: 2025,
    is_active: true,
    sort_order: 3
  },
  {
    couple_name: "Thành & Phương",
    content: "Concept chụp của team rất đa dạng và hợp gu. Bạn makeup cũng làm tóc và trang điểm cực kì tự nhiên, tôn lên những đường nét đẹp nhất. Highly recommend nhé!",
    rating: 5,
    avatar: null,
    service: "Chụp ảnh cưới Studio",
    wedding_year: 2023,
    is_active: true,
    sort_order: 4
  },
  {
    couple_name: "Phong & Thảo",
    content: "Tụi mình chụp ở phim trường Vũ Garden, nắng hôm đó rất gắt nhưng ekip hỗ trợ nhiệt tình từ lúc sáng sớm tới chiều tối. Kết quả là những bức hình lưu giữ kỉ niệm không thể tuyệt hơn.",
    rating: 5,
    avatar: null,
    service: "Chụp Ngoại cảnh & Phim trường",
    wedding_year: 2025,
    is_active: true,
    sort_order: 5
  }
];

async function seedTestimonials() {
  console.log('Seeding Testimonials...');
  const db = getDb();
  
  // Clear existing items
  db.prepare('DELETE FROM testimonials').run();

  for (const t of sampleTestimonials) {
    createTestimonial(t);
    console.log(`✅ Added Testimonial for: ${t.couple_name}`);
  }

  console.log('\n🎉 Testimonials seeding complete!');
}

seedTestimonials().catch(console.error);
