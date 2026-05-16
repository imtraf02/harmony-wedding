import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getPostProductionById } from "@/lib/queries/post-production";
import { PostProductionForm } from "../../components/post-production-form";

export const dynamic = "force-dynamic";

export default async function EditPostProductionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    notFound();
  }

  const item = getPostProductionById(id);

  if (!item) {
    notFound();
  }

  return (
    <div className="animate-fade-in-up-luxury space-y-16 font-sans">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/post-production" />}
          nativeButton={false}
          className="group w-fit p-0 font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-obsidian"
        >
          <ArrowLeftIcon className="mr-2 size-3 transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Sửa video hậu kỳ
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Cập nhật video, poster và trạng thái hiển thị
          </p>
        </div>
      </header>

      <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
        <PostProductionForm initialData={item} />
      </div>
    </div>
  );
}
