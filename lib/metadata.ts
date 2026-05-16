import type { Metadata } from 'next';

const BASE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000';
const SITE_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Harmony Studio';

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${BASE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

interface SeoInput {
  title       : string;
  description : string;
  path        : string;     // e.g. '/portfolio'
  image?      : string;     // absolute URL; falls back to og-default.jpg
  noIndex?    : boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: SeoInput): Metadata {
  const url     = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl('/logo.png');

  return {
    title,
    description,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    publisher: SITE_NAME,
    alternates : { canonical: url },
    openGraph  : {
      title, description, url,
      siteName : SITE_NAME,
      locale   : 'vi_VN',
      type     : 'website',
      images   : [{ url: ogImage, alt: title }],
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
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
}
