'use client';

import { useTransition } from 'react';
import { deletePortfolioAction } from '../actions';

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
      className="text-xs font-semibold text-zinc-500 hover:text-destructive transition-colors disabled:opacity-50"
    >
      {isPending ? 'Đang xóa...' : 'Xóa'}
    </button>
  );
}
