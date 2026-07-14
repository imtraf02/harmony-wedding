"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";

interface TeamMember {
	name: string;
	role: string;
	bio: string;
	fbLink: string;
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollReveal(sectionRef);

	return (
		<section ref={sectionRef} className="bg-transparent py-16 lg:py-24 relative z-10">
			<div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
				{/* Section Header */}
				<div className="mb-16 max-w-2xl" data-reveal>
					<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
						Đội ngũ sáng lập
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h2 className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1.18] text-black">
						Những Người Kể Chuyện Bằng Ánh Sáng
					</h2>
					<p className="mt-6 text-sm leading-7 text-neutral-600 font-light">
						Chúng tôi là những người bạn đồng hành lặng lẽ trong ngày cưới của
						hai bạn, giữ nhịp cảm xúc chậm rãi và ghi lại những khoảnh khắc
						chân thật nhất.
					</p>
				</div>

				{/* Directory wrapped in a beautiful GlassCard board */}
				<GlassCard
					variant="light"
					intensity="medium"
					borderStrength="low"
					className="border border-white/30 shadow-md rounded-3xl p-6 md:p-10 divide-y divide-black/[0.04]"
					data-reveal
				>
					{members.map((member) => (
						<article
							key={member.name}
							className="group grid gap-6 py-8 md:grid-cols-[1.2fr_2fr_1fr] md:items-center transition-all duration-300 hover:bg-black/[0.015] px-4 -mx-4 rounded-2xl"
						>
							<div>
								<h3 className="font-serif text-[1.62rem] text-neutral-900 group-hover:text-amber-800 transition-colors">
									{member.name}
								</h3>
								<p className="mt-1.5 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-neutral-400">
									{member.role}
								</p>
							</div>

							<div>
								<p className="text-sm leading-7 text-neutral-500 font-light max-w-xl">
									{member.bio}
								</p>
							</div>

							<div className="md:text-right">
								<Link
									href={member.fbLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors"
								>
									<span>Facebook Profile</span>
									<span className="font-serif text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
										↗
									</span>
								</Link>
							</div>
						</article>
					))}
				</GlassCard>
			</div>
		</section>
	);
}
