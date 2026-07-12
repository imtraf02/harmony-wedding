"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

import type { BlogPost } from "@/types/blog";

export function BlogListing({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
	const [activeCategory, setActiveCategory] = useState("Tất cả");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredPosts = posts.filter((post) => {
		const matchesCategory =
			activeCategory === "Tất cả" || post.category === activeCategory;
		const matchesSearch =
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.summary.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	// If showing all posts and no search query, highlight the first post as featured
	const showFeatured = activeCategory === "Tất cả" && searchQuery === "";
	const featuredPost = showFeatured ? filteredPosts[0] : null;
	const regularPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

	return (
		<section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-20 relative z-10">
			{/* Filters & Search */}
			<div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center md:justify-between border-b border-black/[0.05] pb-8">
				{/* Categories - Swipeable Glass pills style */}
				<div className="flex items-center gap-2 overflow-x-auto scrollbar-none bg-neutral-100/50 p-1 rounded-full border border-black/[0.03] max-w-full flex-nowrap px-1.5 py-1.5 shrink-0">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setActiveCategory(category)}
							className={`py-1.5 px-4 md:py-2 md:px-5 text-[0.62rem] md:text-[0.68rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full cursor-pointer shrink-0 ${
								activeCategory === category
									? "bg-black text-white shadow-xs"
									: "text-neutral-500 hover:text-black"
							}`}
							type="button"
						>
							{category}
						</button>
					))}
				</div>

				{/* Search Input - Glass Panel */}
				<div className="relative w-full max-w-sm">
					<span className="absolute inset-y-0 left-4.5 flex items-center pointer-events-none text-neutral-400">
						<svg
							className="size-4"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</span>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Tìm kiếm bài viết..."
						className="w-full rounded-full border border-white/40 bg-white/40 px-5 py-2.5 pl-11 pr-5 text-[0.82rem] placeholder-neutral-400 backdrop-blur-md outline-hidden transition-all focus:border-white/80 focus:bg-white/60 focus:ring-1 focus:ring-white/10 shadow-xs"
					/>
				</div>
			</div>

			{/* No Results */}
			{filteredPosts.length === 0 && (
				<div className="py-20 text-center">
					<h3 className="font-serif text-2xl font-light text-neutral-500">
						Không tìm thấy bài viết nào
					</h3>
					<p className="mt-2 text-sm text-neutral-400">
						Vui lòng nhập từ khóa khác hoặc thay đổi bộ lọc.
					</p>
					<button
						onClick={() => {
							setActiveCategory("Tất cả");
							setSearchQuery("");
						}}
						className="mt-6 border border-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
						type="button"
					>
						Đặt lại bộ lọc
					</button>
				</div>
			)}

			{/* Featured Post (Highlighted) */}
			{featuredPost && (
				<GlassCard
					variant="light"
					intensity="low"
					borderStrength="low"
					className="group mb-16 overflow-hidden shadow-xs rounded-3xl p-1"
				>
					<div className="grid gap-0 md:grid-cols-12">
						{/* Featured Image */}
						<div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:col-span-7 md:h-[450px] rounded-2xl">
							<Image
								src={featuredPost.coverImage}
								alt={featuredPost.title}
								fill
								priority
								sizes="(min-width: 768px) 60vw, 100vw"
								className="object-cover transition-transform duration-700 group-hover:scale-103"
							/>
							<GlassCard
								variant="light"
								intensity="high"
								borderStrength="medium"
								className="absolute top-4 left-4 w-fit px-3.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-neutral-800 rounded-full shadow-xs border border-white/40"
							>
								{featuredPost.category}
							</GlassCard>
						</div>

						{/* Featured Info */}
						<div className="flex flex-col justify-between p-6 md:col-span-5 md:p-10 lg:p-12">
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-3 text-[0.7rem] text-neutral-400">
									<span>{featuredPost.date}</span>
									<span className="size-1 rounded-full bg-neutral-300" />
									<span>{featuredPost.readTime}</span>
								</div>
								<h2 className="font-serif text-2xl font-bold leading-tight text-neutral-900 group-hover:text-neutral-600 transition-colors md:text-3xl tracking-tight">
									<Link href={`/blog/${featuredPost.slug}`}>
										{featuredPost.title}
									</Link>
								</h2>
								<p className="text-[0.9rem] leading-relaxed text-neutral-500 font-light">
									{featuredPost.summary}
								</p>
							</div>
							<div className="mt-8 flex justify-end border-t border-black/[0.04] pt-6">
								<GlassButton
									href={`/blog/${featuredPost.slug}`}
									variant="dark"
									className="!py-2.5 !px-6 text-[0.68rem] tracking-wider"
								>
									Đọc tiếp ➔
								</GlassButton>
							</div>
						</div>
					</div>
				</GlassCard>
			)}

			{/* Regular Posts Grid */}
			{regularPosts.length > 0 && (
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{regularPosts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="block group"
						>
							<GlassCard
								variant="light"
								intensity="low"
								borderStrength="low"
								hoverable
								className="flex flex-col justify-between shadow-xs p-1 rounded-3xl cursor-pointer min-h-[400px] md:min-h-[460px]"
							>
								<div>
									{/* Post Image */}
									<div className="relative aspect-3/2 w-full overflow-hidden rounded-2xl">
										<Image
											src={post.coverImage}
											alt={post.title}
											fill
											sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
											className="object-cover transition-transform duration-500 group-hover:scale-103"
										/>
										<GlassCard
											variant="light"
											intensity="high"
											borderStrength="medium"
											className="absolute top-4 left-4 w-fit px-3.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.2em] text-neutral-800 rounded-full shadow-xs border border-white/40"
										>
											{post.category}
										</GlassCard>
									</div>

									{/* Post Info */}
									<div className="p-5 md:p-6">
										<div className="flex items-center gap-3 text-[0.7rem] text-neutral-400 mb-3">
											<span>{post.date}</span>
											<span className="size-1 rounded-full bg-neutral-300" />
											<span>{post.readTime}</span>
										</div>
										<h3 className="font-serif text-lg font-bold leading-snug text-neutral-900 mt-1 tracking-tight flex items-start justify-between gap-2">
											<span>{post.title}</span>
											<span className="font-serif text-sm opacity-80 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
												↗
											</span>
										</h3>
										<p className="mt-3 text-xs leading-relaxed text-neutral-500 line-clamp-3 font-light">
											{post.summary}
										</p>
									</div>
								</div>
							</GlassCard>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
