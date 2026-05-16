import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PostProductionForm } from "../components/post-production-form";

export default function NewPostProductionPage() {
  return (
    <div className="animate-fade-in-up-luxury space-y-16 font-sans">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/post-production" />}
          nativeButton={false}
          className="group w-fit p-0 font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-obsidian"
        >
          <ArrowLeftIcon className="mr-2 size-3 transition-transform group-hover:-translate-x-1" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Thêm video hậu kỳ
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Upload reels dọc, demo blend màu hoặc highlight hậu kỳ
          </p>
        </div>
      </header>

      <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
        <PostProductionForm />
      </div>
    </div>
  );
}
