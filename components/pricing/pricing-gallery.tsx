"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

const pricingImages = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/bang-gia/${i + 1}.jpg`,
  alt: `Bảng giá dịch vụ Harmony Wedding - Trang ${i + 1}`,
  title: `Trang ${String(i + 1).padStart(2, "0")}`,
}));

const pricingCategories = [
  {
    title: "A. Gói Chụp Album Pre-wedding tại Studio",
    description: "Các gói chụp ảnh cưới pre-wedding chuyên nghiệp trong phòng studio với bối cảnh dàn dựng hiện đại và trang nhã.",
    packages: [
      {
        name: "Gói Basic",
        price: "3.900.000đ",
        details: [
          "Chụp 1 váy cưới + 1 vest chú rể",
          "Làm tóc & makeup chuyên nghiệp",
          "Tặng 1 ảnh cổng 60x90 tráng gương 4K bo viền",
          "Album 20 trang cao cấp",
          "Bàn giao 35 file chỉnh sửa hoàn thiện",
          "Tặng kèm 5 ảnh bàn trang trí"
        ]
      },
      {
        name: "Gói VIP",
        price: "4.900.000đ",
        details: [
          "Chụp 1 váy cưới + 1 vest chú rể",
          "Làm tóc & makeup chuyên nghiệp",
          "Tặng 2 ảnh cổng 60x90 tráng gương titan công nghệ mới",
          "Album 30 trang cao cấp",
          "Bàn giao 45 file chỉnh sửa hoàn thiện",
          "Tặng kèm 5 ảnh bàn trang trí"
        ]
      },
      {
        name: "Gói Concept VIP Độc Quyền",
        price: "6.900.000đ",
        details: [
          "Chụp 2 váy cưới + 2 vest chú rể",
          "1 concept tự chọn độc đáo theo gu riêng",
          "Tặng 2 ảnh cổng 60x90 tráng gương titan mới",
          "Album 30 trang cao cấp đặc biệt",
          "Bàn giao 50 file chỉnh sửa hoàn thiện",
          "Tặng kèm 5 ảnh bàn trang trí"
        ]
      }
    ]
  },
  {
    title: "B. Combo Ngày Cưới (Chỉ Trang Phục Cưới)",
    description: "Giải pháp cho thuê váy cưới dòng Harmony Soiree và veston chú rể thiết kế, chỉnh sửa may đo theo số đo của dâu rể.",
    packages: [
      {
        name: "Combo Diamond",
        price: "9.500.000đ",
        details: [
          "2 váy cưới dòng Signature cao cấp",
          "2 váy cưới dòng Ruby sang trọng",
          "2 bộ Veston chú rể cao cấp thiết kế",
          "1 bộ Áo dài cô dâu chú rể ngày lễ gia tiên",
          "Tặng kèm 2 hoa cầm tay cô dâu tươi tắn"
        ]
      },
      {
        name: "Combo Ruby",
        price: "13.000.000đ",
        details: [
          "2 váy cưới dòng Signature cao cấp",
          "3 váy cưới dòng Ruby sang trọng",
          "3 bộ Veston chú rể cao cấp thiết kế",
          "1 cặp Áo dài cô dâu chú rể ngày lễ",
          "6 bộ Áo dài bê quả cho đội phụ dâu rể",
          "1 bộ Veston thiết kế cho ông sui",
          "1 bộ Áo dài sang trọng cho bà sui",
          "Tặng kèm 2 hoa cầm tay cô dâu tươi"
        ]
      },
      {
        name: "Combo Signature",
        price: "16.500.000đ",
        details: [
          "3 váy cưới dòng Signature cao cấp",
          "3 váy cưới dòng Ruby sang trọng",
          "3 bộ Veston chú rể cao cấp thiết kế",
          "1 cặp Áo dài cô dâu chú rể ngày lễ",
          "6 bộ Áo dài bê quả cho đội phụ dâu rể",
          "1 bộ Veston thiết kế cho ông sui",
          "2 bộ Áo dài sang trọng cho bà sui",
          "Tặng kèm 2 hoa cầm tay cô dâu tươi"
        ]
      }
    ]
  },
  {
    title: "C. Trọn Gói 1 Ngày Cưới (Bao Gồm Quay Chụp & Phục Trang)",
    description: "Gói dịch vụ toàn diện cho ngày cưới, bao gồm đầy đủ trang phục cưới thiết kế, makeup cô dâu tận nơi và chụp ảnh phóng sự cưới chuyên nghiệp.",
    packages: [
      {
        name: "Gói Diamond",
        price: "11.000.000đ",
        details: [
          "1 váy cưới dòng Signature + 1 váy dòng Ruby",
          "1 bộ Veston chú rể thiết kế riêng",
          "1 bộ Áo dài dâu rể ngày lễ gia tiên",
          "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi)",
          "1 layout makeup & làm tóc cô dâu tại nhà",
          "6 bộ Áo dài bê quả phụ dâu rể",
          "1 hoa cầm tay cô dâu tươi + album ảnh kỷ niệm",
          "Tặng kèm 50 ảnh rửa 13x18 ép lụa"
        ]
      },
      {
        name: "Gói Ruby",
        price: "12.500.000đ",
        details: [
          "1 váy cưới dòng Signature + 1 váy dòng Ruby",
          "2 bộ Veston chú rể thiết kế riêng",
          "1 cặp Áo dài dâu rể ngày lễ gia tiên",
          "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi)",
          "1 layout makeup & làm tóc cô dâu tại tiệm",
          "6 bộ Áo dài bê quả phụ dâu rể",
          "1 bộ Vest ông sui (hoặc áo dài bà sui)",
          "1 hoa cầm tay dâu tươi + album phóng sự",
          "Tặng kèm 50 ảnh rửa 18x18 ép lụa"
        ]
      },
      {
        name: "Gói Signature",
        price: "15.500.000đ",
        details: [
          "2 váy cưới dòng Signature + 2 váy dòng Ruby",
          "2 bộ Veston chú rể thiết kế riêng",
          "1 cặp Áo dài dâu rể ngày lễ gia tiên",
          "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi)",
          "1 layout makeup & làm tóc cô dâu tại tiệm",
          "6 bộ Áo dài bê quả phụ dâu rể",
          "1 hoa cầm tay dâu tươi + phụ kiện đi kèm",
          "Album phóng sự cưới cao cấp + 50 ảnh rửa 18x18"
        ]
      },
      {
        name: "Gói Super VIP",
        price: "19.500.000đ",
        details: [
          "3 váy cưới dòng Signature + 1 váy dòng Ruby",
          "2 bộ Veston chú rể thiết kế riêng",
          "1 cặp Áo dài dâu rể ngày lễ gia tiên",
          "Chụp phóng sự cưới ngày cưới (2 máy chụp, 1 buổi)",
          "1 layout makeup & làm tóc cô dâu tại nhà",
          "6 bộ Áo dài bê quả phụ dâu rể",
          "1 hoa cầm tay cô dâu + phụ kiện đi kèm",
          "Album phóng sự cao cấp + 50 ảnh rửa 18x18",
          "Ekip điều phối riêng hỗ trợ dâu rể suốt ngày cưới"
        ]
      }
    ]
  },
  {
    title: "D. Bảng Giá Cho Thuê Trang Phục & Dịch Vụ Lẻ",
    description: "Các gói dịch vụ lẻ cho khách hàng có nhu cầu riêng biệt, đảm bảo tính minh bạch, không phát sinh.",
    packages: [
      {
        name: "Thuê Trang Phục Lẻ",
        price: "Từ 500.000đ",
        details: [
          "Thuê Váy cưới Diamond lẻ: 1.550.000đ / váy",
          "Thuê Váy cưới Ruby lẻ: 1.850.000đ / váy",
          "Thuê Váy cưới Signature lẻ (Harmony Soiree): 2.250.000đ / váy",
          "Thuê Veston chú rể cao cấp: 600.000đ / bộ",
          "Thuê Veston ông sui: 500.000đ / bộ",
          "Thuê Áo dài dâu rể / bà sui: 600.000đ / bộ",
          "Thuê Hỷ phục Trung Hoa: 3.500.000đ / cặp"
        ]
      },
      {
        name: "Dịch Vụ Makeup Chuyên Nghiệp",
        price: "Từ 1.500.000đ",
        details: [
          "Makeup cô dâu tại tiệm: 1.500.000đ / lần",
          "Makeup cô dâu tại nhà: 2.000.000đ / lần (hỗ trợ bán kính quy định)",
          "Đã bao gồm làm tóc và phụ kiện tóc cô dâu đi kèm",
          "Cam kết sử dụng mỹ phẩm cao cấp an toàn cho da"
        ]
      }
    ]
  }
];

export function PricingGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIdx(null);
    setIsZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : pricingImages.length - 1));
  }, [activeIdx]);

  const showNext = useCallback(() => {
    if (activeIdx === null) return;
    setIsZoomed(false);
    setActiveIdx((prev) => (prev !== null && prev < pricingImages.length - 1 ? prev + 1 : 0));
  }, [activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        showNext();
      } else if (e.key === "ArrowLeft") {
        showPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, showNext, showPrev, closeLightbox]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-white py-14 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
        <p className="mb-6 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
          Catalogue & Bảng Giá
          <span className="h-px w-16 bg-black" />
        </p>
        <h2 className="mb-14 font-serif text-[clamp(2.6rem,7vw,4.8rem)] leading-[1] text-black">
          Bảng Giá Dịch Vụ Cưới Chi Tiết
        </h2>

        {/* Thumbnail Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pricingImages.map((img, idx) => (
            <article
              key={img.src}
              className="group relative cursor-pointer overflow-hidden border border-black/5 bg-neutral-50 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              onClick={() => setActiveIdx(idx)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  loading="lazy"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
              </div>
              <div className="flex items-center justify-between p-5 bg-white border-t border-black/[0.04]">
                <span className="font-serif text-lg font-medium text-neutral-900">{img.title}</span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-neutral-400 group-hover:text-black transition-colors">
                  Phóng to ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Text-based Pricing Directory for SEO and UI */}
        <div className="mt-24 border-t border-black/[0.06] pt-20" id="pricing-details">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h3 className="font-serif text-[2rem] leading-tight text-neutral-900 mb-4">
              Chi Tiết Các Gói Dịch Vụ Cưới
            </h3>
            <p className="text-sm leading-relaxed text-neutral-500">
              Harmony Wedding cam kết bảng giá công khai, hợp đồng minh bạch và hoàn toàn không phát sinh chi phí ẩn suốt quá trình thực hiện.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-black/[0.06] overflow-x-auto scrollbar-none gap-2 pb-px mb-12">
            {pricingCategories.map((cat, idx) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(idx)}
                className={`whitespace-nowrap pb-4 px-6 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${
                  activeTab === idx
                    ? "border-black text-black"
                    : "border-transparent text-neutral-400 hover:text-black"
                }`}
                type="button"
              >
                {cat.title.split(". ")[1] || cat.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="space-y-8">
            <p className="text-xs tracking-wider text-neutral-400 uppercase">
              {pricingCategories[activeTab].description}
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingCategories[activeTab].packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex flex-col border border-black/5 bg-neutral-50/50 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:bg-white"
                >
                  <div className="mb-6 flex justify-between items-start gap-4">
                    <h4 className="font-serif text-xl font-medium text-neutral-900 leading-tight">
                      {pkg.name}
                    </h4>
                    <span className="font-serif text-base font-semibold text-black bg-neutral-100/80 px-3 py-1 rounded shrink-0">
                      {pkg.price}
                    </span>
                  </div>
                  <div className="h-px bg-black/[0.06] w-full mb-6" />
                  <ul className="space-y-3.5 flex-1 mb-8">
                    {pkg.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-xs text-neutral-600 leading-relaxed">
                        <svg className="size-4 text-neutral-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://zalo.me/0357256845"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center w-full bg-black text-white py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
                  >
                    Nhận tư vấn & Đặt lịch
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950/98 backdrop-blur-md transition-opacity duration-300"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar controls */}
          <div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/50 to-transparent">
            <span className="font-sans text-xs tracking-widest uppercase text-white/70">
              {pricingImages[activeIdx].title} / {String(pricingImages.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden md:flex px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/10"
                type="button"
              >
                {isZoomed ? "Thu Nhỏ" : "Phóng To 1.5x"}
              </button>
              <button
                onClick={closeLightbox}
                className="grid size-11 place-items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                aria-label="Đóng bảng giá"
                type="button"
              >
                <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active Image viewport */}
          <div
            className={`relative flex items-center justify-center w-full h-full p-4 md:p-12 overflow-auto ${
              isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={() => !isZoomed && setIsZoomed(true)}
          >
            <div
              className={`relative transition-transform duration-300 select-none ${
                isZoomed ? "scale-135 md:scale-150 origin-center my-auto" : "max-w-full max-h-[78vh] aspect-[3/4] h-full"
              }`}
              onClick={(e) => {
                if (isZoomed) {
                  e.stopPropagation();
                  setIsZoomed(false);
                }
              }}
            >
              <Image
                src={pricingImages[activeIdx].src}
                alt={pricingImages[activeIdx].alt}
                fill={!isZoomed}
                width={isZoomed ? 1200 : undefined}
                height={isZoomed ? 1600 : undefined}
                className={`object-contain ${isZoomed ? "shadow-2xl" : ""}`}
                priority
                quality={95}
              />
            </div>
          </div>

          {/* Navigation Controls (Desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
            aria-label="Trang trước"
            type="button"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5"
            aria-label="Trang sau"
            type="button"
          >
            <svg className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Mobile swipe helper text */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/50 text-[0.62rem] tracking-[0.24em] uppercase pointer-events-none">
            {isZoomed ? "Kéo để xem chi tiết" : "Vuốt ngang để chuyển trang"}
          </div>
        </div>
      )}
    </section>
  );
}
