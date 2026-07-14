"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	CalendarClock,
	Gift,
	Mail,
	MessageCircle,
	PhoneCall,
	Smartphone,
	Timer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { siteConfig } from "@/lib/config";
import {
	trackContactChannel,
	trackEvent,
	trackFormSubmission,
} from "@/lib/tracking";

if (typeof window !== "undefined") {
	gsap.registerPlugin(useGSAP, ScrollTrigger);
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

const FAQS = [
	{
		q: "Standee có giá đỡ chân đứng đi kèm không?",
		a: "Có, sản phẩm standee được làm từ chất liệu composite cao cấp bền đẹp, đi kèm giá đỡ ba chân chắc chắn và tinh tế, giúp trưng bày hoàn hảo tại sảnh đón tiệc cưới.",
	},
	{
		q: "Tôi có được chọn bức ảnh in standee theo ý thích không?",
		a: "Có, hai bạn hoàn toàn tự do lựa chọn bức ảnh ưng ý nhất trong toàn bộ album ảnh cưới đã chỉnh sửa của mình. Ekip thiết kế của Harmony sẽ tiến hành dàn trang, chèn text chúc mừng (tên dâu rể + ngày cưới) theo mẫu thiết kế riêng trước khi in.",
	},
	{
		q: "Nếu tôi đặt cọc bây giờ nhưng 2-3 tháng sau mới chụp thì sao?",
		a: "Chương trình này hỗ trợ tối đa cho các cặp đôi. Bạn chỉ cần liên hệ cọc giữ ưu đãi trong tháng này để nhận suất quà tặng. Lịch chụp thực tế có thể linh hoạt sắp xếp vào thời gian sau (lên tới 6 tháng kể từ thời điểm cọc).",
	},
	{
		q: "Có tốn thêm chi phí thiết kế hay gia công standee không?",
		a: "Gói quà tặng đã bao gồm trọn gói chi phí thiết kế chữ nghệ thuật, chỉnh màu sắc theo mong muốn, chi phí in ấn công nghệ cao chống trầy xước và chân gỗ đi kèm. Bạn hoàn toàn không cần chi trả thêm bất kỳ chi phí phát sinh nào.",
	},
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

	// Countdown timer — client-only to prevent SSR/client hydration mismatch
	const calculateTimeLeft = () => {
		const targetDate = new Date("2026-07-31T23:59:59+07:00").getTime();
		const difference = targetDate - Date.now();
		if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		return {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	};

	// null on server → real value after mount (avoids hydration mismatch)
	const [timeLeft, setTimeLeft] = useState<{
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	} | null>(null);

	useEffect(() => {
		setTimeLeft(calculateTimeLeft());
		const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
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
	const [submitStatus, setSubmitStatus] = useState<
		"idle" | "success" | "error"
	>("idle");
	const [errors, setErrors] = useState<
		Partial<Record<keyof LeadFormData, string>>
	>({});

	const handleFormChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
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
			newErrors.phone =
				"Số điện thoại chưa đúng định dạng (ví dụ: 0357256845).";
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

	const pageContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			if (prefersReducedMotion) {
				gsap.set(
					[
						".hero-badge-anim",
						".hero-desc-anim",
						".hero-ctas-anim",
						".hero-urgency-anim",
						".promo-header",
						".promo-card",
						".countdown-banner",
						".faq-section-header",
						".faq-item-card",
						".form-header",
						".form-container-card",
					],
					{ opacity: 1 },
				);
				gsap.set(".hero-title-line", { yPercent: 0 });
				return;
			}

			// Create master animation timeline
			const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

			// 1. Hero Badge scale + fade-in
			tl.fromTo(
				".hero-badge-anim",
				{ scale: 0.8, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" },
			);

			// 2. Hero Title reveal line-by-line
			tl.fromTo(
				".hero-title-line",
				{ yPercent: 105 },
				{ yPercent: 0, duration: 1.2, stagger: 0.15 },
				"-=0.9",
			);

			// 3. Hero Description, CTA Buttons, Urgency Tag
			tl.fromTo(
				[".hero-desc-anim", ".hero-ctas-anim", ".hero-urgency-anim"],
				{ y: 15, opacity: 0 },
				{ y: 0, opacity: 1, duration: 1, stagger: 0.12 },
				"-=0.8",
			);

			// 4. Scroll reveals for other sections
			// Section 2: Promo Detail Cards
			gsap.fromTo(
				".promo-header",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.85,
					ease: "power2.out",
					scrollTrigger: {
						trigger: ".promo-section",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			gsap.fromTo(
				".promo-card",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					stagger: 0.15,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".promo-cards-container",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			// Countdown Timer Banner
			gsap.fromTo(
				".countdown-banner",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.95,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".countdown-banner",
						start: "top 85%",
						toggleActions: "play none none none",
					},
				},
			);

			// Section 3: FAQ Grid
			gsap.fromTo(
				".faq-section-header",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.85,
					ease: "power2.out",
					scrollTrigger: {
						trigger: ".faq-section",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			gsap.fromTo(
				".faq-item-card",
				{ y: 25, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.85,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".faq-grid-container",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			// Section 4: Form
			gsap.fromTo(
				".form-header",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.85,
					ease: "power2.out",
					scrollTrigger: {
						trigger: ".form-section",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);

			gsap.fromTo(
				".form-container-card",
				{ y: 35, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".form-container-card",
						start: "top 80%",
						toggleActions: "play none none none",
					},
				},
			);
		},
		{ scope: pageContainerRef },
	);

	return (
		<div className="relative" ref={pageContainerRef}>
			{/* Color Mesh Background */}
			<MeshGradient variant="light" className="opacity-75" />

			{/* Simplified Landing Header */}
			<header className="fixed top-0 left-0 right-0 z-50 border-b border-black/[0.03] bg-white/40 backdrop-blur-md select-none">
				<div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between md:px-10">
					{/* Small Logo branding */}
					<Link
						aria-label="Harmony Wedding"
						className="relative block h-7 w-[124px] md:h-9 md:w-[158px] hover:opacity-80 transition-opacity"
						href="/"
					>
						<Image
							alt="Harmony Wedding - Studio ảnh cưới"
							className="object-contain object-left"
							fill
							priority
							sizes="(min-width: 768px) 158px, 124px"
							src="/logo.png"
						/>
					</Link>
					{/* Primary single Action */}
					<GlassButton
						variant="dark"
						className="!py-2 !px-5 text-[0.62rem] tracking-wider btn-shimmer-glow"
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
			<section className="pt-28 pb-16 md:pt-36 md:pb-24 px-5 hero-section">
				<div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start md:px-10">
					{/* Copy Column */}
					<div className="text-left">
						<span className="inline-block mb-4 rounded-full bg-amber-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-amber-950 hero-badge-anim opacity-0">
							Quà tặng đặc biệt tháng này
						</span>
						<h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.18] text-neutral-900 tracking-tight">
							<span className="block overflow-hidden pb-1">
								<span className="hero-title-line block">
									Đặt Lịch Chụp Cưới
								</span>
							</span>
							<span className="block overflow-hidden pb-1">
								<span className="hero-title-line block text-amber-700 font-medium">
									Tặng Ngay Standee
								</span>
							</span>
						</h1>
						<p className="mt-6 text-sm md:text-base leading-8 text-neutral-500 font-light max-w-xl hero-desc-anim opacity-0">
							Món quà kỷ niệm tinh tế trưng bày bàn gallery tiệc cưới và góc nhỏ
							gia đình. Harmony dành tặng ngay 01 Standee thiết kế cao cấp cho
							tất cả các cặp đôi đặt gói chụp pre-wedding trong thời gian ưu đãi
							này.
						</p>

						<div className="mt-8 flex flex-col sm:flex-row gap-4 hero-ctas-anim opacity-0">
							<GlassButton
								variant="dark"
								className="w-full sm:w-auto !py-3.5 !px-8 text-xs text-center font-bold tracking-widest btn-shimmer-glow"
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
						<div className="mt-6 flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-wider text-neutral-400 hero-urgency-anim opacity-0">
							<span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
							Số lượng quà tặng giới hạn: Chỉ còn 8 suất trống
						</div>
					</div>

					{/* Image Column: Coded Interactive Standee Mockup */}
					<div className="relative flex justify-center items-center">
						<WeddingStandee />
					</div>
				</div>
			</section>

			{/* 2. EXPLANATION OF PROMO */}
			<section className="py-16 bg-white/30 backdrop-blur-xs border-y border-black/[0.03] px-5 promo-section">
				<div className="mx-auto max-w-7xl md:px-10">
					<div className="text-center max-w-2xl mx-auto mb-12 promo-header opacity-0">
						<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight">
							Chi Tiết Chương Trình Quà Tặng
						</h2>
						<p className="mt-3 text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-widest">
							Dành riêng cho dâu rể đăng ký sớm
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto promo-cards-container">
						<GlassCard
							variant="light"
							intensity="medium"
							className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs promo-card opacity-0"
						>
							<div className="size-10 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-6">
								<Gift className="size-5" strokeWidth={1.75} />
							</div>
							<h3 className="font-serif text-lg text-neutral-900 mb-3">
								Gói Chụp Áp Dụng
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light">
								Ưu đãi áp dụng khi đặt bất cứ gói chụp ảnh cưới{" "}
								<strong>Studio, Phim trường hoặc Ngoại cảnh</strong> nào tại
								Harmony (bao gồm các concept thiết kế đa dạng và điểm chụp nổi
								tiếng).
							</p>
						</GlassCard>

						<GlassCard
							variant="light"
							intensity="medium"
							className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs promo-card opacity-0"
						>
							<div className="size-10 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center mb-6">
								<CalendarClock className="size-5" strokeWidth={1.75} />
							</div>
							<h3 className="font-serif text-lg text-neutral-900 mb-3">
								Thời Hạn Đăng Ký
							</h3>
							<p className="text-xs leading-6 text-neutral-500 font-light">
								Chương trình áp dụng cho khách hàng đăng ký tư vấn và cọc giữ ưu
								đãi từ nay đến hết ngày <strong>31/07/2026</strong>. Bạn có thể
								chụp hình sau, chỉ cần đặt cọc giữ ưu đãi trong hạn.
							</p>
						</GlassCard>
					</div>

					{/* 3. countdown timer banner */}
					<div className="mt-14 max-w-3xl mx-auto countdown-banner opacity-0">
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 md:p-8 rounded-3xl border border-white/10 text-center shadow-lg relative overflow-hidden"
						>
							<div className="absolute inset-0 bg-radial-gradient(circle, rgba(180, 120, 50, 0.15) 0%, rgba(0, 0, 0, 0) 70%) pointer-events-none" />
							<h4 className="relative z-10 text-[0.62rem] font-bold tracking-[0.25em] uppercase text-amber-400 mb-4">
								Thời hạn nhận ưu đãi còn lại
							</h4>
							<div className="relative z-10 flex justify-center items-center gap-2 sm:gap-4 md:gap-8 text-white select-none">
								<div className="flex flex-col items-center min-w-16">
									<span
										key={timeLeft?.days}
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{timeLeft ? String(timeLeft.days).padStart(2, "0") : "--"}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">
										Ngày
									</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">
									:
								</span>
								<div className="flex flex-col items-center min-w-16">
									<span
										key={timeLeft?.hours}
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{timeLeft ? String(timeLeft.hours).padStart(2, "0") : "--"}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">
										Giờ
									</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">
									:
								</span>
								<div className="flex flex-col items-center min-w-16">
									<span
										key={timeLeft?.minutes}
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{timeLeft
											? String(timeLeft.minutes).padStart(2, "0")
											: "--"}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">
										Phút
									</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">
									:
								</span>
								<div className="flex flex-col items-center min-w-16">
									<span
										key={timeLeft?.seconds}
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{timeLeft
											? String(timeLeft.seconds).padStart(2, "0")
											: "--"}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">
										Giây
									</span>
								</div>
							</div>
						</GlassCard>
					</div>
				</div>
			</section>

			{/* 6. FAQ SECTION */}
			<section className="py-20 px-5 faq-section">
				<div className="mx-auto max-w-[1200px] md:px-10">
					<div className="text-center mb-12 faq-section-header opacity-0">
						<h2 className="font-serif text-3xl text-neutral-900 tracking-tight">
							Câu Hỏi Thường Gặp
						</h2>
						<p className="mt-2 text-xs text-neutral-400 font-bold uppercase tracking-widest">
							FAQ về ưu đãi standee ảnh cưới
						</p>
					</div>

					<div className="grid gap-6 lg:grid-cols-2 items-start faq-grid-container">
						{/* Column 1: FAQ 1 & 2 */}
						<div className="space-y-4">
							{FAQS.slice(0, 2).map((item, idx) => {
								const globalIdx = idx;
								const isOpen = activeFaq === globalIdx;
								return (
									<GlassCard
										key={globalIdx}
										variant="light"
										intensity="low"
										className="rounded-xl border-white/30 faq-item-card overflow-hidden"
									>
										<button
											onClick={() => toggleFaq(globalIdx)}
											className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
											type="button"
										>
											<span className="text-[0.88rem] sm:text-[0.92rem] leading-6 font-medium pr-4">
												{item.q}
											</span>
											<svg
												className={`size-4 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-600" : ""}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>

										<div
											className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
										>
											<div className="overflow-hidden">
												<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
													{item.a}
												</div>
											</div>
										</div>
									</GlassCard>
								);
							})}
						</div>

						{/* Column 2: FAQ 3 & 4 */}
						<div className="space-y-4">
							{FAQS.slice(2, 4).map((item, idx) => {
								const globalIdx = idx + 2;
								const isOpen = activeFaq === globalIdx;
								return (
									<GlassCard
										key={globalIdx}
										variant="light"
										intensity="low"
										className="rounded-xl border-white/30 faq-item-card overflow-hidden"
									>
										<button
											onClick={() => toggleFaq(globalIdx)}
											className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
											type="button"
										>
											<span className="text-[0.88rem] sm:text-[0.92rem] leading-6 font-medium pr-4">
												{item.q}
											</span>
											<svg
												className={`size-4 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-600" : ""}`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</button>

										<div
											className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
										>
											<div className="overflow-hidden">
												<div className="px-6 pb-5 pt-1 text-xs leading-6 text-neutral-500 font-light border-t border-black/[0.03]">
													{item.a}
												</div>
											</div>
										</div>
									</GlassCard>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			{/* 7. Direct Contact Section (CTA Cuối Trang) */}
			<section
				ref={formRef}
				className="py-20 bg-neutral-900 text-white relative px-5 form-section"
			>
				<div className="absolute inset-0 bg-radial-gradient(circle, rgba(180, 120, 50, 0.1) 0%, rgba(0, 0, 0, 0) 70%) pointer-events-none" />
				<div className="mx-auto max-w-5xl relative z-10">
					<div className="text-center max-w-2xl mx-auto mb-12 form-header opacity-0">
						<h2 className="font-serif text-3xl md:text-4xl tracking-tight text-white">
							Liên Hệ Đăng Ký Ngay
						</h2>
						<p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-amber-500">
							Giữ suất quà tặng Standee & Nhận tư vấn chi tiết
						</p>
						<p className="mt-4 text-xs leading-6 text-white/50 font-light">
							Chỉ còn 8 suất ưu đãi cuối cùng áp dụng cho cặp đôi hoàn thành đặt
							cọc trước ngày 31/07/2026. Chọn kênh liên hệ tiện lợi nhất dưới
							đây để kết nối trực tiếp với ekip.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch form-container-card opacity-0">
						{/* Messenger */}
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 rounded-2xl flex flex-col justify-between border-white/10 hover:border-amber-500/30 transition-colors group"
						>
							<div>
								<div className="size-10 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center mb-5">
									<MessageCircle
										className="size-5 group-hover:scale-110 transition-transform duration-300"
										strokeWidth={1.75}
									/>
								</div>
								<h3 className="font-serif text-base text-white mb-2">
									Messenger
								</h3>
								<p className="text-[0.7rem] leading-5 text-white/50 font-light mb-6">
									Nhận báo giá chi tiết các gói chụp và đăng ký giữ quà tặng
									nhanh nhất.
								</p>
							</div>
							<GlassButton
								variant="gold"
								href={messengerUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full !py-2.5 text-[0.65rem] text-center font-bold tracking-wider btn-shimmer-glow"
								onClick={() => trackContactChannel("Messenger", messengerUrl)}
							>
								Chat Messenger
							</GlassButton>
						</GlassCard>

						{/* Zalo */}
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 rounded-2xl flex flex-col justify-between border-white/10 hover:border-amber-500/30 transition-colors group"
						>
							<div>
								<div className="size-10 bg-teal-500/20 text-teal-300 rounded-full flex items-center justify-center mb-5">
									<Smartphone
										className="size-5 group-hover:animate-bounce"
										strokeWidth={1.75}
									/>
								</div>
								<h3 className="font-serif text-base text-white mb-2">
									Zalo Chat
								</h3>
								<p className="text-[0.7rem] leading-5 text-white/50 font-light mb-6">
									Tư vấn chi tiết và gửi mẫu ảnh cổng, mẫu standee thực tế cho
									dâu rể.
								</p>
							</div>
							<GlassButton
								variant="gold"
								href={zaloUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="w-full !py-2.5 text-[0.65rem] text-center font-bold tracking-wider btn-shimmer-glow"
								onClick={() => trackContactChannel("Zalo", zaloUrl)}
							>
								Chat Zalo
							</GlassButton>
						</GlassCard>

						{/* Hotline */}
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 rounded-2xl flex flex-col justify-between border-white/10 hover:border-amber-500/30 transition-colors group"
						>
							<div>
								<div className="size-10 bg-amber-500/15 text-amber-400 rounded-full flex items-center justify-center mb-5">
									<PhoneCall className="size-5 icon-ring" strokeWidth={1.75} />
								</div>
								<h3 className="font-serif text-base text-white mb-2">
									Hotline 24/7
								</h3>
								<p className="text-[0.7rem] leading-5 text-white/50 font-light mb-6">
									Gọi điện trực tiếp để được hỗ trợ cọc giữ suất ưu đãi standee
									nhanh chóng.
								</p>
							</div>
							<GlassButton
								variant="light"
								href={`tel:${siteConfig.links.phone}`}
								className="w-full !py-2.5 text-[0.65rem] text-center font-bold tracking-wider border-white/10 text-white hover:text-black btn-shimmer-glow"
								onClick={() =>
									trackContactChannel(
										"Hotline",
										`tel:${siteConfig.links.phone}`,
									)
								}
							>
								Gọi Hotline
							</GlassButton>
						</GlassCard>

						{/* Email */}
						<GlassCard
							variant="dark"
							intensity="high"
							className="p-6 rounded-2xl flex flex-col justify-between border-white/10 hover:border-amber-500/30 transition-colors group"
						>
							<div>
								<div className="size-10 bg-rose-500/15 text-rose-400 rounded-full flex items-center justify-center mb-5">
									<Mail
										className="size-5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-transform duration-300"
										strokeWidth={1.75}
									/>
								</div>
								<h3 className="font-serif text-base text-white mb-2">Email</h3>
								<p className="text-[0.7rem] leading-5 text-white/50 font-light mb-6">
									Gửi yêu cầu thiết kế riêng hoặc hợp tác truyền thông với
									Harmony.
								</p>
							</div>
							<GlassButton
								variant="light"
								href={`mailto:${siteConfig.contactInfo.email}`}
								className="w-full !py-2.5 text-[0.65rem] text-center font-bold tracking-wider border-white/10 text-white hover:text-black btn-shimmer-glow"
								onClick={() =>
									trackContactChannel(
										"Email",
										`mailto:${siteConfig.contactInfo.email}`,
									)
								}
							>
								Gửi Email
							</GlassButton>
						</GlassCard>
					</div>
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
							Hotline tư vấn:{" "}
							<strong className="text-white">
								{siteConfig.contactInfo.hotline}
							</strong>
						</p>
						<p>© 2026 Harmony Wedding. Chân thành & Trọn vẹn.</p>
					</div>
				</div>
			</footer>

			{/* Inject micro-animations via standard CSS */}
			<style
				dangerouslySetInnerHTML={{
					__html: `
				@keyframes number-change {
					0% { transform: scale(0.85); opacity: 0.7; }
					50% { transform: scale(1.06); }
					100% { transform: scale(1); opacity: 1; }
				}
				.animate-number-change {
					animation: number-change 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}

				@keyframes phone-ring {
					0%, 100% { transform: rotate(0deg); }
					15% { transform: rotate(-18deg); }
					30% { transform: rotate(18deg); }
					45% { transform: rotate(-14deg); }
					60% { transform: rotate(14deg); }
					75% { transform: rotate(-8deg); }
					90% { transform: rotate(8deg); }
				}
				.icon-ring {
					animation: phone-ring 2.4s ease-in-out infinite;
					transform-origin: bottom left;
				}
				.icon-ring:hover { animation-play-state: paused; }

				.btn-shimmer-glow {
					position: relative;
					overflow: hidden;
					transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
				}
				.btn-shimmer-glow:hover {
					transform: translateY(-2.5px) scale(1.02);
					box-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
				}
				.btn-shimmer-glow:active {
					transform: translateY(0) scale(0.98);
				}

				@keyframes success-pop {
					0% { transform: scale(0); opacity: 0; }
					70% { transform: scale(1.2); }
					100% { transform: scale(1); opacity: 1; }
				}
				.animate-success-icon {
				animation: success-pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
			}

				@keyframes starburst-spin {
					from { transform: rotate(0deg); }
					to   { transform: rotate(360deg); }
				}
				.starburst-badge svg {
					animation: starburst-spin 18s linear infinite;
				}
			`,
				}}
			/>
		</div>
	);
}

function WeddingStandee() {
	const standeeRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;
			if (prefersReducedMotion) {
				gsap.set(wrapperRef.current, { height: "auto", opacity: 1 });
				gsap.set(".standee-item", { opacity: 1, y: 0 });
				return;
			}

			const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

			// 1. Roll up animation: animate height from 0 to auto
			tl.fromTo(
				wrapperRef.current,
				{ height: 0, opacity: 0.8 },
				{ height: "auto", opacity: 1, duration: 2.2, delay: 0.5 },
			);

			// 2. Staggered fade in of the items inside the standee
			tl.fromTo(
				".standee-item",
				{ opacity: 0, y: 15 },
				{ opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power2.out" },
				"-=1.6", // overlaps with the height reveal
			);

			// 3. Subtle floating sway loop on wrapperRef after entrance finishes
			tl.to(wrapperRef.current, {
				y: -6,
				rotation: 0.35,
				duration: 3,
				ease: "sine.inOut",
				repeat: -1,
				yoyo: true,
			});
		},
		{ scope: standeeRef },
	);

	return (
		<div
			ref={standeeRef}
			className="relative mx-auto max-w-[320px] sm:max-w-[350px] w-full pb-8 select-none"
		>
			{/* Redesigned Premium Starburst discount badge — moves with standee sway */}
			<div className="absolute -right-6 sm:-right-8 top-[18%] z-40 starburst-badge select-none pointer-events-none">
				<div className="relative size-[92px] sm:size-[108px] flex items-center justify-center">
					{/* 24-point premium starburst SVG background with golden border */}
					<svg
						viewBox="0 0 100 100"
						className="absolute inset-0 size-full drop-shadow-2xl"
						aria-hidden
					>
						<polygon
							points="50,2 55,10 62,5 65,14 72,11 74,21 80,20 80,30 86,31 84,41 89,44 86,53 89,58 84,65 86,72 80,77 80,85 73,88 71,96 64,96 61,100 54,99 50,100 46,99 39,100 36,96 29,96 27,88 20,85 20,77 14,72 16,65 11,58 14,53 11,44 16,41 14,31 20,30 20,20 27,21 28,11 35,14 38,5 45,10"
							fill="#000000"
							stroke="#d97706"
							strokeWidth="2.2"
							strokeLinejoin="miter"
						/>
					</svg>
					{/* Premium text arrangement */}
					<div className="relative z-10 flex flex-col items-center justify-center text-center leading-none gap-[1px]">
						<span className="text-[0.5rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/60">
							Trị giá
						</span>
						<span className="text-[0.75rem] sm:text-[0.9rem] font-bold text-white font-serif tracking-tight my-[2px] drop-shadow-xs">
							1.200.000đ
						</span>
						<div className="h-[1px] w-6 bg-amber-500/30 my-[1px]" />
						<span className="text-[0.65rem] sm:text-[0.75rem] font-black uppercase tracking-widest text-amber-500 font-sans drop-shadow-sm">
							FREE
						</span>
					</div>
				</div>
			</div>
			{/* Canvas Wrapper */}
			<div
				ref={wrapperRef}
				className="overflow-hidden w-[96%] mx-auto relative z-10"
			>
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
