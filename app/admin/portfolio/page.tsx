import { getPortfolios } from '@/lib/queries/portfolio';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DeleteButton } from './components/delete-button';
import { PlusIcon, PencilIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPortfolioList() {
  const items = getPortfolios();

  return (
    <div className="space-y-16 font-sans">
      {/* ── Header ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Danh sách Portfolio</h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">Quản lý các bộ sưu tập hình ảnh và video</p>
        </div>
        <Button 
          render={<Link href="/admin/portfolio/new" />}
          nativeButton={false} 
          className="bg-obsidian text-ivory px-10 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          <PlusIcon className="size-4 mr-2" /> Thêm mới
        </Button>
      </header>

      {/* ── Grid preview ── */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 md:gap-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-[3/4] bg-whisper overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500 animate-fade-in-up-luxury"
            >
              {/* Image */}
              {item.cover_image ? (
                <Image 
                  src={item.cover_image} 
                  alt={item.title} 
                  fill 
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-mist font-light uppercase tracking-widest text-[10px]">
                  No Image
                </div>
              )}
              
              {/* Status badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                {item.is_featured && (
                  <Badge className="rounded-none text-[7px] uppercase tracking-[0.2em] px-2 py-0.5 font-bold border-0 bg-gold/90 text-ivory">
                    Featured
                  </Badge>
                )}
                <Badge className="rounded-none text-[7px] uppercase tracking-[0.15em] px-2 py-0.5 font-bold border-0 bg-obsidian/30 backdrop-blur-sm text-white">
                  {item.style}
                </Badge>
                <Badge className="rounded-none text-[7px] uppercase tracking-[0.15em] px-2 py-0.5 font-bold border-0 bg-obsidian/30 backdrop-blur-sm text-white">
                  #{item.sort_order}
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Label + actions */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-0 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold mb-1 truncate">
                  {item.title}
                </p>
                <p className="text-[9px] text-white/80 font-light leading-snug uppercase tracking-widest truncate">
                  {item.location_type}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Link
                    href={`/admin/portfolio/edit/${item.id}`}
                    className="flex items-center justify-center size-10 bg-white/20 hover:bg-gold transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg"
                    aria-label={`Sửa ${item.title}`}
                  >
                    <PencilIcon className="size-4 text-white" />
                  </Link>
                  <div className="flex items-center justify-center size-10 bg-white/20 hover:bg-red-500 transition-all duration-300 backdrop-blur-md border border-white/20 shadow-lg">
                    <DeleteButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border border-dashed border-black/10">
          <p className="text-smoke font-light text-xl tracking-wide mb-8">
            Chưa có Portfolio nào trong thư viện.
          </p>
          <Button 
            variant="link"
            render={<Link href="/admin/portfolio/new" />} 
            nativeButton={false}
            className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
          >
            Tạo dự án đầu tiên ↗
          </Button>
        </div>
      )}

      {/* ── Stats footer ── */}
      {items.length > 0 && (
        <div className="flex items-center gap-8 pt-4 border-t border-black/5 text-[10px] uppercase tracking-[0.15em] text-smoke font-medium">
          <span>Tổng: {items.length} bộ sưu tập</span>
          <span className="text-gold">· Tiêu biểu (Featured): {items.filter(i => i.is_featured).length}</span>
        </div>
      )}
    </div>
  );
}
