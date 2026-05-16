'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

export function CtaBanner() {
  return (
    <section className="relative py-20 md:py-48 overflow-hidden bg-luxury text-obsidian text-center border-t border-black/5" aria-label="Kêu gọi hành động">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] grayscale pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/uploads/portfolio/cta-bg.webp')] bg-cover bg-center scale-110" />
      </div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-label-luxury text-gold mb-8">
          Bạn đã sẵn sàng?
        </p>
        <h2 className="text-display font-sans font-light text-obsidian mb-10 leading-tight">
          Hãy cùng chúng tôi tạo nên<br />
          <em className=" font-light text-gold">Những điều tuyệt vời</em>
        </h2>
        <p className="text-smoke font-light max-w-xl mx-auto mb-14  leading-relaxed">
          Ngày cưới của bạn xứng đáng được lưu giữ trọn vẹn từng cảm xúc.<br />
          Hãy liên hệ với chúng tôi để được tư vấn miễn phí.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center bg-obsidian text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-ash hover:text-obsidian transition-all duration-500 shadow-luxury rounded-none" 
            id="cta-banner-contact"
          >
            Đăng ký tư vấn miễn phí
          </Link>
          <Link 
            href="/pricing" 
            className="inline-flex items-center justify-center border border-black/10 text-ash px-12 py-5 text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-obsidian hover:text-white transition-all duration-500 rounded-none" 
            id="cta-banner-pricing"
          >
            Xem bảng giá
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
