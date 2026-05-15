import Link from 'next/link';
import Image from 'next/image';
import { getAllHeroSlides } from '@/lib/queries/hero';
import { Button } from '@/components/ui/button';
import { PlusIcon, Edit3Icon } from 'lucide-react';
import { DeleteHeroButton } from './components/delete-button';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default function HeroAdminPage() {
  const slides = getAllHeroSlides();

  return (
    <div className="p-6 sm:p-10 md:p-16 space-y-12 bg-ivory min-h-screen">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Management</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-light text-obsidian leading-none tracking-tight">
            Hero Slider
          </h1>
          <p className="mt-4 text-ash font-light text-sm max-w-xl uppercase tracking-widest leading-relaxed">
            Quản lý các hình ảnh và thông tin hiển thị ở đầu trang chủ.
          </p>
        </div>

        <Link href="/admin/hero/new">
          <Button className="bg-obsidian text-ivory hover:bg-gold transition-all duration-500 rounded-none px-8 py-7 h-auto text-[11px] uppercase tracking-[0.2em] font-medium shadow-luxury group">
            <PlusIcon className="mr-3 size-4 group-hover:rotate-90 transition-transform duration-500" />
            Thêm Slide mới
          </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {slides.map((slide) => (
          <div key={slide.id} className="group relative bg-white border border-black/5 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-700">
            {/* Aspect wrapper */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.title || ''}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className={slide.is_active ? "bg-green-500/80 backdrop-blur-md" : "bg-red-500/80 backdrop-blur-md"}>
                  {slide.is_active ? 'Đang bật' : 'Đang tắt'}
                </Badge>
                <Badge variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  Thứ tự: {slide.sort_order}
                </Badge>
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                <Link href={`/admin/hero/edit/${slide.id}`}>
                  <Button variant="ghost" size="icon" className="size-10 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-obsidian transition-all rounded-none border border-white/20">
                    <Edit3Icon className="size-4" />
                  </Button>
                </Link>
                <DeleteHeroButton id={slide.id} />
              </div>

              {/* Info */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold mb-1 opacity-80">{slide.subtitle}</p>
                <h3 className="text-xl text-white font-sans font-light leading-snug">{slide.title}</h3>
              </div>
            </div>
            
            <div className="p-4 bg-white border-t border-black/5 flex items-center justify-between">
              <span className="text-[10px] text-ash uppercase tracking-widest">{slide.cta_label || 'Không có nút'}</span>
              <span className="text-[10px] text-mist truncate max-w-[150px]">{slide.cta_href}</span>
            </div>
          </div>
        ))}
        
        {slides.length === 0 && (
          <div className="col-span-full py-32 border-2 border-dashed border-black/5 flex flex-center items-center justify-center flex-col text-center">
            <p className="text-ash uppercase tracking-widest text-xs">Chưa có slide nào</p>
            <Link href="/admin/hero/new" className="mt-4 text-gold hover:underline text-[11px] uppercase tracking-widest font-bold">Tạo slide đầu tiên →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
