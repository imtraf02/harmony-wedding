import Image from "next/image";
import { albumHero, albumStats } from "@/constants/data";
import { Icon } from "@/components/home/icon";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

export function AlbumHero() {
	return (
		<section className="bg-transparent pt-[5.5rem] lg:pt-24 relative z-10">
			{/* Mobile layout */}
			<div className="lg:hidden">
				<div className="relative min-h-[70vh] overflow-hidden bg-neutral-900">
					<Image
						alt={albumHero.alt}
						className="object-cover"
						fill
						priority
						sizes="100vw"
						src={albumHero.image}
						unoptimized
					/>
					<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_18%,rgba(0,0,0,0.82)_100%)]" />
					<div className="absolute inset-x-0 bottom-0 px-5 pb-10 text-white">
						<p className="mb-5 flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-white/80">
							Album cưới
							<span className="h-px w-12 bg-white/50" />
						</p>
						<h1 className="max-w-xs font-serif text-[clamp(3.2rem,16vw,5rem)] leading-[0.92]">
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
									<Icon className="size-5 text-black" name={stat.icon} />
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
			<div className="mx-auto hidden max-w-[1720px] min-h-[460px] grid-cols-1 items-center gap-12 px-5 py-16 md:px-10 lg:grid lg:grid-cols-[0.45fr_0.55fr] lg:px-16 lg:py-12">
				<div className="relative z-10">
					<p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
						Album cưới
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h1 className="max-w-2xl font-serif text-[clamp(3rem,7vw,6.7rem)] leading-[0.96] text-black">
						Những Câu Chuyện Tình Yêu
					</h1>
					<p className="mt-8 max-w-md text-base leading-8 text-neutral-600">
						Mỗi bộ ảnh là một hành trình cảm xúc, được kể bằng ánh sáng,
						khoảnh khắc và tình yêu chân thật.
					</p>
					<div className="mt-10">
						<GlassButton
							variant="dark"
							href="#album-grid"
							className="!py-3 !px-8 text-[0.7rem] tracking-[0.22em]"
						>
							Xem video giới thiệu ➔
						</GlassButton>
					</div>
				</div>

				<div className="relative">
					<GlassCard
						variant="light"
						intensity="low"
						borderStrength="low"
						className="relative h-[430px] border border-white/40 shadow-lg p-3 rounded-3xl"
					>
						<div className="relative h-full w-full overflow-hidden rounded-2xl">
							<Image
								alt={albumHero.alt}
								className="object-cover animate-pan"
								fill
								priority
								sizes="55vw"
								src={albumHero.image}
								unoptimized
							/>
							<div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/30 to-transparent" />
						</div>
					</GlassCard>
				</div>
			</div>
		</section>
	);
}
