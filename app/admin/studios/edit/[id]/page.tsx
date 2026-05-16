import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStudioById } from '@/lib/queries/studios';
import { StudioForm } from '../../components/studio-form';

export default async function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const studioId = Number(id);

  if (Number.isNaN(studioId)) {
    notFound();
  }

  const studio = getStudioById(studioId);

  if (!studio) {
    notFound();
  }

  return (
    <div className="space-y-16 font-sans animate-fade-in-up-luxury">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/studios" />}
          nativeButton={false}
          className="w-fit p-0 text-[10px] uppercase tracking-[0.2em] font-bold text-ash hover:text-gold hover:bg-transparent transition-all group"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Sửa địa điểm
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Cập nhật nội dung và trạng thái hiển thị cho {studio.name}
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="bg-white border border-black/5 rounded-none shadow-luxury p-6 sm:p-10 lg:p-20">
          <StudioForm initialData={studio} />
        </div>
      </div>
    </div>
  );
}
