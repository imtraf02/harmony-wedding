import {
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  ADDRESS_STREET,
  FACEBOOK_URL,
  PHONE,
  SITE_URL,
  STUDIO_NAME,
  TIKTOK_URL,
} from "@/lib/constants";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ── Schemas ────────────────────────────────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PhotographyBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: STUDIO_NAME,
  url: SITE_URL,
  telephone: PHONE,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  priceRange: "₫₫₫",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS_STREET,
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    addressCountry: "VN",
  },
  sameAs: [FACEBOOK_URL, TIKTOK_URL].filter(Boolean),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: STUDIO_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#business` },
  inLanguage: "vi-VN",
};

export function portfolioSchema(portfolio: {
  title: string;
  slug: string;
  cover_image: string;
  images: string[];
  style: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: portfolio.title,
    url: `${SITE_URL}/portfolio/${portfolio.slug}`,
    image: [portfolio.cover_image, ...portfolio.images]
      .filter(Boolean)
      .map((image) =>
        image.startsWith("http") ? image : `${SITE_URL}${image}`,
      ),
    genre: portfolio.style,
    creator: { "@id": `${SITE_URL}/#business` },
    inLanguage: "vi-VN",
  };
}

export function serviceSchema(service: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: { "@type": "Country", name: "Vietnam" },
    serviceType: service.name,
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string | null;
  published_at: string | null;
  cover_image: string | null;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    datePublished: post.published_at ?? "",
    image: post.cover_image
      ? `${SITE_URL}${post.cover_image}`
      : `${SITE_URL}/og-default.jpg`,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Organization", name: STUDIO_NAME },
    publisher: {
      "@type": "Organization",
      name: STUDIO_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
