"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { trackFormSubmission, trackContactChannel, trackEvent } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP);
}

interface LeadFormData {
	name: string;
	phone: string;
	weddingDate: string;
	packageInterest: string;
	notes: string;
}

const INITIAL_FORM: LeadFormData = {
	name: "",
	phone: "",
	weddingDate: "",
	packageInterest: "combo-chup-anh-tang-standee",
	notes: "",
};

const TESTIMONIALS = [
	{
		quote: "Gói chụp của Harmony đã rất đẹp rồi, lại được tặng thêm 1 standee in ảnh cổng để bàn gallery nữa nên đám cưới của bọn mình rất trọn vẹn. Standee dày dặn, in sắc nét, ai đi qua cũng khen tấm hình này.",
		author: "Khánh Linh & Minh Đức",
		package: "Đã chụp tại Sunny Garden",
		avatar: "/images/wedding/sunny-garden/16.webp",
	},
	{
		quote: "Mình rất ưng ý với Standee composite mà Harmony tặng. Cầm rất chắc tay, không sợ bị trầy xước hay thấm nước như ảnh gỗ ngày xưa. Thiết kế chữ và màu sắc theo đúng gu của hai vợ chồng.",
		author: "Quỳnh Anh & Quốc Bảo",
		package: "Đã chụp tại Vũ Garden",
		avatar: "/images/wedding/vu-garden/1.webp",
	},
	{
		quote: "Ban đầu hai vợ chồng lăn tăn vì sợ standee to cồng kềnh, nhưng được Harmony làm cho kích thước 60x90cm rất vừa vặn, chân đỡ chắc chắn, mang lên nhà hàng hay trưng ở phòng khách sau cưới đều đẹp.",
		author: "Phương Thảo & Hoàng Nam",
		package: "Đã chụp tại Studio",
		avatar: "/images/wedding/an-garden/1.webp",
	},
];

const GALLERIES = [
	{ src: "/images/wedding/sunny-garden/1.webp", label: "Phong cách châu Âu lãng mạn" },
	{ src: "/images/wedding/vu-garden/1.webp", label: "Nhà kính thơ mộng cổ điển" },
	{ src: "/images/wedding/an-garden/1.webp", label: "Mộc mạc kiểu Hàn Quốc" },
	{ src: "/images/wedding/da-lat/1.webp", label: "Ngoại cảnh thông ngàn thơ mộng" },
	{ src: "/images/wedding/studio-han-quoc/1.webp", label: "Studio thanh lịch tối giản" },
	{ src: "/images/wedding/ngay-cuoi/1.webp", label: "Khoảnh khắc phóng sự ngày cưới" },
];

export function LandingPageContent() {
	const searchParams = useSearchParams();
	const formRef = useRef<HTMLDivElement | null>(null);

	// Extract UTM parameters
	const utmSource = searchParams.get("utm_source") || "direct";
	const utmMedium = searchParams.get("utm_medium") || "none";
	const utmCampaign = searchParams.get("utm_campaign") || "default";
	const utmContent = searchParams.get("utm_content") || "";
	const utmTerm = searchParams.get("utm_term") || "";

	// Log UTM values in console for validation
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			console.log("[UTM Tracking Detected]:", {
				utmSource,
				utmMedium,
				utmCampaign,
				utmContent,
				utmTerm,
			});
		}
	}, [utmSource, utmMedium, utmCampaign, utmContent, utmTerm]);

	// Countdown timer state
	const calculateTimeLeft = () => {
		// Target date is end of July 2026
		const targetDate = new Date("2026-07-31T23:59:59+07:00").getTime();
		const now = Date.now();
		const difference = targetDate - now;

		if (difference <= 0) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	// Scroll to form CTA utility
	const scrollToForm = (e: React.MouseEvent) => {
		e.preventDefault();
		formRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	// Lead Form State
	const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});

	const handleFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof LeadFormData]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Vui lòng cung cấp họ tên của bạn.";
		}

		const phoneRegex = /^(0|84)[3|5|7|8|9][0-9]{8}$/;
		if (!formData.phone.trim()) {
			newErrors.phone = "Vui lòng nhập số điện thoại hoặc Zalo liên hệ.";
		} else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
			newErrors.phone = "Số điện thoại chưa đúng định dạng (ví dụ: 0357256845).";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		setSubmitStatus("idle");

		// Simulate lead storage on client-side
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitStatus("success");

			// Trigger TikTok/FB Pixel tracking events
			trackFormSubmission("Landing_Page_Standee_Promo");

			// Track Custom lead event with complete UTM campaign parameters
			trackEvent("Lead", {
				content_type: "standee_promo_lead",
				content_name: "Landing_Page_Standee_Register",
				value: formData.name,
				utm_source: utmSource,
				utm_medium: utmMedium,
				utm_campaign: utmCampaign,
				utm_content: utmContent,
				utm_term: utmTerm,
			});
		}, 800);
	};

	// FAQ states
	const [activeFaq, setActiveFaq] = useState<number | null>(null);
	const toggleFaq = (index: number) => {
		setActiveFaq((prev) => (prev === index ? null : index));
	};

	// Generate customized Zalo and Messenger links with UTM values
	const zaloUrl = `https://zalo.me/${siteConfig.links.phone}`;
	const messengerUrl = `https://m.me/61550358332202?ref=${encodeURIComponent(
		`utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`,
	)}`;

	return (
		<div className="relative">
			{/* Color Mesh Background */}
			<MeshGradient variant="light" className="opacity-75" />

			{/* Simplified Landing Header */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.03] bg-white/40 backdrop-blur-md select-none">
				<div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between md:px-10">
					{/* Small Logo branding */}
					<div className="flex items-center gap-2">
						<Image
							alt="Harmony Wedding Logo"
							className="object-contain"
							height={32}
							width={32}
							src="/logo.png"
						/>
						<span className="font-serif text-sm tracking-widest font-bold text-neutral-800 uppercase">
							Harmony
						</span>
					</div>
					{/* Primary single Action */}
					<GlassButton
						variant="dark"
						className="!py-2 !px-5 text-[0.62rem] tracking-wider"
						href={messengerUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => {
							trackContactChannel("Messenger", messengerUrl);
							trackEvent("Lead", {
								content_type: "standee_promo_click",
								content_name: "Header_Nhan_Qua_Ngay_Click",
								utm_source: utmSource,
								utm_medium: utmMedium,
								utm_campaign: utmCampaign,
								utm_content: utmContent,
								utm_term: utmTerm,
							});
						}}
					>
						Nhận Quà Ngay
					</GlassButton>
				</div>
			</header>

			{/* 1. HERO SECTION */}
			<section className="pt-28 pb-16 md:pt-36 md:pb-24 px-5">
				<div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center md:px-10">
					{/* Copy Column */}
					<div className="text-left">
						<span className="inline-block mb-4 rounded-full bg-amber-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-amber-950">
							Quà tặng đặc biệt tháng này
						</span>
						<h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] text-neutral-900 tracking-tight">
							Đặt Lịch Chụp Cưới <br className="hidden sm:inline" />
							<span className="text-amber-700 font-medium">Tặng Ngay Standee</span>
						</h1>
						<p className="mt-6 text-sm md:text-base leading-8 text-neutral-500 font-light max-w-xl">
							Món quà kỷ niệm tinh tế trưng bày bàn gallery tiệc cưới và góc nhỏ gia đình.
							Harmony dành tặng ngay 01 Standee thiết kế cao cấp cho tất cả các cặp đôi đặt gói
							chụp pre-wedding trong thời gian ưu đãi này.
						</p>

						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<GlassButton
								variant="dark"
								className="w-full sm:w-auto !py-3.5 !px-8 text-xs text-center font-bold tracking-widest"
								href={messengerUrl}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => {
									trackContactChannel("Messenger", messengerUrl);
									trackEvent("Lead", {
										content_type: "standee_promo_click",
										content_name: "Hero_Nhan_Qua_Ngay_Click",
										utm_source: utmSource,
										utm_medium: utmMedium,
										utm_campaign: utmCampaign,
										utm_content: utmContent,
										utm_term: utmTerm,
									});
								}}
							>
								Nhận Quà Ngay ➔
							</GlassButton>
							<GlassButton
								variant="light"
								href={zaloUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full sm:w-auto !py-3.5 !px-8 text-xs border border-black/10 text-center font-bold tracking-widest"
								onClick={() => trackContactChannel("Zalo", zaloUrl)}
							>
								Chat Zalo tư vấn trực tiếp
							</GlassButton>
						</div>

						{/* Urgency tag line */}
						<div className="mt-6 flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-wider text-neutral-400">
							<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
							Số lượng quà tặng giới hạn: Chỉ còn 8 suất trống
						</div>
					</div>

					{/* Image Column: Coded Interactive Standee Mockup */}
					<div className="relative flex justify-center items-center">
						<WeddingStandee />
						{/* Floating badge */}
						<div className="absolute bottom-16 -right-2 sm:-right-4 bg-amber-500 text-white rounded-full size-20 sm:size-24 flex flex-col items-center justify-center p-3 text-center shadow-lg font-serif animate-float-fast rotate-6 select-none border-2 border-white/20 z-30">
							<span className="text-[0.6rem] uppercase tracking-wider leading-none">Trị giá</span>
							<span className="text-sm font-bold leading-none mt-1">1.200.000đ</span>
							<span className="text-[0.55rem] font-sans leading-none mt-1 opacity-80">FREE</span>
						</div>
					</div>
				</div>
			</section>

			{/* 2. EXPLANATION OF PROMO */}
			<section className="py-16 bg-white/30 backdrop-blur-xs border-y border-black/[0.03] px-5">
				<div className="mx-auto max-w-7xl md:px-10">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight">
							Chi Tiết Chương Trình Quà Tặng
						</h2>
						<p className="mt-3 text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest">
							Dành riêng cho dâu rể đăng ký sớm
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs">
							<div className="size-10 bg-amber-500/10 text-amber-800 rounded-full flex items-center justify-center font-bold text-lg mb-6">
								🎁
							</div>
							<h3 className="font-serif text-lg text-neutral-900 mb-3">
								Gói Chụp Áp Dụng
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light">
								Ưu đãi áp dụng khi đặt bất cứ gói chụp ảnh cưới <strong>Studio, Phim trường hoặc Ngoại cảnh</strong> nào tại Harmony (bao gồm các concept thiết kế đa dạng và điểm chụp nổi tiếng).
							</p>
						</GlassCard>

						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs">
							<div className="size-10 bg-amber-500/10 text-amber-800 rounded-full flex items-center justify-center font-bold text-lg mb-6">
								📐
							</div>
							<h3 className="font-serif text-lg text-neutral-900 mb-3">
								Chất Liệu Standee
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light">
								Standee composite chất lượng cao cấp. Tấm ảnh cưới của hai bạn được ép màng bảo vệ chống xước, chống lóa, đi kèm giá đỡ gỗ mộc tự nhiên chắc chắn, thẩm mỹ và tinh tế.
							</p>
						</GlassCard>

						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs">
							<div className="size-10 bg-amber-500/10 text-amber-800 rounded-full flex items-center justify-center font-bold text-lg mb-6">
								⏳
							</div>
							<h3 className="font-serif text-lg text-neutral-900 mb-3">
								Thời Hạn Đăng Ký
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light">
								Chương trình áp dụng cho khách hàng đăng ký tư vấn và cọc giữ ưu đãi từ nay đến hết ngày <strong>31/07/2026</strong>. Bạn có thể chụp hình sau, chỉ cần đặt cọc giữ ưu đãi trong hạn.
							</p>
						</GlassCard>
					</div>

					{/* 3. countdown timer banner */}
					<div className="mt-14 max-w-3xl mx-auto">
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 md:p-8 rounded-3xl border border-white/10 text-center shadow-lg relative overflow-hidden"
						>
							<div className="absolute inset-0 bg-radial-gradient(circle, rgba(180, 120, 50, 0.15) 0%, rgba(0, 0, 0, 0) 70%) pointer-events-none" />
							<h4 className="relative z-10 text-[0.62rem] font-bold tracking-[0.25em] uppercase text-amber-400 mb-4">
								Thời hạn nhận ưu đãi còn lại
							</h4>
							<div className="relative z-10 flex justify-center items-center gap-4 md:gap-8 text-white">
								<div className="flex flex-col items-center">
									<span className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
										{String(timeLeft.days).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Ngày</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center">
									<span className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
										{String(timeLeft.hours).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Giờ</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center">
									<span className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
										{String(timeLeft.minutes).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Phút</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center">
									<span className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
										{String(timeLeft.seconds).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Giây</span>
								</div>
							</div>
						</GlassCard>
					</div>
				</div>
			</section>

			{/* 4. GALLERY */}
			<section className="py-20 px-5">
				<div className="mx-auto max-w-7xl md:px-10">
					<div className="text-center max-w-2xl mx-auto mb-14">
						<p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Tác phẩm nổi bật
						</p>
						<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight">
							Concept Ảnh Cưới Đã Thực Hiện
						</h2>
						<p className="mt-4 text-xs md:text-sm leading-6 text-neutral-500 font-light">
							Hai bạn có thể lựa chọn bất kỳ hình ảnh nào trong album cưới của mình dưới đây để thiết kế làm ảnh Standee trưng bày đón khách.
						</p>
					</div>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{GALLERIES.map((item, index) => (
							<GlassCard
								key={item.src}
								variant="light"
								intensity="low"
								borderStrength="low"
								className="relative aspect-[3/2] w-full border border-white/40 shadow-xs p-1 rounded-2xl overflow-hidden group"
							>
								<div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100">
									<Image
										alt={item.label}
										className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
										fill
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
										src={item.src}
										loading="lazy"
									/>
									{/* Vignette Overlay */}
									<div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
									<div className="absolute bottom-4 left-4 right-4 text-white text-[0.66rem] font-semibold uppercase tracking-wider translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
										{item.label}
									</div>
								</div>
							</GlassCard>
						))}
					</div>
				</div>
			</section>

			{/* 5. TESTIMONIALS (SOCIAL PROOF) */}
			<section className="py-20 bg-white/30 backdrop-blur-xs border-y border-black/[0.03] px-5">
				<div className="mx-auto max-w-7xl md:px-10">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<p className="mb-3 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Cảm nhận thực tế
						</p>
						<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight">
							Chia Sẻ Từ Các Cặp Đôi
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						{TESTIMONIALS.map((item, index) => (
							<GlassCard
								key={index}
								variant="light"
								intensity="medium"
								className="p-6 md:p-8 rounded-2xl text-left border-white/40 shadow-xs flex flex-col justify-between"
							>
								<div>
									<span className="text-2xl text-amber-700/30 font-serif leading-none block mb-4">“</span>
									<p className="text-xs leading-7 text-neutral-500 font-light italic mb-6">
										{item.quote}
									</p>
								</div>
								<div className="flex items-center gap-4 border-t border-black/5 pt-4">
									<div className="relative size-10 rounded-full overflow-hidden shrink-0 bg-neutral-100">
										<Image
											alt={item.author}
											className="object-cover"
											fill
											src={item.avatar}
											loading="lazy"
											sizes="40px"
										/>
									</div>
									<div>
										<h4 className="font-serif text-sm font-semibold text-neutral-900">{item.author}</h4>
										<p className="text-[0.6rem] font-bold uppercase tracking-wider text-neutral-400 mt-0.5">{item.package}</p>
									</div>
								</div>
							</GlassCard>
						))}
					</div>
				</div>
			</section>

			{/* 6. FAQ SECTION */}
			<section className="py-20 px-5">
				<div className="mx-auto max-w-3xl md:px-10">
					<div className="text-center mb-12">
						<h2 className="font-serif text-3xl text-neutral-900 tracking-tight">
							Câu Hỏi Thường Gặp
						</h2>
						<p className="mt-2 text-xs text-neutral-400 font-bold uppercase tracking-widest">
							FAQ về ưu đãi standee ảnh cưới
						</p>
					</div>

					<div className="space-y-4">
						{/* FAQ 1 */}
						<GlassCard variant="light" intensity="low" className="rounded-xl border-white/30">
							<button
								onClick={() => toggleFaq(0)}
								className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
								type="button"
							>
								<span>Standee có giá đỡ chân đứng đi kèm không?</span>
								<span className="font-serif text-xs transition-transform duration-300 ml-4">
									{activeFaq === 0 ? "▲" : "▼"}
								</span>
							</button>
							{activeFaq === 0 && (
								<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
									Có, sản phẩm standee được làm từ chất liệu composite cao cấp bền đẹp, đi kèm giá đỡ ba chân bằng gỗ mộc tự nhiên chắc chắn và tinh tế, giúp trưng bày hoàn hảo tại sảnh đón tiệc cưới.
								</div>
							)}
						</GlassCard>

						{/* FAQ 2 */}
						<GlassCard variant="light" intensity="low" className="rounded-xl border-white/30">
							<button
								onClick={() => toggleFaq(1)}
								className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
								type="button"
							>
								<span>Tôi có được chọn bức ảnh in standee theo ý thích không?</span>
								<span className="font-serif text-xs transition-transform duration-300 ml-4">
									{activeFaq === 1 ? "▲" : "▼"}
								</span>
							</button>
							{activeFaq === 1 && (
								<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
									Có, hai bạn hoàn toàn tự do lựa chọn bức ảnh ưng ý nhất trong toàn bộ album ảnh cưới đã chỉnh sửa của mình. Ekip thiết kế của Harmony sẽ tiến hành dàn trang, chèn text chúc mừng (tên dâu rể + ngày cưới) theo mẫu thiết kế riêng trước khi in.
								</div>
							)}
						</GlassCard>

						{/* FAQ 3 */}
						<GlassCard variant="light" intensity="low" className="rounded-xl border-white/30">
							<button
								onClick={() => toggleFaq(2)}
								className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
								type="button"
							>
								<span>Nếu tôi đặt cọc bây giờ nhưng 2-3 tháng sau mới chụp thì sao?</span>
								<span className="font-serif text-xs transition-transform duration-300 ml-4">
									{activeFaq === 2 ? "▲" : "▼"}
								</span>
							</button>
							{activeFaq === 2 && (
								<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
									Chương trình này hỗ trợ tối đa cho các cặp đôi. Bạn chỉ cần liên hệ cọc giữ ưu đãi trong tháng này để nhận suất quà tặng. Lịch chụp thực tế có thể linh hoạt sắp xếp vào thời gian sau (lên tới 6 tháng kể từ thời điểm cọc).
								</div>
							)}
						</GlassCard>

						{/* FAQ 4 */}
						<GlassCard variant="light" intensity="low" className="rounded-xl border-white/30">
							<button
								onClick={() => toggleFaq(3)}
								className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
								type="button"
							>
								<span>Có tốn thêm chi phí thiết kế hay gia công standee không?</span>
								<span className="font-serif text-xs transition-transform duration-300 ml-4">
									{activeFaq === 3 ? "▲" : "▼"}
								</span>
							</button>
							{activeFaq === 3 && (
								<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
									Gói quà tặng đã bao gồm trọn gói chi phí thiết kế chữ nghệ thuật, chỉnh màu sắc theo mong muốn, chi phí in ấn công nghệ cao chống trầy xước và chân gỗ đi kèm. Bạn hoàn toàn không cần chi trả thêm bất kỳ chi phí phát sinh nào.
								</div>
							)}
						</GlassCard>
					</div>
				</div>
			</section>

			{/* 7. Lead Form Section (CTA Cuối Trang) */}
			<section ref={formRef} className="py-20 bg-neutral-900 text-white relative px-5">
				<div className="absolute inset-0 bg-radial-gradient(circle, rgba(180, 120, 50, 0.1) 0%, rgba(0, 0, 0, 0) 70%) pointer-events-none" />
				<div className="mx-auto max-w-3xl relative z-10">
					<div className="text-center max-w-2xl mx-auto mb-10">
						<h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white">
							Đăng Ký Nhận Ưu Đãi Ngay
						</h2>
						<p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-amber-500">
							Nhận Standee & Nhận Báo Giá Tư Vấn
						</p>
						<p className="mt-4 text-xs leading-6 text-white/50 font-light">
							Chỉ còn 8 suất ưu đãi cuối cùng áp dụng cho cặp đôi hoàn thành đặt cọc cọc trước 31/07/2026. Hãy để lại thông tin để giữ quà tặng ngay.
						</p>
					</div>

					{submitStatus === "success" ? (
						<div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-md">
							<div className="size-14 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold">
								✓
							</div>
							<h3 className="font-serif text-xl font-medium text-white mb-3">
								Ghi nhận thông tin thành công!
							</h3>
							<p className="text-xs leading-6 text-white/60 font-light mb-8 max-w-md mx-auto">
								Cảm ơn hai bạn đã đăng ký chương trình khuyến mãi. Để giữ suất quà tặng Standee và nhận ngay báo giá concept nhanh nhất, vui lòng kết nối trực tiếp với Harmony qua:
							</p>

							<div className="flex flex-col gap-3 sm:flex-row justify-center sm:items-center">
								<GlassButton
									variant="gold"
									href={zaloUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="!py-3 !px-8 text-xs w-full sm:w-auto text-center"
									onClick={() => trackContactChannel("Zalo", zaloUrl)}
								>
									Liên Hệ Qua Zalo
								</GlassButton>
								<GlassButton
									variant="light"
									href={messengerUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="!py-3 !px-8 text-xs w-full sm:w-auto text-center border-white/20 text-white hover:text-black"
									onClick={() => trackContactChannel("Messenger", messengerUrl)}
								>
									Liên Hệ Qua Messenger
								</GlassButton>
							</div>

							<button
								onClick={() => {
									setFormData(INITIAL_FORM);
									setSubmitStatus("idle");
								}}
								className="mt-8 text-[0.6rem] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors cursor-pointer block mx-auto"
								type="button"
							>
								Nhập Lại Thông Tin
							</button>
						</div>
					) : (
						<GlassCard
							variant="dark"
							intensity="high"
							borderStrength="medium"
							className="p-6 sm:p-8 md:p-10 border-white/10 rounded-3xl"
						>
							<form onSubmit={handleFormSubmit} className="space-y-5">
								<div className="grid gap-5 sm:grid-cols-2">
									{/* Name */}
									<div className="flex flex-col gap-1.5 text-left">
										<label htmlFor="name" className="text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
											Họ và tên của bạn *
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleFormChange}
											placeholder="Ví dụ: Nguyễn Văn A"
											className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/25 focus:border-white focus:bg-white/10 focus:outline-hidden transition-all ${
												errors.name ? "border-red-400" : "border-white/10"
											}`}
										/>
										{errors.name && <span className="text-[0.6rem] text-red-400">{errors.name}</span>}
									</div>

									{/* Phone */}
									<div className="flex flex-col gap-1.5 text-left">
										<label htmlFor="phone" className="text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
											Số điện thoại / Zalo liên hệ *
										</label>
										<input
											type="text"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleFormChange}
											placeholder="Ví dụ: 0357256845"
											className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/25 focus:border-white focus:bg-white/10 focus:outline-hidden transition-all ${
												errors.phone ? "border-red-400" : "border-white/10"
											}`}
										/>
										{errors.phone && <span className="text-[0.6rem] text-red-400">{errors.phone}</span>}
									</div>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									{/* Wedding Date */}
									<div className="flex flex-col gap-1.5 text-left">
										<label htmlFor="weddingDate" className="text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
											Ngày cưới dự kiến (nếu có)
										</label>
										<input
											type="date"
											id="weddingDate"
											name="weddingDate"
											value={formData.weddingDate}
											onChange={handleFormChange}
											className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white focus:border-white focus:bg-white/10 focus:outline-hidden transition-all"
										/>
									</div>

									{/* Location */}
									<div className="flex flex-col gap-1.5 text-left">
										<label htmlFor="packageInterest" className="text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
											Dịch vụ cưới quan tâm
										</label>
										<select
											id="packageInterest"
											name="packageInterest"
											value={formData.packageInterest}
											onChange={handleFormChange}
											className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-2.5 text-xs text-white focus:border-white focus:outline-hidden transition-all"
										>
											<option value="combo-chup-anh-tang-standee">Combo Chụp Cưới + Standee Tặng Kèm</option>
											<option value="chup-anh-phong-su-ngay-cuoi">Chụp Ảnh Phóng Sự Ngày Cưới</option>
											<option value="quay-phim-phong-su-cuoi">Quay Phim Phóng Sự Cưới</option>
											<option value="dich-vu-cuoi-tron-goi">Dịch Vụ Cưới Trọn Gói</option>
										</select>
									</div>
								</div>

								{/* Message */}
								<div className="flex flex-col gap-1.5 text-left">
									<label htmlFor="notes" className="text-[0.62rem] font-bold uppercase tracking-widest text-white/60">
										Gu ảnh cưới hoặc lưu ý cho Ekip (nếu có)
									</label>
									<textarea
										id="notes"
										name="notes"
										value={formData.notes}
										onChange={handleFormChange}
										rows={3}
										placeholder="Ví dụ: Hai bọn mình thích chụp phong cách lãng mạn nhẹ nhàng Hàn Quốc..."
										className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/25 focus:border-white focus:bg-white/10 focus:outline-hidden transition-all resize-none"
									/>
								</div>

								{submitStatus === "error" && (
									<div className="text-[0.7rem] text-red-400 text-left">
										Có lỗi xảy ra trong quá trình gửi thông tin. Bạn có thể nhấn trực tiếp vào liên kết Zalo hoặc gọi Hotline để giữ suất nhanh nhất.
									</div>
								)}

								{/* Submit Button */}
								<div className="pt-2">
									<GlassButton
										type="submit"
										variant="gold"
										disabled={isSubmitting}
										className="w-full !py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 tracking-widest"
									>
										{isSubmitting ? (
											<>
												<span className="size-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
												Đang gửi đăng ký...
											</>
										) : (
											<>Gửi đăng ký giữ suất standee cưới ➔</>
										)}
									</GlassButton>
								</div>
							</form>
						</GlassCard>
					)}
				</div>
			</section>

			{/* Minimal Landing Footer */}
			<footer className="py-8 bg-neutral-950 text-white/50 text-[0.66rem] font-light text-center border-t border-white/5 px-5">
				<div className="mx-auto max-w-7xl md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div>
						<p className="font-serif tracking-widest font-bold text-white uppercase text-xs mb-1">
							Harmony Wedding
						</p>
						<p className="text-white/40">Địa chỉ: {siteConfig.address}</p>
					</div>
					<div className="flex flex-col md:items-end gap-1">
						<p className="text-white/40">
							Hotline tư vấn: <strong className="text-white">{siteConfig.contactInfo.hotline}</strong>
						</p>
						<p>© 2026 Harmony Wedding. Chân thành & Trọn vẹn.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}

function WeddingStandee() {
	const standeeRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

		// 1. Roll up animation: animate height from 0 to auto
		tl.fromTo(
			wrapperRef.current,
			{ height: 0, opacity: 0.8 },
			{ height: "auto", opacity: 1, duration: 2.2, delay: 0.5 }
		);

		// 2. Staggered fade in of the items inside the standee
		tl.fromTo(
			".standee-item",
			{ opacity: 0, y: 15 },
			{ opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power2.out" },
			"-=1.6" // overlaps with the height reveal
		);
	}, { scope: standeeRef });

	return (
		<div ref={standeeRef} className="relative mx-auto max-w-[320px] sm:max-w-[350px] w-full pb-8 select-none">
			{/* Canvas Wrapper */}
			<div ref={wrapperRef} className="overflow-hidden w-[96%] mx-auto relative z-10">
				{/* Metal Top Rail (Roll-up Banner Top) */}
				<div className="h-1.5 bg-linear-to-r from-neutral-400 via-neutral-300 to-neutral-500 w-full rounded-t-xs shadow-xs" />
				
				{/* Standee Body (Fabric/Banner Sheet) */}
				<div className="bg-white border-x border-neutral-200/80 shadow-2xl p-3.5 pb-5 flex flex-col justify-between aspect-[1/2.35] border-b border-neutral-200/50">
					{/* Top Image: Landscape */}
					<div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 rounded-xs standee-item">
						<Image
							alt="Ảnh cưới ngang mẫu - Harmony Wedding"
							src="/images/wedding/studio-han-quoc/8.webp"
							fill
							className="object-cover"
							priority
							sizes="350px"
						/>
					</div>

					{/* Middle Typography Section */}
					<div className="text-center py-2.5 border-y border-black/[0.04] my-2 standee-item">
						<span className="block text-[0.4rem] tracking-[0.25em] text-neutral-400 font-bold uppercase mb-0.5">
							OUR WEDDING DAY
						</span>
						<h3 className="font-serif text-xs sm:text-sm tracking-[0.16em] text-amber-800 uppercase font-medium leading-none py-1">
							Bá Quyền & Thùy Linh
						</h3>
						<span className="block text-[0.38rem] tracking-[0.2em] text-neutral-400 uppercase">
							WELCOME TO OUR WEDDING
						</span>
					</div>

					{/* Middle Grid: 2x2 Portrait Images */}
					<div className="grid grid-cols-2 gap-1.5 flex-1 my-1 standee-item">
						<div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs">
							<Image
								alt="Ảnh cưới dọc mẫu 1"
								src="/images/wedding/studio-han-quoc/1.webp"
								fill
								className="object-cover"
								sizes="150px"
							/>
						</div>
						<div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs">
							<Image
								alt="Ảnh cưới dọc mẫu 2"
								src="/images/wedding/studio-han-quoc/2.webp"
								fill
								className="object-cover"
								sizes="150px"
							/>
						</div>
						<div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs">
							<Image
								alt="Ảnh cưới dọc mẫu 3"
								src="/images/wedding/studio-han-quoc/3.webp"
								fill
								className="object-cover"
								sizes="150px"
							/>
						</div>
						<div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs">
							<Image
								alt="Ảnh cưới dọc mẫu 4"
								src="/images/wedding/studio-han-quoc/4.webp"
								fill
								className="object-cover"
								sizes="150px"
							/>
						</div>
					</div>

					{/* Bottom Typography Section */}
					<div className="text-center pt-3 standee-item">
						<p className="font-serif italic text-neutral-400 text-[0.62rem] sm:text-[0.72rem] leading-none">
							Welcome to our
						</p>
						<h4 className="font-serif text-xs tracking-[0.2em] text-neutral-800 uppercase font-medium mt-0.5">
							Story
						</h4>
						<p className="text-[0.34rem] tracking-[0.25em] text-amber-700/60 uppercase font-bold mt-0.5">
							Harmony Wedding
						</p>
					</div>
				</div>
			</div>

			{/* Metal Roll-up Base */}
			<div className="h-3.5 bg-linear-to-r from-neutral-400 via-neutral-300 to-neutral-500 w-full rounded-t-xs shadow-md relative z-20 -mt-0.5" />
			{/* Base Feet (2 small black legs pointing forward) */}
			<div className="flex justify-between px-10 relative z-0 -mt-1">
				<div className="w-12 h-1.5 bg-neutral-800 rounded-b-md shadow-sm transform -skew-x-12" />
				<div className="w-12 h-1.5 bg-neutral-800 rounded-b-md shadow-sm transform skew-x-12" />
			</div>
		</div>
	);
}
