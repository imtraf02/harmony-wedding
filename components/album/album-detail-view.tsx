"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import portfolioData from "@/data/portfolio.json";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/config";
import type { AlbumDetail } from "@/types/home";

const albumItems = portfolioData.albumItems;
import { MeshGradient } from "@/components/ui/mesh-gradient";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { trackContactChannel } from "@/lib/tracking";

interface AlbumDetailViewProps {
	album: AlbumDetail;
}

export function AlbumDetailView({ album }: AlbumDetailViewProps) {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	
	// Pinch-to-zoom & pan states
	const [scale, setScale] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const isDragging = useRef<boolean>(false);
	const [isInteracting, setIsInteracting] = useState(false);

	const startDistance = useRef<number | null>(null);
	const startScale = useRef<number>(1);
	const touchStartX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);
	const isPinching = useRef<boolean>(false);

	const resetZoom = useCallback(() => {
		setScale(1);
		setPosition({ x: 0, y: 0 });
		setIsInteracting(false);
	}, []);

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
		resetZoom();
	}, [activeIndex, album.gallery.length, resetZoom]);

	// Prev image
	const showPrev = useCallback(() => {
		if (activeIndex === null) return;
		setActiveIndex((prev) =>
			prev !== null && prev > 0 ? prev - 1 : album.gallery.length - 1,
		);
		resetZoom();
	}, [activeIndex, album.gallery.length, resetZoom]);

	// Touch handlers supporting swipe (only when scale=1) and pinch-zoom / pan (when scale > 1)
	const handleTouchStart = (e: React.TouchEvent) => {
		if (activeIndex === null) return;

		if (e.touches.length === 1) {
			touchStartX.current = e.touches[0].clientX;
			touchStartY.current = e.touches[0].clientY;

			if (scale > 1) {
				isDragging.current = true;
				setIsInteracting(true);
				dragStart.current = {
					x: e.touches[0].clientX - position.x,
					y: e.touches[0].clientY - position.y,
				};
			}
		} else if (e.touches.length === 2) {
			isPinching.current = true;
			setIsInteracting(true);
			const dist = Math.hypot(
				e.touches[0].clientX - e.touches[1].clientX,
				e.touches[0].clientY - e.touches[1].clientY,
			);
			startDistance.current = dist;
			startScale.current = scale;
		}
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (activeIndex === null) return;

		if (isPinching.current && e.touches.length === 2 && startDistance.current !== null) {
			e.preventDefault();
			const dist = Math.hypot(
				e.touches[0].clientX - e.touches[1].clientX,
				e.touches[0].clientY - e.touches[1].clientY,
			);
			const factor = dist / startDistance.current;
			let newScale = startScale.current * factor;
			newScale = Math.max(1, Math.min(newScale, 4));
			setScale(newScale);

			if (newScale === 1) {
				setPosition({ x: 0, y: 0 });
			}
		} else if (scale > 1 && isDragging.current && e.touches.length === 1) {
			e.preventDefault();
			const x = e.touches[0].clientX - dragStart.current.x;
			const y = e.touches[0].clientY - dragStart.current.y;
			const maxTranslateX = (scale - 1) * window.innerWidth / 2;
			const maxTranslateY = (scale - 1) * window.innerHeight / 2;

			setPosition({
				x: Math.max(-maxTranslateX, Math.min(x, maxTranslateX)),
				y: Math.max(-maxTranslateY, Math.min(y, maxTranslateY)),
			});
		}
	};

	const handleTouchEnd = (e: React.TouchEvent) => {
		if (activeIndex === null) return;

		if (isPinching.current) {
			if (e.touches.length < 2) {
				isPinching.current = false;
				startDistance.current = null;
				setIsInteracting(false);
			}
			return;
		}

		if (scale > 1) {
			isDragging.current = false;
			setIsInteracting(false);
			return;
		}

		if (touchStartX.current !== null && e.changedTouches.length === 1) {
			const touchEndX = e.changedTouches[0].clientX;
			const touchEndY = e.changedTouches[0].clientY;
			const diffX = touchStartX.current - touchEndX;
			const diffY = touchStartY.current! - touchEndY;

			if (Math.abs(diffX) > 50 && Math.abs(diffY) < 100) {
				if (diffX > 0) {
					showNext();
				} else {
					showPrev();
				}
			}
		}
		touchStartX.current = null;
		touchStartY.current = null;
	};

	// Mouse handlers for desktop panning
	const handleMouseDown = (e: React.MouseEvent) => {
		if (scale > 1) {
			e.preventDefault();
			isDragging.current = true;
			setIsInteracting(true);
			dragStart.current = {
				x: e.clientX - position.x,
				y: e.clientY - position.y,
			};
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (scale > 1 && isDragging.current) {
			e.preventDefault();
			const x = e.clientX - dragStart.current.x;
			const y = e.clientY - dragStart.current.y;
			const maxTranslateX = (scale - 1) * window.innerWidth / 2;
			const maxTranslateY = (scale - 1) * window.innerHeight / 2;

			setPosition({
				x: Math.max(-maxTranslateX, Math.min(x, maxTranslateX)),
				y: Math.max(-maxTranslateY, Math.min(y, maxTranslateY)),
			});
		}
	};

	const handleMouseUp = () => {
		isDragging.current = false;
		setIsInteracting(false);
	};

	// Double click to toggle zoom
	const handleDoubleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (scale > 1) {
			resetZoom();
		} else {
			setScale(2.5);
			setPosition({ x: 0, y: 0 });
		}
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
		<div ref={rootRef} className="bg-[#fcfbfc] relative overflow-hidden">
			{/* Light moving mesh gradient background */}
			<MeshGradient variant="light" className="opacity-75" />

			{/* Breadcrumb Header */}
			<section className="album-hero-section pt-[5.5rem] lg:pt-24 relative z-10">
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
			<section className="pt-20 pb-8 border-t border-black/[0.05] relative z-10" id="gallery">
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
			<section className="album-gallery-grid pb-24 relative z-10">
				<div className="mx-auto max-w-7xl px-5 md:px-10">
					<div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 [column-fill:_balance] w-full">
						{album.gallery.map((item, index) => {
							const width = item.width ?? 1366;
							const height = item.height ?? 2048;

							return (
								<GlassCard
									key={item.image}
									variant="light"
									intensity="low"
									borderStrength="low"
									className="album-gallery-item break-inside-avoid mb-8 relative w-full border border-white/40 shadow-xs p-1.5 rounded-2xl cursor-zoom-in group hover:shadow-md"
									onClick={() => { resetZoom(); setActiveIndex(index); }}
									style={{ aspectRatio: `${width} / ${height}` }}
								>
									<div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100">
										<Image
											alt={item.alt}
											className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
											fill
											sizes="(min-width: 1280px) 320px, (min-width: 768px) 340px, (min-width: 640px) 384px, 100vw"
											src={item.image}
											unoptimized
											priority={index < 4}
										/>
									</div>
								</GlassCard>
							);
						})}
					</div>
				</div>
			</section>



			{/* Immersive Editorial CTA */}
			<AlbumDetailCta image={album.heroImage} title={album.title} />

			{/* Related Albums */}
			<section className="album-related-section bg-transparent py-20 lg:py-28 relative z-10">
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
								<GlassCard
									variant="light"
									intensity="low"
									borderStrength="low"
									className="relative h-16 w-24 border border-white/40 shadow-xs p-1 rounded-lg shrink-0"
								>
									<div className="relative h-full w-full overflow-hidden rounded-md bg-neutral-100">
										<Image
											alt={item.alt}
											className="object-cover"
											fill
											sizes="96px"
											src={item.image}
											unoptimized
										/>
									</div>
								</GlassCard>
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
						className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black select-none"
						onClick={closeLightbox}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
					>
						{/* Top bar controls */}
						<div className="absolute top-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6 text-white bg-gradient-to-b from-black/60 to-transparent">
							<span className="font-sans text-[0.62rem] font-bold tracking-[0.24em] uppercase text-white/70">
								{album.title} &mdash; {String(activeIndex + 1).padStart(2, "0")}/{String(album.gallery.length).padStart(2, "0")}
							</span>
							<div className="flex items-center gap-4">
								<button
									onClick={closeLightbox}
									className="grid size-9 place-items-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
									aria-label="Đóng ảnh"
									type="button"
								>
									<svg
										className="size-4"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.8"
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
						</div>

						{/* Active Image viewport */}
						<div
							className="relative flex items-center justify-center w-full h-full p-4 md:p-12 overflow-hidden"
							onClick={closeLightbox}
						>
							<div
								className={`relative max-w-full max-h-[86vh] h-full ${scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
								style={{
									aspectRatio: `${album.gallery[activeIndex].width ?? 1366} / ${album.gallery[activeIndex].height ?? 2048}`,
									transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
									transition: isInteracting ? "none" : "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
								}}
								onClick={(e) => e.stopPropagation()}
								onDoubleClick={handleDoubleClick}
								onMouseDown={handleMouseDown}
								onMouseMove={handleMouseMove}
								onMouseUp={handleMouseUp}
								onMouseLeave={handleMouseUp}
							>
								<Image
									src={album.gallery[activeIndex].image}
									alt={album.gallery[activeIndex].alt}
									fill
									className="object-contain pointer-events-none"
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
			<h1 className="font-serif text-[clamp(3.6rem,8vw,6.5rem)] uppercase leading-[1.08] text-neutral-900 tracking-tighter">
				{album.title}
			</h1>
			{album.scriptTitle && (
				<p className="mt-2.5 font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.1] text-neutral-500">
					{album.scriptTitle}
				</p>
			)}
			<p className="mt-8 max-w-md text-[0.92rem] leading-8 text-neutral-500 font-light">
				{album.description}
			</p>
			



		</div>
	);
}

function AlbumDetailCta({ image, title }: { image: string; title: string }) {
	return (
		<section className="px-5 py-8 md:px-10 lg:px-16 relative z-10">
			<GlassCard
				variant="dark"
				intensity="high"
				borderStrength="medium"
				className="album-cta relative mx-auto grid max-w-7xl overflow-hidden p-10 text-white rounded-3xl md:p-14 lg:grid-cols-[1fr_0.8fr] lg:p-20 border border-white/10 shadow-lg"
			>
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
					<div className="mt-10">
						<GlassButton
							variant="light"
							href={`https://m.me/61550358332202?ref=${encodeURIComponent("Album_" + title.replace(/\s+/g, "_"))}`}
							target="_blank"
							rel="noopener noreferrer"
							className="w-full sm:w-auto !py-3 !px-8 text-[0.68rem] tracking-[0.22em] hover:text-black border-white/30"
							onClick={() => trackContactChannel("Messenger", `https://m.me/61550358332202?ref=${encodeURIComponent("Album_" + title.replace(/\s+/g, "_"))}`)}
						>
							Tư vấn ngay ➔
						</GlassButton>
					</div>
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
			</GlassCard>
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
			<GlassCard
				variant="light"
				intensity="low"
				borderStrength="low"
				className="relative aspect-[3/2] w-full border border-white/40 shadow-xs p-1.5 rounded-2xl"
			>
				<div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-100">
					<Image
						alt={item.alt}
						className="object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
						fill
						sizes="(min-width: 1024px) 25vw, 50vw"
						src={item.image}
						unoptimized
					/>
				</div>
			</GlassCard>
			<div>
				<span className="text-[0.62rem] font-bold text-neutral-400 tracking-[0.2em] uppercase">
					{item.category}
				</span>
				<h3 className="font-serif text-xl text-neutral-900 mt-1.5 tracking-tight flex items-center justify-between">
					<span>{item.title}</span>
					<span className="font-serif text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
						↗
					</span>
				</h3>
			</div>
		</Link>
	);
}
