'use client';

import { useTransition } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { deleteTestimonialAction } from '../actions';

export function DeleteTestimonialButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
          startTransition(() => deleteTestimonialAction(id));
        }
      }}
      className="size-9 rounded-none text-ash hover:text-red-500 hover:bg-red-500/10"
      title="Xóa"
    >
      {isPending ? <Spinner /> : <Trash2Icon />}
    </Button>
  );
}
