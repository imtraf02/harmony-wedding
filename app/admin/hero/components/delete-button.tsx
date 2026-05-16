'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { deleteHeroSlideAction } from '../actions';
import { Spinner } from '@/components/ui/spinner';

interface DeleteHeroButtonProps {
  id: number;
}

export function DeleteHeroButton({ id }: DeleteHeroButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        if (confirm('Bạn có chắc muốn xóa slide này?')) {
          startTransition(() => deleteHeroSlideAction(id));
        }
      }}
      className="size-12 bg-white/10 backdrop-blur-xl text-white hover:bg-red-500 hover:text-white transition-all rounded-none border border-white/20 shadow-xl"
    >
      {isPending ? <Spinner className="size-5" /> : <Trash2Icon className="size-5" />}
    </Button>
  );
}
