import { getAllTestimonials } from '@/lib/queries/testimonials';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PencilIcon, PlusIcon, StarIcon, QuoteIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { DeleteTestimonialButton } from './components/delete-button';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsList() {
  const items = getAllTestimonials();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Đánh giá khách hàng</h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">Quản lý phản hồi và cảm nhận từ các cặp đôi</p>
        </div>
        <Button 
          render={<Link href="/admin/testimonials/new" />}
          nativeButton={false} 
          className="bg-obsidian text-ivory px-10 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          <PlusIcon className="size-4 mr-2" /> Thêm đánh giá
        </Button>
      </header>

      <div className="grid gap-4 md:hidden">
        {items.map((item) => (
          <article key={item.id} className="bg-white border border-black/5 rounded-none shadow-sm p-5 flex flex-col gap-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-obsidian truncate">{item.couple_name}</p>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className={cn("size-3", i < (item.rating || 5) ? "fill-gold text-gold" : "text-mist")} />
                  ))}
                </div>
              </div>
              <Badge variant="outline" className={cn(
                "rounded-none border-0 px-0 text-[9px] uppercase tracking-[0.15em] font-bold",
                item.is_active ? "text-gold" : "text-ash"
              )}>
                &bull; {item.is_active ? 'Hiển thị' : 'Ẩn'}
              </Badge>
            </div>

            <p className="text-smoke font-light leading-relaxed line-clamp-4">
              &ldquo;{item.content}&rdquo;
            </p>

            <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-4">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-obsidian font-medium truncate">{item.service}</p>
                <p className="text-[11px] text-smoke font-light">{item.wedding_year}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  render={<Link href={`/admin/testimonials/edit/${item.id}`} />}
                  nativeButton={false}
                  className="size-9 rounded-none text-ash hover:text-gold"
                  title="Sửa"
                >
                  <PencilIcon />
                </Button>
                <DeleteTestimonialButton id={item.id} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden bg-white border border-black/5 rounded-none shadow-luxury overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-whisper border-b border-black/5">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Cặp đôi</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Nội dung</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Dịch vụ & Năm</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Trạng thái</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr key={item.id} className="group hover:bg-whisper transition-colors animate-fade-in-up-luxury">
                  <td className="px-8 py-8 align-top">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-gold-dim rounded-none border border-gold/10 flex items-center justify-center text-gold font-sans text-xl shadow-gold-sm">
                        {item.couple_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-obsidian">{item.couple_name}</p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={cn("size-2.5", i < (item.rating || 5) ? "fill-gold text-gold" : "text-mist")} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top max-w-md">
                    <div className="flex gap-3">
                      <QuoteIcon className="size-3 text-gold/30 shrink-0 mt-1" />
                      <p className="text-smoke font-light leading-relaxed line-clamp-3">&ldquo;{item.content}&rdquo;</p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest text-obsidian font-medium">{item.service}</p>
                      <p className="text-[11px] text-smoke font-light">{item.wedding_year}</p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <Badge variant="outline" className={cn(
                      "rounded-none border-0 px-0 text-[9px] uppercase tracking-[0.15em] font-bold",
                      item.is_active ? "text-gold" : "text-ash"
                    )}>
                      &bull; {item.is_active ? 'Hiển thị' : 'Ẩn'}
                    </Badge>
                  </td>
                  <td className="px-8 py-8 align-top text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        render={<Link href={`/admin/testimonials/edit/${item.id}`} />}
                        nativeButton={false}
                        className="size-9 rounded-none text-ash hover:text-gold"
                        title="Sửa"
                      >
                        <PencilIcon />
                      </Button>
                      <DeleteTestimonialButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-6 text-smoke">
                      <p className=" font-light tracking-wide text-lg">Chưa có đánh giá nào được ghi nhận.</p>
                      <Button 
                        variant="link"
                        render={<Link href="/admin/testimonials/new" />} 
                        nativeButton={false}
                        className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
                      >
                        Thêm đánh giá đầu tiên ngay ↗
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {items.length === 0 && (
        <div className="md:hidden px-8 py-24 text-center border border-dashed border-black/10">
          <div className="flex flex-col items-center gap-6 text-smoke">
            <p className="font-light tracking-wide text-lg">Chưa có đánh giá nào được ghi nhận.</p>
            <Button
              variant="link"
              render={<Link href="/admin/testimonials/new" />}
              nativeButton={false}
              className="text-gold font-medium uppercase tracking-[0.2em] text-[11px] hover:no-underline hover:opacity-70 transition-all"
            >
              Thêm đánh giá đầu tiên ngay ↗
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
