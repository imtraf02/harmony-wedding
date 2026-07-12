"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { Icon } from "@/components/home/icon";
import { siteConfig } from "@/lib/config";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { MeshGradient } from "@/components/ui/mesh-gradient";
import type { ServiceItem, TimelineStep } from "@/types/home";

export interface ServiceDetail {
	title: string;
	description: string;
	image: string;
	alt: string;
	deliverables: string[];
}

interface FaqItem {
	question: string;
	answer: string;
}

export function ServicesPageContent({
	serviceDetails,
	services,
	timelineSteps,
	servicesHeroImage,
	faqs,
}: {
	serviceDetails: ServiceDetail[];
	services: ServiceItem[];
	timelineSteps: TimelineStep[];
	servicesHeroImage: string;
	faqs: FaqItem[];
}) {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

	useScrollReveal(rootRef);

	const toggleFaq = (index: number) => {
		setOpenFaqIndex(openFaqIndex === index ? null : index);
	};

	return (
		<div ref={rootRef}>
			{/* Hero Section */}
			<section className="relative isolate overflow-hidden bg-[#fcfbfc] pt-28 text-black lg:pt-32">
				{/* Ambient Light Mesh Gradient */}
				<MeshGradient variant="light" className="opacity-75" />

				<div className="mx-auto grid max-w-[1720px] gap-12 px-5 pb-16 md:px-10 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:px-16">
					<div>
						<p
							className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500"
							data-reveal
						>
							Dịch vụ
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h1
							className="font-serif text-[clamp(3.4rem,14vw,6rem)] leading-[0.88] lg:text-[clamp(4.4rem,7vw,8rem)]"
							data-reveal
						>
							Trọn Vẹn Cho Ngày Cưới
						</h1>
						<p
							className="mt-8 max-w-xl text-base leading-8 text-neutral-600"
							data-reveal
						>
							Từ album cưới, phim highlight, makeup đến điều phối ngày cưới,
							Harmony xây dựng một trải nghiệm thống nhất về hình ảnh, cảm xúc
							và nhịp câu chuyện.
						</p>
						<div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4" data-reveal>
							<GlassButton
								variant="dark"
								href={`tel:${siteConfig.links.phone}`}
								className="w-full sm:w-auto"
							>
								Tư vấn dịch vụ
							</GlassButton>
							<GlassButton
								variant="light"
								href="/portfolio"
								className="w-full sm:w-auto"
							>
								Xem album
							</GlassButton>
						</div>
					</div>

					{/* Hero Image encapsulated in a GlassCard frame */}
					<div data-reveal className="relative">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative h-[56vh] min-h-[380px] lg:h-[74vh] shadow-lg p-1 rounded-3xl"
						>
							<div className="relative h-full w-full overflow-hidden rounded-2xl">
								<Image
									alt="Cặp đôi trong bộ ảnh cưới ngoại cảnh Harmony Wedding"
									className="object-cover"
									fill
									priority
									sizes="(min-width: 1024px) 58vw, 100vw"
									src={servicesHeroImage}
								/>
							</div>
						</GlassCard>
					</div>
				</div>
			</section>

			{/* Service Icons Bar */}
			<section className="relative isolate overflow-hidden bg-neutral-950 py-6 text-white">
				{/* Dark mesh gradient background */}
				<MeshGradient variant="dark" className="opacity-30" />

				<div className="mx-auto grid max-w-[1720px] gap-4 px-5 sm:grid-cols-2 lg:grid-cols-5 lg:px-16">
					{services.map((service, index) => (
						<article
							className={`flex items-center gap-4 py-3 ${
								index % 5 !== 4 && index !== services.length - 1 ? "lg:border-r lg:border-white/10 lg:pr-6" : ""
							}`}
							data-reveal
							key={service.title}
						>
							<div className="grid size-11 place-items-center rounded-full bg-white/5 text-white/80 border border-white/8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
								<Icon className="size-5" name={service.icon as any} />
							</div>
							<h2 className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white/90">
								{service.title}
							</h2>
						</article>
					))}
				</div>
			</section>

			{/* Detailed Service Grid List */}
			<section className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
				<MeshGradient variant="light" className="opacity-60" />

				<div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
					<div className="mb-16 max-w-3xl" data-reveal>
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
							Chi tiết dịch vụ
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h2 className="font-serif text-[clamp(2.7rem,8vw,5rem)] leading-[0.98]">
							Một ekip, một tinh thần hình ảnh
						</h2>
					</div>

					<div className="grid gap-16 lg:gap-24">
						{serviceDetails.map((service, index) => (
							<article
								className="grid gap-10 items-center lg:grid-cols-[0.46fr_0.54fr]"
								data-reveal
								key={service.title}
							>
								{/* Text side */}
								<div className={`${index % 2 === 1 ? "lg:order-2 lg:pl-8" : "lg:pr-8"}`}>
									<span className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-neutral-400">
										0{index + 1}
									</span>
									<h3 className="mt-4 font-serif text-[clamp(2.2rem,6vw,3.6rem)] leading-none text-black">
										{service.title}
									</h3>
									<p className="mt-6 max-w-xl text-base leading-8 text-neutral-600">
										{service.description}
									</p>
									
									<ul className="mt-8 grid gap-4 text-sm text-neutral-700 sm:grid-cols-2">
										{service.deliverables.map((item) => (
											<li 
												className="flex items-center gap-3 border-b border-black/[0.04] pb-3 text-[0.9rem]" 
												key={item}
											>
												<span className="grid size-5 place-items-center rounded-full bg-neutral-100 text-neutral-600 text-[0.6rem] font-bold">✓</span>
												{item}
											</li>
										))}
									</ul>
								</div>

								{/* Image side wrapped in GlassCard */}
								<div className={index % 2 === 1 ? "lg:order-1" : ""}>
									<GlassCard
										variant="mixed"
										intensity="low"
										borderStrength="low"
										className="relative h-[46vh] min-h-[320px] lg:h-[60vh] shadow-md p-1 rounded-3xl"
									>
										<div className="relative h-full w-full overflow-hidden rounded-2xl">
											<Image
												alt={service.alt}
												className="object-cover"
												fill
												sizes="(min-width: 1024px) 50vw, 100vw"
												src={service.image}
												unoptimized
											/>
										</div>
									</GlassCard>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* Timeline Steps workflow */}
			<section className="relative isolate overflow-hidden bg-neutral-50 py-20 lg:py-28">
				{/* Soft mesh overlay */}
				<MeshGradient variant="light" className="opacity-80" />

				<div className="mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.32fr_0.68fr] lg:px-16">
					<div data-reveal className="lg:sticky lg:top-32 lg:h-fit">
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
							Quy trình
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h2 className="font-serif text-[clamp(2.6rem,7vw,4.8rem)] leading-[1] text-black">
							Làm việc rõ ràng từ đầu đến cuối
						</h2>
						<p className="mt-6 text-sm leading-7 text-neutral-600">
							Chúng tôi đồng hành chặt chẽ cùng bạn qua từng giai đoạn nhằm đạt được hiệu quả nghệ thuật cao nhất.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{timelineSteps.map((step, index) => (
							<GlassCard
								key={step.title}
								variant="light"
								intensity="low"
								borderStrength="low"
								hoverable
								className="p-8 border border-white/40 shadow-xs hover:shadow-md rounded-2xl flex flex-col justify-between"
								data-reveal
							>
								<div>
									<div className="flex items-center justify-between">
										<GlassCard
											variant="light"
											intensity="high"
											borderStrength="medium"
											className="grid size-12 place-items-center rounded-full border border-white/50 text-neutral-800 shadow-xs"
										>
											<Icon className="size-6" name={step.icon as any} />
										</GlassCard>
										<span className="font-serif text-lg leading-none text-neutral-400 font-bold">
											0{index + 1}
										</span>
									</div>
									<h3 className="mt-8 text-[0.76rem] font-bold uppercase tracking-[0.22em] text-black">
										{step.title}
									</h3>
									<p className="mt-4 text-[0.92rem] leading-7 text-neutral-600">
										{step.description}
									</p>
								</div>
							</GlassCard>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Section styled inside a Glass Board */}
			{faqs && faqs.length > 0 && (
				<section className="relative isolate overflow-hidden bg-white py-20 lg:py-28">
					<MeshGradient variant="light" className="opacity-70" />

					<div className="mx-auto max-w-[960px] px-5 md:px-10">
						<div className="mb-14 text-center" data-reveal>
							<p className="mb-4 flex items-center justify-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
								Hỏi đáp
								<span className="h-px w-8 bg-neutral-300" />
							</p>
							<h2 className="font-serif text-[clamp(2.2rem,6vw,3.6rem)] leading-none text-black">
								Những Câu Hỏi Thường Gặp
							</h2>
						</div>

						<GlassCard
							variant="light"
							intensity="medium"
							borderStrength="medium"
							className="border border-white/30 shadow-lg rounded-3xl p-6 md:p-10 divide-y divide-black/[0.04]"
							data-reveal
						>
							{faqs.map((item, index) => {
								const isOpen = openFaqIndex === index;
								return (
									<article
										className={`py-5 first:pt-0 last:pb-0`}
										key={item.question}
									>
										<button
											aria-expanded={isOpen}
											className="flex w-full items-center justify-between py-2 text-left focus:outline-none group cursor-pointer"
											onClick={() => toggleFaq(index)}
											type="button"
										>
											<h3 className="font-serif text-[1.12rem] font-medium text-neutral-900 md:text-[1.2rem] transition-colors group-hover:text-amber-700">
												{item.question}
											</h3>
											<span
												className={`grid size-8 place-items-center rounded-full border border-black/5 bg-black/5 text-sm transition-transform duration-300 ${
													isOpen ? "rotate-45 bg-black text-white" : "text-black group-hover:bg-black/10"
												}`}
											>
												＋
											</span>
										</button>
										<div
											className={`grid transition-all duration-300 ease-in-out ${
												isOpen
													? "grid-rows-[1fr] opacity-100 mt-4"
													: "grid-rows-[0fr] opacity-0 mt-0"
											}`}
										>
											<div className="overflow-hidden">
												<p className="pb-2 text-[0.95rem] leading-7 text-neutral-600 pl-2 border-l-2 border-amber-500/30">
													{item.answer}
												</p>
											</div>
										</div>
									</article>
								);
							})}
						</GlassCard>
					</div>
				</section>
			)}
		</div>
	);
}
