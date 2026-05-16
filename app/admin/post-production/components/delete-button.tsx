"use client";

import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { deletePostProductionAction } from "../actions";

export function DeletePostProductionButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Bạn có chắc chắn muốn xóa video hậu kỳ này?")) {
      startTransition(() => {
        deletePostProductionAction(id);
      });
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
      <Trash2Icon className="size-5 text-white" />
    </button>
  );
}
