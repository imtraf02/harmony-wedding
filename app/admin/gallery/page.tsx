import { PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SortableAdminGrid } from "@/components/admin/sortable-admin-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllGalleryItems } from "@/lib/queries/gallery";
import { reorderGalleryItemsAction } from "./actions";
import { DeleteGalleryButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = getAllGalleryItems();

  return (
    <div className="space-y-16 font-sans">
      {/* ── Header ── */}
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Gallery Trang Chủ
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý ảnh cuộn ngang hiển thị trên trang chủ
          </p>
        </div>
        <Button
          render={<Link href="/admin/gallery/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon className="mr-2 size-4" /> Thêm ảnh
        </Button>
      </header>

      {/* ── Grid preview ── */}
      {items.length > 0 ? (
        <SortableAdminGrid
          ids={items.map((item) => item.id)}
          onReorder={reorderGalleryItemsAction}
          className="grid 3xl:grid-cols-5 grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] animate-fade-in-up-luxury overflow-hidden bg-whisper shadow-sm transition-all duration-500 hover:shadow-luxury"
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover grayscale-[20%] transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* Status badge */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                <Badge
                  className={`rounded-none border-0 px-2 py-0.5 font-bold text-[7px] uppercase tracking-[0.2em] ${
                    item.is_active
                      ? "bg-obsidian/90 text-ivory"
                      : "bg-obsidian/60 text-white/60"
                  }`}
                >
                  {item.is_active ? "Hiện" : "Ẩn"}
                </Badge>
                <Badge className="rounded-none border-0 bg-obsidian/30 px-2 py-0.5 font-bold text-[7px] text-white uppercase tracking-[0.15em] backdrop-blur-sm">
                  #{item.sort_order}
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-obsidian/70 via-obsidian/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Label + actions */}
              <div className="absolute right-0 bottom-0 left-0 z-20 translate-y-0 p-3 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                {item.label && (
                  <p className="mb-2 font-bold text-[9px] text-obsidian uppercase tracking-[0.22em]">
                    {item.label}
                  </p>
                )}
                <p className="line-clamp-2 font-light text-[10px] text-white/80 leading-snug">
                  {item.alt}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/admin/gallery/edit/${item.id}`}
                    className="flex size-9 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-obsidian"
                    aria-label={`Sửa ${item.alt}`}
                  >
                    <PencilIcon className="size-4 text-white" />
                  </Link>
                  <div className="flex size-9 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-red-500">
                    <DeleteGalleryButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SortableAdminGrid>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có ảnh nào trong gallery.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/gallery/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Thêm ảnh đầu tiên ↗
          </Button>
        </div>
      )}

      {/* ── Stats footer ── */}
      {items.length > 0 && (
        <div className="flex items-center gap-8 border-black/5 border-t pt-4 font-medium text-[10px] text-smoke uppercase tracking-[0.15em]">
          <span>Tổng: {items.length} ảnh</span>
          <span className="text-obsidian">
            · Đang hiện: {items.filter((i) => i.is_active).length}
          </span>
          <span>· Đang ẩn: {items.filter((i) => !i.is_active).length}</span>
        </div>
      )}
    </div>
  );
}
