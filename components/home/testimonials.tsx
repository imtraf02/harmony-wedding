import { SectionTitle } from '@/components/shared/SectionTitle';
import type { Testimonial } from '@/types';

interface TestimonialsProps {
  items: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16" height="16" viewBox="0 0 16 16"
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor" strokeWidth="1.5"
          aria-hidden="true"
          className={i < rating ? 'text-gold' : 'text-muted/50'}
        >
          <path d="M8 1l1.854 3.756L14 5.411l-3 2.923.708 4.131L8 10.354 4.292 12.465 5 8.334 2 5.411l4.146-.655L8 1z"/>
        </svg>
      ))}
    </div>
  );
}

export function Testimonials({ items }: TestimonialsProps) {
  if (!items.length) return null;

  return (
    <section className="py-24 md:py-32" aria-label="Đánh giá từ khách hàng">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <SectionTitle
          eyebrow="Phản hồi từ các cặp đôi"
          title="Những câu chuyện tình yêu & Sự tin tưởng"
        />
        <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide mt-16" role="list" aria-label="Đánh giá từ khách hàng">
          {items.map(t => (
            <article key={t.id} className="flex-shrink-0 w-full md:w-[450px] p-10 bg-card rounded-3xl snap-center border border-border" role="listitem">
              <StarRating rating={t.rating} />
              <blockquote className="text-xl italic font-light text-foreground leading-relaxed mb-8 font-cormorant">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <footer className="flex items-center gap-4">
                {t.avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.avatar}
                    alt={t.couple_name}
                    width={44}
                    height={44}
                    className="rounded-full grayscale w-11 h-11 object-cover border border-border"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-semibold text-foreground leading-tight">{t.couple_name}</p>
                  {t.wedding_year && (
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                      {t.service === 'photography' ? 'Chụp ảnh' : t.service === 'videography' ? 'Quay phim' : 'Đám cưới'} · {t.wedding_year}
                    </p>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
