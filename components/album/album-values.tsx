import { albumValues } from "@/constants/data";
import { Icon } from "@/components/home/icon";
import { GlassCard } from "@/components/ui/glass-card";

export function AlbumValues() {
	return (
		<section className="bg-transparent py-12 lg:py-16 relative z-10">
			<div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					{albumValues.map((value) => (
						<GlassCard
							key={value.title}
							variant="light"
							intensity="low"
							borderStrength="low"
							hoverable
							className="flex items-center gap-6 p-6 border border-white/40 shadow-xs hover:shadow-md rounded-2xl"
						>
							<div className="grid size-12 place-items-center rounded-full bg-neutral-100/60 border border-white/40 shadow-xs shrink-0">
								<Icon className="size-6 text-black" name={value.icon} />
							</div>
							<div>
								<h2 className="text-[0.74rem] font-bold uppercase tracking-[0.18em] text-black">
									{value.title}
								</h2>
								<p className="mt-2 text-xs text-neutral-500 font-light leading-relaxed">
									{value.description}
								</p>
							</div>
						</GlassCard>
					))}
				</div>
			</div>
		</section>
	);
}
