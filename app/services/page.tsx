import { buildMetadata } from '@/lib/metadata';
import { SectionTitle } from '@/components/shared/section-title';
import { CtaBanner } from '@/components/home/cta-banner';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Dịch vụ & Báo giá | Harmony Studio',
  description: 'Khám phá các nhóm dịch vụ chính tại Harmony Wedding: Gói ngày cưới, Chụp ảnh Album Pre-wedding và các dịch vụ thuê lẻ.',
  path: '/services',
});

const SERVICE_GROUPS = [
  {
    title: 'Gói Dịch Vụ Ngày Cưới',
    subtitle: 'Trọn gói & Lẻ',
    image: '/img/wedding.jpg',
    description: 'Bao gồm các gói từ trang phục, makeup đến chụp ảnh phóng sự trong ngày trọng đại. Phù hợp cho cả tổ chức 1 ngày hoặc 2 ngày.',
    highlights: [
      'Trọn gói 1 ngày: Diamond, Ruby, Signature, Super VIP',
      'Trọn gói 2 ngày dành cho lễ ở hai nhà hoặc hai ngày khác nhau',
      'Combo tiết kiệm chủ yếu tập trung vào trang phục & hoa',
      'Dịch vụ thợ chụp/quay lẻ linh hoạt tặng kèm Flycam, USB'
    ],
    detailHref: '/services/wedding-film',
    pricingHref: '/pricing'
  },
  {
    title: 'Gói Chụp Ảnh Album',
    subtitle: 'Pre-wedding',
    image: '/img/prewedding.jpg',
    description: 'Dịch vụ chụp ảnh trước đám cưới để làm album và hình cổng tại Studio, Phim trường hoặc các tour ngoại cảnh đi xa.',
    highlights: [
      'Chụp tại Studio: Basic, VIP, Concept độc quyền',
      'Chụp tại Phim trường với nhiều bối cảnh hoành tráng',
      'Tour Ngoại cảnh: Vũng Tàu, Đà Lạt, Vĩnh Hy, Đảo Phú Quý',
      'Gói hình cổng lẻ tiết kiệm lấy nhanh'
    ],
    detailHref: '/services/photography',
    pricingHref: '/pricing'
  },
  {
    title: 'Thuê Lẻ & Phát Sinh',
    subtitle: 'Linh hoạt theo nhu cầu',
    image: '/img/cinematic.jpg',
    description: 'Cung cấp các dịch vụ thuê lẻ trang phục, makeup chuyên nghiệp và các sản phẩm in ấn, rửa ảnh chất lượng cao.',
    highlights: [
      'Trang phục: Váy cưới, Veston, Áo dài, Hỷ phục cặp',
      'Makeup: Chụp tiệc, Makeup cô dâu tại nhà, Makeup sui gia',
      'In ấn: Rửa ảnh ép gỗ, Album photobook tráng gương',
      'Dịch vụ linh hoạt không cần mua trọn gói'
    ],
    detailHref: '/pricing', // no detail page for a la carte, just pricing
    pricingHref: '/pricing'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-px bg-gold/50" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Harmony Wedding</span>
              <span className="w-8 h-px bg-gold/50" />
            </div>
            <h1 className="text-4xl md:text-6xl font-sans font-light text-obsidian leading-tight tracking-tight mb-8">
              Hệ thống <em className="text-gold-600 not-italic">Dịch vụ</em> của chúng tôi
            </h1>
            <p className="text-smoke font-light text-lg leading-relaxed">
              Mỗi nhóm dịch vụ được thiết kế để đáp ứng chính xác nhu cầu và ngân sách của bạn, đảm bảo sự trọn vẹn trong ngày cưới.
            </p>
          </div>

          {/* Service Groups */}
          <div className="space-y-32">
            {SERVICE_GROUPS.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div 
                  key={index}
                  className={cn(
                    "flex flex-col gap-12 md:gap-24 items-center",
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* Image side */}
                  <Link 
                    href={service.detailHref}
                    className="flex-1 relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl group cursor-pointer"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
                  </Link>

                  {/* Text side */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">0{index + 1}</span>
                        <span className="h-px w-8 bg-gold/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ash">{service.subtitle}</span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-sans font-light text-obsidian tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                    
                    <p className="text-smoke text-lg font-light leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="grid grid-cols-1 gap-4">
                      {service.highlights.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <span className="size-1.5 rounded-full bg-gold shrink-0" />
                          <span className="text-sm text-ash font-light tracking-wide">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 flex flex-wrap gap-6 md:gap-10">
                      {/* Chi tiết button */}
                      {service.detailHref !== '/pricing' && (
                        <Link
                          href={service.detailHref}
                          className="group inline-flex items-center gap-4 text-obsidian"
                        >
                          <span className="relative text-[11px] font-bold uppercase tracking-[0.25em]">
                            Chi tiết dịch vụ
                            <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </span>
                          <span className="size-10 flex items-center justify-center border border-obsidian/10 rounded-full group-hover:bg-gold group-hover:border-gold transition-all duration-500 text-lg">
                            →
                          </span>
                        </Link>
                      )}

                      {/* Báo giá button */}
                      <Link
                        href={service.pricingHref}
                        className="group inline-flex items-center gap-4 text-obsidian"
                      >
                        <span className="relative text-[11px] font-bold uppercase tracking-[0.25em]">
                          Xem bảng giá
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </span>
                        <span className="size-10 flex items-center justify-center border border-gold rounded-full group-hover:bg-gold transition-all duration-500 text-lg">
                          $
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
