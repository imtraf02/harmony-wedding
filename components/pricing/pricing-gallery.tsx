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
    title: "Gói Ngày Cưới (Trọn Gói & Combo)",
    description: "Các gói trọn gói toàn diện và combo trang phục cho ngày cưới đại hỷ. Harmony cam kết dịch vụ chu đáo, không phát sinh chi phí.",
    sections: [
      {
        subTitle: "Trọn Gói 2 Ngày Cưới (Bao gồm Quay Chụp, Trang Phục & Makeup)",
        packages: [
          {
            name: "Trọn Gói Diamon",
            price: "20.900.000đ",
            details: [
              "2 Váy cưới dòng Signature cao cấp + 2 váy dòng Ruby",
              "2 bộ Veston chú rể thiết kế riêng",
              "1 bộ Áo dài cô dâu chú rể ngày lễ gia tiên",
              "Chụp phóng sự cưới ngày cưới (2 máy chụp, 1 buổi sáng hoặc chiều)",
              "2 lần Makeup & làm tóc cô dâu tận nhà",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "2 hoa cầm tay cô dâu tươi thiết kế",
              "1 Album thiết kế hộp cao cấp có ảnh bìa + 100 ảnh rửa 13x18"
            ]
          },
          {
            name: "Trọn Gói Ruby",
            price: "24.500.000đ",
            details: [
              "2 Váy cưới dòng Signature cao cấp + 3 váy dòng Ruby",
              "3 bộ Veston chú rể thiết kế riêng",
              "1 cặp Áo dài cô dâu chú rể ngày lễ",
              "Chụp phóng sự cưới ngày cưới (2 máy chụp, 1 buổi sáng hoặc chiều)",
              "2 lần Makeup & làm tóc cô dâu tận nhà",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "1 bộ Veston thiết kế cho ông sui + 1 Áo dài bà sui",
              "2 hoa cầm tay cô dâu tươi + 1 Album thiết kế cao cấp + 100 ảnh rửa 13x18"
            ]
          },
          {
            name: "Trọn Gói Signature",
            price: "34.900.000đ",
            details: [
              "3 Váy cưới dòng Signature cao cấp + 2 váy dòng Ruby",
              "3 bộ Veston chú rể thiết kế riêng",
              "1 cặp Áo dài cô dâu chú rể ngày lễ",
              "Quay phim phóng sự cưới (2 máy quay) + Chụp ảnh phóng sự cưới (2 máy chụp)",
              "2 lần Makeup & làm tóc cô dâu tận nhà",
              "12 bộ Áo dài bê quả cho đội phụ dâu rể",
              "1 bộ Veston ông sui + 2 Áo dài bà sui",
              "2 hoa cầm tay dâu + 1 Album thiết kế cao cấp + 100 ảnh rửa 13x18"
            ]
          }
        ]
      },
      {
        subTitle: "Trọn Gói 1 Ngày Cưới (Quay Chụp, Trang Phục & Makeup)",
        packages: [
          {
            name: "Gói Diamond (1 Ngày)",
            price: "11.000.000đ",
            details: [
              "1 váy Signature + 1 váy Ruby",
              "1 bộ Veston chú rể thiết kế riêng",
              "1 bộ Áo dài dâu rể ngày lễ gia tiên",
              "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi sáng hoặc chiều)",
              "1 lần Makeup cô dâu tận nhà + 6 bộ Áo dài phụ dâu rể",
              "1 hoa cầm tay dâu tươi + 1 Album kèm hộp cao cấp + 50 ảnh rửa 13x18"
            ]
          },
          {
            name: "Gói Ruby (1 Ngày)",
            price: "12.500.000đ",
            details: [
              "1 váy Signature + 1 váy Ruby",
              "2 bộ Veston chú rể thiết kế + 2 caravat phù hợp",
              "1 cặp Áo dài dâu rể ngày lễ gia tiên",
              "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi sáng hoặc chiều)",
              "1 lần trang điểm và làm tóc cô dâu tại Harmony Wedding",
              "6 bộ Áo dài phụ dâu rể + 1 Vest sui (hoặc áo dài sui)",
              "1 hoa cầm tay dâu + 1 Album kèm hộp cao cấp + 50 ảnh rửa 18x18"
            ]
          },
          {
            name: "Gói Signature (1 Ngày)",
            price: "15.500.000đ",
            details: [
              "2 váy Signature + 2 váy Ruby + Phụ kiện đi kèm",
              "2 bộ Veston chú rể thiết kế + 2 caravat phù hợp",
              "1 cặp Áo dài dâu rể ngày lễ gia tiên",
              "1 lần trang điểm và làm tóc cô dâu tại Harmony Wedding + 1 Manocanh chụp lễ",
              "Chụp phóng sự cưới ngày cưới (1 máy chụp, 1 buổi)",
              "1 hoa cầm tay dâu + 1 Album kèm hộp cao cấp + 50 ảnh rửa 18x18"
            ]
          },
          {
            name: "Gói Super VIP (1 Ngày)",
            price: "19.500.000đ",
            details: [
              "3 váy Signature + 1 váy Ruby + Phụ kiện đi kèm",
              "2 bộ Veston chú rể thiết kế + 2 caravat + 1 Manocanh chụp lễ",
              "1 cặp Áo dài dâu rể + 1 Ekip riêng take care trong buổi lễ",
              "1 lần trang điểm và làm tóc cô dâu tận nhà",
              "Chụp phóng sự cưới ngày cưới (2 máy chụp, 1 buổi)",
              "1 hoa cầm tay dâu + 1 Album kèm hộp cao cấp + 50 ảnh rửa 18x18"
            ]
          }
        ]
      },
      {
        subTitle: "Combo 2 Ngày Cưới (Chỉ Thuê Trang Phục)",
        packages: [
          {
            name: "Combo Diamond (2 Ngày)",
            price: "9.500.000đ",
            details: [
              "2 Váy cưới dòng Signature cao cấp",
              "2 Váy cưới dòng Ruby sang trọng",
              "2 bộ Veston chú rể cao cấp thiết kế",
              "1 bộ Áo dài dâu rể lễ gia tiên",
              "Tặng kèm 2 hoa cầm tay cô dâu tươi"
            ]
          },
          {
            name: "Combo Ruby (2 Ngày)",
            price: "13.000.000đ",
            details: [
              "2 Váy cưới dòng Signature cao cấp + 3 Váy dòng Ruby",
              "3 bộ Veston chú rể cao cấp thiết kế + 1 Veston ông sui",
              "1 cặp Áo dài dâu rể lễ gia tiên + 1 Áo dài bà sui",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "Tặng kèm 2 hoa cầm tay cô dâu tươi"
            ]
          },
          {
            name: "Combo Signature (2 Ngày)",
            price: "16.500.000đ",
            details: [
              "3 Váy cưới dòng Signature cao cấp + 3 Váy dòng Ruby",
              "3 bộ Veston chú rể cao cấp thiết kế + 1 Vest ông sui",
              "1 cặp Áo dài dâu rể lễ gia tiên + 2 Áo dài bà sui",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "Tặng kèm 2 hoa cầm tay cô dâu tươi"
            ]
          }
        ]
      },
      {
        subTitle: "Combo 1 Ngày Cưới (Chỉ Thuê Trang Phục - Tặng hoa cầm tay & áo dài phụ dâu trị giá 1.5tr)",
        packages: [
          {
            name: "Combo Diamond (1 Ngày)",
            price: "4.900.000đ",
            details: [
              "1 Váy cưới dòng Signature cao cấp",
              "1 Váy cưới dòng Ruby sang trọng",
              "1 bộ Veston chú rể thiết kế riêng",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "Tặng kèm 1 hoa cầm tay cô dâu tươi"
            ]
          },
          {
            name: "Combo Ruby (1 Ngày)",
            price: "5.900.000đ",
            details: [
              "1 Váy cưới dòng Signature cao cấp + 1 Váy dòng Ruby",
              "2 bộ Veston chú rể thiết kế riêng",
              "6 bộ Áo dài bê quả cho đội phụ dâu rể",
              "1 bộ Vest ông sui (hoặc 1 áo dài bà sui)",
              "Tặng kèm 1 hoa cầm tay cô dâu tươi"
            ]
          },
          {
            name: "Combo Signature (1 Ngày)",
            price: "7.000.000đ",
            details: [
              "1 Váy cưới dòng Signature cao cấp + 1 Váy dòng Ruby",
              "2 bộ Veston chú rể thiết kế riêng + 1 Vest ông sui + 1 Áo dài bà sui",
              "1 cặp Áo dài cô dâu chú rể ngày lễ",
              "12 bộ Áo dài bê quả cho đội phụ dâu rể",
              "Tặng kèm 1 hoa cầm tay cô dâu tươi"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Album Pre-wedding & Ảnh Cổng",
    description: "Lưu giữ câu chuyện tình yêu ngọt ngào qua những cuốn album cưới đa dạng bối cảnh từ studio, phim trường đến ngoại cảnh dã ngoại.",
    sections: [
      {
        subTitle: "Chụp Ảnh Album cưới Pre-wedding Tại Studio",
        packages: [
          {
            name: "Gói Studio Basic",
            price: "3.900.000đ",
            details: [
              "Chụp 1 váy cưới + 1 vest chú rể + Make up & làm tóc theo trang phục",
              "Hỗ trợ toàn bộ phụ kiện cho cô dâu + hỗ trợ tạo dáng chuyên nghiệp",
              "Hỗ trợ màn hình lớn follow dáng pose tại chỗ",
              "Sản phẩm: 1 Ảnh cổng 60x90 tráng gương 4K bo viền siêu nét",
              "Album 20 trang kích thước 25*35 photobook + Hộp đựng album cao cấp",
              "Bàn giao 35 file chỉnh sửa hoàn thiện + Tặng kèm 5 ảnh bàn 15*21"
            ]
          },
          {
            name: "Gói Studio VIP",
            price: "4.900.000đ",
            details: [
              "Chụp 1 váy cưới + 1 vest chú rể + Make up & làm tóc theo trang phục",
              "Hỗ trợ toàn bộ phụ kiện cho cô dâu + hỗ trợ tạo dáng chuyên nghiệp",
              "Hỗ trợ màn hình lớn follow dáng pose tại chỗ",
              "Sản phẩm: 2 Ảnh cổng 60x90 tráng gương Titan công nghệ mới",
              "Album 30 trang kích thước 25*35 photobook + Hộp đựng album cao cấp",
              "Bàn giao 45 file chỉnh sửa hoàn thiện + Tặng kèm 5 ảnh bàn 15*21"
            ]
          },
          {
            name: "Concept VIP Độc Quyền",
            price: "6.900.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + 1 Concept tự chọn độc đáo",
              "Make up & làm tóc theo trang phục + Phụ kiện đầy đủ cho cô dâu",
              "Hỗ trợ màn hình lớn follow dáng pose tại chỗ",
              "Sản phẩm: 2 Ảnh cổng 60x90 tráng gương Titan công nghệ mới",
              "Album 30 trang kích thước 25*35 photobook + Hộp đựng album đặc biệt",
              "Bàn giao 50 file chỉnh sửa hoàn thiện + Tặng kèm 5 ảnh bàn 15*21"
            ]
          }
        ]
      },
      {
        subTitle: "Chụp Ảnh Album Cưới Phim Trường (Bao gồm phí chụp và dặm phấn)",
        packages: [
          {
            name: "Phim Trường Combo 1",
            price: "6.900.000đ",
            details: [
              "Chụp 2 váy cưới + 1 vest chú rể + hoa lụa cầm tay dâu",
              "Trang điểm & làm tóc cô dâu theo trang phục",
              "Đã bao gồm chi phí vé vào cổng phim trường",
              "Makeup đi theo dặm phấn hỗ trợ suốt buổi chụp hình",
              "Sản phẩm: 1 Album 25*35 (30 trang) + Hộp & túi đựng album cao cấp",
              "1 ảnh cổng 60x90 tráng gương 4K bo viền siêu nét + 40 ảnh chỉnh sửa",
              "Tặng kèm 5 ảnh nhỏ 15*21 tráng gương 4K để bàn"
            ]
          },
          {
            name: "Phim Trường Combo 2",
            price: "7.900.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + hoa lụa cầm tay dâu",
              "Trang điểm & làm tóc cô dâu theo trang phục + Vé vào cổng phim trường",
              "Makeup đi theo dặm phấn hỗ trợ suốt buổi chụp hình",
              "Sản phẩm: 1 Album 25*35 (36 trang) + Hộp & túi đựng album cao cấp",
              "2 ảnh cổng 60x90 tráng gương Titan công nghệ mới + 45 ảnh chỉnh sửa",
              "Tặng kèm 5 ảnh nhỏ 15*21 tráng gương 4K để bàn"
            ]
          },
          {
            name: "Phim Trường Combo 3 (Concept Hoa Tươi)",
            price: "11.500.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + Concept hoa tươi độc đáo",
              "Trang điểm & làm tóc cô dâu theo trang phục + Vé vào cổng phim trường",
              "Makeup đi theo dặm phấn hỗ trợ suốt buổi chụp hình",
              "Sản phẩm: 1 Album 25*35 (40 trang) + Hộp & túi đựng album cao cấp",
              "2 ảnh cổng 60x90 tráng gương HQ công nghệ mới + 50 ảnh chỉnh sửa",
              "Tặng kèm 5 ảnh nhỏ 15*21 tráng gương 4K để bàn"
            ]
          }
        ]
      },
      {
        subTitle: "Chụp Ảnh Album Cưới Ngoại Cảnh Dã Ngoại (Có makeup đi theo dặm)",
        packages: [
          {
            name: "Ngoại Cảnh Vũng Tàu (3 địa điểm)",
            price: "8.500.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + 1 bộ Outfit tự do",
              "Trang điểm & làm tóc + hoa lụa cầm tay cô dâu",
              "Makeup đi theo dặm phấn chăm sóc dâu rể suốt ngày chụp",
              "Sản phẩm: 1 Album 25*35 (30 trang) + Hộp & túi album",
              "2 ảnh cổng 60x90 gỗ lụa bo viền siêu nét + 5 hình nhỏ ép lụa 15*21",
              "Lưu ý: Dâu rể thanh toán chi phí di chuyển, ăn uống và vé vào cổng (nếu có)"
            ]
          },
          {
            name: "Ngoại Cảnh Đà Lạt (3 địa điểm)",
            price: "12.500.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + 1 bộ Outfit tự do",
              "Trang điểm & làm tóc + hoa lụa cầm tay cô dâu",
              "Makeup đi theo dặm phấn chăm sóc dâu rể suốt ngày chụp",
              "Sản phẩm: 1 Album 25*35 (30 trang) + Hộp & túi album",
              "2 ảnh cổng 60x90 gỗ lụa bo viền siêu nét + 5 hình nhỏ ép lụa 15*21",
              "Lưu ý: Dâu rể thanh toán chi phí di chuyển, ăn uống và vé vào cổng (nếu có)"
            ]
          },
          {
            name: "Ngoại Cảnh Vịnh Vĩnh Hy (3 địa điểm)",
            price: "17.500.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + 1 bộ Outfit tự do",
              "Trang điểm & làm tóc + hoa lụa cầm tay cô dâu",
              "Makeup đi theo dặm phấn chăm sóc dâu rể suốt ngày chụp",
              "Sản phẩm: 1 Album 25*35 (40 trang) + Hộp & túi album",
              "2 ảnh cổng 60x90 tráng gương Titan công nghệ mới + 5 hình nhỏ ép lụa 15*21",
              "Lưu ý: Dâu rể thanh toán chi phí di chuyển, ăn uống và vé vào cổng (nếu có)"
            ]
          },
          {
            name: "Ngoại Cảnh Đảo Phú Quý (3 địa điểm)",
            price: "21.500.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + 1 bộ Outfit tự do",
              "Trang điểm & làm tóc + hoa lụa cầm tay cô dâu",
              "Makeup đi theo dặm phấn chăm sóc dâu rể suốt ngày chụp",
              "Sản phẩm: 1 Album 25*35 (40 trang) + Hộp & túi album",
              "2 ảnh cổng 60x90 tráng gương HQ công nghệ mới + 5 hình nhỏ ép lụa 15*21",
              "Lưu ý: Dâu rể thanh toán chi phí di chuyển, ăn uống và vé vào cổng (nếu có)"
            ]
          }
        ]
      },
      {
        subTitle: "Gói Chụp Ảnh Cổng Cưới Tại Studio (Chụp nhanh lấy ảnh cổng)",
        packages: [
          {
            name: "Studio 1 Hình Cổng",
            price: "2.500.000đ",
            details: [
              "Chụp 1 váy cưới + 1 vest chú rể + trang điểm làm tóc cô dâu",
              "Hỗ trợ toàn bộ phụ kiện cho cô dâu + hỗ trợ tạo dáng chuyên nghiệp",
              "Màn hình lớn follow dáng pose trực tiếp tại chỗ chụp",
              "Sản phẩm: 1 ảnh cổng lớn 60x90 tráng gương 4K bo viền siêu nét",
              "Bàn giao 15 file chỉnh sửa hoàn thiện + tặng kèm 5 ảnh bàn 15*21 tráng gương 4K"
            ]
          },
          {
            name: "Studio 2 Hình Cổng",
            price: "3.900.000đ",
            details: [
              "Chụp 2 váy cưới + 2 vest chú rể + trang điểm làm tóc cô dâu",
              "Hỗ trợ toàn bộ phụ kiện cho cô dâu + hỗ trợ tạo dáng chuyên nghiệp",
              "Màn hình lớn follow dáng pose trực tiếp tại chỗ chụp",
              "Sản phẩm: 2 ảnh cổng lớn 60x90 tráng gương Titan công nghệ mới",
              "Bàn giao 15 file chỉnh sửa hoàn thiện + tặng kèm 5 ảnh bàn 15*21 tráng gương 4K"
            ]
          },
          {
            name: "Concept VIP Ảnh Cổng",
            price: "5.900.000đ",
            details: [
              "1 Concept tự chọn độc quyền + Chụp 2 Váy cưới + 2 vest chú rể",
              "Trang điểm làm tóc cô dâu + Hỗ trợ toàn bộ phụ kiện dâu rể",
              "Màn hình lớn follow dáng pose trực tiếp tại chỗ chụp",
              "Sản phẩm: 1 ảnh cổng lớn 60x90 tráng gương Titan công nghệ mới",
              "Bàn giao 22 file chỉnh sửa hoàn thiện + tặng kèm 10 ảnh bàn 15*21 tráng gương 4K"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Lễ Ăn Hỏi & Lễ Nhà Thờ",
    description: "Các gói chụp ảnh ngày đính hôn, đám hỏi truyền thống hoặc ghi hình lễ cưới Hôn Phối trang nghiêm tại thánh đường Giáo xứ.",
    sections: [
      {
        subTitle: "Trọn Gói Trang Phục & Chụp Hình Lễ Đính Hôn (Ăn Hỏi, Báo Hỷ)",
        packages: [
          {
            name: "Gói Đính Hôn 1",
            price: "1.700.000đ",
            details: [
              "1 bộ Áo dài cô dâu dòng Classic lịch sự",
              "1 bộ Áo dài hoặc Veston chú rể cao cấp",
              "4 đến 6 bộ Áo dài bưng quả cho đội bê tráp phụ dâu hoặc phụ rể"
            ]
          },
          {
            name: "Gói Đính Hôn 2 (Có Makeup & Thợ Chụp)",
            price: "5.900.000đ",
            details: [
              "1 bộ Áo dài cô dâu dòng Luxury cao cấp + 1 bộ Vest hoặc Áo dài chú rể",
              "1 lần trang điểm và làm tóc cô dâu tại Harmony Wedding",
              "1 thợ chụp hình truyền thống tác nghiệp suốt buổi lễ, bàn giao toàn bộ file",
              "Set áo dài bưng quả (6 bộ) cho đội phụ dâu hoặc phụ rể"
            ]
          },
          {
            name: "Gói Báo Hỷ (Có Makeup, Váy tiệc & Thợ Chụp)",
            price: "7.500.000đ",
            details: [
              "1 bộ Áo dài cô dâu + 1 bộ Váy đón khách tiệc",
              "1 bộ Veston chú rể hoặc Áo dài chú rể thiết kế riêng",
              "1 lần trang điểm và làm tóc cô dâu tận nơi ngày cưới",
              "1 thợ chụp hình phóng sự lễ tiệc bắt trọn khoảnh khắc dâu rể",
              "Tặng kèm 1 bó hoa tươi cầm tay cô dâu thiết kế",
              "Set áo dài bưng quả (6 bộ) nữ + Phụ kiện bưng quả nam (nơ hoặc cà vạt)"
            ]
          }
        ]
      },
      {
        subTitle: "Báo Giá Quay Phim Chụp Ảnh Tiệc Cưới Lẻ (Không bao gồm đồ)",
        packages: [
          {
            name: "Gói Chụp Tiệc Saving",
            price: "3.200.000đ",
            details: [
              "Tác nghiệp bởi 1 thợ chụp ảnh chuyên nghiệp suốt buổi lễ tiệc",
              "Thời gian tác nghiệp: 1 buổi (Sáng 6h-13h hoặc Chiều 14h-21h)",
              "Sản phẩm: Album bìa photobook kèm hộp lưu trữ cao cấp",
              "Tặng kèm 50 ảnh rửa kích thước 13x18 ép lụa"
            ]
          },
          {
            name: "Gói Chụp Tiệc Standard",
            price: "6.400.000đ",
            details: [
              "Tác nghiệp bởi 2 thợ chụp ảnh chia ra chụp nhà trai và nhà gái đầy đủ",
              "Đảm bảo bắt trọn khoảnh khắc lúc chuẩn bị tại gia hai bên",
              "Thời gian tác nghiệp: 1 buổi (Sáng 6h-13h hoặc Chiều 14h-21h)",
              "Sản phẩm: Album bìa photobook kèm hộp lưu trữ cao cấp",
              "Tặng kèm 100 ảnh rửa kích thước 13x18 ép lụa"
            ]
          },
          {
            name: "Gói Quay Chụp Hot Deal",
            price: "7.700.000đ",
            details: [
              "Tác nghiệp bởi 1 thợ chụp ảnh phóng sự + 1 thợ quay phim phóng sự",
              "Thời gian tác nghiệp: 1 buổi (Sáng 6h-13h hoặc Chiều 14h-21h)",
              "Sản phẩm: Album bìa photobook kèm hộp lưu trữ cao cấp + 50 ảnh rửa 13x18",
              "Bàn giao 2 video phóng sự cưới (1 phim highlight ngắn + 1 phim tài liệu đầy đủ)"
            ]
          },
          {
            name: "Gói Quay Chụp VIP",
            price: "10.900.000đ",
            details: [
              "Tác nghiệp bởi 2 thợ chụp ảnh + 1 thợ quay phim phóng sự cưới chuyên sâu",
              "Chia ekip chụp chuẩn bị tại hai bên nhà trai và nhà gái",
              "Thời gian tác nghiệp: 1 buổi (Sáng 6h-13h hoặc Chiều 14h-21h)",
              "Sản phẩm: Album lưu niệm + 100 ảnh rửa 13x18",
              "Tặng miễn phí quay phim bằng Flycam trên cao + 1 USB 16GB lưu trữ file gốc",
              "Tặng kèm gói xe hoa cưới đón dâu trong bán kính dưới 20km"
            ]
          },
          {
            name: "Gói Quay Chụp Super VIP",
            price: "15.400.000đ",
            details: [
              "Tác nghiệp bởi 2 thợ chụp ảnh + 2 thợ quay phim phóng sự cưới",
              "Chia ekip phục vụ song song ghi lại trọn vẹn cả hai đầu nhà trai nhà gái",
              "Thời gian tác nghiệp: 1 buổi (Sáng 6h-13h hoặc Chiều 14h-21h)",
              "Sản phẩm: Album lưu niệm + 100 ảnh rửa 13x18",
              "Tặng miễn phí quay phim bằng Flycam trên cao + 1 USB 16GB lưu trữ file gốc",
              "Tặng kèm gói xe hoa cưới đón dâu trong bán kính dưới 20km"
            ]
          }
        ]
      },
      {
        subTitle: "Dịch Vụ Quay Chụp Lễ Hôn Phối Tại Nhà Thờ (Thời gian chụp quay 2 tiếng)",
        packages: [
          {
            name: "Lễ Nhà Thờ (Chụp Ảnh lẻ)",
            price: "1.700.000đ",
            details: [
              "1 thợ chụp phóng sự cưới tác nghiệp trang nghiêm tại Nhà thờ",
              "Cam kết tuân thủ quy tắc thánh đường, sử dụng máy chụp im lặng",
              "Sản phẩm bàn giao: Album thiết kế kỷ niệm + 50 ảnh rửa 13x18 ép lụa"
            ]
          },
          {
            name: "Lễ Nhà Thờ (Quay Phim lẻ)",
            price: "2.500.000đ",
            details: [
              "1 thợ quay phim phóng sự cưới ghi hình nghi lễ Hôn Phối Công giáo",
              "Hỗ trợ quay góc từ xa kín đáo tôn trọng tôn nghiêm thánh đường",
              "Tặng kèm gói ghi hình từ trên cao bằng Flycam khu vực ngoài nhà thờ"
            ]
          },
          {
            name: "Lễ Nhà Thờ (Trọn Gói Chụp + Quay)",
            price: "4.200.000đ",
            details: [
              "1 thợ chụp hình phóng sự + 1 thợ quay phim phóng sự cưới chuyên sâu",
              "Hỗ trợ bắt trọn khoảnh khắc trao nhẫn, thề hứa trước bàn thờ Chúa",
              "Sản phẩm: Album kỷ niệm + 50 ảnh rửa 13x18 + quay dựng video phim ngắn",
              "Tặng kèm gói ghi hình Flycam khu vực bên ngoài thánh đường"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Dịch Vụ Trang Điểm (Ngọc Gia Hân Makeup)",
    description: "Thương hiệu trang điểm Ngọc Gia Hân Makeup đồng hành cùng Harmony Soiree, cam kết sử dụng mỹ phẩm cao cấp và phong cách trong trẻo.",
    sections: [
      {
        subTitle: "Trang Điểm Cho Cô Dâu (Làm tóc và phụ kiện đi kèm)",
        packages: [
          {
            name: "Makeup Cô Dâu tại tiệm",
            price: "1.500.000đ",
            details: [
              "1 lần trang điểm và làm tóc cô dâu trực tiếp tại tiệm Harmony",
              "Hỗ trợ miễn phí các phụ kiện đi kèm (nơ cài, von lúp, tùng váy, mấn...)",
              "Tặng kèm lens đeo mắt cho cô dâu lên hình long lanh tự nhiên"
            ]
          },
          {
            name: "Makeup Cô Dâu tại nhà",
            price: "1.700.000đ - 2.000.000đ",
            details: [
              "1 lần trang điểm và làm tóc cô dâu tận nơi tại nhà riêng (tùy khu vực xa gần)",
              "Hỗ trợ miễn phí các phụ kiện đi kèm (nơ cài, von lúp, tùng váy, mấn...)",
              "Tặng kèm lens đeo mắt cho cô dâu lên hình long lanh tự nhiên",
              "Phụ phí đi lại nếu khoảng cách trên 20km là 10.000đ / 1km"
            ]
          },
          {
            name: "Ekip đi theo chăm sóc (Take Care)",
            price: "500.000đ",
            details: [
              "Chuyên viên makeup đi theo hỗ trợ dặm phấn, thay đổi kiểu tóc cô dâu",
              "Chăm sóc diện mạo cô dâu suốt 1 buổi lễ tại nhà hàng hoặc nhà riêng"
            ]
          },
          {
            name: "Gói Test Makeup trước ngày cưới",
            price: "500.000đ",
            details: [
              "Hỗ trợ cô dâu thử trang điểm và làm thử 2 kiểu tóc khác nhau",
              "Giúp cô dâu định hình rõ layout trang điểm phù hợp nhất trước ngày cưới"
            ]
          }
        ]
      },
      {
        subTitle: "Trang Điểm Cho Mẹ Sui & Khách Tiệc",
        packages: [
          {
            name: "Makeup Bà Sui tại tiệm",
            price: "500.000đ",
            details: [
              "Trang điểm sang trọng, che khuyết điểm và làm tóc cho mẹ cô dâu / mẹ chú rể tại tiệm",
              "Đã bao gồm phụ kiện đi kèm phù hợp áo dài bà sui"
            ]
          },
          {
            name: "Makeup Bà Sui tại nhà",
            price: "550.000đ - 700.000đ",
            details: [
              "Trang điểm sang trọng và làm tóc cho mẹ cô dâu / chú rể tận nơi tại nhà riêng (tùy khu vực)",
              "Giúp mẹ có diện mạo quý phái tự tin đón khách ngày cưới"
            ]
          },
          {
            name: "Makeup Khách Tiệc tại tiệm",
            price: "250.000đ - 300.000đ",
            details: [
              "Trang điểm nhẹ nhàng, làm tóc phù hợp đi tiệc cưới trực tiếp tại tiệm"
            ]
          },
          {
            name: "Makeup Khách Tiệc tại nhà",
            price: "300.000đ - 350.000đ",
            details: [
              "Trang điểm nhẹ nhàng, làm tóc đi tiệc cưới phục vụ tận nơi tại nhà riêng"
            ]
          },
          {
            name: "Makeup Event / Sự Kiện",
            price: "500.000đ",
            details: [
              "Trang điểm nổi bật theo layout sân khấu, chụp ảnh sự kiện chuyên nghiệp"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Thuê Trang Phục & Dịch Vụ Lẻ",
    description: "Bảng giá thuê lẻ từng trang phục cưới dòng Harmony Soiree, Veston và phụ kiện bưng quả ngày cưới.",
    sections: [
      {
        subTitle: "Bảng Giá Thuê Váy Cưới & Vest Lẻ",
        packages: [
          {
            name: "Thuê Váy Cưới Diamond lẻ",
            price: "1.550.000đ / váy",
            details: [
              "Váy cưới phom xòe hoặc suông nhẹ dòng Diamond tinh tế",
              "Hỗ trợ chỉnh sửa số đo vừa vặn miễn phí"
            ]
          },
          {
            name: "Thuê Váy Cưới Ruby lẻ",
            price: "1.850.000đ / váy",
            details: [
              "Váy cưới bồng bềnh đính kết đá hoặc lấp lánh dòng Ruby sang trọng",
              "Hỗ trợ chỉnh sửa số đo vừa vặn miễn phí"
            ]
          },
          {
            name: "Thuê Váy Cưới Signature lẻ",
            price: "2.250.000đ / váy",
            details: [
              "Váy cưới thiết kế đặc biệt độc quyền dòng Signature Harmony Soiree",
              "Chất liệu cao cấp ren Pháp, đính đá pha lê tinh xảo từng chi tiết",
              "Hỗ trợ chỉnh sửa phom may đo miễn phí"
            ]
          },
          {
            name: "Thuê Veston Chú Rể cao cấp",
            price: "600.000đ / bộ",
            details: [
              "Bộ Veston chú rể cao cấp phom dáng Hàn Quốc lịch lãm gồm quần và áo vest",
              "Tặng kèm nơ cài hoặc caravat phù hợp"
            ]
          },
          {
            name: "Thuê Veston Ông Sui",
            price: "500.000đ / bộ",
            details: [
              "Bộ Veston phom đứng đắn, sang trọng phù hợp cho ông sui đón khách ngày cưới"
            ]
          },
          {
            name: "Thuê Áo Gi-lê lẻ",
            price: "200.000đ / cái",
            details: [
              "Áo gi-lê mặc bên trong áo vest tăng nét thanh lịch hào hoa"
            ]
          }
        ]
      },
      {
        subTitle: "Bảng Giá Thuê Áo Dài Cưới & Áo Dài Bưng Quả",
        packages: [
          {
            name: "Thuê Áo Dài Cô Dâu lẻ",
            price: "600.000đ / bộ",
            details: [
              "Áo dài thiết kế thêu hoa nổi hoặc ren đỏ/trắng sang trọng",
              "Đã bao gồm mấn đội đầu cô dâu đồng bộ"
            ]
          },
          {
            name: "Thuê Áo Dài Chú Rể lẻ",
            price: "500.000đ / bộ",
            details: [
              "Áo dài cách tân nam thêu rồng phượng oai phong lịch thiệp"
            ]
          },
          {
            name: "Thuê Áo Dài Mẹ Sui (Bà Sui)",
            price: "600.000đ / bộ",
            details: [
              "Áo dài chất liệu nhung hoặc gấm đính đá sang trọng tôn dáng mẹ sui"
            ]
          },
          {
            name: "Thuê Áo Dài Bưng Quả lẻ",
            price: "100.000đ / bộ",
            details: [
              "1 bộ áo dài bê tráp phụ dâu (kèm mấn) hoặc áo dài cách tân phụ rể"
            ]
          },
          {
            name: "Thuê Set 6 Áo Dài Bưng Quả",
            price: "550.000đ / set",
            details: [
              "Gồm 6 bộ áo dài bưng quả đồng bộ nam hoặc nữ, kèm mấn phụ kiện"
            ]
          },
          {
            name: "Thuê Set 12 Áo Dài Bưng Quả",
            price: "1.100.000đ / set",
            details: [
              "Gồm 12 bộ áo dài bưng quả đồng bộ nam và nữ, kèm mấn phụ kiện"
            ]
          },
          {
            name: "Thuê Cặp Hỷ Phục Trung Hoa",
            price: "3.500.000đ / cặp",
            details: [
              "Bộ đồ cưới truyền thống Trung Hoa (Hỷ phục) đính rồng phượng thêu tay tinh xảo dành cho cả dâu rể"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "Giá Rửa Ảnh & In Album",
    description: "Bảng giá in rửa hình cổng, hình bàn trang trí công nghệ tráng gương, Titan mới và gia công album photobook chống trầy xước.",
    sections: [
      {
        subTitle: "Báo Giá In Gia Công Album Photobook Ngày Cưới",
        packages: [
          {
            name: "Album Photobook Chống Trầy (Bìa Gói)",
            price: "Từ 650.000đ",
            details: [
              "Kích thước 15*21 (20 trang), hộp đựng album bìa gói: 650.000đ",
              "Kích thước 20*20 (20 trang), hộp đựng album bìa gói: 650.000đ",
              "Kích thước 20*30 (20 trang), hộp đựng album bìa gói: 1.150.000đ",
              "Kích thước 25*35 (20 trang), hộp đựng album bìa gói: 1.500.000đ",
              "Kích thước 30*30 (20 trang), hộp đựng album bìa gói: 1.500.000đ",
              "In thêm tờ: phụ phí 100.000đ mỗi tờ 2 trang"
            ]
          },
          {
            name: "Album Photobook Tráng Gương (Hộp Mica)",
            price: "Từ 950.000đ",
            details: [
              "Kích thước 15*21 (30 trang), hộp đựng album Mica: 950.000đ",
              "Kích thước 20*20 (30 trang), hộp đựng album Mica: 950.000đ",
              "Kích thước 20*30 (30 trang), hộp đựng album Mica: 1.550.000đ",
              "Kích thước 25*35 (30 trang), hộp đựng album Mica: 1.850.000đ",
              "Kích thước 30*30 (30 trang), hộp đựng album Mica: 1.850.000đ",
              "In thêm tờ: phụ phí 100.000đ mỗi tờ 2 trang"
            ]
          }
        ]
      },
      {
        subTitle: "Báo Giá Rửa In Ảnh Cổng / Ảnh Lớn Ngày Cưới",
        packages: [
          {
            name: "Ảnh Ép Gỗ truyền thống",
            price: "Từ 390.000đ",
            details: [
              "Kích thước 40*60: 390.000đ | 50*75: 450.000đ",
              "Kích thước 60*90: 490.000đ | 60*120: 490.000đ",
              "Kích thước 70*110: 690.000đ"
            ]
          },
          {
            name: "Ảnh Ép Gỗ Viền Mạ Crom",
            price: "Từ 450.000đ",
            details: [
              "Kích thước 40*60: 450.000đ | 50*75: 490.000đ",
              "Kích thước 60*90: 600.000đ | 60*120: 690.000đ",
              "Kích thước 70*110: 990.000đ"
            ]
          },
          {
            name: "Ảnh Ép Gỗ Khung Nhôm TITAN 4K",
            price: "Từ 490.000đ",
            details: [
              "Kích thước 40*60: 490.000đ | 50*75: 550.000đ",
              "Kích thước 60*90: 690.000đ | 60*120: 890.000đ",
              "Kích thước 70*110: 1.190.000đ"
            ]
          }
        ]
      },
      {
        subTitle: "Báo Giá In Rửa Ảnh Nhỏ Bàn Trang Trí",
        packages: [
          {
            name: "Ảnh nhỏ Ép Gỗ để bàn",
            price: "Từ 40.000đ",
            details: [
              "Kích thước 13*18: 40.000đ / ảnh",
              "Kích thước 15*21: 49.000đ / ảnh",
              "Kích thước 25*35: 45.000đ / ảnh"
            ]
          },
          {
            name: "Ảnh nhỏ Viền Mạ Crom",
            price: "Từ 55.000đ",
            details: [
              "Kích thước 13*18: 55.000đ / ảnh",
              "Kích thước 15*21: 59.000đ / ảnh",
              "Kích thước 25*35: 65.000đ / ảnh"
            ]
          },
          {
            name: "Ảnh nhỏ Khung Nhôm TITAN 4K",
            price: "Từ 69.000đ",
            details: [
              "Kích thước 13*18: 69.000đ / ảnh",
              "Kích thước 15*21: 75.000đ / ảnh",
              "Kích thước 25*35: 75.000đ / ảnh"
            ]
          },
          {
            name: "Ảnh nhỏ Ép Lụa mỏng",
            price: "Từ 7.000đ",
            details: [
              "Kích thước 13*18: 7.000đ / ảnh",
              "Kích thước 15*21: 10.000đ / ảnh",
              "Kích thước 25*35: 15.000đ / ảnh"
            ]
          },
          {
            name: "Combo Rửa Hình Tiết Kiệm",
            price: "750.000đ / bộ",
            details: [
              "Gồm 100 ảnh kích thước 13*18 rửa chất liệu ép lụa mượt mà",
              "Tặng kèm 1 cuốn Album bìa photobook kèm hộp đựng sang trọng bảo vệ ảnh"
            ]
          }
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
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="space-y-12">
            <div>
              <p className="text-xs tracking-wider text-neutral-400 uppercase mb-2">
                Danh mục hiện tại
              </p>
              <h4 className="font-serif text-2xl text-neutral-900">{pricingCategories[activeTab].title}</h4>
              <p className="text-sm leading-relaxed text-neutral-500 mt-2">
                {pricingCategories[activeTab].description}
              </p>
            </div>

            {/* Loop through subsections inside current tab */}
            {pricingCategories[activeTab].sections.map((sect) => (
              <div key={sect.subTitle} className="border-t border-black/[0.04] pt-8 first:border-0 first:pt-0">
                <h5 className="font-sans text-[0.8rem] font-bold tracking-[0.16em] uppercase text-neutral-800 mb-8 border-l-2 border-black pl-4">
                  {sect.subTitle}
                </h5>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {sect.packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="flex flex-col border border-black/5 bg-neutral-50/50 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] transition-all duration-500 hover:shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:bg-white"
                    >
                      <div className="mb-6 flex justify-between items-start gap-4">
                        <h6 className="font-serif text-lg font-medium text-neutral-900 leading-tight">
                          {pkg.name}
                        </h6>
                        <span className="font-serif text-sm font-semibold text-black bg-neutral-100/80 px-3 py-1 rounded shrink-0">
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
            ))}
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
