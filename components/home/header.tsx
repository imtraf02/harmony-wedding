"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import siteData from "@/data/site.json";
const menuItems = siteData.menuItems;
import { gsap, useGSAP } from "@/lib/gsap";
import { GlassButton } from "@/components/ui/glass-button";
import { trackContactChannel } from "@/lib/tracking";

interface HeaderProps {
	variant?: "home" | "solid";
}

export function Header({ variant = "home" }: HeaderProps) {
	const headerRef = useRef<HTMLElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 50);

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [isMenuOpen]);

	useGSAP(
		() => {
			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
				gsap.set(".header-reveal", { autoAlpha: 1, y: 0 });
				return;
			}

			gsap.fromTo(
				".header-reveal",
				{ autoAlpha: 0, y: -12 },
				{
					autoAlpha: 1,
					duration: 0.8,
					ease: "power4.out",
					stagger: 0.06,
					y: 0,
				},
			);
		},
		{ scope: headerRef },
	);

	// GSAP Mobile Menu Animations
	useGSAP(
		() => {
			if (!menuRef.current || !backdropRef.current) return;

			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			if (isMenuOpen) {
				gsap.killTweensOf([
					backdropRef.current,
					menuRef.current,
					".mobile-nav-link",
					".mobile-nav-contact",
				]);

				if (reduceMotion) {
					gsap.set(backdropRef.current, { autoAlpha: 1, display: "block" });
					gsap.set(menuRef.current, { x: "0%" });
					gsap.set(".mobile-nav-link", { autoAlpha: 1, y: 0 });
					gsap.set(".mobile-nav-contact", { autoAlpha: 1, y: 0 });
					return;
				}

				const tl = gsap.timeline({
					defaults: { ease: "power3.out", duration: 0.45 },
				});

				tl.set(backdropRef.current, { display: "block" })
					.to(backdropRef.current, { autoAlpha: 1, duration: 0.3 }, 0)
					.to(menuRef.current, { x: "0%", duration: 0.48 }, 0)
					.fromTo(
						".mobile-nav-link",
						{ autoAlpha: 0, y: 20 },
						{
							autoAlpha: 1,
							y: 0,
							stagger: 0.05,
							duration: 0.4,
							ease: "power2.out",
						},
						0.12,
					)
					.fromTo(
						".mobile-nav-contact",
						{ autoAlpha: 0, y: 12 },
						{ autoAlpha: 1, y: 0, duration: 0.35 },
						0.28,
					);
			} else {
				gsap.killTweensOf([
					backdropRef.current,
					menuRef.current,
					".mobile-nav-link",
					".mobile-nav-contact",
				]);

				if (reduceMotion) {
					gsap.set(backdropRef.current, { autoAlpha: 0, display: "none" });
					gsap.set(menuRef.current, { x: "100%" });
					return;
				}

				const tl = gsap.timeline({
					defaults: { ease: "power3.inOut", duration: 0.38 },
				});

				tl.to(menuRef.current, { x: "100%" }, 0)
					.to(backdropRef.current, { autoAlpha: 0, duration: 0.28 }, 0.1)
					.set(backdropRef.current, { display: "none" });
			}
		},
		{ dependencies: [isMenuOpen] },
	);

	// Responsive header styles to prevent mobile spacing bugs
	const outerHeaderClasses = `fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none ${
		isScrolled ? "md:top-3 md:px-6 lg:px-8" : "top-0 px-0"
	}`;

	const innerContainerClasses = `w-full px-5 flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] border ${
		isScrolled
			? "h-16 border-transparent border-b-black/[0.04] bg-white/80 backdrop-blur-xl shadow-xs md:rounded-[32px] md:border-white/20 md:shadow-[0_12px_32px_rgba(0,0,0,0.05)] md:px-8"
			: variant === "solid"
				? "h-[5.5rem] border-transparent border-b-black/[0.04] bg-white/90 backdrop-blur-lg md:h-20 md:rounded-[0px] md:px-10 lg:px-16 shadow-xs"
				: "h-[5.5rem] border-transparent border-b-black/[0.03] bg-white/20 backdrop-blur-md md:h-24 md:rounded-[0px] md:px-10 lg:px-16"
	}`;

	return (
		<>
			<header ref={headerRef} className={outerHeaderClasses}>
				<div className={`mx-auto max-w-[1720px] transition-all duration-500`}>
					<div className={innerContainerClasses}>
						<Link
							aria-label="Harmony Wedding"
							className="header-reveal relative block h-7 w-[124px] md:h-9 md:w-[158px]"
							href="/"
						>
							<Image
								alt="Harmony Wedding - Studio ảnh cưới tại Sài Gòn"
								className="object-contain object-left"
								fill
								priority
								sizes="(min-width: 768px) 158px, 124px"
								src="/logo.png"
							/>
						</Link>

						<nav className="header-reveal hidden justify-center gap-8 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-neutral-800 lg:flex xl:gap-10">
							{menuItems.map((item) => (
								<Link
									className="relative py-2 transition-colors duration-300 hover:text-black after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.25,1,0.5,1)] hover:after:scale-x-100"
									href={item.href}
									key={item.href}
								>
									{item.label}
								</Link>
							))}
						</nav>

						<div className="header-reveal flex items-center justify-end gap-4">
							<GlassButton
								variant="dark"
								className="hidden md:flex !py-2.5 !px-6"
								href="https://m.me/61550358332202?ref=tu_van_ngay"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => trackContactChannel("Messenger", "https://m.me/61550358332202?ref=tu_van_ngay")}
							>
								Tư Vấn Ngay
							</GlassButton>
							
							<button
								aria-label="Mở menu"
								className="grid size-10 place-items-center rounded-full border border-black/10 hover:bg-neutral-50 active:scale-95 transition-all lg:hidden pointer-events-auto"
								onClick={() => setIsMenuOpen(true)}
								type="button"
							>
								<span className="flex w-4 flex-col gap-1">
									<span className="h-px w-full bg-black" />
									<span className="h-px w-full bg-black" />
								</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Mobile Menu Drawer */}
			<div
				ref={menuRef}
				className="fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-[360px] flex-col justify-between border-l border-white/20 bg-white/80 backdrop-blur-2xl px-6 pb-12 pt-6 shadow-2xl lg:hidden"
				style={{ transform: "translateX(100%)" }}
			>
				<div>
					<div className="flex h-16 items-center justify-between border-b border-black/[0.05] pb-4">
						<Link
							aria-label="Harmony Wedding"
							className="relative block h-7 w-[124px]"
							href="/"
							onClick={() => setIsMenuOpen(false)}
						>
							<Image
								alt="Harmony Wedding"
								className="object-contain object-left"
								fill
								sizes="124px"
								src="/logo.png"
							/>
						</Link>
						<button
							aria-label="Đóng menu"
							className="grid size-10 place-items-center border border-black/10 text-neutral-800 rounded-full hover:bg-neutral-50 transition-colors"
							onClick={() => setIsMenuOpen(false)}
							type="button"
						>
							<svg
								className="size-4"
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

					<nav className="mt-8 flex flex-col gap-3">
						{menuItems.map((item) => (
							<Link
								className="mobile-nav-link font-serif text-[1.8rem] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500 block"
								href={item.href}
								key={item.href}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>

				<div className="mobile-nav-contact border-t border-black/[0.08] pt-6">
					<div className="grid gap-5">
						<div>
							<span className="block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-neutral-400">
								Hotline & Zalo
							</span>
							<a
								className="mt-1 block text-sm font-semibold text-neutral-900 hover:text-neutral-500 transition-colors"
								href="tel:0357256845"
							>
								0357.256.845
							</a>
							<a
								className="mt-0.5 block text-sm font-semibold text-neutral-900 hover:text-neutral-500 transition-colors"
								href="tel:0388660678"
							>
								0388.660.678
							</a>
						</div>
						<div>
							<span className="block text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-neutral-400">
								Địa chỉ
							</span>
							<p className="mt-1 text-xs leading-5 text-neutral-600">
								45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Backdrop for mobile menu */}
			<div
				ref={backdropRef}
				className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs lg:hidden"
				onClick={() => setIsMenuOpen(false)}
				style={{ display: "none", opacity: 0 }}
			/>
		</>
	);
}
