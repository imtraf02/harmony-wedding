import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { HeroForm } from "../components/hero-form";

export default function NewHeroPage() {
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
              Creation
            </span>
          </div>
          <h1 className="font-light font-sans text-4xl text-obsidian leading-none tracking-tight md:text-5xl">
            Thêm Slide mới
          </h1>
          <p className="mt-4 font-light text-ash text-sm uppercase leading-relaxed tracking-widest">
            Tạo một slide mới cho trang chủ.
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
          <HeroForm />
        </div>
      </div>
    </div>
  );
}
