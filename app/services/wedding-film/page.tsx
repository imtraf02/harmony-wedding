import { buildMetadata } from '@/lib/metadata';
import { SectionTitle } from '@/components/shared/section-title';
import { CtaBanner } from '@/components/home/cta-banner';
import Image from 'next/image';
import { JsonLd, serviceSchema } from '@/components/shared/json-ld';

export const metadata = buildMetadata({
  title: 'Phóng sự cưới (Wedding Journal) | Harmony Studio',
  description: 'Dịch vụ quay phim và chụp ảnh phóng sự cưới, ghi lại những cảm xúc chân thực nhất.',
  path: '/services/wedding-film',
});

export default function WeddingFilmPage() {
  return (
    <div className="min-h-screen bg-luxury">
      <JsonLd
        data={serviceSchema({
          name: 'Phóng sự cưới',
          description: 'Dịch vụ chụp ảnh và quay phim phóng sự cưới, ghi lại cảm xúc chân thật trong ngày trọng đại.',
          path: '/services/wedding-film',
        })}
      />
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow="Wedding Journal"
            title="Phóng sự cưới"
            subtitle="Ghi lại trọn vẹn từng cung bậc cảm xúc trong ngày trọng đại của bạn."
            centered
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury">
              <Image
                src="/img/wedding.jpg"
                alt="Wedding Journal"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Về dịch vụ</h3>
                <p className="text-smoke font-light leading-relaxed">
                  Phóng sự cưới là nghệ thuật bắt trọn những khoảnh khắc bất ngờ và đầy cảm xúc. Chúng tôi không chỉ ghi lại hình ảnh, mà còn ghi lại cả bầu không khí hạnh phúc, những cái ôm và những nụ cười trong ngày cưới của bạn.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Gói dịch vụ bao gồm</h3>
                <ul className="grid grid-cols-1 gap-4">
                  {[
                    '02 Nhiếp ảnh gia chuyên nghiệp suốt buổi lễ',
                    '01 Quay phim chính ghi lại các khoảnh khắc quan trọng',
                    'Dựng 01 phim Highlight dài 5-8 phút',
                    'Chỉnh sửa màu sắc toàn bộ file ảnh (khoảng 500-800 file)',
                    'Giao toàn bộ file gốc và file hoàn thiện sau 15-20 ngày',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-4 text-ash font-light">
                      <span className="size-1 bg-gold rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
