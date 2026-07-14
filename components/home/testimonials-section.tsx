"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { type TestimonialItem } from "@/types/home";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { trackEvent } from "@/lib/tracking";

export function TestimonialsSection({
	items,
	reelAnGardenImage,
	reelWeddingDayImage,
}: {
	items: TestimonialItem[];
	reelAnGardenImage: string;
	reelWeddingDayImage: string;
}) {
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollReveal(sectionRef);

	return (
		<section
			className="relative isolate overflow-hidden bg-[#faf9f6] py-24 text-black md:py-32"
			ref={sectionRef}
			id="testimonials"
		>
			<div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
				{/* Section Header */}
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-16" data-reveal>
					<div>
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Các cặp đôi nói gì
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h2 className="font-serif text-[clamp(2.45rem,4.5vw,4.8rem)] leading-[1.15] text-neutral-900 tracking-tight">
							Không Phải Quảng Cáo
						</h2>
					</div>
					<div className="md:max-w-md">
						<p className="text-[0.92rem] leading-7 text-neutral-500 font-light">
							Dưới đây là những gì các bạn nhắn lại sau ngày cưới — tụi mình giữ nguyên, không sửa chữ nào.
						</p>
					</div>
				</div>

				{/* Testimonials Grid */}
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{items.map((item) => (
						<article
							key={item.name}
							className="flex flex-col justify-between bg-white border border-black/[0.04] hover:border-black/10 hover:shadow-lg transition-all duration-500 rounded-3xl p-6 sm:p-8"
							data-reveal
						>
							<span className="block font-serif text-4xl leading-none text-neutral-200 mb-2">“</span>
							<blockquote className="font-serif text-[1.08rem] font-light leading-relaxed text-neutral-700 italic mb-6">
								{item.quote}
							</blockquote>

							<div className="mt-4 border-t border-black/[0.05] pt-6 flex items-center justify-between">
								<div>
									<cite className="font-serif text-[1.1rem] not-italic font-medium text-neutral-900 block">
										{item.name}
									</cite>
									<span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-neutral-400">
										{item.role}
									</span>
								</div>
							</div>
						</article>
					))}
				</div>

				{/* Video / Behind the Scenes Sub-Section */}
				<div className="mt-24 pt-20 border-t border-black/[0.05]">
					<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12" data-reveal>
						<div>
							<p className="mb-4 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
								Hình ảnh thực tế
								<span className="h-px w-16 bg-neutral-300" />
							</p>
							<h3 className="font-serif text-2xl md:text-3xl text-neutral-900 tracking-tight">
								Hậu Trường & Cảm Nhận
							</h3>
						</div>
						<div className="md:max-w-xs">
							<p className="text-xs leading-5 text-neutral-500 font-light">
								Không cần đọc review dài — xem thẳng các bạn ấy nói nhé.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto md:max-w-none">
						{/* Reel Card 1 */}
						<Link
							href="https://www.facebook.com/share/r/1Evh8USj1D/"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackEvent("WatchVideo", { url: "https://www.facebook.com/share/r/1Evh8USj1D/", title: "Phỏng vấn dâu rể Đà Lạt" })}
							className="group relative flex aspect-[3/4] w-full max-w-[340px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900 shadow-lg sm:shadow-xl"
							data-reveal
						>
							<Image
								src={reelAnGardenImage}
								alt="Hậu trường chụp cưới An Garden - Harmony Wedding"
								fill
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] brightness-75 group-hover:brightness-[0.82]"
								sizes="(min-width: 640px) 50vw, 100vw"
								quality={90}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20 pointer-events-none" />
							<div className="absolute top-2 left-2 sm:top-4 sm:left-4">
								<div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
									<svg className="size-2 sm:size-2.5 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
									<span className="text-[0.4rem] sm:text-[0.5rem] font-bold uppercase tracking-[0.15em] text-white">Reel</span>
								</div>
							</div>
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div className="absolute size-14 sm:size-20 rounded-full border border-white/30 animate-ping opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
								<div className="size-10 sm:size-16 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
									<svg className="size-4 sm:size-6 fill-white ml-0.5 sm:ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
								</div>
							</div>
							<div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
								<p className="text-[0.45rem] sm:text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/60 mb-0.5 sm:mb-1">Hậu trường phỏng vấn</p>
								<h4 className="font-serif text-[0.7rem] sm:text-base font-medium text-white leading-snug">Cảm nhận sau buổi chụp tại An Garden</h4>
								<div className="mt-1.5 sm:mt-3 flex items-center gap-1 sm:gap-1.5 text-white/60 group-hover:text-white/90 transition-colors duration-300">
									<span className="text-[0.5rem] sm:text-[0.62rem] font-semibold tracking-wider">Xem trên Facebook</span>
									<span className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
								</div>
							</div>
						</Link>

						{/* Reel Card 2 */}
						<Link
							href="https://www.facebook.com/share/r/18vgz2W7gA/"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => trackEvent("WatchVideo", { url: "https://www.facebook.com/share/r/18vgz2W7gA/", title: "Cảm nhận dâu rể ngày cưới" })}
							className="group relative flex aspect-[3/4] w-full max-w-[340px] mx-auto overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-900 shadow-lg sm:shadow-xl"
							data-reveal
						>
							<Image
								src={reelWeddingDayImage}
								alt="Hậu trường ngày cưới - Harmony Wedding"
								fill
								className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] brightness-75 group-hover:brightness-[0.82]"
								sizes="(min-width: 640px) 50vw, 100vw"
								quality={90}
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/20 pointer-events-none" />
							<div className="absolute top-2 left-2 sm:top-4 sm:left-4">
								<div className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
									<svg className="size-2 sm:size-2.5 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
									<span className="text-[0.4rem] sm:text-[0.5rem] font-bold uppercase tracking-[0.15em] text-white">Reel</span>
								</div>
							</div>
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
								<div className="absolute size-14 sm:size-20 rounded-full border border-white/30 animate-ping opacity-30 group-hover:opacity-0 transition-opacity duration-300" />
								<div className="size-10 sm:size-16 rounded-full bg-white/15 backdrop-blur-md border border-white/35 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
									<svg className="size-4 sm:size-6 fill-white ml-0.5 sm:ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
								</div>
							</div>
							<div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
								<p className="text-[0.45rem] sm:text-[0.58rem] font-bold uppercase tracking-[0.2em] text-white/60 mb-0.5 sm:mb-1">Cảm nhận ngày cưới</p>
								<h4 className="font-serif text-[0.7rem] sm:text-base font-medium text-white leading-snug">Dịch vụ trọn gói — thật sự như thế nào?</h4>
								<div className="mt-1.5 sm:mt-3 flex items-center gap-1 sm:gap-1.5 text-white/60 group-hover:text-white/90 transition-colors duration-300">
									<span className="text-[0.5rem] sm:text-[0.62rem] font-semibold tracking-wider">Xem trên Facebook</span>
									<span className="text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
