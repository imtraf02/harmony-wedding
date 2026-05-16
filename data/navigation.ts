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
  { label: "Portfolio", href: "/portfolio" },
  { label: "Studio", href: "/studios" },
  { label: "Bảng giá", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Liên hệ", href: "/contact" },
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
