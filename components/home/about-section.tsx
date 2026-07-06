"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { stats, weddingImages } from "@/constants/data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";

export function AboutSection() {
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
		<section className="relative isolate overflow-hidden py-20 md:py-32" id="about" ref={sectionRef}>
			{/* Light moving mesh gradient background */}
			<MeshGradient variant="light" className="opacity-75" />

			<div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:px-16">
				{/* Left Image encapsulated in a GlassCard frame */}
				<div data-reveal className="relative">
					<GlassCard
						variant="light"
						intensity="low"
						borderStrength="low"
						className="relative h-[48vh] min-h-[320px] md:h-[68vh] md:min-h-[520px] rounded-3xl shadow-lg p-1"
					>
						<div className="relative h-full w-full overflow-hidden rounded-2xl">
							<Image
								alt="Cô dâu trong bộ váy cưới tối giản - Ảnh cưới Harmony Wedding"
								className="object-cover"
								fill
								sizes="(min-width: 1024px) 50vw, 100vw"
								src={weddingImages.about}
								unoptimized
							/>
						</div>
					</GlassCard>
				</div>

				<div className="lg:pl-12">
					<p
						className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500"
						data-reveal
					>
						Về chúng tôi
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h2
						className="font-serif text-[clamp(2.55rem,12vw,4rem)] leading-[0.98] text-black lg:text-[clamp(2.45rem,4.5vw,5.3rem)]"
						data-reveal
					>
						Hơn 13 Năm Gìn Giữ Những Khoảnh Khắc Hạnh Phúc
					</h2>
					<p
						className="mt-8 max-w-xl text-base leading-8 text-neutral-600"
						data-reveal
					>
						Harmony Wedding theo đuổi vẻ đẹp tinh giản, sang trọng và bền vững.
						Chúng tôi không chỉ chụp một ngày cưới, mà xây dựng một ký ức có thể
						được nhìn lại sau nhiều năm vẫn thấy nguyên vẹn cảm xúc.
					</p>
					<Link
						className="mt-8 inline-flex items-center gap-4 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-black hover:text-neutral-600 transition-colors lg:hidden"
						data-reveal
						href="/about"
					>
						Tìm hiểu thêm
						<span className="h-px w-9 bg-black" />
					</Link>

					{/* Glass capsule counters */}
					<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
						{stats.map((stat) => (
							<GlassCard
								key={stat.label}
								variant="light"
								intensity="low"
								borderStrength="low"
								className="px-6 py-6 border border-white/40 shadow-xs hover:border-white/60 hover:shadow-md text-center rounded-2xl"
								data-reveal
							>
								<p
									className="font-serif text-4xl text-black md:text-5xl"
									data-counter={stat.value}
									data-suffix={stat.suffix}
								>
									0{stat.suffix}
								</p>
								<p className="mt-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-neutral-500">
									{stat.label}
								</p>
							</GlassCard>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
