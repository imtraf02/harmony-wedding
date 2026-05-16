"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  const primaryBtnClass = cn(
    "relative inline-flex items-center justify-center overflow-hidden px-12 py-5",
    "bg-obsidian font-bold text-[11px] text-white uppercase tracking-[0.25em]",
    "group/btn rounded-none shadow-luxury transition-all duration-500 ease-in-out",
    "hover:text-obsidian",
  );

  const secondaryBtnClass = cn(
    "relative inline-flex items-center justify-center overflow-hidden px-12 py-5",
    "border border-black/10 font-bold text-[11px] text-ash uppercase tracking-[0.25em]",
    "group/btn rounded-none transition-all duration-500 ease-in-out",
    "hover:border-obsidian hover:text-white",
  );

  const fillClass =
    "absolute inset-0 bg-white origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";
  const darkFillClass =
    "absolute inset-0 bg-obsidian origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]";

  return (
    <section
      className="relative overflow-hidden border-black/5 border-t bg-ivory py-20 text-center text-obsidian md:py-48"
      aria-label="Kêu gọi hành động"
    >
      {/* Background with overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] grayscale"
        aria-hidden="true"
      >
        <div className="absolute inset-0 scale-110 bg-[url('/uploads/portfolio/cta-bg.webp')] bg-center bg-cover" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-8 text-label-luxury text-smoke">Bạn đã sẵn sàng?</p>
        <h2 className="mb-10 font-light font-sans text-display text-obsidian leading-tight">
          Hãy cùng chúng tôi tạo nên
          <br />
          <em className="font-light italic">Những điều tuyệt vời</em>
        </h2>
        <p className="mx-auto mb-14 max-w-xl font-light text-ash leading-relaxed">
          Ngày cưới của bạn xứng đáng được lưu giữ trọn vẹn từng cảm xúc.
          <br />
          Hãy liên hệ với chúng tôi để được tư vấn miễn phí.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
          <Link
            href="/contact"
            className={primaryBtnClass}
            id="cta-banner-contact"
          >
            <span className={fillClass} />
            <span className="relative z-10">Đăng ký tư vấn miễn phí</span>
          </Link>
          <Link
            href="/pricing"
            className={secondaryBtnClass}
            id="cta-banner-pricing"
          >
            <span className={darkFillClass} />
            <span className="relative z-10">Xem bảng giá</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
