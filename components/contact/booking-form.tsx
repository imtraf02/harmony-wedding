"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { trackContactChannel } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";
import { MessageCircle, Smartphone, PhoneCall, Mail } from "lucide-react";

export function BookingForm({ formName = "Liên hệ nhanh" }: { formName?: string }) {
	const messengerUrl = siteConfig.links.messenger;
	const zaloUrl = siteConfig.links.zalo;
	const emailUrl = `mailto:${siteConfig.email}`;
	const phoneUrl = `tel:${siteConfig.links.phone}`;

	return (
		<GlassCard
			variant="light"
			intensity="high"
			borderStrength="medium"
			className="w-full p-6 sm:p-8 md:p-10 border border-white/50 shadow-lg rounded-3xl"
		>
			<h3 className="font-serif text-2xl text-neutral-900 mb-2 tracking-tight">
				Liên Hệ Đăng Ký Tư Vấn
			</h3>
			<p className="text-[0.78rem] leading-6 text-neutral-500 font-light mb-8">
				Hãy chọn kênh liên hệ thuận tiện nhất phía dưới để kết nối trực tiếp với ekip tư vấn của Harmony Wedding và nhận báo giá chi tiết.
			</p>

			<div className="grid gap-4 sm:grid-cols-2">
				{/* Messenger Card */}
				<div className="flex flex-col justify-between p-4 rounded-xl border border-black/[0.04] bg-white/20 hover:border-amber-500/20 transition-all duration-300 group">
					<div className="flex items-start gap-3 mb-4">
						<div className="size-8 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center shrink-0">
							<MessageCircle className="size-4 group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
						</div>
						<div>
							<h4 className="font-serif text-sm font-medium text-neutral-800">Messenger</h4>
							<p className="text-[0.68rem] text-neutral-400 font-light mt-0.5">Hỗ trợ nhận báo giá & concept nhanh nhất</p>
						</div>
					</div>
					<GlassButton
						variant="dark"
						href={messengerUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full !py-2 text-[0.68rem] text-center font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform"
						onClick={() => trackContactChannel("Messenger", messengerUrl)}
					>
						Chat Messenger
					</GlassButton>
				</div>

				{/* Zalo Card */}
				<div className="flex flex-col justify-between p-4 rounded-xl border border-black/[0.04] bg-white/20 hover:border-amber-500/20 transition-all duration-300 group">
					<div className="flex items-start gap-3 mb-4">
						<div className="size-8 bg-teal-500/10 text-teal-600 rounded-full flex items-center justify-center shrink-0">
							<Smartphone className="size-4 group-hover:animate-bounce" strokeWidth={2} />
						</div>
						<div>
							<h4 className="font-serif text-sm font-medium text-neutral-800">Zalo Chat</h4>
							<p className="text-[0.68rem] text-neutral-400 font-light mt-0.5">Tư vấn chi tiết và gửi file ảnh/concept</p>
						</div>
					</div>
					<GlassButton
						variant="dark"
						href={zaloUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full !py-2 text-[0.68rem] text-center font-bold tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform"
						onClick={() => trackContactChannel("Zalo", zaloUrl)}
					>
						Chat Zalo
					</GlassButton>
				</div>

				{/* Hotline Card */}
				<div className="flex flex-col justify-between p-4 rounded-xl border border-black/[0.04] bg-white/20 hover:border-amber-500/20 transition-all duration-300 group">
					<div className="flex items-start gap-3 mb-4">
						<div className="size-8 bg-amber-500/10 text-amber-600 rounded-full flex items-center justify-center shrink-0">
							<PhoneCall className="size-4 icon-ring" strokeWidth={2} />
						</div>
						<div>
							<h4 className="font-serif text-sm font-medium text-neutral-800">Hotline 24/7</h4>
							<p className="text-[0.68rem] text-neutral-400 font-light mt-0.5">Gọi điện trực tiếp trao đổi tức thì</p>
						</div>
					</div>
					<GlassButton
						variant="light"
						href={phoneUrl}
						className="w-full !py-2 text-[0.68rem] text-center font-bold tracking-wider border border-black/10 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
						onClick={() => trackContactChannel("Hotline", phoneUrl)}
					>
						Gọi Hotline
					</GlassButton>
				</div>

				{/* Email Card */}
				<div className="flex flex-col justify-between p-4 rounded-xl border border-black/[0.04] bg-white/20 hover:border-amber-500/20 transition-all duration-300 group">
					<div className="flex items-start gap-3 mb-4">
						<div className="size-8 bg-rose-500/10 text-rose-600 rounded-full flex items-center justify-center shrink-0">
							<Mail className="size-4 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300" strokeWidth={2} />
						</div>
						<div>
							<h4 className="font-serif text-sm font-medium text-neutral-800">Email</h4>
							<p className="text-[0.68rem] text-neutral-400 font-light mt-0.5">Gửi các ý tưởng thiết kế & hợp tác</p>
						</div>
					</div>
					<GlassButton
						variant="light"
						href={emailUrl}
						className="w-full !py-2 text-[0.68rem] text-center font-bold tracking-wider border border-black/10 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98] transition-all"
						onClick={() => trackContactChannel("Email", emailUrl)}
					>
						Gửi Email
					</GlassButton>
				</div>
			</div>

			{/* Inject micro-animations via standard CSS */}
			<style dangerouslySetInnerHTML={{ __html: `
				@keyframes phone-ring {
					0%, 100% { transform: rotate(0deg); }
					15% { transform: rotate(-18deg); }
					30% { transform: rotate(18deg); }
					45% { transform: rotate(-14deg); }
					60% { transform: rotate(14deg); }
					75% { transform: rotate(-8deg); }
					90% { transform: rotate(8deg); }
				}
				.icon-ring {
					animation: phone-ring 2.4s ease-in-out infinite;
					transform-origin: bottom left;
				}
				.icon-ring:hover { animation-play-state: paused; }
			`}} />
		</GlassCard>
	);
}
