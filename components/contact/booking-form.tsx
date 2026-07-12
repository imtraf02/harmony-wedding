"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { trackFormSubmission, trackContactChannel } from "@/lib/tracking";
import { siteConfig } from "@/lib/config";

interface BookingFormData {
	name: string;
	phone: string;
	weddingDate: string;
	location: string;
	service: string;
	message: string;
}

const INITIAL_STATE: BookingFormData = {
	name: "",
	phone: "",
	weddingDate: "",
	location: "",
	service: "",
	message: "",
};

const SERVICES = [
	{ value: "chup-anh-cuoi", label: "Chụp ảnh cưới (Studio, Phim trường...)" },
	{ value: "quay-phim-cuoi", label: "Quay phim ngày cưới (Phóng sự, Cinematic)" },
	{ value: "makeup-co-dau", label: "Trang điểm cô dâu (Gia Hân Makeup)" },
	{ value: "thue-vay-vest", label: "Thuê váy cưới & vest thiết kế" },
	{ value: "tron-goi-combo", label: "Dịch vụ ngày cưới trọn gói / Combo" },
	{ value: "dao-tao-nhiep-anh", label: "Đào tạo nghề (Quay, Chụp, Makeup)" },
	{ value: "khac", label: "Dịch vụ khác" },
];

export function BookingForm({ formName = "Đặt lịch tư vấn" }: { formName?: string }) {
	const [formData, setFormData] = useState<BookingFormData>(INITIAL_STATE);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});

	const validateForm = () => {
		const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
		
		if (!formData.name.trim()) {
			newErrors.name = "Vui lòng nhập họ và tên của bạn.";
		}
		
		const phoneRegex = /^(0|84)[3|5|7|8|9][0-9]{8}$/;
		if (!formData.phone.trim()) {
			newErrors.phone = "Vui lòng nhập số điện thoại hoặc Zalo.";
		} else if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
			newErrors.phone = "Số điện thoại không đúng định dạng (VD: 0357256845).";
		}

		if (!formData.service) {
			newErrors.service = "Vui lòng chọn dịch vụ bạn quan tâm.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof BookingFormData]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setIsSubmitting(true);
		setSubmitStatus("idle");

		// Simulate client-side validation success and transition
		setTimeout(() => {
			setIsSubmitting(false);
			setSubmitStatus("success");
			trackFormSubmission(formName);
		}, 600);
	};

	return (
		<GlassCard
			variant="light"
			intensity="high"
			borderStrength="medium"
			className="w-full p-6 sm:p-8 md:p-10 border border-white/50 shadow-lg rounded-3xl"
		>
			<h3 className="font-serif text-2xl text-neutral-900 mb-2 tracking-tight">
				Nhận Concept & Báo Giá Chi Tiết
			</h3>
			<p className="text-[0.78rem] leading-6 text-neutral-500 font-light mb-8">
				Để lại thông tin ngắn dưới đây và kết nối trực tiếp với Harmony để nhận concept mẫu kèm báo giá nhanh chóng.
			</p>

			{submitStatus === "success" ? (
				<div className="bg-emerald-50/80 border border-emerald-200/60 p-6 rounded-2xl text-center">
					<div className="size-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
						✓
					</div>
					<h4 className="font-serif text-lg font-medium text-emerald-900 mb-2">
						Thông tin hợp lệ!
					</h4>
					<p className="text-xs leading-5 text-emerald-700 font-light mb-6">
						Để nhận báo giá và concept tư vấn nhanh nhất từ điều phối viên Harmony, hai bạn vui lòng nhấn nút liên hệ Zalo hoặc gọi Hotline bên dưới:
					</p>

					<div className="flex flex-col gap-3 sm:flex-row justify-center sm:items-center">
						<GlassButton
							variant="dark"
							href={siteConfig.links.zalo}
							target="_blank"
							rel="noopener noreferrer"
							className="!py-2.5 !px-6 text-xs w-full sm:w-auto text-center"
							onClick={() => trackContactChannel("Zalo", siteConfig.links.zalo)}
						>
							Chat Zalo Ngay
						</GlassButton>
						<GlassButton
							variant="light"
							href={`tel:${siteConfig.links.phone}`}
							className="!py-2.5 !px-6 text-xs w-full sm:w-auto border border-black/10 text-center"
							onClick={() => trackContactChannel("Hotline", `tel:${siteConfig.links.phone}`)}
						>
							Gọi Hotline: {siteConfig.links.phone}
						</GlassButton>
					</div>

					<button
						onClick={() => {
							setFormData(INITIAL_STATE);
							setSubmitStatus("idle");
						}}
						className="mt-6 text-[0.66rem] font-bold uppercase tracking-widest text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer block mx-auto"
						type="button"
					>
						Nhập lại thông tin
					</button>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-5">
					<div className="grid gap-5 sm:grid-cols-2">
						{/* Name */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="name" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
								Họ và tên *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="VD: Nguyễn Văn A"
								className={`w-full rounded-xl border bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all ${
									errors.name ? "border-red-400" : "border-black/[0.08]"
								}`}
							/>
							{errors.name && <span className="text-[0.6rem] text-red-500">{errors.name}</span>}
						</div>

						{/* Phone */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="phone" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
								Số điện thoại / Zalo *
							</label>
							<input
								type="text"
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								placeholder="VD: 0357256845"
								className={`w-full rounded-xl border bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all ${
									errors.phone ? "border-red-400" : "border-black/[0.08]"
								}`}
							/>
							{errors.phone && <span className="text-[0.6rem] text-red-500">{errors.phone}</span>}
						</div>
					</div>

					<div className="grid gap-5 sm:grid-cols-2">
						{/* Wedding Date */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="weddingDate" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
								Ngày cưới dự kiến
							</label>
							<input
								type="date"
								id="weddingDate"
								name="weddingDate"
								value={formData.weddingDate}
								onChange={handleChange}
								className="w-full rounded-xl border border-black/[0.08] bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all"
							/>
						</div>

						{/* Location */}
						<div className="flex flex-col gap-1.5">
							<label htmlFor="location" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
								Khu vực chụp mong muốn
							</label>
							<input
								type="text"
								id="location"
								name="location"
								value={formData.location}
								onChange={handleChange}
								placeholder="VD: Đà Lạt, Sunny Garden, Biên Hòa..."
								className="w-full rounded-xl border border-black/[0.08] bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all"
							/>
						</div>
					</div>

					{/* Service Dropdown */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="service" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
							Dịch vụ cưới quan tâm *
						</label>
						<select
							id="service"
							name="service"
							value={formData.service}
							onChange={handleChange}
							className={`w-full max-w-full truncate rounded-xl border bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all ${
								errors.service ? "border-red-400" : "border-black/[0.08]"
							}`}
						>
							<option value="">-- Chọn dịch vụ cưới của bạn --</option>
							{SERVICES.map((s) => (
								<option key={s.value} value={s.value}>
									{s.label}
								</option>
							))}
						</select>
						{errors.service && <span className="text-[0.6rem] text-red-500">{errors.service}</span>}
					</div>

					{/* Message */}
					<div className="flex flex-col gap-1.5">
						<label htmlFor="message" className="text-[0.62rem] font-bold uppercase tracking-widest text-neutral-500">
							Ghi chú thêm cho Ekip (Ý tưởng / Lời nhắn)
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows={3}
							placeholder="Hãy cho Harmony biết mong muốn hoặc gu hình ảnh riêng của hai bạn..."
							className="w-full rounded-xl border border-black/[0.08] bg-white/40 px-4 py-2.5 text-xs text-neutral-800 focus:border-neutral-900 focus:bg-white focus:outline-hidden transition-all resize-none"
						/>
					</div>

					{submitStatus === "error" && (
						<div className="text-[0.7rem] text-red-500 leading-relaxed">
							Có lỗi xảy ra khi xử lý thông tin. Xin vui lòng liên hệ trực tiếp qua số hotline Zalo hoặc Messenger để được tư vấn nhanh nhất.
						</div>
					)}

					{/* Submit Button */}
					<div className="pt-2">
						<GlassButton
							type="submit"
							disabled={isSubmitting}
							className="w-full !py-3 rounded-xl flex items-center justify-center gap-2 !whitespace-normal !tracking-wider text-center"
						>
							{isSubmitting ? (
								<>
									<span className="size-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
									Đang xử lý...
								</>
							) : (
								<>Gửi yêu cầu nhận concept & báo giá ➔</>
							)}
						</GlassButton>
					</div>
				</form>
			)}
		</GlassCard>
	);
}
