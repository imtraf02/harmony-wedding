import { getGalleryItemById } from '@/lib/queries/gallery';
import { notFound } from 'next/navigation';
import { GalleryForm } from '../../components/gallery-form';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (isNaN(id)) return notFound();

  const item = getGalleryItemById(id);
  if (!item) return notFound();

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
            Chỉnh sửa ảnh
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Cập nhật thông tin hình ảnh hiển thị trên trang chủ
          </p>
        </div>
      </header>

      {/* ── Form ── */}
      <div className="w-full">
        <div className="bg-white border border-black/5 rounded-none shadow-luxury p-6 sm:p-10 lg:p-20">
          <GalleryForm initialData={item} />
        </div>
      </div>
    </div>
  );
}
