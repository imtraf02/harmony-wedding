"use client";

import { useRef } from "react";
import { BookingForm } from "@/components/contact/booking-form";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function BookingSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	useScrollReveal(sectionRef);

	return (
		<section
			ref={sectionRef}
			className="relative isolate overflow-hidden bg-neutral-100 py-24 text-black md:py-32"
			id="booking-section"
		>
			<div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
				<div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
					<div data-reveal className="lg:sticky lg:top-32">
						<p className="mb-6 flex items-center gap-5 text-[0.68rem] font-bold uppercase tracking-[0.3em] text-neutral-400">
							Liên hệ đặt lịch
							<span className="h-px w-16 bg-neutral-300" />
						</p>
						<h2 className="font-serif text-[clamp(2.45rem,4.5vw,4.8rem)] leading-[1.18] text-neutral-900 tracking-tight mb-8">
							Khởi Đầu Hành Trình Cưới Của Bạn
						</h2>
						<p className="text-[0.92rem] leading-8 text-neutral-500 font-light max-w-md mb-8">
							Hãy dành ra 15 phút trò chuyện thoải mái cùng Harmony Wedding. Chúng tôi sẽ giúp hai bạn định hình concept, lên kế hoạch chi tiết về trang phục, makeup và lộ trình quay chụp hoàn hảo nhất.
						</p>
						
						{/* Direct support notes */}
						<div className="space-y-4 text-xs text-neutral-400 font-light border-l border-black/5 pl-6">
							<p>
								<span className="font-medium text-neutral-700">Tư vấn trực tiếp:</span> 8:00 - 21:00 hàng ngày.
							</p>
							<p>
								<span className="font-medium text-neutral-700">Hotline Zalo chính:</span> 035.725.6845 (Gia Hân)
							</p>
							<p>
								<span className="font-medium text-neutral-700">Studio:</span> 45 Đường Cuối Chợ Đông Hoà, Trảng Bom, Đồng Nai.
							</p>
						</div>
					</div>
					
					<div data-reveal>
						<BookingForm formName="Form Trang Chủ Bottom" />
					</div>
				</div>
			</div>
		</section>
	);
}
