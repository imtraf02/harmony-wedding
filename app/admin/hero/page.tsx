import { Edit3Icon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SortableAdminGrid } from "@/components/admin/sortable-admin-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllHeroSlides } from "@/lib/queries/hero";
import { reorderHeroSlidesAction } from "./actions";
import { DeleteHeroButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

export default function HeroAdminPage() {
  const slides = getAllHeroSlides();

  return (
    <div className="min-h-screen space-y-12 bg-ivory">
      <header className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-obsidian/50" />
            <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
              Management
            </span>
          </div>
          <h1 className="font-light font-sans text-4xl text-obsidian leading-none tracking-tight md:text-6xl">
            Hero Slider
          </h1>
          <p className="mt-4 font-light text-ash text-sm uppercase leading-relaxed tracking-widest">
            Quản lý các hình ảnh và thông tin hiển thị ở đầu trang chủ.
          </p>
        </div>

        <Link href="/admin/hero/new">
          <Button className="group h-auto rounded-none bg-obsidian px-8 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian">
            <PlusIcon className="mr-3 size-4 transition-transform duration-500 group-hover:rotate-90" />
            Thêm Slide mới
          </Button>
        </Link>
      </header>

      <SortableAdminGrid
        ids={slides.map((slide) => slide.id)}
        onReorder={reorderHeroSlidesAction}
        className="grid 3xl:grid-cols-5 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="group relative overflow-hidden border border-black/5 bg-white shadow-sm transition-all duration-700 hover:shadow-luxury"
          >
            {/* Aspect wrapper */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={slide.src}
                alt={slide.title || ""}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge
                  className={
                    slide.is_active
                      ? "bg-green-500/80 backdrop-blur-md"
                      : "bg-red-500/80 backdrop-blur-md"
                  }
                >
                  {slide.is_active ? "Đang bật" : "Đang tắt"}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/20 bg-white/10 text-white backdrop-blur-md"
                >
                  Thứ tự: {slide.sort_order}
                </Badge>
              </div>

              {/* Actions */}
              <div className="absolute top-6 right-6 z-30 flex translate-x-0 flex-col gap-3 opacity-100 transition-all duration-700 md:translate-x-12 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                <Link href={`/admin/hero/edit/${slide.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-12 rounded-none border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-xl transition-all hover:bg-obsidian hover:text-white"
                  >
                    <Edit3Icon className="size-5" />
                  </Button>
                </Link>
                <DeleteHeroButton id={slide.id} />
              </div>

              {/* Info */}
              <div className="absolute right-6 bottom-6 left-6">
                <p className="mb-1 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em] opacity-80">
                  {slide.subtitle}
                </p>
                <h3 className="font-light font-sans text-white text-xl leading-snug">
                  {slide.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between border-black/5 border-t bg-white p-4">
              <span className="text-[10px] text-ash uppercase tracking-widest">
                {slide.cta_label || "Không có nút"}
              </span>
              <span className="max-w-[150px] truncate text-[10px] text-mist">
                {slide.cta_href}
              </span>
            </div>
          </div>
        ))}
      </SortableAdminGrid>

      {slides.length === 0 && (
        <div className="flex flex-center flex-col items-center justify-center border-2 border-black/5 border-dashed py-32 text-center">
          <p className="text-ash text-xs uppercase tracking-widest">
            Chưa có slide nào
          </p>
          <Link
            href="/admin/hero/new"
            className="mt-4 font-bold text-[11px] text-obsidian uppercase tracking-widest hover:underline"
          >
            Tạo slide đầu tiên →
          </Link>
        </div>
      )}
    </div>
  );
}
