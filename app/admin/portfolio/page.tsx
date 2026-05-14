import { getPortfolios } from '@/lib/queries/portfolio';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { DeleteButton } from './components/delete-button';
import { PlusIcon, ExternalLinkIcon } from 'lucide-react';

export default async function AdminPortfolioList() {
  const items = getPortfolios();

  return (
    <div className="space-y-16 font-jost">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-cormorant font-light text-obsidian tracking-tight">Danh sách Portfolio</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item) => (
          <div key={item.id} className="group flex flex-col gap-6 animate-fade-in-up-luxury">
            <div className="relative aspect-[4/5] bg-whisper overflow-hidden shadow-sm group-hover:shadow-luxury transition-all duration-500">
              {item.cover_image ? (
                <Image 
                  src={item.cover_image} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-mist font-light uppercase tracking-widest text-[10px]">
                  No Image Provided
                </div>
              )}
              
              {/* Badge Overlays */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {item.is_featured && (
                  <span className="bg-gold text-ivory text-[8px] uppercase tracking-[0.25em] px-3 py-1 font-bold shadow-gold-sm">Featured</span>
                )}
                <span className="bg-obsidian/40 backdrop-blur-md text-ivory text-[8px] uppercase tracking-[0.25em] px-3 py-1 font-bold border border-white/10">
                  {item.style}
                </span>
              </div>

              {/* Action Overlay */}
              <div className="absolute inset-0 bg-obsidian/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                <Button 
                  variant="outline" 
                  render={<Link href={`/admin/portfolio/edit/${item.id}`} />} 
                  nativeButton={false} 
                  className="bg-ivory/90 border-0 text-obsidian rounded-none h-12 w-12 p-0 hover:bg-gold hover:text-ivory transition-all duration-500 shadow-luxury"
                >
                  <PenLineIcon className="size-4" />
                </Button>
                <div className="bg-ivory/90 border-0 text-obsidian rounded-none h-12 w-12 p-0 hover:bg-red-500 hover:text-ivory transition-all duration-500 flex items-center justify-center cursor-pointer shadow-luxury">
                  <DeleteButton id={item.id} />
                </div>
              </div>
            </div>

            <div className="space-y-3 px-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-cormorant font-light text-obsidian group-hover:text-gold transition-colors duration-500">{item.title}</h3>
                  <p className="text-[10px] text-smoke uppercase tracking-[0.2em] font-medium">{item.location_type || 'General'}</p>
                </div>
                <Link href={`/portfolio/${item.slug}`} target="_blank" className="text-mist hover:text-gold transition-colors p-1">
                  <ExternalLinkIcon className="size-4 stroke-[1.2px]" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full py-40 text-center border border-dashed border-black/10">
            <p className="text-smoke font-light italic mb-8 text-xl tracking-wide">Chưa có Portfolio nào trong thư viện.</p>
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
      </div>
    </div>
  );
}


import { PenLineIcon } from 'lucide-react';

