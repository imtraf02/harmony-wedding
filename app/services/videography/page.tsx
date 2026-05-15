import { buildMetadata } from '@/lib/metadata';
import { SectionTitle } from '@/components/shared/section-title';
import { CtaBanner } from '@/components/home/cta-banner';
import Image from 'next/image';

export const metadata = buildMetadata({
  title: 'Quay phim Cinematic | Harmony Studio',
  description: 'Dịch vụ quay phim điện ảnh cưới chuyên nghiệp, kể câu chuyện tình yêu qua từng thước phim.',
  path: '/services/videography',
});

export default function VideographyPage() {
  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow="Cinema"
            title="Quay phim Cinematic"
            subtitle="Tái hiện câu chuyện tình yêu của bạn như một bộ phim điện ảnh."
            centered
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center space-y-10 order-2 md:order-1">
              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Về dịch vụ</h3>
                <p className="text-smoke font-light leading-relaxed">
                  Với trang thiết bị hiện đại và kỹ thuật dựng phim chuyên nghiệp, chúng tôi mang đến những thước phim chất lượng 4K, màu sắc cinematic và âm thanh sống động, lưu giữ trọn vẹn từng khoảnh khắc quan trọng.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Thông số kỹ thuật</h3>
                <ul className="grid grid-cols-1 gap-4">
                  {[
                    'Quay phim độ phân giải 4K Ultra HD',
                    'Thiết bị chống rung chuyên dụng (Gimbal)',
                    'Sử dụng Flycam quay toàn cảnh',
                    'Hệ thống thu âm hiện trường chuyên nghiệp',
                    'Dựng phim theo phong cách kể chuyện (Storytelling)',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-ash font-light">
                      <span className="size-1 bg-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury order-1 md:order-2">
              <Image
                src="/img/cinematic.jpg"
                alt="Cinematic Videography"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
