import type { Metadata } from 'next';

const BASE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Harmony Studio';

interface SeoInput {
  title       : string;
  description : string;
  path        : string;     // e.g. '/portfolio'
  image?      : string;     // absolute URL; falls back to og-default.jpg
  noIndex?    : boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: SeoInput): Metadata {
  const url     = `${BASE_URL}${path}`;
  const ogImage = image ?? `${BASE_URL}/og-default.jpg`;

  return {
    title,
    description,
    alternates : { canonical: url },
    openGraph  : {
      title, description, url,
      siteName : SITE_NAME,
      locale   : 'vi_VN',
      type     : 'website',
      images   : [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card   : 'summary_large_image',
      title, description,
      images : [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true, follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
        },
  };
}
