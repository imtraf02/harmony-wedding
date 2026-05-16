import { CtaBanner } from "@/components/home/cta-banner";
import { SectionTitle } from "@/components/shared/section-title";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Báo giá dịch vụ | Harmony Wedding",
  description:
    "Bảng giá chi tiết các gói dịch vụ ngày cưới, chụp ảnh album pre-wedding và các dịch vụ thuê lẻ tại Harmony Wedding.",
  path: "/pricing",
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
    category: "Gói Dịch Vụ Ngày Cưới (Trọn gói & Lẻ)",
    description:
      "Đây là các gói lo từ trang phục, makeup đến chụp ảnh trong ngày trọng đại:",
    items: [
      {
        title: "Trọn gói 1 ngày cưới",
        price: "Từ 11.000.000đ - 19.500.000đ",
        note: "Diamond, Ruby, Signature, Super VIP",
        details: [
          "Váy cưới, vest",
          "Makeup tại nhà",
          "Hoa tươi",
          "Chụp ảnh phóng sự",
        ],
      },
      {
        title: "Trọn gói 2 ngày cưới",
        price: "Từ 20.900.000đ - 34.900.000đ",
        details: [
          "Dành cho tổ chức lễ ở 2 nhà/2 ngày khác nhau",
          "Tăng số lượng trang phục",
          "Tăng nhân sự chụp/quay",
        ],
      },
      {
        title: "Combo tiết kiệm 1 ngày cưới",
        price: "Từ 4.900.000đ - 7.000.000đ",
        details: ["Tập trung vào trang phục", "Hoa cầm tay"],
      },
      {
        title: "Dịch vụ thợ chụp/quay lẻ",
        price: "Từ 1.700.000đ - 15.400.000đ",
        note: "Tùy theo số lượng thợ",
        details: [
          "Từ 1 thợ chụp đến 2 chụp + 2 quay",
          "Quà tặng kèm: Flycam, USB",
        ],
      },
    ],
  },
  {
    category: "Gói Chụp Ảnh Album (Pre-wedding)",
    description: "Dịch vụ chụp ảnh trước đám cưới để làm album và hình cổng:",
    items: [
      {
        title: "Chụp tại Studio",
        price: "3.900.000đ - 6.900.000đ",
        note: "Basic, VIP, Concept độc quyền",
      },
      {
        title: "Gói Hình cổng lẻ",
        price: "2.500.000đ - 5.900.000đ",
        note: "Lấy 1-2 hình lớn để cổng",
      },
      {
        title: "Chụp tại Phim trường",
        price: "6.900.000đ - 11.500.000đ",
        note: "Combo 1, 2, 3",
      },
      {
        title: "Chụp Ngoại cảnh (Đi xa)",
        price: "8.500.000đ - 21.500.000đ",
        note: "Vũng Tàu, Đà Lạt, Vĩnh Hy, Đảo Phú Quý",
      },
    ],
  },
  {
    category: "Dịch Vụ Thuê Lẻ & Phát Sinh",
    description: "Tùy chọn linh hoạt cho các nhu cầu riêng lẻ:",
    items: [
      {
        title: "Trang phục",
        details: [
          "Váy cưới: 1.550k - 2.250k",
          "Veston: 500k - 600k",
          "Áo dài: Cô dâu, chú rể, bà sui, bưng quả",
          "Hỷ Phục: 3.500k/cặp",
        ],
      },
      {
        title: "Makeup",
        details: [
          "Chụp tiệc: 300k",
          "Makeup cô dâu tại tiệm/nhà: 1.500k - 2.000k",
          "Makeup sui gia",
        ],
      },
      {
        title: "In ấn / Rửa ảnh",
        details: [
          "Rửa ảnh ép gỗ",
          "Ảnh lớn/nhỏ các kích thước",
          "Album photobook tráng gương",
        ],
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <section className="pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <SectionTitle
            eyebrow="Investment"
            title="Báo giá dịch vụ"
            subtitle="Dựa trên các bảng báo giá từ Harmony Wedding, chúng tôi tóm gọn lại các nhóm dịch vụ chính để bạn dễ dàng theo dõi."
            centered
          />

          <div className="mt-10 space-y-16 md:mt-20 md:space-y-24">
            {PRICING_DATA.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-8 md:space-y-12">
                {/* Category Header */}
                <div className="relative">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <span className="w-fit border border-obsidian/10 px-3 py-1.5 font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
                      0{groupIdx + 1}
                    </span>
                    <h2 className="font-light font-sans text-obsidian text-xl italic leading-snug tracking-tight sm:text-2xl md:text-3xl">
                      {group.category}
                    </h2>
                  </div>
                  <p className="max-w-2xl font-light text-sm text-smoke leading-relaxed">
                    {group.description}
                  </p>
                  <div className="absolute -bottom-4 left-0 h-px w-12 bg-black/10" />
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="group rounded-none border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-obsidian/10 hover:shadow-luxury sm:p-6 md:bg-white/50 md:p-8"
                    >
                      <div className="flex h-full flex-col justify-between gap-6">
                        <div className="space-y-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <h3 className="font-medium font-sans text-base text-obsidian uppercase leading-snug tracking-wide sm:text-lg">
                              {item.title}
                            </h3>
                            {item.price && (
                              <span className="w-fit border-black/5 border-t pt-2 font-medium text-charcoal text-sm leading-relaxed sm:border-t-0 sm:pt-0 sm:text-right">
                                {item.price}
                              </span>
                            )}
                          </div>

                          {item.note && (
                            <p className="font-bold text-[10px] text-ash uppercase italic tracking-widest">
                              {item.note}
                            </p>
                          )}

                          {item.details && (
                            <ul className="space-y-3 pt-2">
                              {item.details.map((detail, dIdx) => (
                                <li
                                  key={dIdx}
                                  className="flex items-start gap-3 font-light text-sm text-smoke leading-relaxed"
                                >
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-black/20" />
                                  <span className="min-w-0">{detail}</span>
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
          <div className="mt-16 border border-black/5 bg-black/[0.02] p-5 text-center italic sm:p-8 md:mt-24">
            <p className="font-light text-ash text-sm leading-relaxed">
              * Báo giá trên mang tính chất tham khảo. Để có báo giá chính xác
              nhất theo nhu cầu riêng, quý khách vui lòng liên hệ trực tiếp với
              Harmony Studio.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
