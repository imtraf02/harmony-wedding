"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { menuItems } from "@/constants/data";
import { gsap, useGSAP } from "@/lib/gsap";

interface HeaderProps {
	variant?: "home" | "solid";
}

export function Header({ variant = "home" }: HeaderProps) {
	const headerRef = useRef<HTMLElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const backdropRef = useRef<HTMLDivElement | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isSolid = variant === "solid" || isScrolled;

	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 24);

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
				{ autoAlpha: 0, y: -18 },
				{
					autoAlpha: 1,
					duration: 0.9,
					ease: "power4.out",
					stagger: 0.08,
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
					defaults: { ease: "power3.out", duration: 0.5 },
				});

				tl.set(backdropRef.current, { display: "block" })
					.to(backdropRef.current, { autoAlpha: 1, duration: 0.35 }, 0)
					.to(menuRef.current, { x: "0%", duration: 0.52 }, 0)
					.fromTo(
						".mobile-nav-link",
						{ autoAlpha: 0, y: 24 },
						{
							autoAlpha: 1,
							y: 0,
							stagger: 0.06,
							duration: 0.45,
							ease: "power2.out",
						},
						0.15,
					)
					.fromTo(
						".mobile-nav-contact",
						{ autoAlpha: 0, y: 15 },
						{ autoAlpha: 1, y: 0, duration: 0.4 },
						0.32,
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
					defaults: { ease: "power3.inOut", duration: 0.42 },
				});

				tl.to(menuRef.current, { x: "100%" }, 0)
					.to(backdropRef.current, { autoAlpha: 0, duration: 0.3 }, 0.12)
					.set(backdropRef.current, { display: "none" });
			}
		},
		{ dependencies: [isMenuOpen] },
	);

	return (
		<>
			<header
				className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
					isSolid
						? "border-b border-black/[0.06] bg-white/92 shadow-[0_10px_40px_rgba(0,0,0,0.05)] md:bg-white/82 md:backdrop-blur-xl"
						: "border-b border-transparent bg-transparent"
				}`}
				ref={headerRef}
			>
				<div
					className={`mx-auto grid max-w-[1720px] grid-cols-[1fr_auto] items-center px-5 transition-all duration-500 md:grid-cols-[260px_1fr_220px] md:px-10 lg:px-16 ${
						isScrolled ? "h-16" : "h-[5.5rem] md:h-24"
					}`}
				>
					<Link
						aria-label="Harmony Wedding"
						className="header-reveal relative block h-8 w-[140px] md:h-10 md:w-[176px]"
						href="/"
					>
						<Image
							alt="Harmony Wedding - Studio ảnh cưới tại Sài Gòn"
							className="object-contain object-left"
							fill
							priority
							sizes="(min-width: 768px) 176px, 140px"
							src="/logo.png"
						/>
					</Link>

					<nav className="header-reveal hidden justify-center gap-8 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-neutral-800 lg:flex xl:gap-10">
						{menuItems.map((item) => (
							<Link
								className="relative py-2 transition-colors hover:text-black after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-black after:transition-transform hover:after:scale-x-100"
								href={item.href}
								key={item.href}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="header-reveal flex items-center justify-end gap-4">
						<Link
							className="hidden h-11 items-center justify-center bg-black px-6 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-neutral-800 md:flex"
							href="/contact"
						>
							Tư Vấn Ngay
						</Link>
						<button
							aria-label="Mở menu"
							className={`grid size-11 place-items-center border lg:hidden ${
								isSolid ? "border-black/10" : "border-black/15"
							}`}
							onClick={() => setIsMenuOpen(true)}
							type="button"
						>
							<span className="flex w-5 flex-col gap-1.5">
								<span className="h-px w-full bg-black" />
								<span className="h-px w-full bg-black" />
							</span>
						</button>
					</div>
				</div>
			</header>

			{/* Mobile Menu Drawer */}
			<div
				ref={menuRef}
				className="fixed inset-y-0 right-0 z-50 flex h-dvh w-full max-w-[400px] flex-col justify-between bg-white px-6 pb-12 pt-6 shadow-2xl lg:hidden"
				style={{ transform: "translateX(100%)" }}
			>
				<div>
					<div className="flex h-16 items-center justify-between border-b border-black/[0.05] pb-4">
						<Link
							aria-label="Harmony Wedding"
							className="relative block h-8 w-[140px]"
							href="/"
							onClick={() => setIsMenuOpen(false)}
						>
							<Image
								alt="Harmony Wedding"
								className="object-contain object-left"
								fill
								sizes="140px"
								src="/logo.png"
							/>
						</Link>
						<button
							aria-label="Đóng menu"
							className="grid size-11 place-items-center border border-black/10 text-neutral-800 hover:bg-neutral-50 transition-colors"
							onClick={() => setIsMenuOpen(false)}
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

					<nav className="mt-10 flex flex-col gap-4">
						{menuItems.map((item) => (
							<Link
								className="mobile-nav-link font-serif text-[2.2rem] font-medium leading-none text-neutral-900 transition-colors hover:text-neutral-500 block"
								href={item.href}
								key={item.href}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>

				<div className="mobile-nav-contact border-t border-black/[0.08] pt-8">
					<div className="grid gap-6">
						<div>
							<span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-neutral-400">
								Hotline & Zalo
							</span>
							<a
								className="mt-1 block text-base font-semibold text-neutral-900 hover:underline"
								href="tel:0357256845"
							>
								0357.256.845
							</a>
							<a
								className="mt-1 block text-base font-semibold text-neutral-900 hover:underline"
								href="tel:0388660678"
							>
								0388.660.678
							</a>
						</div>
						<div>
							<span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-neutral-400">
								Địa chỉ
							</span>
							<p className="mt-1 text-sm leading-6 text-neutral-600">
								45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Backdrop for mobile menu */}
			<div
				ref={backdropRef}
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
				onClick={() => setIsMenuOpen(false)}
				style={{ display: "none", opacity: 0 }}
			/>
		</>
	);
}
