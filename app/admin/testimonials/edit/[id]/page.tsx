import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getTestimonialById } from "@/lib/queries/testimonials";
import { TestimonialForm } from "../../components/testimonial-form";

export const dynamic = "force-dynamic";

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
    <div className="animate-fade-in-up-luxury space-y-16 font-sans">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/testimonials" />}
          nativeButton={false}
          className="group w-fit p-0 font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-obsidian"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Sửa đánh giá
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Cập nhật nội dung phản hồi và trạng thái hiển thị
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
          <TestimonialForm initialData={testimonial} />
        </div>
      </div>
    </div>
  );
}
