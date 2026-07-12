/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";

export function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem("harmony-consent");
		if (!consent) {
			setShowBanner(true);
		}
	}, []);

	const handleConsent = (granted: boolean) => {
		const choice = granted ? "granted" : "declined";
		localStorage.setItem("harmony-consent", choice);
		setShowBanner(false);

		// Trigger TikTok Pixel consent
		if (typeof window !== "undefined" && (window as any).ttq) {
			try {
				if (granted) {
					(window as any).ttq.grantConsent();
					(window as any).ttq.page();
				} else {
					(window as any).ttq.revokeConsent();
				}
			} catch (err) {
				console.error("Failed to update TikTok Pixel consent:", err);
			}
		}
	};

	if (!showBanner) return null;

	return (
		<div className="fixed bottom-6 left-1/2 z-50 w-[92vw] max-w-[680px] -translate-x-1/2 px-1">
			<GlassCard
				variant="light"
				intensity="high"
				borderStrength="high"
				className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/60 text-left md:flex-row md:items-center md:justify-between md:gap-8"
			>
				<div className="flex-1">
					<h3 className="font-serif text-lg font-semibold text-neutral-900 mb-1.5 tracking-tight">
						Quyền riêng tư & Cookie
					</h3>
					<p className="text-[0.76rem] leading-6 text-neutral-500 font-light">
						Chúng tôi sử dụng cookie để mang lại trải nghiệm tốt nhất trên website và tối ưu hóa quảng cáo. Bằng cách nhấn “Đồng ý”, bạn cho phép Harmony Wedding sử dụng cookie và pixel theo{" "}
						<Link
							href="/chinh-sach-bao-mat"
							className="text-neutral-800 font-semibold hover:text-neutral-500 transition-colors"
						>
							Chính sách bảo mật
						</Link>{" "}
						của chúng tôi.
					</p>
				</div>
				<div className="flex items-center gap-3 sm:gap-4 shrink-0 justify-end">
					<button
						onClick={() => handleConsent(false)}
						className="py-2.5 px-5 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-neutral-500 hover:text-neutral-800 transition-colors rounded-xl border border-neutral-200 hover:bg-black/5 cursor-pointer"
						type="button"
					>
						Từ chối
					</button>
					<button
						onClick={() => handleConsent(true)}
						className="py-2.5 px-6 text-[0.66rem] font-bold uppercase tracking-[0.16em] bg-neutral-900 text-white hover:bg-neutral-850 active:scale-[0.97] transition-all rounded-xl cursor-pointer"
						type="button"
					>
						Đồng ý
					</button>
				</div>
			</GlassCard>
		</div>
	);
}
