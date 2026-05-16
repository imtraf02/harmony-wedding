import Link from 'next/link';
import { HeroForm } from '../components/hero-form';
import { ChevronLeftIcon } from 'lucide-react';

export default function NewHeroPage() {
  return (
    <div className="space-y-12 bg-ivory min-h-screen flex flex-col items-center">
      <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
        <div>
          <Link href="/admin/hero" className="inline-flex items-center gap-2 text-ash hover:text-gold transition-colors mb-6 group">
            <ChevronLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Quay lại danh sách</span>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Creation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-light text-obsidian leading-none tracking-tight">
            Thêm Slide mới
          </h1>
          <p className="mt-4 text-ash font-light text-sm uppercase tracking-widest leading-relaxed">
            Tạo một slide mới cho trang chủ.
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="bg-white border border-black/5 rounded-none shadow-luxury p-6 sm:p-10 lg:p-20">
          <HeroForm />
        </div>
      </div>
    </div>
  );
}
