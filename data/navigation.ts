export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Dịch vụ",
    href: "/services",
    children: [
      { label: "Chụp ảnh cưới", href: "/services/photography" },
      { label: "Quay phim cưới", href: "/services/videography" },
      { label: "Phóng sự cưới", href: "/services/wedding-film" },
    ],
  },
  {
    label: "Khám phá",
    href: "/portfolio",
    children: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Hậu kỳ", href: "/post-production" },
      { label: "Studio", href: "/studios" },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Bảng giá", href: "/pricing" },
];

export const footerLinks = [
  {
    heading: "Dịch vụ",
    links: [
      { label: "Chụp ảnh cưới", href: "/services/photography" },
      { label: "Quay phim cưới", href: "/services/videography" },
      { label: "Phóng sự cưới", href: "/services/wedding-film" },
    ],
  },
  {
    heading: "Khám phá",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Hậu kỳ quay chụp", href: "/post-production" },
      { label: "Hệ thống Studio", href: "/studios" },
      { label: "Báo giá chi tiết", href: "/pricing" },
      { label: "Tin tức & Kinh nghiệm", href: "/blog" },
    ],
  },
  {
    heading: "Thông tin",
    links: [{ label: "Liên hệ đặt lịch", href: "/contact" }],
  },
];
