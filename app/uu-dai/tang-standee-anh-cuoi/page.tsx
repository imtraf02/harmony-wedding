import type { Metadata } from "next";
import { Suspense } from "react";
import { LandingPageContent } from "./landing-page-content";

export const metadata: Metadata = {
	title: "Ưu Đãi Đặc Biệt: Tặng Standee Ảnh Cưới Thiết Kế | Harmony Wedding",
	description:
		"Nhận ngay Standee ảnh cưới cao cấp trị giá 800.000đ khi đăng ký gói chụp ảnh cưới trọn gói tại Harmony. Chương trình ưu đãi giới hạn cho 20 cặp đôi đăng ký sớm nhất.",
	alternates: {
		canonical: "/uu-dai/tang-standee-anh-cuoi",
	},
	openGraph: {
		title: "Ưu Đãi Đặc Biệt: Tặng Standee Ảnh Cưới Thiết Kế | Harmony Wedding",
		description:
			"Đăng ký gói chụp ảnh cưới trọn gói tại Harmony để nhận ngay Standee ảnh cưới cao cấp trị giá 800.000đ. Áp dụng giới hạn cho 20 cặp đôi đăng ký sớm nhất.",
		url: "/uu-dai/tang-standee-anh-cuoi",
		images: [
			{
				url: "/images/promo/standee-hero.webp",
				width: 1024,
				height: 1024,
				alt: "Chương trình tặng Standee ảnh cưới cao cấp - Harmony Wedding",
			},
		],
	},
};

export default function StandeePromoPage() {
	return (
		<main className="bg-[#fcfbfc] text-[#111111] min-h-screen relative overflow-hidden font-sans">
			<Suspense
				fallback={
					<div className="min-h-screen flex items-center justify-center bg-white">
						<div className="flex flex-col items-center gap-4">
							<span className="size-10 animate-spin rounded-full border-4 border-amber-500/20 border-t-amber-500" />
							<p className="text-xs uppercase tracking-widest text-neutral-400 font-bold">
								Đang tải trang...
							</p>
						</div>
					</div>
				}
			>
				<LandingPageContent />
			</Suspense>
		</main>
	);
}
