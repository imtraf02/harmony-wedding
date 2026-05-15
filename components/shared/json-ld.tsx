import { STUDIO_NAME, SITE_URL, PHONE } from '@/lib/constants';

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schemas ────────────────────────────────────────────────────────────────

export const localBusinessSchema = {
  '@context' : 'https://schema.org',
  '@type'    : ['LocalBusiness', 'PhotographyBusiness'],
  name       : STUDIO_NAME,
  url        : SITE_URL,
  telephone  : PHONE,
  image      : `${SITE_URL}/og-default.jpg`,
  priceRange : '₫₫₫',
  openingHours: ['Mo-Sa 08:00-18:00'],
  address: {
    '@type'        : 'PostalAddress',
    streetAddress  : '123 Your Street',
    addressLocality: 'Your City',
    addressCountry : 'VN',
  },
  sameAs: [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
  ].filter(Boolean),
};

export function articleSchema(post: {
  title: string; excerpt: string | null; published_at: string | null;
  cover_image: string | null; slug: string;
}) {
  return {
    '@context'   : 'https://schema.org',
    '@type'      : 'Article',
    headline     : post.title,
    description  : post.excerpt ?? '',
    datePublished: post.published_at ?? '',
    image        : post.cover_image ? `${SITE_URL}${post.cover_image}` : `${SITE_URL}/og-default.jpg`,
    url          : `${SITE_URL}/blog/${post.slug}`,
    author       : { '@type': 'Organization', name: STUDIO_NAME },
    publisher    : {
      '@type': 'Organization',
      name   : STUDIO_NAME,
      logo   : { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context'     : 'https://schema.org',
    '@type'        : 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type'  : 'ListItem',
      position : i + 1,
      name     : item.name,
      item     : `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context' : 'https://schema.org',
    '@type'    : 'FAQPage',
    mainEntity : faqs.map(f => ({
      '@type'       : 'Question',
      name          : f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
