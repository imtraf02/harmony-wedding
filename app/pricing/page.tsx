import { buildMetadata } from '@/lib/metadata';
import { SectionTitle } from '@/components/shared/section-title';
import { CtaBanner } from '@/components/home/cta-banner';
import { cn } from '@/lib/utils';

export const metadata = buildMetadata({
  title: 'Báo giá dịch vụ | Harmony Wedding',
  description: 'Bảng giá chi tiết các gói dịch vụ ngày cưới, chụp ảnh album pre-wedding và các dịch vụ thuê lẻ tại Harmony Wedding.',
  path: '/pricing',
});

interface PricingItem {
  title: string;
  price?: string;
  note?: string;
  details?: string[];
}

interface PricingGroup {
  category: string;
  description: string;
  items: PricingItem[];
}

const PRICING_DATA: PricingGroup[] = [
  {
    category: 'Gói Dịch Vụ Ngày Cưới (Trọn gói & Lẻ)',
    description: 'Đây là các gói lo từ trang phục, makeup đến chụp ảnh trong ngày trọng đại:',
    items: [
      {
        title: 'Trọn gói 1 ngày cưới',
        price: 'Từ 11.000.000đ - 19.500.000đ',
        note: 'Diamond, Ruby, Signature, Super VIP',
        details: ['Váy cưới, vest', 'Makeup tại nhà', 'Hoa tươi', 'Chụp ảnh phóng sự'],
      },
      {
        title: 'Trọn gói 2 ngày cưới',
        price: 'Từ 20.900.000đ - 34.900.000đ',
        details: ['Dành cho tổ chức lễ ở 2 nhà/2 ngày khác nhau', 'Tăng số lượng trang phục', 'Tăng nhân sự chụp/quay'],
      },
      {
        title: 'Combo tiết kiệm 1 ngày cưới',
        price: 'Từ 4.900.000đ - 7.000.000đ',
        details: ['Tập trung vào trang phục', 'Hoa cầm tay'],
      },
      {
        title: 'Dịch vụ thợ chụp/quay lẻ',
        price: 'Từ 1.700.000đ - 15.400.000đ',
        note: 'Tùy theo số lượng thợ',
        details: ['Từ 1 thợ chụp đến 2 chụp + 2 quay', 'Quà tặng kèm: Flycam, USB'],
      },
    ],
  },
  {
    category: 'Gói Chụp Ảnh Album (Pre-wedding)',
    description: 'Dịch vụ chụp ảnh trước đám cưới để làm album và hình cổng:',
    items: [
      {
        title: 'Chụp tại Studio',
        price: '3.900.000đ - 6.900.000đ',
        note: 'Basic, VIP, Concept độc quyền',
      },
      {
        title: 'Gói Hình cổng lẻ',
        price: '2.500.000đ - 5.900.000đ',
        note: 'Lấy 1-2 hình lớn để cổng',
      },
      {
        title: 'Chụp tại Phim trường',
        price: '6.900.000đ - 11.500.000đ',
        note: 'Combo 1, 2, 3',
      },
      {
        title: 'Chụp Ngoại cảnh (Đi xa)',
        price: '8.500.000đ - 21.500.000đ',
        note: 'Vũng Tàu, Đà Lạt, Vĩnh Hy, Đảo Phú Quý',
      },
    ],
  },
  {
    category: 'Dịch Vụ Thuê Lẻ & Phát Sinh',
    description: 'Tùy chọn linh hoạt cho các nhu cầu riêng lẻ:',
    items: [
      {
        title: 'Trang phục',
        details: [
          'Váy cưới: 1.550k - 2.250k',
          'Veston: 500k - 600k',
          'Áo dài: Cô dâu, chú rể, bà sui, bưng quả',
          'Hỷ Phục: 3.500k/cặp',
        ],
      },
      {
        title: 'Makeup',
        details: [
          'Chụp tiệc: 300k',
          'Makeup cô dâu tại tiệm/nhà: 1.500k - 2.000k',
          'Makeup sui gia',
        ],
      },
      {
        title: 'In ấn / Rửa ảnh',
        details: [
          'Rửa ảnh ép gỗ',
          'Ảnh lớn/nhỏ các kích thước',
          'Album photobook tráng gương',
        ],
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow="Investment"
            title="Báo giá dịch vụ"
            subtitle="Dựa trên các bảng báo giá từ Harmony Wedding, chúng tôi tóm gọn lại các nhóm dịch vụ chính để bạn dễ dàng theo dõi."
            centered
          />

          <div className="mt-20 space-y-24">
            {PRICING_DATA.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-12">
                {/* Category Header */}
                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">0{groupIdx + 1}</span>
                    <h2 className="text-2xl md:text-3xl font-sans font-light text-obsidian tracking-tight italic">
                      {group.category}
                    </h2>
                  </div>
                  <p className="text-ash font-light text-sm max-w-2xl">{group.description}</p>
                  <div className="absolute -bottom-4 left-0 w-12 h-px bg-gold/30" />
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {group.items.map((item, itemIdx) => (
                    <div 
                      key={itemIdx} 
                      className="group p-8 bg-white/50 backdrop-blur-sm border border-luxury-border-fine hover:border-gold/30 transition-all duration-500 rounded-none shadow-sm hover:shadow-luxury"
                    >
                      <div className="flex flex-col h-full justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="text-lg font-sans font-medium text-obsidian tracking-wide uppercase">
                              {item.title}
                            </h3>
                            {item.price && (
                              <span className="text-gold font-medium text-sm whitespace-nowrap">
                                {item.price}
                              </span>
                            )}
                          </div>
                          
                          {item.note && (
                            <p className="text-[10px] uppercase tracking-widest text-mist font-bold italic">
                              {item.note}
                            </p>
                          )}

                          {item.details && (
                            <ul className="space-y-2 pt-2">
                              {item.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-3 text-sm text-ash font-light">
                                  <span className="size-1 bg-gold/40 rounded-full mt-1.5 shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Note Footer */}
          <div className="mt-24 p-8 bg-gold/5 border border-gold/10 text-center italic">
            <p className="text-sm text-smoke font-light">
              * Báo giá trên mang tính chất tham khảo. Để có báo giá chính xác nhất theo nhu cầu riêng, quý khách vui lòng liên hệ trực tiếp với Harmony Studio.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
