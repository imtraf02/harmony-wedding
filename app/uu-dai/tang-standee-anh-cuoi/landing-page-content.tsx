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
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
		a: "Có, sản phẩm standee được làm từ chất liệu composite cao cấp bền đẹp, đi kèm giá đỡ ba chân bằng gỗ mộc tự nhiên chắc chắn và tinh tế, giúp trưng bày hoàn hảo tại sảnh đón tiệc cưới."
	},
	{
		q: "Tôi có được chọn bức ảnh in standee theo ý thích không?",
		a: "Có, hai bạn hoàn toàn tự do lựa chọn bức ảnh ưng ý nhất trong toàn bộ album ảnh cưới đã chỉnh sửa của mình. Ekip thiết kế của Harmony sẽ tiến hành dàn trang, chèn text chúc mừng (tên dâu rể + ngày cưới) theo mẫu thiết kế riêng trước khi in."
	},
	{
		q: "Nếu tôi đặt cọc bây giờ nhưng 2-3 tháng sau mới chụp thì sao?",
		a: "Chương trình này hỗ trợ tối đa cho các cặp đôi. Bạn chỉ cần liên hệ cọc giữ ưu đãi trong tháng này để nhận suất quà tặng. Lịch chụp thực tế có thể linh hoạt sắp xếp vào thời gian sau (lên tới 6 tháng kể từ thời điểm cọc)."
	},
	{
		q: "Có tốn thêm chi phí thiết kế hay gia công standee không?",
		a: "Gói quà tặng đã bao gồm trọn gói chi phí thiết kế chữ nghệ thuật, chỉnh màu sắc theo mong muốn, chi phí in ấn công nghệ cao chống trầy xước và chân gỗ đi kèm. Bạn hoàn toàn không cần chi trả thêm bất kỳ chi phí phát sinh nào."
	}
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

	const pageContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) {
			gsap.set([
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
				".form-container-card"
			], { opacity: 1 });
			gsap.set(".hero-title-line", { yPercent: 0 });
			return;
		}

		// Create master animation timeline
		const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

		// 1. Hero Badge scale + fade-in
		tl.fromTo(
			".hero-badge-anim",
			{ scale: 0.8, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)" }
		);

		// 2. Hero Title reveal line-by-line
		tl.fromTo(
			".hero-title-line",
			{ yPercent: 105 },
			{ yPercent: 0, duration: 1.2, stagger: 0.15 },
			"-=0.9"
		);

		// 3. Hero Description, CTA Buttons, Urgency Tag
		tl.fromTo(
			[".hero-desc-anim", ".hero-ctas-anim", ".hero-urgency-anim"],
			{ y: 15, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, stagger: 0.12 },
			"-=0.8"
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
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
					toggleActions: "play none none none"
				}
			}
		);
	}, { scope: pageContainerRef });

	return (
		<div className="relative" ref={pageContainerRef}>
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
				<div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center md:px-10">
					{/* Copy Column */}
					<div className="text-left">
						<span className="inline-block mb-4 rounded-full bg-amber-500/10 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-amber-950 hero-badge-anim opacity-0">
							Quà tặng đặc biệt tháng này
						</span>
						<h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.08] text-neutral-900 tracking-tight">
							<span className="block overflow-hidden pb-1">
								<span className="hero-title-line block">Đặt Lịch Chụp Cưới</span>
							</span>
							<span className="block overflow-hidden pb-1">
								<span className="hero-title-line block text-amber-700 font-medium">Tặng Ngay Standee</span>
							</span>
						</h1>
						<p className="mt-6 text-sm md:text-base leading-8 text-neutral-500 font-light max-w-xl hero-desc-anim opacity-0">
							Món quà kỷ niệm tinh tế trưng bày bàn gallery tiệc cưới và góc nhỏ gia đình.
							Harmony dành tặng ngay 01 Standee thiết kế cao cấp cho tất cả các cặp đôi đặt gói
							chụp pre-wedding trong thời gian ưu đãi này.
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

					<div className="grid gap-8 md:grid-cols-3 promo-cards-container">
						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs promo-card opacity-0">
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

						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs promo-card opacity-0">
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

						<GlassCard variant="light" intensity="medium" className="p-6 sm:p-8 rounded-2xl text-left border-white/40 shadow-xs promo-card opacity-0">
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
										key={timeLeft.days} 
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{String(timeLeft.days).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Ngày</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center min-w-16">
									<span 
										key={timeLeft.hours} 
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{String(timeLeft.hours).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Giờ</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center min-w-16">
									<span 
										key={timeLeft.minutes} 
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{String(timeLeft.minutes).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Phút</span>
								</div>
								<span className="text-xl md:text-3xl text-white/30 font-serif leading-none">:</span>
								<div className="flex flex-col items-center min-w-16">
									<span 
										key={timeLeft.seconds} 
										className="font-serif text-xl sm:text-2xl md:text-4xl font-bold tracking-tight inline-block animate-number-change"
									>
										{String(timeLeft.seconds).padStart(2, "0")}
									</span>
									<span className="text-[0.55rem] uppercase tracking-wider text-white/50 mt-1">Giây</span>
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
									<GlassCard key={globalIdx} variant="light" intensity="low" className="rounded-xl border-white/30 faq-item-card overflow-hidden">
										<button
											onClick={() => toggleFaq(globalIdx)}
											className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
											type="button"
										>
											<span className="text-[0.88rem] sm:text-[0.92rem] leading-6 font-medium pr-4">{item.q}</span>
											<svg className={`size-4 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-600" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										
										<div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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
									<GlassCard key={globalIdx} variant="light" intensity="low" className="rounded-xl border-white/30 faq-item-card overflow-hidden">
										<button
											onClick={() => toggleFaq(globalIdx)}
											className="w-full text-left px-6 py-4 flex items-center justify-between text-neutral-900 font-serif text-base focus:outline-hidden cursor-pointer"
											type="button"
										>
											<span className="text-[0.88rem] sm:text-[0.92rem] leading-6 font-medium pr-4">{item.q}</span>
											<svg className={`size-4 text-neutral-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-600" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										
										<div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
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

			{/* 7. Lead Form Section (CTA Cuối Trang) */}
			<section ref={formRef} className="py-20 bg-neutral-900 text-white relative px-5 form-section">
				<div className="absolute inset-0 bg-radial-gradient(circle, rgba(180, 120, 50, 0.1) 0%, rgba(0, 0, 0, 0) 70%) pointer-events-none" />
				<div className="mx-auto max-w-3xl relative z-10">
					<div className="text-center max-w-2xl mx-auto mb-10 form-header opacity-0">
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
						<div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-md animate-success-card">
							<div className="size-14 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 text-2xl font-bold animate-success-icon">
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
									className="!py-3 !px-8 text-xs w-full sm:w-auto text-center btn-shimmer-glow"
									onClick={() => trackContactChannel("Zalo", zaloUrl)}
								>
									Liên Hệ Qua Zalo
								</GlassButton>
								<GlassButton
									variant="light"
									href={messengerUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="!py-3 !px-8 text-xs w-full sm:w-auto text-center border-white/20 text-white hover:text-black btn-shimmer-glow"
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
							className="p-6 sm:p-8 md:p-10 border-white/10 rounded-3xl form-container-card opacity-0"
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
										className="w-full !py-3.5 text-xs rounded-xl flex items-center justify-center gap-2 tracking-widest btn-shimmer-glow"
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

			{/* Inject micro-animations via standard CSS */}
			<style dangerouslySetInnerHTML={{ __html: `
				@keyframes number-change {
					0% { transform: scale(0.85); opacity: 0.7; }
					50% { transform: scale(1.06); }
					100% { transform: scale(1); opacity: 1; }
				}
				.animate-number-change {
					animation: number-change 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
				}
				
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
			`}} />
		</div>
	);
}

function WeddingStandee() {
	const standeeRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
			{ height: "auto", opacity: 1, duration: 2.2, delay: 0.5 }
		);

		// 2. Staggered fade in of the items inside the standee
		tl.fromTo(
			".standee-item",
			{ opacity: 0, y: 15 },
			{ opacity: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power2.out" },
			"-=1.6" // overlaps with the height reveal
		);

		// 3. Subtle floating sway loop on wrapperRef after entrance finishes
		tl.to(wrapperRef.current, {
			y: -6,
			rotation: 0.35,
			duration: 3,
			ease: "sine.inOut",
			repeat: -1,
			yoyo: true
		});
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
