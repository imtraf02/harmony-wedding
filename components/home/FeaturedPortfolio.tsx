import Link from 'next/link';
import Image from 'next/image';
import { SectionTitle } from '@/components/shared/SectionTitle';
import type { Portfolio } from '@/types';

interface FeaturedPortfolioProps {
  items: Portfolio[];
}

export function FeaturedPortfolio({ items }: FeaturedPortfolioProps) {
  if (!items.length) return null;

  return (
    <section className="py-24 md:py-32 bg-zinc-900 text-white" aria-label="Featured portfolio">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionTitle
          eyebrow="Tác phẩm tiêu biểu"
          title="Những câu chuyện nổi bật"
          subtitle="Cùng điểm lại những khoảnh khắc hạnh phúc mà chúng tôi đã có vinh dự được đồng hành và lưu giữ."
        />
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-4 h-[1000px] md:h-[800px] mt-16">
          {items.slice(0, 6).map((item, i) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              aria-label={`Xem portfolio: ${item.title}`}
              id={`featured-item-${item.slug}`}
            >
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  priority={i === 0}
                  sizes={i === 0 ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                  style={{ objectFit: 'cover' }}
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">{item.style}</p>
                <h3 className="text-2xl font-cormorant text-white">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link 
            href="/portfolio" 
            className="inline-flex items-center justify-center rounded-full px-10 py-5 text-base font-medium border border-gold text-gold hover:bg-gold hover:text-zinc-950 transition-all" 
            id="view-all-portfolio-btn"
          >
            Xem tất cả Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
