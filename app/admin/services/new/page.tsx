import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceForm } from "../components/service-form";

export default function NewServicePage() {
  return (
    <div className="animate-fade-in-up-luxury space-y-16 font-sans">
      <header className="flex flex-col gap-6">
        <Button
          variant="ghost"
          render={<Link href="/admin/services" />}
          nativeButton={false}
          className="group w-fit p-0 font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-obsidian"
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Quay lại danh sách
        </Button>
        <div className="space-y-2">
          <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
            Thêm dịch vụ mới
          </h1>
          <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
            Tạo nhóm dịch vụ và danh sách ảnh demo
          </p>
        </div>
      </header>

      <div className="w-full">
        <div className="rounded-none border border-black/5 bg-white p-6 shadow-luxury sm:p-10 lg:p-20">
          <ServiceForm />
        </div>
      </div>
    </div>
  );
}
