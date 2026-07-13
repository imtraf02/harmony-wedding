"use client";

import { useRef } from "react";
import Link from "next/link";
import { GlassButton } from "@/components/ui/glass-button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { trackContactChannel } from "@/lib/tracking";
import { AnimatedArrowRight } from "@/components/ui/animated-icons";

const CORE_PACKAGES = [
	{
		name: "Phim Trường Combo 1",
		price: "6.900.000đ",
		description: "Bao gồm phí chụp, makeup và vé vào cổng — không phát sinh.",
		highlights: [
			"Chụp 2 váy cưới + 1 vest chú rể + hoa lụa cầm tay dâu",
			"Trang điểm & làm tóc cô dâu theo trang phục",
			"Makeup dặm phấn hỗ trợ suốt buổi chụp",
			"Đã bao gồm vé vào cổng phim trường",
			"1 Album 25×35 (30 trang) + hộp & túi cao cấp",
			"1 ảnh cổng 60×90 tráng gương 4K + 40 ảnh chỉnh sửa",
		],
		popular: false,
	},
	{
		name: "Phim Trường Combo 2",
		price: "7.900.000đ",
		description: "Thêm 1 bộ vest chú rể, album dày hơn và 2 ảnh cổng.",
		highlights: [
			"Chụp 2 váy cưới + 2 vest chú rể + hoa lụa cầm tay dâu",
			"Trang điểm & làm tóc cô dâu theo trang phục",
			"Makeup dặm phấn hỗ trợ suốt buổi chụp",
			"Đã bao gồm vé vào cổng phim trường",
			"1 Album 25×35 (36 trang) + hộp & túi cao cấp",
			"2 ảnh cổng 60×90 tráng gương Titan + 45 ảnh chỉnh sửa",
		],
		popular: true,
	},
	{
		name: "Phim Trường Combo 3",
		price: "11.500.000đ",
		description: "Concept hoa tươi độc đáo — album cưới khác biệt hoàn toàn.",
		highlights: [
			"Chụp 2 váy cưới + 2 vest chú rể + concept hoa tươi độc đáo",
			"Trang điểm & làm tóc cô dâu theo trang phục",
			"Makeup dặm phấn hỗ trợ suốt buổi chụp",
			"Đã bao gồm vé vào cổng phim trường",
			"1 Album 25×35 (40 trang) + hộp & túi cao cấp",
			"2 ảnh cổng 60×90 tráng gương HQ + 50 ảnh chỉnh sửa",
		],
		popular: false,
	},
];



export function PricingSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollReveal(sectionRef);

	return (
		<section
			ref={sectionRef}
			className="relative isolate overflow-hidden bg-neutral-50 py-24 text-black md:py-32"
			id="pricing-preview"
		>
			<div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
				{/* Section Header */}
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-16" data-reveal>
					<div>
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Báo giá chụp ảnh cưới
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h2 className="font-serif text-[clamp(2.45rem,4.5vw,4.8rem)] leading-[0.98] text-neutral-900 tracking-tight">
							Gói Chụp Ảnh Phim Trường
						</h2>
					</div>
					<div className="md:max-w-md">
						<p className="text-[0.92rem] leading-7 text-neutral-500 font-light mb-4">
							Giá niêm yết rõ ràng, không phát sinh. Bao gồm vé vào cổng, xe đưa đón ekip và toàn bộ trang phục — tụi mình lo hết.
						</p>
						<Link
							href="/pricing"
							className="group/link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 hover:text-neutral-500 transition-colors"
						>
							Xem tất cả các gói dịch vụ
							<span className="font-serif text-sm transition-transform duration-300 group-hover/link:translate-x-1">➔</span>
						</Link>
					</div>
				</div>

				{/* Pricing Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
					{CORE_PACKAGES.map((pkg) => (
						<article
							key={pkg.name}
							className={`relative flex flex-col justify-between p-6 sm:p-10 rounded-3xl border transition-all duration-500 ${
								pkg.popular
									? "bg-white border-black/10 shadow-lg scale-100 lg:scale-[1.03]"
									: "bg-white/40 border-black/[0.04] hover:bg-white hover:border-black/10 hover:shadow-md"
							}`}
							data-reveal
						>
							{pkg.popular && (
								<span className="absolute top-4 right-4 bg-neutral-900 text-white text-[0.55rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
									Phổ biến
								</span>
							)}
							<div>
								<h3 className="font-serif text-2xl text-neutral-900 mb-2 tracking-tight">
									{pkg.name}
								</h3>
								<p className="text-[0.76rem] text-neutral-400 font-light mb-6">
									{pkg.description}
								</p>
								<div className="flex items-baseline gap-1 mb-8 border-b border-black/[0.05] pb-6">
									<span className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900 tracking-tight">
										{pkg.price}
									</span>
								</div>
								
								<h4 className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-400 mb-4">
									Chi tiết gói dịch vụ:
								</h4>
								<ul className="space-y-3.5 mb-8">
									{pkg.highlights.map((item, idx) => (
										<li key={idx} className="flex items-start gap-3 text-[0.8rem] leading-6 text-neutral-600 font-light">
											<span className="text-neutral-400 select-none mt-0.5">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
							
							<GlassButton
								href={`https://m.me/61550358332202?ref=${encodeURIComponent(pkg.name.replace(/\s+/g, "_"))}`}
								target="_blank"
								rel="noopener noreferrer"
								variant={pkg.popular ? "dark" : "light"}
								className="w-full !py-3 rounded-xl flex items-center justify-center gap-2 !whitespace-normal !tracking-wider text-center"
								onClick={() => trackContactChannel("Messenger", `https://m.me/61550358332202?ref=${encodeURIComponent(pkg.name.replace(/\s+/g, "_"))}`)}
							>
								<span>Nhận tư vấn gói này</span>
								<AnimatedArrowRight className="size-4 shrink-0" />
							</GlassButton>
						</article>
					))}
				</div>

				{/* Special Promotion Banner */}
				<div className="mt-16" data-reveal>
					<div className="relative overflow-hidden p-8 md:p-12 rounded-3xl border border-amber-500/20 bg-amber-500/[0.02] backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
						<div className="relative z-10 flex-1">
							<span className="inline-block mb-3 rounded-full bg-amber-500/10 px-3 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest text-amber-950">
								Ưu đãi giới hạn tháng này
							</span>
							<h3 className="font-serif text-2xl md:text-3xl text-neutral-900 mb-2 tracking-tight">
								Tặng Standee Ảnh Cưới Thiết Kế Cao Cấp
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light max-w-xl">
								Tất cả các cặp đôi đặt cọc gói chụp pre-wedding trong tháng này đều được Harmony thiết kế và tặng ngay 01 Standee composite khổ 60x90cm kèm giá đỡ gỗ mộc trị giá 800.000đ.
							</p>
						</div>
						<div className="relative z-10 shrink-0">
							<GlassButton
								variant="dark"
								href="/uu-dai/tang-standee-anh-cuoi"
								className="w-full md:w-auto !py-3.5 !px-6 text-[0.68rem] text-center font-bold tracking-[0.22em]"
							>
								Xem chi tiết ưu đãi ➔
							</GlassButton>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
