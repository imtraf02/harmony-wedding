import type { MetadataRoute } from "next";
import { getDb } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const db = getDb();
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://localhost:3000"
  ).replace(/\/$/, "");

  // Fetch dynamic routes
  const portfolios = db
    .prepare(`SELECT slug, updated_at FROM portfolios`)
    .all() as { slug: string; updated_at: string }[];

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/portfolio`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" },
    {
      url: `${base}/services/photography`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/services/videography`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/services/wedding-film`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { url: `${base}/pricing`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/studios`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: "monthly" },
  ];

  return [
    ...staticPages,
    ...portfolios.map((p) => ({
      url: `${base}/portfolio/${p.slug}`,
      lastModified: new Date(p.updated_at),
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
  ];
}
