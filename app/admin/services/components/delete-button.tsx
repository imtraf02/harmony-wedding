"use client";

import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { deleteServiceAction } from "../actions";

export function DeleteServiceButton({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa dịch vụ "${title}"?`)) {
      startTransition(() => deleteServiceAction(id));
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
