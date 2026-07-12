import Link from "next/link";
import siteData from "@/data/site.json";
const menuItems = siteData.menuItems;
import { siteConfig } from "@/lib/config";

export function Footer() {
	return (
		<footer className="bg-neutral-950 text-neutral-200 border-t border-white/10 pt-16 pb-8 md:pt-24 md:pb-12 relative overflow-hidden">
			<div className="mx-auto max-w-[1500px] px-5 md:px-10 lg:px-16">
				{/* Large Editorial Headline */}
				<div className="mb-12 md:mb-16 border-b border-white/10 pb-12 md:pb-16">
					<h2 className="font-serif text-[clamp(1.6rem,4.5vw,3rem)] md:text-[clamp(1.8rem,5vw,3.6rem)] text-white/90 leading-tight tracking-tight max-w-4xl">
						Gìn giữ trọn vẹn những nhịp thở của tình yêu, những khoảnh khắc nhẹ
						nhàng mà sâu lắng nhất.
					</h2>
				</div>

				<div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] pb-12 md:pb-16">
					{/* Brand & Socials Column */}
					<div className="flex flex-col justify-between h-full sm:col-span-2 lg:col-span-1">
						<div>
							<Link className="flex w-fit flex-col leading-none" href="/">
								<span className="font-sans font-bold text-3xl tracking-[0.28em] text-white">
									HARMONY
								</span>
								<span className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.52em] text-neutral-400">
									Wedding
								</span>
							</Link>
							<p className="mt-6 max-w-md lg:max-w-xs text-sm leading-7 text-neutral-400 font-light">
								Lưu giữ những khoảnh khắc nghệ thuật và cảm xúc tự nhiên vượt
								thời gian của các cặp đôi.
							</p>
						</div>

						<div className="mt-8 flex flex-wrap gap-3">
							<a
								href={siteConfig.links.facebook}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook Fanpage"
								className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
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
										d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
									/>
								</svg>
							</a>
							<a
								href={siteConfig.links.messenger}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Messenger"
								className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
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
										d="M8.667 11.667h.01M12 11.667h.01M15.333 11.667h.01M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
									/>
								</svg>
							</a>
							<a
								href={siteConfig.links.zalo}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Zalo"
								className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[0.58rem] font-semibold tracking-tighter text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
							>
								ZALO
							</a>
							<a
								href={siteConfig.links.tiktok}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="TikTok"
								className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
							>
								<svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.85.97 1.96 1.7 3.2 2.11v3.98c-1.4-.15-2.78-.65-3.95-1.46V15c.03 2.1-.88 4.14-2.48 5.48-1.78 1.53-4.27 2.12-6.52 1.53-2.6-.68-4.66-2.88-5.18-5.54-.59-2.97.77-6.05 3.32-7.53 1.34-.78 2.89-1.12 4.43-.98V12c-.93-.16-1.92.1-2.65.7-.85.67-1.32 1.74-1.25 2.82.07 1.36.96 2.58 2.27 2.97.98.3 2.06.07 2.8-.62.77-.73 1.13-1.84 1.05-2.88l-.01-14.96z" />
								</svg>
							</a>
							<a
								href={siteConfig.links.youtube}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="YouTube"
								className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
							>
								<svg
									className="size-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
								>
									<rect
										width="20"
										height="14"
										x="2"
										y="5"
										rx="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M10 10l5 3-5 3v-6z"
									/>
								</svg>
							</a>
						</div>
					</div>

					{/* Navigation Column */}
					<div>
						<span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-neutral-500 mb-4 md:mb-6">
							Khám Phá
						</span>
						<nav className="flex flex-col gap-3.5 text-sm font-light text-neutral-400">
							{menuItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="w-fit transition-colors hover:text-white relative py-0.5 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform hover:after:scale-x-100"
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Contact Column */}
					<div>
						<span className="block text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-neutral-500 mb-4 md:mb-6">
							Kết Nối
						</span>
						<div className="text-sm font-light leading-relaxed text-neutral-400 grid gap-5">
							<div>
								<h4 className="font-semibold text-white uppercase tracking-wider text-[0.64rem] mb-1.5">
									Địa Chỉ Studio
								</h4>
								<p className="leading-6">{siteConfig.address}</p>
								<Link
									href={siteConfig.links.googleMaps}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-2 inline-flex items-center gap-1 text-xs text-white hover:text-neutral-300 font-normal transition-colors"
								>
									Chỉ đường trên Google Maps
									<span className="font-serif">↗</span>
								</Link>
							</div>

							<div>
								<h4 className="font-semibold text-white uppercase tracking-wider text-[0.64rem] mb-1.5">
									Hotline Liên Hệ
								</h4>
								<div className="leading-6 grid gap-1">
									<a
										href={`tel:${siteConfig.links.phone}`}
										className="hover:text-white transition-colors block w-fit"
									>
										0357.256.845 (CSKH chính)
									</a>
									<a
										href={`tel:${siteConfig.links.phoneSecondary}`}
										className="hover:text-white transition-colors block w-fit"
									>
										0388.660.678 (Hotline phụ)
									</a>
								</div>
							</div>

							<div>
								<h4 className="font-semibold text-white uppercase tracking-wider text-[0.64rem] mb-1.5">
									Email
								</h4>
								<div className="leading-6 grid gap-1">
									<a
										href={`mailto:${siteConfig.email}`}
										className="hover:text-white transition-colors block break-all w-fit"
									>
										{siteConfig.email}
									</a>
									<a
										href={`mailto:${siteConfig.emailSecondary}`}
										className="hover:text-white transition-colors block break-all w-fit"
									>
										{siteConfig.emailSecondary}
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Massive backdrop brand water mark */}
				<div className="mt-6 md:mt-12 select-none text-center font-black block overflow-hidden">
					<span className="font-sans text-[clamp(3.5rem,15vw,14rem)] text-white/[0.02] tracking-[0.25em] uppercase leading-none block translate-y-[15%] md:translate-y-[20%]">
						HARMONY
					</span>
				</div>

				<div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-neutral-500 gap-4 text-center md:text-left">
					<div>
						© {new Date().getFullYear()} Harmony Wedding. Bản quyền thuộc về
						studio.
					</div>
					<div>Khoảnh khắc trọn đời · Trảng Bom, Đồng Nai</div>
				</div>
			</div>
		</footer>
	);
}
