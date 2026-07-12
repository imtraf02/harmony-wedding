import { cache } from "react";
import type { BlogPost } from "@/types/blog";
import type {
  AlbumDetail,
  AlbumItem,
  PortfolioItem,
  ServiceItem,
  TimelineStep,
} from "@/types/home";

import siteData from "@/data/site.json";
import homeData from "@/data/home.json";
import portfolioData from "@/data/portfolio.json";
import wardrobeData from "@/data/wardrobe.json";
import servicesData from "@/data/services.json";
import pricingData from "@/data/pricing.json";
import blogData from "@/data/blog.json";
import infoData from "@/data/info.json";

export interface CmsServiceDetail extends ServiceItem {
  image: string;
  alt: string;
  deliverables: string[];
}

interface PortfolioHighlight {
  image: string;
  alt: string;
  featured?: boolean;
}

interface MiniAlbum {
  slug: string;
}

interface MiniPost {
  slug: string;
  date: string;
}

// 1. Site configuration
export const getSiteConfig = cache(async () => {
  return siteData;
});

// 2. Home page data
export const getHomeData = cache(async () => {
  return homeData;
});

// 3. Album items
export const getAlbums = cache(async (): Promise<AlbumItem[]> => {
  return portfolioData.albumItems as AlbumItem[];
});

// 4. Portfolio highlight / Featured images
export const getShowcaseItems = cache(async (type: "portfolio_item" | "featured_album_image"): Promise<PortfolioItem[]> => {
  if (type === "portfolio_item") {
    return portfolioData.albumItems.slice(0, 6) as PortfolioItem[];
  } else {
    return portfolioData.featuredAlbum.images.map((item: PortfolioHighlight) => ({
      ...item,
      location: ""
    })) as PortfolioItem[];
  }
});

// 5. Album detail
export const getAlbumDetail = cache(async (slug: string): Promise<AlbumDetail | null> => {
  const album = portfolioData.albumDetails.find((a: MiniAlbum) => a.slug === slug);
  if (!album) return null;
  return album as AlbumDetail;
});

// 6. Wardrobe/Mau-do images list
export const getMauDoImages = cache(async (): Promise<string[]> => {
  return wardrobeData.images.map(img => img.src);
});

export const getWardrobeData = cache(async () => {
  return wardrobeData;
});

// 7. Blog categories & posts
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  return blogData.posts as BlogPost[];
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  const post = blogData.posts.find((p: MiniAlbum) => p.slug === slug);
  if (!post) return null;
  return post as BlogPost;
});

export const getBlogCategories = cache(async (): Promise<string[]> => {
  return blogData.categories;
});

// 8. Sitemap
export const getSitemapContent = cache(async () => {
  return {
    albums: portfolioData.albumItems.map((item: MiniAlbum) => item.slug),
    posts: blogData.posts.map((post: MiniPost) => ({
      slug: post.slug,
      updatedAt: post.date.split("/").reverse().join("-") // Normalize date for sitemap
    }))
  };
});

// 9. Services & Deliverables
export const getServices = cache(async (): Promise<CmsServiceDetail[]> => {
  return servicesData.services as CmsServiceDetail[];
});

export const getServicesData = cache(async () => {
  return servicesData;
});

// 10. Timeline Steps
export const getTimelineSteps = cache(async (): Promise<TimelineStep[]> => {
  return homeData.timeline.steps as TimelineStep[];
});

// 11. Pricing Data
export const getPricingData = cache(async () => {
  return pricingData;
});

// 12. Info Pages (About, Policy)
export const getInfoData = cache(async () => {
  return infoData;
});
