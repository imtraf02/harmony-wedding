"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { siteConfig } from "@/lib/config";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { trackContactChannel } from "@/lib/tracking";
import { AnimatedPhone, AnimatedMessageCircle } from "@/components/ui/animated-icons";

export function ContactContent() {
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollReveal(sectionRef);

	const contactMethods = [
		{
			id: "01",
			tag: "ONLINE SUPPORT",
			name: "Messenger",
			description:
				"Kênh tư vấn trực tuyến 24/7. Trò chuyện nhanh cùng đội ngũ Harmony để trao đổi ý tưởng ban đầu và nhận bảng báo giá dịch vụ.",
			href: siteConfig.links.messenger,
			actionText: "Nhắn tin trực tiếp",
			icon: (
				<AnimatedMessageCircle
					className="size-5 text-neutral-800 transition-transform duration-500 group-hover:scale-110"
					style={{
						color: "rgba(0,0,0,0.72)",
						filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.6))",
					}}
				/>
			),
		},
		{
			id: "02",
			tag: "IMAGE & MOODBOARD",
			name: "Zalo Chat",
			description:
				"Trao đổi trực tiếp, gửi file ảnh mẫu, moodboard tham chiếu hoặc kịch bản chi tiết cho điều phối viên của chúng tôi.",
			icon: (
				<svg
					className="size-5 text-neutral-800 transition-transform duration-500 group-hover:scale-110"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.4"
					viewBox="0 0 24 24"
				>
					<path d="M12 21a9 9 0 1 0-9-9c0 1.48.36 2.88 1 4.12L3 21l4.88-1c1.24.64 2.64 1 4.12 1z" />
					<path d="M9 12h6M12 9v6" />
				</svg>
			),
		},
		{
			id: "03",
			tag: "PORTFOLIO & UPDATES",
			name: "Facebook Page",
			description:
				"Nơi cập nhật liên tục các bộ hình cưới ngoại cảnh mới, thước phim phóng sự cưới và các chương trình ưu đãi dịch vụ của studio.",
			href: siteConfig.links.facebook,
			icon: (
				<svg
					className="size-5 text-neutral-800 transition-transform duration-500 group-hover:scale-110"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.4"
					viewBox="0 0 24 24"
				>
					<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
				</svg>
			),
		},
		{
			id: "04",
			tag: "HOTLINE SUPPORT",
			name: "Hotline Hỗ Trợ",
			description:
				"Dành cho các liên hệ khẩn cấp, đặt lịch chụp gấp hoặc cần giải đáp nhanh từ Trưởng bộ phận nhiếp ảnh của Harmony.",
			icon: (
				<AnimatedPhone
					className="size-5 text-neutral-800 transition-transform duration-500 group-hover:scale-110"
					style={{
						color: "rgba(0,0,0,0.72)",
						filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.6))",
					}}
				/>
			),
		},
	];

	return (
		<section ref={sectionRef} className="bg-transparent pb-24 md:pb-36">
			<div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
				{/* Cards Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{contactMethods.map((method) => (
						<GlassCard
							key={method.name}
							variant="light"
							intensity="low"
							borderStrength="low"
							hoverable
							className="group relative flex flex-col justify-between items-start border border-white/40 shadow-xs rounded-3xl p-8 md:p-10 min-h-[390px]"
							data-reveal
						>
							{/* Card Header Info */}
							<div className="w-full">
								<div className="flex justify-between items-start mb-8">
									<span className="text-[0.62rem] font-bold text-neutral-400 tracking-[0.25em]">
										{method.id} / {method.tag}
									</span>
									<GlassCard
										variant="light"
										intensity="high"
										borderStrength="medium"
										className="flex size-11 items-center justify-center rounded-full border border-white/50 shadow-xs"
									>
										{method.icon}
									</GlassCard>
								</div>
								
								<h3 className="font-serif text-2xl text-neutral-900 mb-4 tracking-tight">
									{method.name}
								</h3>
								<p className="text-[0.82rem] leading-7 text-neutral-500 mb-8 font-light">
									{method.description}
								</p>
							</div>

							{/* Dynamic Actions */}
							<div className="w-full mt-auto">
								{method.name === "Hotline Hỗ Trợ" ? (
									<div className="grid gap-3 w-full">
										{/* Status Indicator */}
										<div className="flex items-center gap-2 mb-1">
											<span className="relative flex size-2">
												<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
												<span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
											</span>
											<span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-emerald-600">
												Hotline: 8:00 - 22:00
											</span>
										</div>
										<GlassButton
											variant="light"
											href={`tel:${siteConfig.links.phone}`}
											onClick={() => trackContactChannel("Hotline", siteConfig.links.phone)}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Gia Hân (Số chính)</span>
											<span>➔</span>
										</GlassButton>
										<GlassButton
											variant="light"
											href={`tel:${siteConfig.links.phoneSecondary}`}
											onClick={() => trackContactChannel("Hotline", siteConfig.links.phoneSecondary)}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Hiếu Trần</span>
											<span>➔</span>
										</GlassButton>
									</div>
								) : method.name === "Zalo Chat" ? (
									<div className="grid gap-3 w-full">
										<GlassButton
											variant="light"
											href={siteConfig.links.zalo}
											onClick={() => {
												trackContactChannel("Zalo", siteConfig.links.zalo);
												window.open(siteConfig.links.zalo, "_blank");
											}}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Gia Hân (Số chính)</span>
											<span>➔</span>
										</GlassButton>
										<GlassButton
											variant="light"
											href={siteConfig.links.zaloSecondary}
											onClick={() => {
												trackContactChannel("Zalo", siteConfig.links.zaloSecondary);
												window.open(siteConfig.links.zaloSecondary, "_blank");
											}}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Hiếu Trần</span>
											<span>➔</span>
										</GlassButton>
									</div>
								) : method.name === "Facebook Page" ? (
									<div className="grid gap-3 w-full">
										<GlassButton
											variant="light"
											href={method.href || "#"}
											onClick={() => {
												trackContactChannel("Facebook", method.href || "");
												window.open(method.href || "#", "_blank");
											}}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Trang Fanpage</span>
											<span>➔</span>
										</GlassButton>
										<GlassButton
											variant="light"
											href={siteConfig.links.facebookSecondary}
											onClick={() => {
												trackContactChannel("Facebook", siteConfig.links.facebookSecondary);
												window.open(siteConfig.links.facebookSecondary, "_blank");
											}}
											className="w-full !py-2.5 !px-5 border-black/10 hover:border-black/30 hover:bg-black/5 text-[0.64rem] tracking-[0.16em] rounded-xl flex items-center justify-between"
										>
											<span className="text-left flex-1">Founder Hiếu Trần</span>
											<span>➔</span>
										</GlassButton>
									</div>
								) : (
									<GlassButton
										href={method.href || "#"}
										onClick={() => {
											trackContactChannel("Messenger", method.href || "");
											window.open(method.href || "#", "_blank");
										}}
										variant="dark"
										className="w-full !py-3 rounded-xl flex items-center justify-between"
									>
										<span>{method.actionText}</span>
										<span>➔</span>
									</GlassButton>
								)}
							</div>
						</GlassCard>
					))}
				</div>

				{/* Studio Details / Work Hours & Map Container */}
				<div className="mt-20 md:mt-28 grid gap-12 lg:grid-cols-[1.3fr_1fr] border-t border-black/[0.05] pt-16 md:pt-24">
					<div data-reveal className="flex flex-col justify-between">
						<div>
							<p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-neutral-400 mb-6">
								STUDIO & GIỜ LÀM VIỆC
							</p>
							<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-[1.2] mb-10 tracking-tight">
								Không Gian Tư Vấn <br />
								Trực Tiếp Tại Studio
							</h2>

							<div className="grid gap-8 sm:grid-cols-2 text-sm leading-8 text-neutral-600">
								<div className="border-l border-black/[0.05] pl-6">
									<h4 className="font-bold text-neutral-800 uppercase tracking-widest text-[0.66rem] mb-3">
										Địa Chỉ Studio
									</h4>
									<p className="font-light text-neutral-500 mb-3">{siteConfig.address}</p>
									<Link
										href={siteConfig.links.googleMaps}
										target="_blank"
										rel="noopener noreferrer"
										className="group/link inline-flex items-center gap-1 text-[0.72rem] font-semibold text-neutral-900 hover:text-neutral-500 transition-colors"
									>
										Chỉ đường trên Google Maps
										<span className="font-serif text-xs transition-transform duration-300 group-hover/link:translate-x-0.5">↗</span>
									</Link>
								</div>
								
								<div className="border-l border-black/[0.05] pl-6">
									<h4 className="font-bold text-neutral-800 uppercase tracking-widest text-[0.66rem] mb-3">
										Liên Hệ Khác
									</h4>
									<p className="font-light text-neutral-500">
										<span className="font-medium text-neutral-700">Giờ mở cửa:</span> {siteConfig.workingHours}
									</p>
									<p className="font-light text-neutral-500 mt-1.5 break-all">
										<span className="font-medium text-neutral-700">Email 1:</span>{" "}
										<a href={`mailto:${siteConfig.email}`} className="hover:text-black transition-colors text-neutral-600">
											{siteConfig.email}
										</a>
									</p>
									<p className="font-light text-neutral-500 mt-1 break-all">
										<span className="font-medium text-neutral-700">Email 2:</span>{" "}
										<a href={`mailto:${siteConfig.emailSecondary}`} className="hover:text-black transition-colors text-neutral-600">
											{siteConfig.emailSecondary}
										</a>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Studio image wrapped in GlassCard frame */}
					<div data-reveal className="relative">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative h-[360px] lg:h-auto lg:min-h-[460px] shadow-lg p-1 rounded-3xl"
						>
							<div className="relative h-full w-full min-h-[336px] lg:min-h-[436px] overflow-hidden rounded-2xl">
								<div
									className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
									style={{ backgroundImage: `url('/images/home/about-us.webp')` }}
								/>
								<div className="absolute inset-0 bg-black/10" />
								
								{/* Glassmorphic card overlay inside the photo */}
								<GlassCard
									variant="light"
									intensity="medium"
									borderStrength="low"
									className="absolute bottom-4 left-4 right-4 border border-white/30 p-6 md:p-8 rounded-2xl shadow-md text-black"
								>
									<p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-neutral-500">
										HARMONY WEDDING STUDIO
									</p>
									<h3 className="font-serif text-xl md:text-2xl mt-1.5 mb-2 leading-tight text-neutral-900 tracking-tight">
										Nơi Lưu Giữ Những <br />
										Câu Chuyện Hạnh Phúc
									</h3>
									<p className="text-[0.8rem] leading-5 text-neutral-500 font-light mb-5">
										Đến trực tiếp để xem các cuốn album cưới cao cấp in thực tế và trò chuyện thoải mái cùng ekip của chúng tôi.
									</p>
									<GlassButton
										href={siteConfig.links.googleMaps}
										onClick={() => window.open(siteConfig.links.googleMaps, "_blank")}
										variant="dark"
										className="w-full !py-2.5 rounded-xl text-center"
									>
										Xem bản đồ chỉ đường ➔
									</GlassButton>
								</GlassCard>
							</div>
						</GlassCard>
					</div>
				</div>
			</div>
		</section>
	);
}
