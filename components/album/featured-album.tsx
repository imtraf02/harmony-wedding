import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import type { AlbumFeatureImage } from "@/types/home";

export function FeaturedAlbum({ images }: { images: AlbumFeatureImage[] }) {
	return (
		<section className="bg-transparent py-16 lg:py-24 relative z-10" id="featured-album">
			<div className="mx-auto grid max-w-[1720px] gap-12 px-5 md:px-10 lg:grid-cols-[0.34fr_0.66fr] lg:items-center lg:px-16">
				{/* Info Column */}
				<div>
					<p className="mb-8 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-500">
						Album nổi bật
						<span className="h-px w-16 bg-neutral-300" />
					</p>
					<h2 className="font-serif text-[clamp(2.6rem,4vw,4.8rem)] leading-[1.02] text-black">
						Sunny Garden - Sắc Hoa Lãng Mạn
					</h2>
					<p className="mt-8 max-w-sm text-base leading-8 text-neutral-600">
						Không gian đồng quê châu Âu yên bình, ngập tràn ánh nắng ấm áp và
						sắc hoa rực rỡ bốn mùa.
					</p>
					<div className="mt-10">
						<GlassButton
							variant="dark"
							href="/portfolio/sunny-garden"
							className="!py-3 !px-8 text-[0.68rem] tracking-[0.22em]"
						>
							Xem toàn bộ album ➔
						</GlassButton>
					</div>
				</div>

				{/* Mobile Images (Grid layout wrapped in GlassCards) */}
				<div className="grid grid-cols-2 gap-4 md:hidden">
					{images.map((item, index) => (
						<div
							className={
								index === 0
									? "col-span-2"
									: index === 3
										? "col-span-2"
										: ""
							}
							key={item.image}
						>
							<GlassCard
								variant="light"
								intensity="low"
								borderStrength="low"
								className="relative w-full shadow-xs p-1 rounded-2xl"
							>
								<div
									className={`relative w-full overflow-hidden rounded-xl bg-neutral-100 ${
										index === 0
											? "h-[36vh] min-h-[260px]"
											: index === 3
												? "h-44"
												: "h-32"
									}`}
								>
									<Image
										alt={item.alt}
										className="object-cover"
										fill
										sizes="100vw"
										src={item.image}
										priority={index === 0 || index === 1}
										unoptimized
									/>
								</div>
							</GlassCard>
						</div>
					))}
				</div>

				{/* Desktop Images layout wrapped in premium GlassCard structures */}
				<div className="hidden gap-4 md:grid md:grid-cols-[1.2fr_1fr]">
					{images.map((item) => (
						<div
							className={
								item.featured
									? "md:row-span-2 h-full"
									: "h-56 md:h-64"
							}
							key={item.image}
						>
							<GlassCard
								variant="light"
								intensity="low"
								borderStrength="low"
								className="relative h-full shadow-md p-1 rounded-3xl"
							>
								<div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100 min-h-[220px]">
									<Image
										alt={item.alt}
										className="object-cover transition duration-700 hover:scale-[1.03]"
										fill
										sizes={item.featured ? "(min-width: 1024px) 42vw, 100vw" : "30vw"}
										src={item.image}
										priority={item.featured}
										unoptimized
									/>
								</div>
							</GlassCard>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
