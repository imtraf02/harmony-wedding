import { MapPinIcon, PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllStudiosAdmin } from "@/lib/queries/studios";
import { DeleteStudioButton } from "./components/delete-button";

const typeLabels = {
  studio: "Studio",
  outdoor: "Ngoại cảnh",
  destination: "Điểm đến",
};

export const dynamic = "force-dynamic";

export default function AdminStudiosPage() {
  const studios = getAllStudiosAdmin();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Studio & Phim trường
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý địa điểm studio, ngoại cảnh và điểm đến chụp cưới
          </p>
        </div>
        <Button
          render={<Link href="/admin/studios/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon data-icon="inline-start" /> Thêm địa điểm
        </Button>
      </header>

      {studios.length > 0 ? (
        <div className="grid 3xl:grid-cols-6 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {studios.map((studio) => {
            const image = studio.images[0] || "/img/prewedding.jpg";

            return (
              <article
                key={studio.id}
                className="group border border-black/5 bg-white shadow-sm transition-all duration-500 hover:shadow-luxury"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-whisper">
                  <Image
                    src={image}
                    alt={studio.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="rounded-none border-0 bg-obsidian/90 text-[8px] text-ivory uppercase tracking-[0.2em]">
                      {typeLabels[studio.type]}
                    </Badge>
                    <Badge
                      className={`rounded-none border-0 text-[8px] uppercase tracking-[0.2em] ${
                        studio.is_active
                          ? "bg-obsidian/70 text-white"
                          : "bg-white/80 text-ash"
                      }`}
                    >
                      {studio.is_active ? "Hiện" : "Ẩn"}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-5 p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em]">
                      <MapPinIcon className="size-3" />
                      {studio.city}
                    </div>
                    <h2 className="font-light text-2xl text-obsidian tracking-tight">
                      {studio.name}
                    </h2>
                    {studio.description && (
                      <p className="line-clamp-3 font-light text-sm text-smoke leading-relaxed">
                        {studio.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-black/5 border-t pt-4">
                    <span className="text-[10px] text-mist uppercase tracking-[0.2em]">
                      #{studio.sort_order} · {studio.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/studios/edit/${studio.id}`}
                        className="p-2 text-mist transition-colors hover:text-obsidian"
                        aria-label={`Sửa ${studio.name}`}
                      >
                        <PencilIcon className="size-4" />
                      </Link>
                      <DeleteStudioButton id={studio.id} name={studio.name} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có địa điểm studio nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/studios/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Thêm địa điểm đầu tiên ↗
          </Button>
        </div>
      )}

      {studios.length > 0 && (
        <div className="flex items-center gap-8 border-black/5 border-t pt-4 font-medium text-[10px] text-smoke uppercase tracking-[0.15em]">
          <span>Tổng: {studios.length} địa điểm</span>
          <span className="text-obsidian">
            · Đang hiện: {studios.filter((studio) => studio.is_active).length}
          </span>
          <span>
            · Đang ẩn: {studios.filter((studio) => !studio.is_active).length}
          </span>
        </div>
      )}
    </div>
  );
}
