import { getPortfolios } from '@/lib/queries/portfolio';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminPortfolioList() {
  const items = getPortfolios();

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-cormorant text-foreground mb-2">Quản lý Portfolio</h1>
          <p className="text-muted-foreground text-sm">Danh sách các bộ ảnh và video đã đăng tải.</p>
        </div>
        <Link 
          href="/admin/portfolio/new" 
          className="bg-gold text-white px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-gold/20"
        >
          + Thêm mới
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all">
            <div className="relative aspect-video">
              <Image 
                src={item.cover_image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute top-4 right-4 flex gap-2">
                {item.is_featured && (
                  <span className="bg-gold text-white text-[8px] uppercase tracking-widest px-2 py-1 rounded-full font-bold shadow-lg">Nổi bật</span>
                )}
                <span className="bg-black/50 backdrop-blur-md text-white text-[8px] uppercase tracking-widest px-2 py-1 rounded-full font-bold border border-white/20">{item.style}</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-cormorant mb-1 text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-6 uppercase tracking-widest">{item.location_type || '—'}</p>
              
              <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
                <div className="flex gap-4">
                  <Link href={`/admin/portfolio/edit/${item.id}`} className="text-xs font-semibold text-zinc-500 hover:text-gold transition-colors">Sửa</Link>
                  <button className="text-xs font-semibold text-zinc-500 hover:text-destructive transition-colors">Xóa</button>
                </div>
                <Link 
                  href={`/portfolio/${item.slug}`} 
                  target="_blank"
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900"
                >
                  Xem thực tế ↗
                </Link>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full py-32 text-center bg-card border border-dashed border-border rounded-[3rem]">
            <p className="text-muted-foreground italic mb-6 text-lg">Chưa có Portfolio nào.</p>
            <Link 
              href="/admin/portfolio/new" 
              className="text-gold font-semibold hover:underline"
            >
              Tạo bộ ảnh đầu tiên ngay →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
