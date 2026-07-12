"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@/components/home/icon";
import { type TimelineStep } from "@/types/home";
import { gsap, useGSAP } from "@/lib/gsap";
import { GlassCard } from "@/components/ui/glass-card";
import { MeshGradient } from "@/components/ui/mesh-gradient";

export function StoryTimeline({ processImage, steps }: { processImage: string; steps: TimelineStep[] }) {
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
						);

					// Dynamic vertical scroll scrub for the timeline progress line
					gsap.fromTo(
						progress,
						{ scaleY: 0 },
						{
							scaleY: 1,
							ease: "none",
							scrollTrigger: {
								trigger: ".desktop-process-grid",
								start: "top 35%",
								end: "bottom 65%",
								scrub: 0.5,
							},
						}
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
		<section className="relative isolate overflow-hidden bg-[#fcfbfc] py-24 md:py-32" id="packages" ref={sectionRef}>
			{/* Light moving mesh gradient background */}
			<MeshGradient variant="light" className="opacity-80" />

			<div className="desktop-process-grid mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-12 lg:px-16 xl:gap-16">
				{/* Left Sticky Panel */}
				<div className="lg:sticky lg:top-28 lg:h-fit">
					<p className="process-kicker mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
						Quy trình làm việc
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h2 className="process-heading max-w-[650px] font-serif text-[clamp(3rem,5.5vw,6.4rem)] leading-[0.96] text-black">
						Một Hành Trình Được Dẫn Dắt Bằng Sự Tinh Tế
					</h2>
					<span className="process-copy mt-8 block h-px w-16 bg-neutral-300" />
					<p className="process-copy mt-7 max-w-md text-base leading-8 text-neutral-600">
						Chúng tôi giữ nhịp làm việc chậm, rõ ràng và riêng tư để mỗi quyết
						định đều phục vụ cảm xúc thật của hai bạn.
					</p>

					{/* Image card encased in GlassCard border wrapper */}
					<div className="process-image relative mt-14">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative min-h-[440px] lg:min-h-[520px] shadow-lg p-1 rounded-3xl"
						>
							<div className="relative h-full w-full min-h-[416px] lg:min-h-[496px] overflow-hidden rounded-2xl">
								<Image
									alt="Cặp đôi trong quy trình chuẩn bị album cưới Harmony Wedding"
									className="object-cover"
									fill
									sizes="(min-width: 1024px) 44vw, 100vw"
									src={processImage}
									unoptimized
								/>
							</div>
							<GlassCard
								variant="light"
								intensity="medium"
								borderStrength="low"
								className="process-card absolute bottom-4 left-4 right-4 border border-white/30 p-8 shadow-md rounded-2xl"
							>
								<p className="font-serif text-5xl leading-none text-black md:text-6xl">
									05
								</p>
								<p className="mt-4 text-[0.68rem] font-bold uppercase leading-5 tracking-[0.24em] text-neutral-700">
									bước hoàn thiện để tạo nên ký ức trọn vẹn
								</p>
							</GlassCard>
						</GlassCard>
					</div>
				</div>

				{/* Right Side: Timeline Steps list with integrated nodes (Desktop) */}
				<div className="relative hidden lg:block">
					{/* The vertical glass timeline track. Positioned precisely in the center of the nodes */}
					<div className="process-rule absolute bottom-20 left-[2.75rem] top-20 w-1.5 -translate-x-1/2 origin-top rounded-full bg-white/40 border border-white/20 shadow-[inset_0_1px_1px_rgba(0,0,0,0.03)]">
						<div className="process-progress h-full w-full origin-top rounded-full bg-linear-to-b from-amber-500/20 via-rose-500/20 to-neutral-800/20" />
					</div>

					<div className="flex flex-col gap-8">
						{steps.map((step, index) => (
							<div
								key={step.title}
								className="process-step-container relative grid grid-cols-[5.5rem_1fr] gap-6 items-center"
							>
								{/* Circular glass node, perfectly centered next to the card */}
								<div className="relative z-10 flex justify-center">
									<GlassCard
										variant="light"
										intensity="high"
										borderStrength="high"
										className="process-node grid size-14 place-items-center rounded-full font-serif text-lg text-black border border-white/50 shadow-md font-bold"
									>
										{String(index + 1).padStart(2, "0")}
									</GlassCard>
								</div>

								{/* Step Card */}
								<GlassCard
									variant="light"
									intensity="low"
									borderStrength="low"
									hoverable
									className="process-step grid gap-8 p-6 lg:grid-cols-[170px_1fr_64px] lg:items-center xl:grid-cols-[190px_1fr_72px] border border-white/40 shadow-xs hover:shadow-md rounded-2xl"
								>
									<div>
										<div className="process-thumb relative h-36 flex-1 overflow-hidden bg-neutral-100 md:h-[8.5rem] rounded-xl border border-white/20">
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
										<h3 className="font-serif text-[clamp(1.8rem,2.5vw,3rem)] leading-none text-black">
											{step.title}
										</h3>
										<p className="mt-4 max-w-md text-[0.95rem] leading-7 text-neutral-600">
											{step.description}
										</p>
									</div>

									<GlassCard
										variant="light"
										intensity="low"
										borderStrength="low"
										className="process-icon grid size-14 place-items-center border border-white/40 text-black md:justify-self-end rounded-full shadow-xs"
									>
										<Icon className="size-6" name={step.icon} />
									</GlassCard>
								</GlassCard>
							</div>
						))}
					</div>
				</div>

				{/* Mobile Step Cards List */}
				<div className="mobile-process-list relative lg:hidden mt-8">
					<div className="absolute bottom-9 left-[2.25rem] top-9 w-px bg-neutral-200">
						<div className="mobile-process-line-progress h-full w-px origin-top bg-black/60" />
					</div>

					{steps.map((step, index) => (
						<article
							className="mobile-process-step relative grid grid-cols-[4.5rem_1fr] gap-4 py-6"
							key={step.title}
						>
							<div className="relative z-10 flex justify-center">
								<GlassCard
									variant="light"
									intensity="high"
									borderStrength="medium"
									className="mobile-process-node grid size-12 place-items-center rounded-full text-neutral-800 border border-white/45 shadow-xs font-bold"
								>
									<Icon className="mobile-process-icon size-6" name={step.icon} />
								</GlassCard>
							</div>
							<GlassCard
								variant="light"
								intensity="low"
								borderStrength="low"
								className="p-6 border border-white/30 shadow-xs rounded-2xl"
							>
								<div className="flex items-center gap-3">
									<span className="font-serif text-lg leading-none text-neutral-400">
										{String(index + 1).padStart(2, "0")}
									</span>
									<h3 className="font-serif text-[1.4rem] leading-none text-black">
										{step.title}
									</h3>
								</div>
								<p className="mt-4 text-[0.92rem] leading-7 text-neutral-600">
									{step.description}
								</p>
							</GlassCard>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
