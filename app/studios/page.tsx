import { buildMetadata } from '@/lib/metadata';
import { CtaBanner } from '@/components/home/cta-banner';
import { getAllStudios } from '@/lib/queries/studios';
import type { Studio } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, ClockIcon, MapPinIcon, SparklesIcon } from 'lucide-react';

export const metadata = buildMetadata({
  title      : 'Hệ thống Studio | Không gian sáng tạo của chúng tôi',
  description: 'Khám phá các không gian studio hiện đại và đầy cảm hứng của Harmony Studio tại các thành phố lớn.',
  path       : '/studios',
});

const typeLabels = {
  studio: 'Studio',
  outdoor: 'Ngoại cảnh',
  destination: 'Điểm đến',
};

const fallbackStudios: Studio[] = [
  {
    id: 1,
    slug: 'harmony-studio',
    name: 'Harmony Studio',
    type: 'studio',
    address: 'Không gian chụp trong nhà với ánh sáng được kiểm soát tinh tế',
    city: 'TP. Hồ Chí Minh',
    description: 'Bối cảnh tối giản, thanh lịch và dễ biến hóa cho những album cưới hiện đại, editorial hoặc concept gia đình.',
    highlights: ['Ánh sáng studio ổn định', 'Bối cảnh tối giản cao cấp', 'Phù hợp chụp album và hình cổng'],
    images: ['/img/prewedding.jpg'],
    map_embed_url: null,
    best_time: '09:00 - 17:00',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 2,
    slug: 'garden-concept',
    name: 'Garden Concept',
    type: 'outdoor',
    address: 'Không gian vườn xanh dành cho phong cách tự nhiên',
    city: 'Ngoại cảnh',
    description: 'Ánh sáng tự nhiên, mảng xanh và chất liệu mềm mại giúp bộ ảnh giữ được cảm giác trong trẻo, gần gũi.',
    highlights: ['Ánh sáng tự nhiên', 'Phù hợp váy cưới bay nhẹ', 'Tông ảnh lãng mạn và trong trẻo'],
    images: ['/img/wedding.jpg'],
    map_embed_url: null,
    best_time: '06:30 - 09:00 hoặc 15:30 - 17:30',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 3,
    slug: 'cinematic-location',
    name: 'Cinematic Location',
    type: 'destination',
    address: 'Các tuyến điểm chọn lọc cho bộ ảnh giàu chất điện ảnh',
    city: 'Theo lịch trình',
    description: 'Dành cho các cặp đôi muốn kể câu chuyện qua chuyển động, không gian rộng và những lớp cảnh có chiều sâu.',
    highlights: ['Tư vấn tuyến điểm theo concept', 'Phù hợp ảnh và phim pre-wedding', 'Kịch bản chụp theo ánh sáng trong ngày'],
    images: ['/img/cinematic.jpg'],
    map_embed_url: null,
    best_time: 'Theo mùa và lịch trình',
    is_active: true,
    sort_order: 3,
  },
];

export default function StudiosPage() {
  const studios = getAllStudios();
  const visibleStudios = studios.length > 0 ? studios : fallbackStudios;

  return (
    <div className="min-h-screen bg-luxury">
      <section className="pt-28 md:pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end mb-20">
            <div className="space-y-8 animate-fade-in-up-luxury">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold/50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                  Hệ thống cơ sở
                </span>
              </div>
              <h1
                className="font-sans font-light text-obsidian leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.7rem, 6vw, 5.8rem)' }}
              >
                Không gian chụp cưới được tuyển chọn
              </h1>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 animate-fade-in-up-luxury" style={{ '--delay': '90ms' } as React.CSSProperties}>
              <div className="border-t border-black/10 pt-5">
                <p className="text-4xl font-light text-obsidian">{visibleStudios.length}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-smoke">Địa điểm</p>
              </div>
              <div className="border-t border-black/10 pt-5">
                <p className="text-4xl font-light text-obsidian">3</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-smoke">Nhóm bối cảnh</p>
              </div>
              <div className="border-t border-black/10 pt-5">
                <p className="text-4xl font-light text-obsidian">01</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-smoke">Ekip tư vấn</p>
              </div>
            </div>
          </div>

          <div className="space-y-28">
            {visibleStudios.map((studio, index) => {
              const image = studio.images[0] || '/img/prewedding.jpg';
              const reversed = index % 2 === 1;

              return (
                <article
                  key={studio.slug}
                  className={`grid gap-10 lg:gap-16 lg:items-center ${
                    reversed ? 'lg:grid-cols-[0.95fr_1.05fr]' : 'lg:grid-cols-[1.05fr_0.95fr]'
                  }`}
                >
                  <div className={`relative aspect-[4/5] overflow-hidden bg-whisper shadow-luxury ${
                    reversed ? 'lg:order-2' : ''
                  }`}>
                    <Image
                      src={image}
                      alt={studio.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6 text-ivory">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-gold font-bold">
                        {typeLabels[studio.type]}
                      </p>
                      <p className="mt-2 text-3xl font-light">{studio.city}</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                        <span>0{index + 1}</span>
                        <span className="h-px w-10 bg-gold/40" />
                        <span>{typeLabels[studio.type]}</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-sans font-light text-obsidian tracking-tight">
                        {studio.name}
                      </h2>
                      {studio.description && (
                        <p className="max-w-2xl text-smoke text-lg font-light leading-relaxed">
                          {studio.description}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {studio.address && (
                        <div className="flex gap-3 border-t border-black/5 pt-5">
                          <MapPinIcon className="mt-0.5 size-4 text-gold shrink-0" />
                          <p className="text-sm text-ash font-light leading-relaxed">{studio.address}</p>
                        </div>
                      )}
                      {studio.best_time && (
                        <div className="flex gap-3 border-t border-black/5 pt-5">
                          <ClockIcon className="mt-0.5 size-4 text-gold shrink-0" />
                          <p className="text-sm text-ash font-light leading-relaxed">{studio.best_time}</p>
                        </div>
                      )}
                    </div>

                    {studio.highlights.length > 0 && (
                      <ul className="grid gap-3">
                        {studio.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3">
                            <SparklesIcon className="size-4 text-gold shrink-0" />
                            <span className="text-sm text-ash font-light tracking-wide">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-2 flex flex-wrap gap-6">
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-4 text-obsidian"
                      >
                        <span className="relative text-[11px] font-bold uppercase tracking-[0.25em]">
                          Tư vấn địa điểm
                          <span className="absolute -bottom-1 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </span>
                        <span className="size-10 flex items-center justify-center border border-obsidian/10 rounded-full group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                          <ArrowRightIcon className="size-4" />
                        </span>
                      </Link>

                      {studio.map_embed_url && (
                        <Link
                          href={studio.map_embed_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold hover:text-obsidian transition-colors"
                        >
                          Xem bản đồ
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
