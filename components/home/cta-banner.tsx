import Link from 'next/link';

export function CtaBanner() {
  return (
    <section className="relative py-32 overflow-hidden bg-background text-foreground text-center border-t border-border" aria-label="Kêu gọi hành động">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-10 grayscale pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[url('/uploads/portfolio/cta-bg.webp')] bg-cover bg-center" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-sm uppercase tracking-[0.3em] text-gold font-medium mb-6 animate-fade-in">
          Bạn đã sẵn sàng?
        </p>
        <h2 className="text-5xl md:text-7xl mb-10 leading-[1.1] font-cormorant animate-fade-in-up text-foreground">
          Hãy cùng chúng tôi tạo nên<br />
          <span className="italic font-light text-gold/80">Những điều tuyệt vời</span>
        </h2>
        <p className="text-lg font-light text-muted-foreground max-w-xl mx-auto mb-12 italic animate-fade-in-up [animation-delay:0.1s]">
          Ngày cưới của bạn xứng đáng được lưu giữ trọn vẹn từng cảm xúc.<br />
          Hãy liên hệ với chúng tôi để được tư vấn miễn phí.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:0.2s]">
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base font-medium bg-gold text-white hover:opacity-90 shadow-lg shadow-gold/20 transition-all" 
            id="cta-banner-contact"
          >
            Đăng ký tư vấn miễn phí
          </Link>
          <Link 
            href="/pricing" 
            className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base font-medium border border-border text-foreground hover:bg-accent transition-all" 
            id="cta-banner-pricing"
          >
            Xem bảng giá
          </Link>
        </div>
      </div>
    </section>
  );
}
