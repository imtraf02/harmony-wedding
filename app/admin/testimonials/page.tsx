import { getAllTestimonials } from '@/lib/queries/testimonials';
import Link from 'next/link';

export default async function AdminTestimonialsList() {
  const items = getAllTestimonials();

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-cormorant text-foreground mb-2">Quản lý Đánh giá</h1>
          <p className="text-muted-foreground text-sm">Lời chúc và phản hồi từ các cặp đôi.</p>
        </div>
        <Link 
          href="/admin/testimonials/new" 
          className="bg-gold text-white px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-gold/20"
        >
          + Thêm mới
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-[2rem] p-8 hover:shadow-xl transition-all group">
            <div className="flex items-center gap-4 mb-6">
              {t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.avatar} alt={t.couple_name} className="w-12 h-12 rounded-full object-cover border border-zinc-100" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-xl">👤</div>
              )}
              <div>
                <h3 className="font-semibold text-foreground">{t.couple_name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">{t.service} · {t.wedding_year}</p>
              </div>
              <div className="ml-auto text-gold text-xs">
                {'★'.repeat(t.rating)}
                {'☆'.repeat(5 - t.rating)}
              </div>
            </div>
            
            <blockquote className="text-sm italic text-zinc-600 font-light leading-relaxed mb-8">
              &ldquo;{t.content}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <div className="flex gap-4">
                <button className="text-xs font-semibold text-zinc-500 hover:text-gold transition-colors">Sửa</button>
                <button className="text-xs font-semibold text-zinc-500 hover:text-destructive transition-colors">Xóa</button>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${t.is_active ? 'text-green-500' : 'text-zinc-400'}`}>
                {t.is_active ? '● Đang hiển thị' : '○ Đang ẩn'}
              </span>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-full py-32 text-center bg-card border border-dashed border-border rounded-[3rem]">
            <p className="text-muted-foreground italic mb-6 text-lg">Chưa có đánh giá nào.</p>
            <Link 
              href="/admin/testimonials/new" 
              className="text-gold font-semibold hover:underline"
            >
              Thêm đánh giá đầu tiên ngay →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
