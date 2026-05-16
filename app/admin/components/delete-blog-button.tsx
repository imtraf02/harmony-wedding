'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { TrashIcon, Loader2 } from 'lucide-react';
import { deleteBlogPostAction } from '@/app/actions/blog';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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
        toast.error(result.error || 'Có lỗi xảy ra khi xoá bài viết');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <button
            className="p-2 text-mist hover:text-red-500 transition-colors"
            aria-label={`Xoá ${title}`}
          >
            <TrashIcon className="size-4" />
          </button>
        }
      />
      <DialogContent className="sm:max-w-[425px] font-sans">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-tight text-obsidian">
            Xoá bài viết
          </DialogTitle>
          <DialogDescription className="text-smoke">
            Bạn có chắc chắn muốn xoá bài viết <strong className="text-obsidian">{title}</strong>? 
            Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="rounded-none border-black/10 text-xs uppercase tracking-widest text-obsidian"
          >
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-none bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xoá...
              </>
            ) : (
              'Xác nhận xoá'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
