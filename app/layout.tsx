import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

import { FloatingContact } from "@/components/home/floating-contact";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const SITE_URL = siteConfig.url;

const cormorant = Cormorant_Garamond({
	subsets: ["vietnamese", "latin"],
	variable: "--font-serif",
	weight: ["300", "400", "500", "600", "700"],
	style: ["normal", "italic"],
	display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
	subsets: ["vietnamese", "latin"],
	variable: "--font-sans",
	weight: ["300", "400", "500", "600", "700", "800"],
	display: "swap",
});

export const viewport: Viewport = {
	themeColor: "#111111",
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Harmony Wedding | Chụp Ảnh Cưới Đồng Nai - Khoảnh Khắc Trọn Đời",
		template: "%s | Harmony Wedding",
	},
	description:
		"Studio cưới cao cấp tại Đồng Nai. Chuyên chụp ảnh cưới, quay phim cưới, trang điểm cô dâu, thuê vest & váy cưới và tổ chức tiệc cưới trọn gói. Hotline: 0357.256.845",
	keywords: [
		"chụp ảnh cưới",
		"studio cưới",
		"ảnh cưới đẹp",
		"quay phim cưới",
		"trang điểm cô dâu",
		"thuê váy cưới",
		"thuê vest cưới",
		"tổ chức tiệc cưới",
		"ảnh cưới Đồng Nai",
		"ảnh cưới Đà Lạt",
		"ảnh cưới ngoại cảnh",
		"ảnh cưới studio",
		"Harmony Wedding",
		"studio cưới Trảng Bom",
		"chụp ảnh cưới Đồng Nai",
		"wedding photography Vietnam",
		"ảnh cưới đẹp nhất",
		"makeup cô dâu",
		"váy cưới đẹp",
		"vest chú rể",
		"chụp ảnh cưới Biên Hòa",
		"studio cưới Biên Hòa",
		"chụp ảnh cưới Biên Hòa Đồng Nai",
		"chụp ảnh cưới đẹp Biên Hòa",
		"chụp ảnh cưới Sài Gòn",
		"chụp ảnh cưới tphcm",
		"studio chụp ảnh cưới tphcm",
		"chụp ảnh cưới ngoại cảnh Sài Gòn",
		"chụp ảnh cưới studio tphcm",
		"quay phim cưới tphcm",
		"chụp ảnh cưới Long Khánh",
		"studio cưới Long Khánh",
		"phim trường Vũ Garden",
		"chụp ảnh Vũ Garden Bình Dương",
		"phim trường Sunny Garden",
		"chụp ảnh Sunny Garden Đồng Nai",
		"An Garden Long Khánh",
		"chụp ảnh An Garden Đồng Nai",
		"chụp phóng sự cưới Đồng Nai",
		"quay phóng sự cưới Biên Hòa",
		"kinh nghiệm chụp ảnh cưới",
		"bí quyết tạo dáng chụp ảnh cưới",
		"xu hướng trang điểm cô dâu 2026",
	],
	authors: [{ name: "Harmony Wedding", url: SITE_URL }],
	creator: "Harmony Wedding",
	publisher: "Harmony Wedding",
	formatDetection: {
		email: true,
		address: true,
		telephone: true,
	},
	alternates: {
		canonical: SITE_URL,
	},
	openGraph: {
		type: "website",
		locale: "vi_VN",
		url: SITE_URL,
		siteName: "Harmony Wedding",
		title: "Harmony Wedding | Chụp Ảnh Cưới Đồng Nai - Khoảnh Khắc Trọn Đời",
		description:
			"Studio cưới cao cấp tại Đồng Nai. Chuyên chụp ảnh cưới, quay phim cưới, trang điểm cô dâu, thuê vest & váy cưới và tổ chức tiệc cưới trọn gói.",
		images: [
			{
				url: "/images/home/hero-banner.webp",
				width: 1920,
				height: 1080,
				alt: "Harmony Wedding - Studio chụp ảnh cưới cao cấp tại Đồng Nai",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Harmony Wedding | Chụp Ảnh Cưới Đồng Nai",
		description:
			"Studio cưới cao cấp tại Đồng Nai. Chụp ảnh cưới, quay phim, trang điểm, thuê vest & váy cưới, tổ chức tiệc cưới.",
		images: ["/images/home/hero-banner.webp"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	verification: {
		// Add Google Search Console verification when available
		// google: "your-verification-code",
	},
	category: "wedding photography",
};

export function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html className="h-full scroll-smooth antialiased" lang="vi">
			<body className={`${plusJakarta.variable} ${cormorant.variable} min-h-full bg-white font-sans text-[#111111]`}>
				<WebsiteJsonLd />
				<LocalBusinessJsonLd />
				{children}
				<FloatingContact />
				<CookieConsent />
				<Script id="tiktok-pixel" strategy="afterInteractive">
					{`
						!function (w, d, t) {
							w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
							var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
							;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

							ttq.load('D96RRU3C77U6Q0JCH4P0');
							if (typeof window !== 'undefined' && localStorage.getItem('harmony-consent') !== 'granted') {
								ttq.holdConsent();
							} else {
								ttq.page();
							}
						}(window, document, 'ttq');
					`}
				</Script>
			</body>
		</html>
	);
}

export default RootLayout;
