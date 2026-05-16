import { PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPortfolios } from "@/lib/queries/portfolio";
import { DeleteButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioList() {
  const items = getPortfolios();

  return (
    <div className="space-y-16 font-sans">
      {/* ── Header ── */}
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Danh sách Portfolio
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý các bộ sưu tập hình ảnh và video
          </p>
        </div>
        <Button
          render={<Link href="/admin/portfolio/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon className="mr-2 size-4" /> Thêm mới
        </Button>
      </header>

      {/* ── Grid preview ── */}
      {items.length > 0 ? (
        <div className="grid 3xl:grid-cols-5 grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] animate-fade-in-up-luxury overflow-hidden bg-whisper shadow-sm transition-all duration-500 hover:shadow-luxury"
            >
              {/* Image */}
              {item.cover_image ? (
                <Image
                  src={item.cover_image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover grayscale-[20%] transition-transform duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-light text-[10px] text-mist uppercase tracking-widest">
                  No Image
                </div>
              )}

              {/* Status badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {item.is_featured && (
                  <Badge className="rounded-none border-0 bg-obsidian/90 px-2 py-0.5 font-bold text-[7px] text-ivory uppercase tracking-[0.2em]">
                    Featured
                  </Badge>
                )}
                <Badge className="rounded-none border-0 bg-obsidian/30 px-2 py-0.5 font-bold text-[7px] text-white uppercase tracking-[0.15em] backdrop-blur-sm">
                  {item.style}
                </Badge>
                <Badge className="rounded-none border-0 bg-obsidian/30 px-2 py-0.5 font-bold text-[7px] text-white uppercase tracking-[0.15em] backdrop-blur-sm">
                  #{item.sort_order}
                </Badge>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 z-10 bg-linear-to-t from-obsidian/80 via-obsidian/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Label + actions */}
              <div className="absolute right-0 bottom-0 left-0 z-20 translate-y-0 p-4 opacity-100 transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                <p className="mb-1 truncate font-bold text-[10px] text-obsidian uppercase tracking-[0.22em]">
                  {item.title}
                </p>
                <p className="truncate font-light text-[9px] text-white/80 uppercase leading-snug tracking-widest">
                  {item.location_type}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/admin/portfolio/edit/${item.id}`}
                    className="flex size-10 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-obsidian"
                    aria-label={`Sửa ${item.title}`}
                  >
                    <PencilIcon className="size-4 text-white" />
                  </Link>
                  <div className="flex size-10 items-center justify-center border border-white/20 bg-white/20 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-red-500">
                    <DeleteButton id={item.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có Portfolio nào trong thư viện.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/portfolio/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Tạo dự án đầu tiên ↗
          </Button>
        </div>
      )}

      {/* ── Stats footer ── */}
      {items.length > 0 && (
        <div className="flex items-center gap-8 border-black/5 border-t pt-4 font-medium text-[10px] text-smoke uppercase tracking-[0.15em]">
          <span>Tổng: {items.length} bộ sưu tập</span>
          <span className="text-obsidian">
            · Tiêu biểu (Featured): {items.filter((i) => i.is_featured).length}
          </span>
        </div>
      )}
    </div>
  );
}
