"use client";

import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { deleteStudioAction } from "../actions";

export function DeleteStudioButton({ id, name }: { id: number; name: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa "${name}"?`)) {
      startTransition(() => deleteStudioAction(id));
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-mist transition-colors hover:text-red-500 disabled:opacity-40"
      title="Xóa"
    >
      <Trash2Icon className="size-4" />
    </button>
  );
}
