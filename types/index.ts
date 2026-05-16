export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  label: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Portfolio {
  id: number;
  slug: string;
  title: string;
  style: "vintage" | "modern" | "fineart" | "romantic";
  location_type: "studio" | "outdoor" | "destination";
  studio_slug: string | null;
  cover_image: string;
  images: string[];
  video_url: string | null;
  is_featured: boolean;
  orientation: "portrait" | "landscape" | "square";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Studio {
  id: number;
  slug: string;
  name: string;
  type: "studio" | "outdoor" | "destination";
  address: string | null;
  city: string;
  description: string | null;
  highlights: string[];
  images: string[];
  map_embed_url: string | null;
  best_time: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  hero_image: string;
  demo_images: string[];
  detail_href: string;
  pricing_href: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: "photography" | "videography" | "wedding-film" | "combo";
  wedding_date: string | null;
  guest_count: number | null;
  message: string | null;
  status: "new" | "contacted" | "booked" | "completed" | "cancelled";
  ip_address: string | null;
  created_at: string;
}

export interface Testimonial {
  id: number;
  couple_name: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  avatar: string | null;
  service: string | null;
  wedding_year: number | null;
  is_active: boolean;
  sort_order: number;
}

export interface UploadResult {
  url: string;
  blurDataUrl: string;
  width: number;
  height: number;
}
