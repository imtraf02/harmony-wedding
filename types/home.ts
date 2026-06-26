export type IconName =
  | "camera"
  | "film"
  | "dress"
  | "calendar"
  | "chat"
  | "moodboard"
  | "aperture"
  | "edit"
  | "package"
  | "location"
  | "dress-rental"
  | "heart";

export interface MenuItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: IconName;
}

export interface PortfolioItem {
  location: string;
  image: string;
  alt: string;
  slug?: string;
  width?: number;
  height?: number;
}

export interface TimelineStep {
  title: string;
  description: string;
  icon: IconName;
  image: string;
  alt: string;
}

export interface TestimonialItem {
  name: string;
  image?: string;
  alt?: string;
  quote?: string;
  role?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ContactInfo {
  hotline: string;
  zalo: string;
  facebook: string;
  address: string;
  email: string;
}

export interface AlbumItem {
  slug: string;
  title: string;
  category: string;
  location: string;
  image: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AlbumFeatureImage {
  image: string;
  alt: string;
  featured?: boolean;
  width?: number;
  height?: number;
}

export interface AlbumValue {
  title: string;
  description: string;
  icon: IconName | "heart" | "diamond" | "clock";
}

export interface AlbumDetailInfo {
  title: string;
  description: string;
  icon: IconName | "heart" | "diamond" | "clock";
}

export interface AlbumDetail {
  slug: string;
  eyebrow: string;
  title: string;
  scriptTitle: string;
  description: string;
  imageCount: string;
  location: string;
  heroImage: string;
  heroAlt: string;
  gallery: AlbumFeatureImage[];
  info: AlbumDetailInfo[];
}
