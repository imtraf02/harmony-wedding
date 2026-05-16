import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getGalleryItemById } from "@/lib/queries/gallery";
import { GalleryForm } from "../../components/gallery-form";

export const dynamic = "force-dynamic";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  if (Number.isNaN(id)) return notFound();

  const item = getGalleryItemById(id);
  if (!item) return notFound();

  return (
    <div className="animate-fade-in-up-luxury space-y-16 font-sans">
      {/* ── Header ── */}
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/gallery" />}
          nativeButton={false}
          className="group w-fit p-0 font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-obsidian"
        >
          <ArrowLeftIcon className="mr-2 size-3 transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Chỉnh sửa ảnh
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Cập nhật thông tin hình ảnh hiển thị trên trang chủ
          </p>
        </div>
      </header>

      {/* ── Form ── */}
      <div className="w-full">
        <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
          <GalleryForm initialData={item} />
        </div>
      </div>
    </div>
  );
}
