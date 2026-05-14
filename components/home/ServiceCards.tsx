import Link from 'next/link';
import { SectionTitle } from '@/components/shared/SectionTitle';

const SERVICES = [
  {
    slug       : 'photography',
    title      : 'Chụp ảnh cưới',
    description: 'Phong cách phóng sự, ánh sáng tự nhiên giúp lưu giữ trọn vẹn những cảm xúc chân thật nhất.',
    icon       : '📷',
    href       : '/services/photography',
    color      : 'var(--gold)',
  },
  {
    slug       : 'videography',
    title      : 'Quay phim cưới',
    description: 'Những thước phim 4K điện ảnh kết hợp flycam, kể lại câu chuyện tình yêu của bạn một cách sống động.',
    icon       : '🎬',
    href       : '/services/videography',
    color      : 'var(--primary)',
  },
  {
    slug       : 'wedding-film',
    title      : 'Phóng sự cưới',
    description: 'Trải nghiệm phim tài liệu trọn vẹn — từ hậu trường đến những thước phim dài đầy ý nghĩa.',
    icon       : '🎞️',
    href       : '/services/wedding-film',
    color      : 'var(--sage)',
  },
];

export function ServiceCards() {
  return (
    <section className="py-24 md:py-32" aria-label="Dịch vụ của chúng tôi">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionTitle
          eyebrow="Dịch vụ"
          title="Kể lại câu chuyện của riêng bạn"
          subtitle="Dù bạn cần chụp ảnh, quay phim hay một trải nghiệm trọn gói — chúng tôi luôn có những giải pháp phù hợp nhất."
        />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {SERVICES.map(service => (
            <Link 
              key={service.slug} 
              href={service.href} 
              className="p-10 bg-card border border-border rounded-3xl transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 group" 
              id={`service-card-${service.slug}`}
            >
              <div className="text-4xl mb-8 opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: service.color }}>
                <span aria-hidden="true">{service.icon}</span>
              </div>
              <h3 className="text-2xl mb-4 font-cormorant">{service.title}</h3>
              <p className="text-muted-foreground font-light leading-relaxed mb-8">
                {service.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground group-hover:text-gold transition-colors">
                Tìm hiểu thêm
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
