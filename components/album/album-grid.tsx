"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { albumFilters, albumItems } from "@/constants/data";
import { GlassCard } from "@/components/ui/glass-card";

export function AlbumGrid() {
	const [selectedFilter, setSelectedFilter] = useState("Tất cả album");

	const filteredItems =
		selectedFilter === "Tất cả album"
			? albumItems
			: albumItems.filter((item) => item.category === selectedFilter);

	return (
		<section className="bg-transparent py-14 lg:py-16 relative z-10" id="album-grid">
			<div className="mx-auto max-w-[1720px] px-5 md:px-10 lg:px-16">
				{/* Mobile / Tablet Filter Nav */}
				<div className="mb-8 lg:hidden">
					<p className="mb-4 flex items-center gap-5 text-[0.66rem] font-bold uppercase tracking-[0.28em] text-neutral-500">
						Danh mục album
						<span className="h-px flex-1 bg-neutral-200" />
					</p>
					<nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-5 px-5 md:-mx-10 md:px-10">
						{albumFilters.map((filter) => {
							const isActive = filter === selectedFilter;
							return (
								<button
									className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
										isActive
											? "border-neutral-900 bg-neutral-900 text-white shadow-md active:scale-95"
											: "border-white/40 bg-white/40 text-neutral-800 backdrop-blur-xs hover:border-black/25 active:scale-95"
									}`}
									key={filter}
									onClick={() => setSelectedFilter(filter)}
									type="button"
								>
									{filter}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Desktop Filter Nav */}
				<div className="mb-10 hidden flex-col gap-6 lg:flex lg:flex-row lg:items-center lg:justify-between">
					<nav className="flex gap-6 overflow-x-auto border-b border-black/[0.04] text-[0.68rem] font-bold uppercase tracking-[0.22em] text-neutral-500 pb-2">
						{albumFilters.map((filter) => {
							const isActive = filter === selectedFilter;
							return (
								<button
									className={`shrink-0 pb-2 transition-all duration-300 hover:text-black border-b-2 ${
										isActive
											? "border-black text-black scale-102"
											: "border-transparent text-neutral-400"
									}`}
									key={filter}
									onClick={() => setSelectedFilter(filter)}
									type="button"
								>
									{filter}
								</button>
							);
						})}
					</nav>
					<GlassCard
						variant="light"
						intensity="high"
						borderStrength="medium"
						className="inline-flex items-center gap-3 self-start text-[0.66rem] font-bold uppercase tracking-[0.22em] text-neutral-800 px-4 py-2 rounded-full border border-white/45 shadow-xs"
					>
						Số lượng: {filteredItems.length}
					</GlassCard>
				</div>

				{/* Album Cards Grid */}
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredItems.map((album) => (
						<Link
							key={album.title}
							href={`/portfolio/${album.slug}`}
							className="block group"
						>
							<GlassCard
								variant="light"
								intensity="low"
								borderStrength="low"
								hoverable
								className="relative h-[48vh] min-h-[360px] md:h-[54vh] md:min-h-[400px] shadow-xs rounded-3xl p-1 cursor-pointer"
							>
								<div className="relative h-full w-full overflow-hidden rounded-2xl">
									<Image
										alt={album.alt}
										className="object-cover transition duration-700 group-hover:scale-[1.04]"
										fill
										sizes="(min-width: 1024px) 31vw, (min-width: 768px) 50vw, 100vw"
										src={album.image}
									/>
									{/* Dark ambient vignetting overlay */}
									<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_35%,rgba(0,0,0,0.85)_100%)]" />

									{/* Album details glass label block */}
									<div className="absolute inset-x-4 bottom-4 p-5 md:p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white shadow-lg flex items-center justify-between">
										<h2 className="font-serif text-lg md:text-xl lg:text-2xl leading-none">
											{album.title}
										</h2>
										<span className="font-serif text-sm opacity-80 group-hover:translate-x-1.5 transition-transform duration-300">
											➔
										</span>
									</div>
								</div>
							</GlassCard>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
