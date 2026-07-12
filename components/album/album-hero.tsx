import Image from "next/image";
import portfolioData from "@/data/portfolio.json";
const albumStats = portfolioData.albumStats;
import { Icon } from "@/components/home/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { AnimatedArrowRight } from "@/components/ui/animated-icons";

export interface AlbumHeroProps {
	heroImage: string;
	heroAlt: string;
	leftImage: string;
	rightImage: string;
}

export function AlbumHero({ heroImage, heroAlt, leftImage, rightImage }: AlbumHeroProps) {
	return (
		<section className="bg-transparent pt-[5.5rem] lg:pt-24 relative z-10">
			{/* Mobile layout */}
			<div className="lg:hidden">
				<div className="relative min-h-[70vh] overflow-hidden bg-neutral-900">
					<Image
						alt={heroAlt}
						className="object-cover"
						fill
						priority
						sizes="100vw"
						src={heroImage}
						unoptimized
					/>
					<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_18%,rgba(0,0,0,0.82)_100%)]" />
					<div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white">
						<p className="mb-5 flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-white/80">
							Album cưới
							<span className="h-px w-12 bg-white/50" />
						</p>
						<h1 className="max-w-xs font-serif text-[clamp(3.2rem,16vw,5rem)] leading-[1.15]">
							Những Câu Chuyện Tình Yêu
						</h1>
						<p className="mt-6 max-w-sm text-sm leading-7 text-white/80">
							Mỗi bộ ảnh là một hành trình cảm xúc, được kể bằng ánh sáng,
							khoảnh khắc và tình yêu chân thật.
						</p>
						<div className="mt-8">
							<GlassButton
								variant="light"
								href="#album-grid"
								className="!py-2.5 !px-6 text-[0.66rem] tracking-[0.22em]"
							>
								Xem video giới thiệu
							</GlassButton>
						</div>
					</div>
				</div>

				<div className="px-5 py-10 bg-transparent">
					<GlassCard
						variant="light"
						intensity="medium"
						borderStrength="low"
						className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 border border-white/40 shadow-xs p-6 rounded-3xl"
					>
						{albumStats.map((stat, index) => (
							<article
								className={`px-2 text-center ${
									index % 2 === 0 ? "border-r border-black/[0.05]" : ""
								} sm:border-r sm:border-black/[0.05] sm:last:border-r-0`}
								key={stat.description}
							>
								<div className="grid size-10 place-items-center rounded-full bg-neutral-100/60 mx-auto mb-3 border border-white/30">
									<Icon className="size-5 text-black" name={stat.icon as any} />
								</div>
								<h2 className="text-base font-bold text-black">{stat.title}</h2>
								<p className="mt-1 text-[0.62rem] leading-4 text-neutral-500 uppercase tracking-wider">
									{stat.description}
								</p>
							</article>
						))}
					</GlassCard>
				</div>
			</div>

			{/* Desktop layout */}
			<div className="mx-auto hidden max-w-6xl min-h-[520px] grid-cols-1 items-center gap-16 px-8 py-16 md:px-10 lg:grid lg:grid-cols-[1.2fr_1fr] lg:py-16">
				<div className="relative z-10">
					<p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
						Album cưới
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h1 className="max-w-2xl font-serif text-[clamp(2.8rem,4.5vw,4.5rem)] leading-[1.18] text-neutral-900">
						Những Câu Chuyện <span className="font-light italic text-neutral-500 block sm:inline">Tình Yêu</span>
					</h1>
					<p className="mt-8 max-w-md text-[0.92rem] leading-8 text-neutral-500 font-light">
						Mỗi bộ ảnh là một hành trình cảm xúc tinh tế, được kể lại bằng ngôn ngữ của ánh sáng, góc máy tự nhiên và những khoảnh khắc chân thật nhất của hai bạn.
					</p>
					<div className="mt-10">
						<GlassButton
							variant="dark"
							href="#album-grid"
							className="!py-3 !px-8 text-[0.7rem] tracking-[0.22em] flex items-center gap-2"
						>
							<span>Khám phá các album</span>
							<AnimatedArrowRight className="size-4 shrink-0" />
						</GlassButton>
					</div>
				</div>

				<div className="relative w-[480px] h-[550px] ml-auto mr-6 flex items-center justify-center">
					{/* Photo 3: Back Right */}
					<div className="absolute top-8 -right-8 z-10 aspect-[3/4] h-[460px] rotate-[6deg] opacity-75 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-40 hover:opacity-100 cursor-pointer">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative h-full w-full border border-white/40 shadow-lg p-2.5 rounded-3xl"
						>
							<div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
								<Image
									alt="Sunny Garden Chi tiết 3"
									className="object-cover"
									fill
									sizes="25vw"
									src={rightImage}
									unoptimized
								/>
							</div>
						</GlassCard>
					</div>

					{/* Photo 2: Back Left */}
					<div className="absolute top-12 -left-8 z-20 aspect-[3/4] h-[460px] -rotate-[6deg] opacity-85 transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-40 hover:opacity-100 cursor-pointer">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative h-full w-full border border-white/40 shadow-lg p-2.5 rounded-3xl"
						>
							<div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
								<Image
									alt="Sunny Garden Chi tiết 2"
									className="object-cover"
									fill
									sizes="25vw"
									src={leftImage}
									unoptimized
								/>
							</div>
						</GlassCard>
					</div>

					{/* Photo 1: Front Center */}
					<div className="absolute top-0 z-30 aspect-[3/4] h-[520px] transition-all duration-500 hover:scale-[1.03] hover:z-40 cursor-pointer">
						<GlassCard
							variant="light"
							intensity="low"
							borderStrength="low"
							className="relative h-full w-full border border-white/40 shadow-2xl p-3 rounded-3xl"
						>
							<div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
								<Image
									alt={heroAlt}
									className="object-cover"
									fill
									priority
									sizes="35vw"
									src={heroImage}
									unoptimized
								/>
							</div>
						</GlassCard>
					</div>
				</div>
			</div>
		</section>
	);
}
