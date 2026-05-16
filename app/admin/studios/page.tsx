import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllStudiosAdmin } from '@/lib/queries/studios';
import { DeleteStudioButton } from './components/delete-button';
import { MapPinIcon, PencilIcon, PlusIcon } from 'lucide-react';

const typeLabels = {
  studio: 'Studio',
  outdoor: 'Ngoại cảnh',
  destination: 'Điểm đến',
};

export const dynamic = 'force-dynamic';

export default function AdminStudiosPage() {
  const studios = getAllStudiosAdmin();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Studio & Phim trường
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Quản lý địa điểm studio, ngoại cảnh và điểm đến chụp cưới
          </p>
        </div>
        <Button
          render={<Link href="/admin/studios/new" />}
          nativeButton={false}
          className="bg-obsidian text-ivory px-10 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          <PlusIcon data-icon="inline-start" /> Thêm địa điểm
        </Button>
      </header>

      {studios.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {studios.map((studio) => {
            const image = studio.images[0] || '/img/prewedding.jpg';

            return (
              <article
                key={studio.id}
                className="group bg-white border border-black/5 shadow-sm hover:shadow-luxury transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-whisper">
                  <Image
                    src={image}
                    alt={studio.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="rounded-none border-0 bg-gold/90 text-ivory text-[8px] uppercase tracking-[0.2em]">
                      {typeLabels[studio.type]}
                    </Badge>
                    <Badge className={`rounded-none border-0 text-[8px] uppercase tracking-[0.2em] ${
                      studio.is_active ? 'bg-obsidian/70 text-white' : 'bg-white/80 text-ash'
                    }`}>
                      {studio.is_active ? 'Hiện' : 'Ẩn'}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gold font-bold">
                      <MapPinIcon className="size-3" />
                      {studio.city}
                    </div>
                    <h2 className="text-2xl font-light text-obsidian tracking-tight">
                      {studio.name}
                    </h2>
                    {studio.description && (
                      <p className="text-smoke text-sm font-light leading-relaxed line-clamp-3">
                        {studio.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-mist">
                      #{studio.sort_order} · {studio.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/studios/edit/${studio.id}`}
                        className="p-2 text-mist hover:text-gold transition-colors"
                        aria-label={`Sửa ${studio.name}`}
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                      <DeleteStudioButton id={studio.id} name={studio.name} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-40 text-center border border-dashed border-black/10">
          <p className="text-smoke font-light text-xl tracking-wide mb-8">
            Chưa có địa điểm studio nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/studios/new" />}
            nativeButton={false}
            className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
          >
            Thêm địa điểm đầu tiên ↗
          </Button>
        </div>
      )}

      {studios.length > 0 && (
        <div className="flex items-center gap-8 pt-4 border-t border-black/5 text-[10px] uppercase tracking-[0.15em] text-smoke font-medium">
          <span>Tổng: {studios.length} địa điểm</span>
          <span className="text-gold">· Đang hiện: {studios.filter((studio) => studio.is_active).length}</span>
          <span>· Đang ẩn: {studios.filter((studio) => !studio.is_active).length}</span>
        </div>
      )}
    </div>
  );
}
