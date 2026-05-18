import { ImageIcon, PencilIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SortableAdminGrid } from "@/components/admin/sortable-admin-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllServicesAdmin } from "@/lib/queries/services";
import { reorderServicesAction } from "./actions";
import { DeleteServiceButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

export default function AdminServicesPage() {
  const services = getAllServicesAdmin();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Dịch vụ
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý nhóm dịch vụ, nội dung chi tiết và ảnh demo
          </p>
        </div>
        <Button
          render={<Link href="/admin/services/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon data-icon="inline-start" /> Thêm dịch vụ
        </Button>
      </header>

      {services.length > 0 ? (
        <SortableAdminGrid
          ids={services.map((service) => service.id)}
          onReorder={reorderServicesAction}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7"
        >
          {services.map((service) => (
            <article
              key={service.id}
              className="group border border-black/5 bg-white shadow-sm transition-all duration-500 hover:shadow-luxury"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-whisper">
                <Image
                  src={service.hero_image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="rounded-none border-0 bg-obsidian/90 text-[8px] text-ivory uppercase tracking-[0.2em]">
                    {service.subtitle || "Service"}
                  </Badge>
                  <Badge
                    className={`rounded-none border-0 text-[8px] uppercase tracking-[0.2em] ${
                      service.is_active
                        ? "bg-obsidian/70 text-white"
                        : "bg-white/80 text-ash"
                    }`}
                  >
                    {service.is_active ? "Hiện" : "Ẩn"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col gap-5 p-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em]">
                    <ImageIcon className="size-3" />
                    {service.demo_images.length} ảnh demo
                  </div>
                  <h2 className="font-light text-2xl text-obsidian tracking-tight">
                    {service.title}
                  </h2>
                  <p className="line-clamp-3 font-light text-sm text-smoke leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-black/5 border-t pt-4">
                  <span className="text-[10px] text-mist uppercase tracking-[0.2em]">
                    #{service.sort_order} · {service.slug}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/services/edit/${service.id}`}
                      className="p-2 text-mist transition-colors hover:text-obsidian"
                      aria-label={`Sửa ${service.title}`}
                    >
                      <PencilIcon className="size-4" />
                    </Link>
                    <DeleteServiceButton
                      id={service.id}
                      title={service.title}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </SortableAdminGrid>
      ) : (
        <div className="border border-black/10 border-dashed py-40 text-center">
          <p className="mb-8 font-light text-smoke text-xl tracking-wide">
            Chưa có dịch vụ nào.
          </p>
          <Button
            variant="link"
            render={<Link href="/admin/services/new" />}
            nativeButton={false}
            className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
          >
            Thêm dịch vụ đầu tiên ↗
          </Button>
        </div>
      )}
    </div>
  );
}
