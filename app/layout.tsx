import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Geist, Jost } from 'next/font/google';
import { SiteShell } from '@/components/layout/site-shell';
import './globals.css';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
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
  openGraph: { type: 'website', locale: 'vi_VN', siteName: STUDIO_NAME },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={cn(cormorant.variable, dmSans.variable, jost.variable, "font-sans", geist.variable)}>
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
