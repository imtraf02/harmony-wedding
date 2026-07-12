"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import homeData from "@/data/home.json";
const stats = homeData.stats;
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

export function AboutSection({ aboutImage }: { aboutImage: string }) {
	const sectionRef = useRef<HTMLElement | null>(null);

	useScrollReveal(sectionRef);

	useGSAP(
		() => {
			const counters = gsap.utils.toArray<HTMLElement>("[data-counter]");
			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			counters.forEach((counter) => {
				const target = Number(counter.dataset.counter ?? "0");
				const suffix = counter.dataset.suffix ?? "";
				const state = { value: 0 };

				if (reduceMotion) {
					counter.textContent = `${target}${suffix}`;
					return;
				}

				gsap.to(state, {
					duration: 1.1,
					ease: "power3.out",
					onUpdate: () => {
						counter.textContent = `${Math.round(state.value)}${suffix}`;
					},
					scrollTrigger: {
						trigger: counter,
						start: "top 84%",
						once: true,
					},
					value: target,
				});
			});
		},
		{ scope: sectionRef },
	);

	return (
		<section className="relative isolate overflow-hidden py-20 md:py-32 bg-[#faf9f6]" id="about" ref={sectionRef}>
			<div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:px-16">
				{/* Left Image container */}
				<div data-reveal className="relative h-[48vh] min-h-[320px] md:h-[68vh] md:min-h-[520px] overflow-hidden rounded-3xl border border-black/[0.04] shadow-md bg-neutral-100">
					<Image
						alt="Cô dâu trong bộ váy cưới tối giản - Ảnh cưới Harmony Wedding"
						className="object-cover"
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						src={aboutImage}
						unoptimized
					/>
				</div>

				<div className="lg:pl-12">
					<p
						className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-400"
						data-reveal
					>
						Về chúng tôi
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h2
						className="font-serif text-[clamp(2.55rem,12vw,4rem)] leading-[1.18] text-black lg:text-[clamp(2.45rem,4.5vw,5.3rem)]"
						data-reveal
					>
						Hơn 13 Năm, Vẫn Đang Làm Việc Mình Yêu Thích
					</h2>
					<p
						className="mt-8 max-w-xl text-base leading-8 text-neutral-600 font-light"
						data-reveal
					>
						Suốt 13 năm, tụi mình đã đi cùng hàng nghìn cặp đôi từ ngày thử đồ đến hôm cưới.
						Không có ngày nào giống ngày nào — và đó là điều tụi mình thích nhất ở công việc này.
					</p>
					<Link
						className="mt-8 inline-flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black hover:text-neutral-600 transition-colors lg:hidden"
						data-reveal
						href="/about"
					>
						Tìm hiểu thêm
						<span className="h-px w-9 bg-black" />
					</Link>

					{/* Simple flat counters */}
					<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="px-6 py-6 bg-white/80 border border-black/[0.04] shadow-xs text-center rounded-2xl"
								data-reveal
							>
								<p
									className="font-serif text-4xl text-black md:text-5xl font-light"
									data-counter={stat.value}
									data-suffix={stat.suffix}
								>
									0{stat.suffix}
								</p>
								<p className="mt-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-neutral-500">
									{stat.label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
