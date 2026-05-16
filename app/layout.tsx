import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SiteShell } from '@/components/layout/site-shell';
import './globals.css';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000';
const STUDIO_NAME = process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Harmony Studio';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STUDIO_NAME} | Chụp ảnh & Quay phim cưới chuyên nghiệp`,
    template: `%s | ${STUDIO_NAME}`,
  },
  description: 'Dịch vụ nhiếp ảnh và quay phim cưới chuyên nghiệp. Lưu giữ những khoảnh khắc hạnh phúc bằng phong cách phóng sự, ánh sáng tự nhiên và những thước phim điện ảnh.',
  keywords: ['chụp ảnh cưới', 'quay phim cưới', 'phóng sự cưới', 'pre-wedding', 'ảnh cưới nghệ thuật'],
  applicationName: STUDIO_NAME,
  authors: [{ name: STUDIO_NAME, url: SITE_URL }],
  publisher: STUDIO_NAME,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: STUDIO_NAME,
    url: SITE_URL,
    title: `${STUDIO_NAME} | Chụp ảnh & Quay phim cưới chuyên nghiệp`,
    description: 'Dịch vụ nhiếp ảnh và quay phim cưới chuyên nghiệp. Lưu giữ những khoảnh khắc hạnh phúc bằng phong cách phóng sự, ánh sáng tự nhiên và những thước phim điện ảnh.',
    images: [{ url: '/logo.png', alt: STUDIO_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${STUDIO_NAME} | Chụp ảnh & Quay phim cưới chuyên nghiệp`,
    description: 'Dịch vụ nhiếp ảnh và quay phim cưới chuyên nghiệp. Lưu giữ những khoảnh khắc hạnh phúc bằng phong cách phóng sự, ánh sáng tự nhiên và những thước phim điện ảnh.',
    images: ['/logo.png'],
  },
  robots: {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={cn(roboto.variable, "font-sans")}>
      <body className="bg-luxury text-obsidian antialiased selection:bg-gold-dim selection:text-gold">
        <TooltipProvider>
          <SiteShell>
            {children}
          </SiteShell>
        </TooltipProvider>
      </body>
    </html>
  );
}
