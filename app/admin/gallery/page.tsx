import { getAllGalleryItems } from '@/lib/queries/gallery';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteGalleryButton } from './components/delete-button';
import { PlusIcon, PencilIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const items = getAllGalleryItems();

  return (
    <div className="space-y-16 font-sans">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Gallery Trang Chủ
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Quản lý ảnh cuộn ngang hiển thị trên trang chủ
          </p>
        </div>
        <Button
          render={<Link href="/admin/gallery/new" />}
          nativeButton={false}
          className="bg-obsidian text-ivory px-10 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          <PlusIcon className="size-4 mr-2" /> Thêm ảnh
        </Button>
      </header>

      {/* ── Grid preview ── */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-6 md:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] bg-whisper overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500 animate-fade-in-up-luxury"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
              />

              {/* Status badge */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                <Badge
                  className={`rounded-none text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold border-0 ${
                    item.is_active
                      ? 'bg-gold/90 text-ivory'
                      : 'bg-obsidian/60 text-white/60'
                  }`}
                >
                  {item.is_active ? 'Hiện' : 'Ẩn'}
                </Badge>
                <Badge className="rounded-none text-[7px] uppercase tracking-[0.15em] px-2 py-0.5 font-bold border-0 bg-obsidian/30 backdrop-blur-sm text-white">
                  #{item.sort_order}
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Label + actions */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-20 translate-y-0 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {item.label && (
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold mb-2">
                    {item.label}
                  </p>
                )}
                <p className="text-[10px] text-white/80 font-light leading-snug line-clamp-2">
                  {item.alt}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href={`/admin/gallery/edit/${item.id}`}
                    className="flex items-center justify-center size-7 bg-white/25 hover:bg-gold transition-colors duration-300 backdrop-blur-sm"
                    aria-label={`Sửa ${item.alt}`}
                  >
                    <PencilIcon className="size-3 text-white" />
                  </Link>
                  <div className="flex items-center justify-center size-7 bg-white/20 hover:bg-red-500 transition-colors duration-300 backdrop-blur-sm">
                    <DeleteGalleryButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border border-dashed border-black/10">
          <p className="text-smoke font-light text-xl tracking-wide mb-8">
            Chưa có ảnh nào trong gallery.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/gallery/new" />}
            nativeButton={false}
            className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
          >
            Thêm ảnh đầu tiên ↗
          </Button>
        </div>
      )}

      {/* ── Stats footer ── */}
      {items.length > 0 && (
        <div className="flex items-center gap-8 pt-4 border-t border-black/5 text-[10px] uppercase tracking-[0.15em] text-smoke font-medium">
          <span>Tổng: {items.length} ảnh</span>
          <span className="text-gold">· Đang hiện: {items.filter((i) => i.is_active).length}</span>
          <span>· Đang ẩn: {items.filter((i) => !i.is_active).length}</span>
        </div>
      )}
    </div>
  );
}
