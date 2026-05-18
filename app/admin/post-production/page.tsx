import { PencilIcon, PlusIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { SortableAdminGrid } from "@/components/admin/sortable-admin-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostProductions } from "@/lib/queries/post-production";
import { reorderPostProductionsAction } from "./actions";
import { DeletePostProductionButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  reels: "Reels",
  "highlight-film": "Highlight",
  "color-grading": "Blend màu",
  "skin-retouch": "Retouch",
  "cinematic-edit": "Cinematic",
};

export default async function AdminPostProductionPage() {
  const items = getPostProductions();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Hậu kỳ
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý video, reels và demo kỹ thuật hậu kỳ
          </p>
        </div>
        <Button
          render={<Link href="/admin/post-production/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon className="mr-2 size-4" /> Thêm video
        </Button>
      </header>

      {items.length > 0 ? (
        <SortableAdminGrid
          ids={items.map((item) => item.id)}
          onReorder={reorderPostProductionsAction}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 4xl:grid-cols-7"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[9/16] animate-fade-in-up-luxury overflow-hidden bg-obsidian shadow-sm transition-all duration-500 hover:shadow-luxury"
            >
              {item.poster_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.poster_image}
                  alt={item.title}
                  className="h-full w-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              ) : (
                <video
                  src={item.video_url}
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                >
                  Trình duyệt không hỗ trợ phát video.
                </video>
              )}

              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                <Badge className="rounded-none border-0 bg-obsidian/80 px-2 py-0.5 font-bold text-[7px] text-ivory uppercase tracking-[0.2em]">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </Badge>
                {item.is_featured && (
                  <Badge className="rounded-none border-0 bg-white/20 px-2 py-0.5 font-bold text-[7px] text-white uppercase tracking-[0.2em] backdrop-blur-sm">
                    Featured
                  </Badge>
                )}
                {!item.is_active && (
                  <Badge className="rounded-none border-0 bg-red-500/80 px-2 py-0.5 font-bold text-[7px] text-white uppercase tracking-[0.2em]">
                    Ẩn
                  </Badge>
                )}
              </div>

              <div className="absolute inset-0 z-10 bg-linear-to-t from-obsidian/85 via-obsidian/20 to-transparent opacity-100 transition-opacity duration-500" />

              <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
                <p className="mb-1 truncate font-bold text-[10px] text-white uppercase tracking-[0.22em]">
                  {item.title}
                </p>
                <p className="font-light text-[9px] text-white/60 uppercase tracking-widest">
                  {item.orientation} · #{item.sort_order}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/admin/post-production/edit/${item.id}`}
                    className="flex size-10 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-obsidian"
                    aria-label={`Sửa ${item.title}`}
                  >
                    <PencilIcon className="size-4 text-white" />
                  </Link>
                  <div className="flex size-10 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-red-500">
                    <DeletePostProductionButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </SortableAdminGrid>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <VideoIcon className="mx-auto mb-6 size-10 text-mist" />
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có video hậu kỳ nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/post-production/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Thêm video đầu tiên ↗
          </Button>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex items-center gap-8 border-black/5 border-t pt-4 font-medium text-[10px] text-smoke uppercase tracking-[0.15em]">
          <span>Tổng: {items.length} video</span>
          <span className="text-obsidian">
            · Đang hiện: {items.filter((item) => item.is_active).length}
          </span>
          <span>
            · Featured: {items.filter((item) => item.is_featured).length}
          </span>
        </div>
      )}
    </div>
  );
}
