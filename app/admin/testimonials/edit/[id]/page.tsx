import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTestimonialById } from '@/lib/queries/testimonials';
import { TestimonialForm } from '../../components/testimonial-form';

export const dynamic = 'force-dynamic';

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  const testimonial = getTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-16 font-sans animate-fade-in-up-luxury">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/testimonials" />}
          nativeButton={false}
          className="w-fit p-0 text-[10px] uppercase tracking-[0.2em] font-bold text-ash hover:text-gold hover:bg-transparent transition-all group"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="text-display font-sans font-light text-obsidian tracking-tight">
            Sửa đánh giá
          </h1>
          <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">
            Cập nhật nội dung phản hồi và trạng thái hiển thị
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="bg-white border border-black/5 rounded-none shadow-luxury p-6 sm:p-10 lg:p-20">
          <TestimonialForm initialData={testimonial} />
        </div>
      </div>
    </div>
  );
}
