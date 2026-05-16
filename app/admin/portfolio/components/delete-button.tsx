'use client';

import { useTransition } from 'react';
import { deletePortfolioAction } from '../actions';

import { Trash2Icon } from 'lucide-react';

export function DeleteButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm('Bạn có chắc chắn muốn xóa Portfolio này?')) {
      startTransition(() => {
        deletePortfolioAction(id);
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-mist hover:text-red-500 transition-colors disabled:opacity-40"
      title="Xóa"
    >
      <Trash2Icon className="size-5 text-white" />
    </button>
  );
}
