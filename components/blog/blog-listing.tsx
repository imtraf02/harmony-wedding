"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { blogCategories, blogPosts } from "@/constants/blog";

export function BlogListing() {
	const [activeCategory, setActiveCategory] = useState("Tất cả");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredPosts = blogPosts.filter((post) => {
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
		<section className="mx-auto max-w-[1400px] px-5 py-12 md:px-10 md:py-20">
			{/* Filters & Search */}
			<div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-center md:justify-between border-b border-neutral-100 pb-8">
				{/* Categories */}
				<div className="flex flex-wrap gap-2 md:gap-3">
					{blogCategories.map((category) => (
						<button
							key={category}
							onClick={() => setActiveCategory(category)}
							className={`rounded-full px-5 py-2 text-[0.75rem] font-medium tracking-wider uppercase transition-all duration-300 ${
								activeCategory === category
									? "bg-black text-white shadow-md shadow-black/10"
									: "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 hover:text-black"
							}`}
							type="button"
						>
							{category}
						</button>
					))}
				</div>

				{/* Search Input */}
				<div className="relative w-full max-w-sm">
					<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-neutral-400">
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
						className="w-full rounded-full border border-neutral-200 bg-neutral-50/50 py-2.5 pl-11 pr-5 text-[0.85rem] placeholder-neutral-400 outline-hidden transition-all focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
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
				<div className="group mb-16 overflow-hidden border border-neutral-100 bg-white shadow-xs transition-all hover:shadow-lg md:mb-20">
					<div className="grid gap-0 md:grid-cols-12">
						{/* Featured Image */}
						<div className="relative aspect-video w-full overflow-hidden md:aspect-auto md:col-span-7 md:h-[450px]">
							<Image
								src={featuredPost.coverImage}
								alt={featuredPost.title}
								fill
								priority
								sizes="(min-width: 768px) 60vw, 100vw"
								className="object-cover transition-transform duration-700 group-hover:scale-103"
							/>
							<div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-black">
								{featuredPost.category}
							</div>
						</div>

						{/* Featured Info */}
						<div className="flex flex-col justify-between p-6 md:col-span-5 md:p-10 lg:p-12">
							<div className="flex flex-col gap-4">
								<div className="flex items-center gap-3 text-xs text-neutral-400">
									<span>{featuredPost.date}</span>
									<span className="size-1 rounded-full bg-neutral-300" />
									<span>{featuredPost.readTime}</span>
								</div>
								<h2 className="font-serif text-2xl font-medium leading-tight text-neutral-900 group-hover:text-neutral-600 transition-colors md:text-3xl lg:text-4xl">
									<Link href={`/blog/${featuredPost.slug}`}>
										{featuredPost.title}
									</Link>
								</h2>
								<p className="text-sm leading-relaxed text-neutral-500">
									{featuredPost.summary}
								</p>
							</div>
							<div className="mt-8 flex justify-end border-t border-neutral-100 pt-6">
								<Link
									href={`/blog/${featuredPost.slug}`}
									className="group/btn flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black"
								>
									Đọc tiếp
									<svg
										className="size-3.5 transition-transform group-hover/btn:translate-x-1"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Regular Posts Grid */}
			{regularPosts.length > 0 && (
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{regularPosts.map((post) => (
						<article
							key={post.slug}
							className="group flex flex-col justify-between border border-neutral-100 bg-white shadow-xs transition-all duration-300 hover:shadow-md"
						>
							<div>
								{/* Post Image */}
								<div className="relative aspect-3/2 w-full overflow-hidden">
									<Image
										src={post.coverImage}
										alt={post.title}
										fill
										sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
										className="object-cover transition-transform duration-500 group-hover:scale-103"
									/>
									<span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-0.5 text-[0.62rem] font-semibold uppercase tracking-widest text-black">
										{post.category}
									</span>
								</div>

								{/* Post Info */}
								<div className="p-5 md:p-6">
									<div className="flex items-center gap-3 text-[0.7rem] text-neutral-400 mb-3">
										<span>{post.date}</span>
										<span className="size-1 rounded-full bg-neutral-300" />
										<span>{post.readTime}</span>
									</div>
									<h3 className="font-serif text-lg font-medium leading-snug text-neutral-900 group-hover:text-neutral-600 transition-colors md:text-xl line-clamp-2">
										<Link href={`/blog/${post.slug}`}>{post.title}</Link>
									</h3>
									<p className="mt-3 text-xs leading-relaxed text-neutral-500 line-clamp-3">
										{post.summary}
									</p>
								</div>
							</div>

							<div className="flex justify-end border-t border-neutral-100 px-5 py-4 md:px-6">
								<Link
									href={`/blog/${post.slug}`}
									className="group/btn flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-wider text-black"
								>
									Đọc tiếp
									<svg
										className="size-3 transition-transform group-hover/btn:translate-x-1"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</Link>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	);
}
