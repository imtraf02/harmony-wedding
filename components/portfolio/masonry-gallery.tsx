import Link from 'next/link';
import Image from 'next/image';
import type { Portfolio } from '@/types';

interface MasonryGalleryProps {
  items: Portfolio[];
}

export function MasonryGallery({ items }: MasonryGalleryProps) {
  if (!items.length) {
    return (
      <div className="text-center py-24 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
        <p className="text-zinc-500 font-light italic">No albums found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {items.map((item, i) => (
        <Link
          key={item.id}
          href={`/portfolio/${item.slug}`}
          className="relative break-inside-avoid block overflow-hidden rounded-2xl group"
          aria-label={`View album: ${item.title}`}
          id={`masonry-item-${item.slug}`}
        >
          <div className="relative aspect-[3/4] transition-transform duration-1000 group-hover:scale-105">
            <Image
              src={item.cover_image}
              alt={item.title}
              fill
              priority={i < 6}
              loading={i < 6 ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-400 mb-2">{item.style}</span>
            <h3 className="text-xl text-white font-cormorant">{item.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
