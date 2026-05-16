import { GalleryForm } from '../components/gallery-form';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NewGalleryItemPage() {
  return (
    <div className="space-y-16 font-sans animate-fade-in-up-luxury">
      {/* ── Header ── */}
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/gallery" />}
          nativeButton={false}
          className="w-fit p-0 text-[10px] uppercase tracking-[0.2em] font-bold text-ash hover:text-gold hover:bg-transparent transition-all group"
        >
          <ArrowLeftIcon className="size-3 mr-2 transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Thêm ảnh mới
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Thêm hình ảnh vào cuộn gallery trên trang chủ
          </p>
        </div>
      </header>

      {/* ── Form ── */}
      <div className="w-full">
        <div className="bg-white border border-black/5 rounded-none shadow-luxury p-6 sm:p-10 lg:p-20">
          <GalleryForm />
        </div>
      </div>
    </div>
  );
}
