"use client";

import { Loader2, TrashIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteBlogPostAction } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeleteBlogButton({ id, title }: { id: number; title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBlogPostAction(id);
      if (result.success) {
        toast.success(`Đã xoá bài viết "${title}"`);
        setIsOpen(false);
      } else {
        toast.error(result.error || "Có lỗi xảy ra khi xoá bài viết");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <button
            className="p-2 text-mist transition-colors hover:text-red-500"
            aria-label={`Xoá ${title}`}
          >
            <TrashIcon className="size-4" />
          </button>
        }
      />
      <DialogContent className="font-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-light text-obsidian text-xl tracking-tight">
            Xoá bài viết
          </DialogTitle>
          <DialogDescription className="text-smoke">
            Bạn có chắc chắn muốn xoá bài viết{" "}
            <strong className="text-obsidian">{title}</strong>? Hành động này
            không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="rounded-none border-black/10 text-obsidian text-xs uppercase tracking-widest"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-none bg-red-600 text-white text-xs uppercase tracking-widest hover:bg-red-700"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xoá...
              </>
            ) : (
              "Xác nhận xoá"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
