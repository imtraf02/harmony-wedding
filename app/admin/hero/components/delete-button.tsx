"use client";

import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteHeroSlideAction } from "../actions";

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
        if (confirm("Bạn có chắc muốn xóa slide này?")) {
          startTransition(() => deleteHeroSlideAction(id));
        }
      }}
      className="size-12 rounded-none border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-xl transition-all hover:bg-red-500 hover:text-white"
    >
      {isPending ? (
        <Spinner className="size-5" />
      ) : (
        <Trash2Icon className="size-5" />
      )}
    </Button>
  );
}
