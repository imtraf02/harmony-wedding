import { PencilIcon, PlusIcon, QuoteIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllTestimonials } from "@/lib/queries/testimonials";
import { cn } from "@/lib/utils";
import { DeleteTestimonialButton } from "./components/delete-button";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsList() {
  const items = getAllTestimonials();

  return (
    <div className="space-y-16 font-sans">
      <header className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Đánh giá khách hàng
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Quản lý phản hồi và cảm nhận từ các cặp đôi
          </p>
        </div>
        <Button
          render={<Link href="/admin/testimonials/new" />}
          nativeButton={false}
          className="rounded-none bg-obsidian px-10 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          <PlusIcon className="mr-2 size-4" /> Thêm đánh giá
        </Button>
      </header>

      <div className="grid gap-4 md:hidden">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-5 rounded-none border border-black/5 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-obsidian">
                  {item.couple_name}
                </p>
                <div className="mt-2 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={cn(
                        "size-3",
                        i < (item.rating || 5)
                          ? "fill-obsidian text-obsidian"
                          : "text-mist",
                      )}
                    />
                  ))}
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-none border-0 px-0 font-bold text-[9px] uppercase tracking-[0.15em]",
                  item.is_active ? "text-obsidian" : "text-ash",
                )}
              >
                &bull; {item.is_active ? "Hiển thị" : "Ẩn"}
              </Badge>
            </div>

            <p className="line-clamp-4 font-light text-smoke leading-relaxed">
              &ldquo;{item.content}&rdquo;
            </p>

            <div className="flex items-center justify-between gap-4 border-black/5 border-t pt-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-[10px] text-obsidian uppercase tracking-widest">
                  {item.service}
                </p>
                <p className="font-light text-[11px] text-smoke">
                  {item.wedding_year}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  render={<Link href={`/admin/testimonials/edit/${item.id}`} />}
                  nativeButton={false}
                  className="size-9 rounded-none text-ash hover:text-obsidian"
                  title="Sửa"
                >
                  <PencilIcon />
                </Button>
                <DeleteTestimonialButton id={item.id} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-none border border-black/5 bg-white shadow-luxury md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-black/5 border-b bg-whisper">
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Cặp đôi
                </th>
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Nội dung
                </th>
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Dịch vụ & Năm
                </th>
                <th className="px-8 py-6 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Trạng thái
                </th>
                <th className="px-8 py-6 text-right font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="group animate-fade-in-up-luxury transition-colors hover:bg-whisper"
                >
                  <td className="px-8 py-8 align-top">
                    <div className="flex items-center gap-4">
                      <div className="flex size-10 items-center justify-center rounded-none border border-obsidian/10 bg-obsidian-dim font-sans text-obsidian text-xl shadow-obsidian-sm">
                        {item.couple_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-obsidian">
                          {item.couple_name}
                        </p>
                        <div className="mt-1 flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={cn(
                                "size-2.5",
                                i < (item.rating || 5)
                                  ? "fill-obsidian text-obsidian"
                                  : "text-mist",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-md px-8 py-8 align-top">
                    <div className="flex gap-3">
                      <QuoteIcon className="mt-1 size-3 shrink-0 text-obsidian/30" />
                      <p className="line-clamp-3 font-light text-smoke leading-relaxed">
                        &ldquo;{item.content}&rdquo;
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <div className="space-y-1">
                      <p className="font-medium text-[10px] text-obsidian uppercase tracking-widest">
                        {item.service}
                      </p>
                      <p className="font-light text-[11px] text-smoke">
                        {item.wedding_year}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-none border-0 px-0 font-bold text-[9px] uppercase tracking-[0.15em]",
                        item.is_active ? "text-obsidian" : "text-ash",
                      )}
                    >
                      &bull; {item.is_active ? "Hiển thị" : "Ẩn"}
                    </Badge>
                  </td>
                  <td className="px-8 py-8 text-right align-top">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        render={
                          <Link href={`/admin/testimonials/edit/${item.id}`} />
                        }
                        nativeButton={false}
                        className="size-9 rounded-none text-ash hover:text-obsidian"
                        title="Sửa"
                      >
                        <PencilIcon />
                      </Button>
                      <DeleteTestimonialButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-6 text-smoke">
                      <p className="font-light text-lg tracking-wide">
                        Chưa có đánh giá nào được ghi nhận.
                      </p>
                      <Button
                        variant="link"
                        render={<Link href="/admin/testimonials/new" />}
                        nativeButton={false}
                        className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
                      >
                        Thêm đánh giá đầu tiên ngay ↗
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {items.length === 0 && (
        <div className="border border-black/10 border-dashed px-8 py-24 text-center md:hidden">
          <div className="flex flex-col items-center gap-6 text-smoke">
            <p className="font-light text-lg tracking-wide">
              Chưa có đánh giá nào được ghi nhận.
            </p>
            <Button
              variant="link"
              render={<Link href="/admin/testimonials/new" />}
              nativeButton={false}
              className="font-medium text-[11px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
            >
              Thêm đánh giá đầu tiên ngay ↗
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
