import { buildMetadata } from '@/lib/metadata';
import { SectionTitle } from '@/components/shared/section-title';
import { CtaBanner } from '@/components/home/cta-banner';
import Image from 'next/image';
import { JsonLd, serviceSchema } from '@/components/shared/json-ld';

export const metadata = buildMetadata({
  title: 'Chụp ảnh cưới (Pre-Wedding) | Harmony Studio',
  description: 'Dịch vụ chụp ảnh cưới chuyên nghiệp, lưu giữ những khoảnh khắc hạnh phúc nhất của cặp đôi.',
  path: '/services/photography',
});

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-luxury">
      <JsonLd
        data={serviceSchema({
          name: 'Chụp ảnh cưới Pre-Wedding',
          description: 'Dịch vụ chụp ảnh cưới chuyên nghiệp, lên concept, chọn địa điểm và chỉnh sửa hình ảnh cho album cưới.',
          path: '/services/photography',
        })}
      />
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow="Photography"
            title="Chụp ảnh cưới Pre-Wedding"
            subtitle="Mỗi bộ ảnh là một tác phẩm nghệ thuật kể về hành trình yêu của bạn."
            centered
          />

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury">
              <Image
                src="/img/prewedding.jpg"
                alt="Pre-Wedding Photography"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Về dịch vụ</h3>
                <p className="text-smoke font-light leading-relaxed">
                  Chúng tôi tin rằng những bức ảnh đẹp nhất là những bức ảnh ghi lại được cảm xúc chân thật nhất. Ekip của Harmony Studio sẽ cùng bạn lên concept, chọn địa điểm và chuẩn bị kỹ lưỡng nhất để mỗi khung hình đều là một kỷ niệm đẹp.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-sans font-light text-obsidian tracking-tight">Những gì bạn nhận được</h3>
                <ul className="grid grid-cols-1 gap-4">
                  {[
                    '01 Album photobook cao cấp (30x30cm, 30 trang)',
                    '02 Ảnh phóng lớn pha lê (60x90cm)',
                    'Toàn bộ file gốc và file đã chỉnh sửa màu',
                    'Túi đựng album và hộp đựng ảnh cao cấp',
                    'Trang phục chụp ảnh (váy cưới & vest)',
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
