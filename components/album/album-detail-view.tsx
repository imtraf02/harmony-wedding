"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/icon";
import { albumItems } from "@/constants/data";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/config";
import type { AlbumDetail } from "@/types/home";

interface AlbumDetailViewProps {
	album: AlbumDetail;
}

export function AlbumDetailView({ album }: AlbumDetailViewProps) {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const touchStartX = useRef<number | null>(null);

	// Close lightbox
	const closeLightbox = useCallback(() => {
		setActiveIndex(null);
	}, []);

	// Next image
	const showNext = useCallback(() => {
		if (activeIndex === null) return;
		setActiveIndex((prev) =>
			prev !== null && prev < album.gallery.length - 1 ? prev + 1 : 0,
		);
	}, [activeIndex, album.gallery.length]);

	// Prev image
	const showPrev = useCallback(() => {
		if (activeIndex === null) return;
		setActiveIndex((prev) =>
			prev !== null && prev > 0 ? prev - 1 : album.gallery.length - 1,
		);
	}, [activeIndex, album.gallery.length]);

	// Touch swipe support for mobile
	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (touchStartX.current === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX.current - touchEndX;

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				showNext();
			} else {
				showPrev();
			}
		}
		touchStartX.current = null;
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (activeIndex === null) return;
			if (e.key === "Escape") closeLightbox();
			if (e.key === "ArrowRight") showNext();
			if (e.key === "ArrowLeft") showPrev();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [activeIndex, closeLightbox, showNext, showPrev]);

	// Prevent scroll when open
	useEffect(() => {
		if (activeIndex !== null) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeIndex]);

	const relatedAlbums = albumItems
		.filter((item) => item.slug !== album.slug)
		.slice(0, 4);

	useGSAP(
		() => {
			const root = rootRef.current;

			if (!root) {
				return;
			}

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(
					".album-hero-copy > *, .album-gallery-item, .album-info-card, .album-cta, .album-related-title, .album-related-card",
					{
						autoAlpha: 1,
						scale: 1,
						y: 0,
					},
				);
				return;
			}

			gsap.fromTo(
				".album-hero-copy > *",
				{ autoAlpha: 0, y: 32 },
				{
					autoAlpha: 1,
					duration: 0.9,
					ease: "power4.out",
					stagger: 0.08,
					y: 0,
				},
			);

			gsap.fromTo(
				".album-hero-image img",
				{ scale: 1.08 },
				{
					ease: "none",
					scale: 1,
					scrollTrigger: {
						end: "bottom top",
						scrub: 1,
						start: "top top",
						trigger: ".album-hero-section",
					},
				},
			);

			const galleryItems = gsap.utils.toArray<HTMLElement>(
				".album-gallery-item",
			);
			if (galleryItems.length > 0) {
				gsap.fromTo(
					galleryItems,
					{ autoAlpha: 0, y: 36 },
					{
						autoAlpha: 1,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							start: "top 85%",
							trigger: ".album-gallery-grid",
							once: true,
						},
						stagger: 0.08,
						y: 0,
					},
				);
			}

			gsap.fromTo(
				".album-info-card",
				{ autoAlpha: 0, y: 34 },
				{
					autoAlpha: 1,
					duration: 0.72,
					ease: "power3.out",
					scrollTrigger: {
						start: "top 78%",
						trigger: ".album-info-grid",
						once: true,
					},
					stagger: 0.08,
					y: 0,
				},
			);

			gsap.fromTo(
				".album-cta",
				{ autoAlpha: 0, scale: 0.96, y: 48 },
				{
					autoAlpha: 1,
					duration: 0.9,
					ease: "power4.out",
					scale: 1,
					scrollTrigger: {
						start: "top 78%",
						trigger: ".album-cta",
						once: true,
					},
					y: 0,
				},
			);

			gsap.fromTo(
				".album-cta img",
				{ yPercent: -8 },
				{
					ease: "none",
					scrollTrigger: {
						end: "bottom top",
						scrub: 1,
						start: "top bottom",
						trigger: ".album-cta",
					},
					yPercent: 8,
				},
			);

			gsap.fromTo(
				".album-related-title, .album-related-card",
				{ autoAlpha: 0, y: 34 },
				{
					autoAlpha: 1,
					duration: 0.78,
					ease: "power3.out",
					scrollTrigger: {
						start: "top 80%",
						trigger: ".album-related-section",
						once: true,
					},
					stagger: 0.08,
					y: 0,
				},
			);

			requestAnimationFrame(() => ScrollTrigger.refresh());
		},
		{ scope: rootRef },
	);

	return (
		<div ref={rootRef} className="bg-[#FAF9F5]">
			{/* Breadcrumb Header */}
			<section className="album-hero-section pt-[5.5rem] lg:pt-24">
				<div className="mx-auto max-w-7xl px-5 py-5 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-neutral-400 md:px-10">
					<Link href="/" className="hover:text-black transition-colors">Trang Chủ</Link>
					<span className="mx-3 text-neutral-300">/</span>
					<Link href="/portfolio" className="hover:text-black transition-colors">Tác Phẩm</Link>
					<span className="mx-3 text-neutral-300">/</span>
					<span className="text-neutral-800 font-bold">{album.title}</span>
				</div>

				{/* Mobile Hero View */}
				<div className="lg:hidden">
					<div className="album-hero-image relative h-[45vh] min-h-[320px] overflow-hidden bg-neutral-100">
						<Image
							alt={album.heroAlt}
							className="object-cover"
							fill
							priority
							sizes="100vw"
							src={album.heroImage}
							unoptimized
						/>
					</div>
					<AlbumIntro album={album} compact />
				</div>

				{/* Desktop Hero View */}
				<div className="hidden min-h-[660px] grid-cols-[0.44fr_0.56fr] items-stretch lg:grid border-b border-black/[0.05]">
					<div className="flex items-center px-16 xl:px-24">
						<AlbumIntro album={album} />
					</div>
					<div className="album-hero-image relative overflow-hidden bg-neutral-100 border-l border-black/[0.05]">
						<Image
							alt={album.heroAlt}
							className="object-cover"
							fill
							priority
							sizes="56vw"
							src={album.heroImage}
							unoptimized
						/>
					</div>
				</div>
			</section>

			{/* Section Header for Gallery */}
			<section className="pt-20 pb-8 border-t border-black/[0.05]" id="gallery">
				<div className="mx-auto max-w-7xl px-5 md:px-10">
					<p className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-neutral-400">
						BỘ ALBUM ẢNH
					</p>
					<h2 className="font-serif text-3xl md:text-4xl text-neutral-900 tracking-tight">
						Khám Phá Các Khung Hình
					</h2>
				</div>
			</section>

			{/* Vertical Lookbook Gallery Grid - Masonry style */}
			<section className="album-gallery-grid pb-24">
				<div className="mx-auto max-w-7xl px-5 md:px-10">
					<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 [column-fill:_balance] w-full">
						{album.gallery.map((item, index) => {
							const width = item.width ?? 1366;
							const height = item.height ?? 2048;

							return (
								<article
									className="album-gallery-item break-inside-avoid mb-8 relative w-full overflow-hidden rounded-none bg-neutral-100 cursor-zoom-in group border border-black/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-lg transition-shadow duration-700"
									key={item.image}
									onClick={() => setActiveIndex(index)}
									style={{ aspectRatio: `${width} / ${height}` }}
								>
									<Image
										alt={item.alt}
										className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
										fill
										sizes="(min-width: 1280px) 320px, (min-width: 768px) 340px, (min-width: 640px) 384px, 100vw"
										src={item.image}
										unoptimized
									/>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			{/* Architectural Specs Matrix (2-columns layout) */}
			<section className="px-5 pb-20 md:px-10 lg:pb-32">
				<div className="album-info-grid mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 border-t border-black/[0.08]">
					{album.info.map((item, index) => (
						<article
							className={`album-info-card py-12 pr-8 flex flex-col justify-between ${
								index === 0
									? "md:border-r md:border-black/[0.08] border-b border-black/[0.08] md:border-b-0"
									: "md:pl-8"
							}`}
							key={item.title}
						>
							<div>
								<span className="text-[0.62rem] font-bold text-neutral-400 tracking-[0.2em] uppercase">
									0{index + 1} / {item.title}
								</span>
								<p className="font-serif text-[1.45rem] text-neutral-900 leading-tight mt-6 tracking-tight">
									{item.description}
								</p>
							</div>
						</article>
					))}
				</div>
			</section>

			{/* Immersive Editorial CTA */}
			<AlbumDetailCta image={album.heroImage} />

			{/* Related Albums */}
			<section className="album-related-section bg-[#FAF9F5] py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-5 md:px-10">
					<p className="album-related-title mb-12 flex items-center gap-5 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-neutral-400">
						Album liên quan khác
						<span className="h-px w-16 bg-neutral-300" />
					</p>

					<div className="hidden grid-cols-4 gap-8 lg:grid">
						{relatedAlbums.map((item) => (
							<RelatedAlbumCard key={item.slug} slug={item.slug} />
						))}
					</div>

					<div className="space-y-4 lg:hidden">
						{relatedAlbums.map((item) => (
							<Link
								className="album-related-card grid grid-cols-[96px_1fr_auto] items-center gap-4 border-b border-black/10 pb-4"
								href={`/portfolio/${item.slug}`}
								key={item.slug}
							>
								<div className="relative h-16 overflow-hidden rounded-none bg-neutral-100 border border-black/[0.04]">
									<Image
										alt={item.alt}
										className="object-cover"
										fill
										sizes="96px"
										src={item.image}
										unoptimized
									/>
								</div>
								<div>
									<h2 className="font-serif text-lg leading-tight text-neutral-900">
										{item.title}
									</h2>
									<p className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-neutral-400">
										{item.category}
									</p>
								</div>
								<span className="font-serif text-sm">→</span>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* Immersive Lightbox Modal */}
			<AnimatePresence>
				{activeIndex !== null && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950/98 backdrop-blur-md select-none"
						onClick={closeLightbox}
						onTouchStart={handleTouchStart}
						onTouchEnd={handleTouchEnd}
					>
						{/* Top bar controls */}
						<div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/50 to-transparent">
							<span className="font-sans text-[0.66rem] font-bold tracking-widest uppercase text-white/70">
								{album.gallery[activeIndex].alt.split(" - ")[0]} /{" "}
								{String(album.gallery.length).padStart(2, "0")}
							</span>
							<button
								onClick={closeLightbox}
								className="grid size-11 place-items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
								aria-label="Đóng ảnh"
								type="button"
							>
								<svg
									className="size-5"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Active Image viewport */}
						<div
							className="relative flex items-center justify-center w-full h-full p-4 md:p-12 overflow-auto"
							onClick={closeLightbox}
						>
							<div
								className="relative max-w-full max-h-[82vh] h-full"
								style={{
									aspectRatio: `${album.gallery[activeIndex].width ?? 1366} / ${album.gallery[activeIndex].height ?? 2048}`,
								}}
								onClick={(e) => e.stopPropagation()}
							>
								<Image
									src={album.gallery[activeIndex].image}
									alt={album.gallery[activeIndex].alt}
									fill
									className="object-contain"
									priority
									unoptimized
								/>
							</div>
						</div>

						{/* Navigation Controls (Desktop) */}
						<button
							onClick={(e) => {
								e.stopPropagation();
								showPrev();
							}}
							className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5 cursor-pointer"
							aria-label="Ảnh trước"
							type="button"
						>
							<svg
								className="size-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 19.5L8.25 12l7.5-7.5"
								/>
							</svg>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								showNext();
							}}
							className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 size-14 items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors border border-white/5 cursor-pointer"
							aria-label="Ảnh sau"
							type="button"
						>
							<svg
								className="size-6"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.25 4.5l7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>

						{/* Mobile swipe helper text */}
						<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/50 text-[0.62rem] tracking-[0.24em] uppercase pointer-events-none">
							Vuốt ngang để chuyển ảnh
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

interface AlbumIntroProps {
	album: AlbumDetail;
	compact?: boolean;
}

function AlbumIntro({ album, compact = false }: AlbumIntroProps) {
	return (
		<div className={`album-hero-copy text-left ${compact ? "px-5 py-12" : ""}`}>
			<p className="mb-6 text-[0.62rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
				{album.eyebrow}
			</p>
			<h1 className="font-serif text-[clamp(3.6rem,8vw,6.5rem)] uppercase leading-[0.84] text-neutral-900 tracking-tighter">
				{album.title}
			</h1>
			{album.scriptTitle && (
				<p className="mt-2.5 font-serif text-[clamp(2rem,5vw,3rem)] italic leading-[1.1] text-neutral-500">
					{album.scriptTitle}
				</p>
			)}
			<p className="mt-8 max-w-md text-[0.92rem] leading-8 text-neutral-500 font-light">
				{album.description}
			</p>
			
			{/* Architectural Specs Summary */}
			<div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-black/[0.06] pt-10 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-neutral-800">
				<div className="flex flex-col gap-1.5">
					<span className="text-neutral-400 font-medium tracking-[0.16em]">Bản Giao</span>
					<span>{album.imageCount}</span>
				</div>
				<div className="flex flex-col gap-1.5">
					<span className="text-neutral-400 font-medium tracking-[0.16em]">Địa Điểm</span>
					<span>{album.location}</span>
				</div>
			</div>

			<Link
				className="group/btn mt-10 inline-flex h-13 items-center justify-between bg-black px-8 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white hover:bg-neutral-800 transition-colors w-full sm:w-auto rounded-none"
				href="/contact"
			>
				<span>Xem video highlight</span>
				<span className="ml-6 font-serif text-sm transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
			</Link>
		</div>
	);
}

function AlbumDetailCta({ image }: { image: string }) {
	return (
		<section className="px-0 py-8 md:px-10 lg:px-16">
			<div className="album-cta relative mx-auto grid max-w-7xl overflow-hidden bg-neutral-950 p-10 text-white rounded-none md:p-14 lg:grid-cols-[1fr_0.8fr] lg:p-20">
				<Image
					alt="Nền tư vấn album cưới Harmony Wedding - Liên hệ ngay"
					className="object-cover opacity-[0.12]"
					fill
					sizes="100vw"
					src={image}
					unoptimized
				/>
				<div className="relative">
					<h2 className="max-w-xl font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] tracking-tight">
						Bạn yêu thích phong cách này? Hãy để chúng tôi kể câu chuyện của bạn.
					</h2>
					<Link
						className="group/btn mt-10 inline-flex h-13 items-center justify-between bg-white px-8 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-black hover:bg-neutral-100 transition-colors w-full sm:w-auto rounded-none"
						href="/contact"
					>
						<span>Tư vấn ngay</span>
						<span className="font-serif text-xs transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
					</Link>
				</div>
				<div className="relative mt-12 grid gap-6 border-t border-white/10 pt-10 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/50 sm:grid-cols-2 lg:mt-0 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
					<div className="flex flex-col gap-1.5">
						<span className="text-white/40 font-medium">Hotline Gia Hân (chính)</span>
						<span className="text-white font-bold">{siteConfig.links.phone}</span>
					</div>
					<div className="flex flex-col gap-1.5">
						<span className="text-white/40 font-medium">Hotline Hiếu Trần</span>
						<span className="text-white font-bold">{siteConfig.links.phoneSecondary}</span>
					</div>
				</div>
			</div>
		</section>
	);
}

function RelatedAlbumCard({ slug }: { slug: string }) {
	const item = albumItems.find((album) => album.slug === slug);

	if (!item) {
		return null;
	}

	return (
		<Link
			className="group flex flex-col gap-4 text-left"
			href={`/portfolio/${item.slug}`}
		>
			<div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-100 rounded-none border border-black/[0.04]">
				<Image
					alt={item.alt}
					className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
					fill
					sizes="(min-width: 1024px) 25vw, 50vw"
					src={item.image}
					unoptimized
				/>
			</div>
			<div>
				<span className="text-[0.62rem] font-bold text-neutral-400 tracking-[0.2em] uppercase">
					{item.category}
				</span>
				<h3 className="font-serif text-xl text-neutral-900 mt-1.5 tracking-tight flex items-center justify-between">
					<span>{item.title}</span>
					<span className="font-serif text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
				</h3>
			</div>
		</Link>
	);
}
