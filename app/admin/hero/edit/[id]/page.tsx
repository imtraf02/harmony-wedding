import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHeroSlideById } from "@/lib/queries/hero";
import { HeroForm } from "../../components/hero-form";

export const dynamic = "force-dynamic";

interface EditHeroPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditHeroPage({ params }: EditHeroPageProps) {
  const { id } = await params;
  const slide = getHeroSlideById(Number(id));

  if (!slide) notFound();

  return (
    <div className="flex min-h-screen flex-col items-center space-y-12 bg-ivory">
      <header className="mb-4 flex w-full flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Link
            href="/admin/hero"
            className="group mb-6 inline-flex items-center gap-2 text-ash transition-colors hover:text-obsidian"
          >
            <ChevronLeftIcon className="size-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">
              Quay lại danh sách
            </span>
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-obsidian/50" />
            <span className="font-bold text-[10px] text-obsidian uppercase tracking-[0.3em]">
              Edit Slide
            </span>
          </div>
          <h1 className="font-light font-sans text-4xl text-obsidian leading-none tracking-tight md:text-5xl">
            Sửa Slide
          </h1>
          <p className="mt-4 font-light text-ash text-sm uppercase leading-relaxed tracking-widest">
            Chỉnh sửa thông tin và hình ảnh hiển thị cho slide #{id}.
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
          <HeroForm initialData={slide} />
        </div>
      </div>
    </div>
  );
}
