"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { stats, weddingImages } from "@/constants/data";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

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
		<section className="bg-white py-20 md:py-32" id="about" ref={sectionRef}>
			<div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:px-16">
				<div
					className="relative h-[48vh] min-h-[320px] overflow-hidden rounded-md bg-neutral-100 md:h-[68vh] md:min-h-[520px] md:rounded-none"
					data-reveal
				>
					<Image
						alt="Cô dâu trong bộ váy cưới tối giản - Ảnh cưới Harmony Wedding"
						className="object-cover"
						fill
						sizes="(min-width: 1024px) 50vw, 100vw"
						src={weddingImages.about}
						quality={85}
					/>
				</div>

				<div className="lg:pl-12">
					<p
						className="mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700"
						data-reveal
					>
						Về chúng tôi
						<span className="h-px w-16 bg-black" />
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
						className="mt-8 inline-flex items-center gap-4 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-black lg:hidden"
						data-reveal
						href="/about"
					>
						Tìm hiểu thêm
						<span className="h-px w-9 bg-black" />
					</Link>

					<div className="mt-12 grid grid-cols-1 gap-8 border-y border-black/10 py-9 sm:grid-cols-3">
						{stats.map((stat) => (
							<div data-reveal key={stat.label}>
								<p
									className="font-serif text-5xl text-black md:text-6xl"
									data-counter={stat.value}
									data-suffix={stat.suffix}
								>
									0{stat.suffix}
								</p>
								<p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-neutral-500">
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
