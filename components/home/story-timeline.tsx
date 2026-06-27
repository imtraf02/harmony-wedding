"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/home/icon";
import { timelineSteps, weddingImages } from "@/constants/data";
import { gsap, useGSAP } from "@/lib/gsap";

export function StoryTimeline() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(
					".process-kicker, .process-heading, .process-copy, .process-image, .process-card, .process-rule, .process-progress, .process-node, .process-step, .mobile-process-step, .mobile-process-line-progress, .process-thumb, .process-content, .process-icon",
					{
						autoAlpha: 1,
						opacity: 1,
						scale: 1,
						scaleY: 1,
						x: 0,
						y: 0,
					},
				);
				return;
			}

			const media = gsap.matchMedia();

			media.add(
				{
					desktop: "(min-width: 1024px)",
					mobile: "(max-width: 1023px)",
				},
				(context) => {
					const isMobile = context.conditions?.mobile;
					const introTimeline = gsap.timeline({
						defaults: {
							duration: isMobile ? 0.72 : 0.9,
							ease: "power4.out",
						},
						scrollTrigger: {
							trigger: sectionRef.current,
							start: isMobile ? "top 76%" : "top 62%",
							once: true,
						},
					});

					introTimeline
						.addLabel("intro")
						.fromTo(
							".process-kicker",
							{ autoAlpha: 0, y: isMobile ? 24 : 18 },
							{ autoAlpha: 1, y: 0 },
							"intro",
						)
						.fromTo(
							".process-heading",
							{ autoAlpha: 0, y: 40 },
							{ autoAlpha: 1, y: 0 },
							"intro+=0.06",
						)
						.fromTo(
							".process-copy",
							{ autoAlpha: 0, y: isMobile ? 32 : 24 },
							{ autoAlpha: 1, y: 0 },
							"intro+=0.14",
						)
						.fromTo(
							".process-image",
							{ autoAlpha: 0, scale: isMobile ? 1.04 : 1.08, y: 24 },
							{
								autoAlpha: 1,
								duration: isMobile ? 0.82 : 1.05,
								scale: 1,
								y: 0,
							},
							"intro+=0.2",
						)
						.fromTo(
							".process-card",
							{ autoAlpha: 0, y: 24 },
							{ autoAlpha: 1, y: 0 },
							"intro+=0.34",
						);

					if (isMobile) {
						const mobileSteps = gsap.utils.toArray<HTMLElement>(
							".mobile-process-step",
						);
						const mobileProgress = sectionRef.current?.querySelector(
							".mobile-process-line-progress",
						);

						if (mobileProgress) {
							gsap.fromTo(
								mobileProgress,
								{ scaleY: 0 },
								{
									ease: "none",
									scaleY: 1,
									scrollTrigger: {
										trigger: ".mobile-process-list",
										start: "top 65%",
										end: "bottom 65%",
										scrub: 0.5,
									},
								},
							);
						}

						mobileSteps.forEach((step) => {
							const node = step.querySelector(".mobile-process-node");

							gsap.fromTo(
								step,
								{ opacity: 0.4, y: 15 },
								{
									opacity: 1,
									y: 0,
									scrollTrigger: {
										trigger: step,
										start: "top 75%",
										end: "top 45%",
										scrub: 0.5,
									},
								},
							);

							if (node) {
								gsap.fromTo(
									node,
									{ backgroundColor: "#e5e5e5", color: "#737373", scale: 0.9 },
									{
										backgroundColor: "#000000",
										color: "#ffffff",
										scale: 1.1,
										ease: "power2.out",
										scrollTrigger: {
											trigger: step,
											start: "top 65%",
											toggleActions: "play reverse play reverse",
										},
									},
								);
							}
						});

						return;
					}

					const steps = gsap.utils.toArray<HTMLElement>(".process-step");
					const nodes = gsap.utils.toArray<HTMLElement>(".process-node");
					const progress =
						sectionRef.current?.querySelector(".process-progress");

					if (!progress) {
						return;
					}

					const desktopTimeline = gsap.timeline({
						defaults: {
							duration: 0.82,
							ease: "power4.out",
						},
						scrollTrigger: {
							trigger: ".desktop-process-grid",
							start: "top 72%",
							once: true,
						},
					});

					desktopTimeline
						.addLabel("desktopSteps")
						.fromTo(
							".process-rule",
							{ scaleY: 0 },
							{ duration: 1.05, scaleY: 1 },
							"desktopSteps",
						)
						.fromTo(
							progress,
							{ scaleY: 0 },
							{ duration: 1.1, ease: "power3.out", scaleY: 1 },
							"desktopSteps+=0.08",
						);

					nodes.forEach((node, index) => {
						desktopTimeline.fromTo(
							node,
							{ autoAlpha: 0, scale: 0.82 },
							{ autoAlpha: 1, scale: 1 },
							`desktopSteps+=${index * 0.14}`,
						);
					});

					steps.forEach((step, index) => {
						const stepPosition = `desktopSteps+=${index * 0.16}`;
						const thumb = step.querySelector(".process-thumb");
						const content = step.querySelector(".process-content");
						const icon = step.querySelector(".process-icon");

						desktopTimeline
							.fromTo(
								step,
								{ autoAlpha: 0, y: 34 },
								{ autoAlpha: 1, y: 0 },
								stepPosition,
							)
							.fromTo(
								thumb,
								{ autoAlpha: 0, scale: 1.06 },
								{ autoAlpha: 1, scale: 1 },
								`${stepPosition}+=0.05`,
							)
							.fromTo(
								content,
								{ autoAlpha: 0, x: 28 },
								{ autoAlpha: 1, x: 0 },
								`${stepPosition}+=0.1`,
							)
							.fromTo(
								icon,
								{ autoAlpha: 0, scale: 0.86 },
								{ autoAlpha: 1, scale: 1 },
								`${stepPosition}+=0.14`,
							);
					});
				},
			);

			return () => media.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section className="bg-white py-24 md:py-32" id="packages" ref={sectionRef}>
			<div className="desktop-process-grid mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.44fr_5.5rem_0.56fr] lg:gap-12 lg:px-16 xl:gap-16">
				<div className="lg:sticky lg:top-28 lg:h-fit">
					<p className="process-kicker mb-8 flex items-center gap-5 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-neutral-700">
						Quy trình làm việc
						<span className="h-px w-16 bg-black" />
					</p>
					<h2 className="process-heading max-w-[650px] font-serif text-[clamp(3rem,5.5vw,6.4rem)] leading-[0.96] text-black">
						Một Hành Trình Được Dẫn Dắt Bằng Sự Tinh Tế
					</h2>
					<span className="process-copy mt-8 block h-px w-16 bg-black/25" />
					<p className="process-copy mt-7 max-w-md text-base leading-8 text-neutral-600">
						Chúng tôi giữ nhịp làm việc chậm, rõ ràng và riêng tư để mỗi quyết
						định đều phục vụ cảm xúc thật của hai bạn.
					</p>

					<div className="process-image relative mt-14 min-h-[440px] overflow-hidden bg-neutral-100 lg:min-h-[520px]">
						<Image
							alt="Cặp đôi trong quy trình chuẩn bị album cưới Harmony Wedding"
							className="object-cover"
							fill
							sizes="(min-width: 1024px) 44vw, 100vw"
							src={weddingImages.process}
							unoptimized
						/>
						<div className="process-card absolute bottom-0 left-0 border border-black/10 bg-white/92 p-8 md:p-10 md:backdrop-blur-sm">
							<p className="font-serif text-6xl leading-none text-black md:text-7xl">
								05
							</p>
							<p className="mt-5 max-w-[150px] text-[0.68rem] font-semibold uppercase leading-6 tracking-[0.28em] text-neutral-700">
								bước hoàn thiện để tạo nên ký ức trọn vẹn
							</p>
						</div>
					</div>
				</div>

				<div className="relative hidden lg:block">
					<div className="process-rule absolute bottom-0 left-1/2 top-0 w-px origin-top bg-black/18">
						<div className="process-progress h-full w-px origin-top bg-black" />
					</div>
					<div className="relative flex h-full min-h-[980px] flex-col justify-between py-12">
						{timelineSteps.map((step, index) => (
							<div
								className="process-node relative z-10 mx-auto grid size-14 place-items-center bg-black font-serif text-xl text-white shadow-[0_18px_35px_rgba(0,0,0,0.16)]"
								key={step.title}
							>
								{String(index + 1).padStart(2, "0")}
							</div>
						))}
					</div>
				</div>

				<div className="mobile-process-list relative border-y border-black/10 lg:hidden">
					<div className="absolute bottom-9 left-[4.75rem] top-9 w-px bg-black/12">
						<div className="mobile-process-line-progress h-full w-px origin-top bg-black" />
					</div>

					{timelineSteps.map((step, index) => (
						<article
							className="mobile-process-step relative grid grid-cols-[2rem_3.5rem_1fr] gap-4 border-b border-black/10 py-9 last:border-b-0"
							key={step.title}
						>
							<span className="pt-3 font-serif text-xl leading-none text-black">
								{String(index + 1).padStart(2, "0")}
							</span>
							<div className="relative z-10 flex justify-center">
								<span className="mobile-process-node grid size-12 place-items-center rounded-full bg-neutral-200 text-neutral-500 transition-transform">
									<Icon className="mobile-process-icon size-6" name={step.icon} />
								</span>
							</div>
							<div className="min-w-0">
								<h3 className="font-serif text-[clamp(1.9rem,10vw,3.1rem)] leading-none text-black">
									{step.title}
								</h3>
								<p className="mt-5 text-[0.95rem] leading-8 text-neutral-600">
									{step.description}
								</p>
							</div>
						</article>
					))}
				</div>

				<div className="hidden border-y border-black/10 lg:block">
					{timelineSteps.map((step) => (
						<article
							className="process-step grid min-h-[196px] gap-8 border-b border-black/10 py-6 last:border-b-0 lg:grid-cols-[170px_1fr_76px] lg:items-center xl:grid-cols-[190px_1fr_86px]"
							key={step.title}
						>
							<div>
								<div className="process-thumb relative h-36 flex-1 overflow-hidden bg-neutral-100 md:h-[8.5rem]">
									<Image
										alt={step.alt}
										className="object-cover"
										fill
										sizes="(min-width: 1024px) 190px, 42vw"
										src={step.image}
										unoptimized
									/>
								</div>
							</div>

							<div className="process-content">
								<h3 className="font-serif text-[clamp(2rem,3vw,3.7rem)] leading-none text-black">
									{step.title}
								</h3>
								<p className="mt-5 max-w-md text-base leading-8 text-neutral-600">
									{step.description}
								</p>
							</div>

							<div className="process-icon grid size-16 place-items-center border border-black/12 text-black md:justify-self-end">
								<Icon className="size-8" name={step.icon} />
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
