"use client";

import { ListOrderedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Children, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableAdminGridProps {
  ids: number[];
  onReorder: (orderedIds: number[]) => Promise<void> | void;
  className: string;
  children: React.ReactNode;
}

function moveItem(ids: number[], activeId: number, overId: number) {
  const from = ids.indexOf(activeId);
  const to = ids.indexOf(overId);

  if (from === -1 || to === -1 || from === to) return ids;

  const next = [...ids];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function SortableAdminGrid({
  ids,
  onReorder,
  className,
  children,
}: SortableAdminGridProps) {
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [sortingEnabled, setSortingEnabled] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const childrenArray = Children.toArray(children);

  const persistOrder = (nextIds: number[]) => {
    startTransition(() => {
      Promise.resolve(onReorder(nextIds))
        .then(() => {
          toast.success("Đã cập nhật thứ tự hiển thị");
          router.refresh();
        })
        .catch(() => {
          toast.error("Không thể cập nhật thứ tự");
        });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button
          type="button"
          variant={sortingEnabled ? "default" : "outline"}
          onClick={() => setSortingEnabled((enabled) => !enabled)}
          disabled={isPending}
          className="rounded-none px-5 font-bold text-[10px] uppercase tracking-[0.2em]"
        >
          <ListOrderedIcon data-icon="inline-start" />
          {sortingEnabled ? "Đang sắp xếp" : "Sắp xếp"}
        </Button>
      </div>

      <ul className={className} aria-busy={isPending}>
        {ids.map((id, index) => {
          const child = childrenArray[index];
          if (!child) return null;

          return (
            <li
              key={id}
              draggable={sortingEnabled}
              className={cn(
                "relative transition-transform duration-200",
                sortingEnabled && "cursor-grab",
                draggingId === id && "scale-[0.98] opacity-60",
                overId === id && draggingId !== id && "ring-2 ring-obsidian",
                sortingEnabled && "ring-1 ring-black/10 ring-offset-4",
              )}
              onDragStart={(event) => {
                if (!sortingEnabled) return;

                setDraggingId(id);
                setOverId(null);
                event.dataTransfer.effectAllowed = "move";
                event.dataTransfer.setData("text/plain", String(id));
              }}
              onDragEnd={() => {
                if (!sortingEnabled) return;

                setDraggingId(null);
                setOverId(null);
              }}
              onDragOver={(event) => {
                if (!sortingEnabled) return;

                event.preventDefault();
                setOverId(id);
              }}
              onDrop={(event) => {
                if (!sortingEnabled) return;
                event.preventDefault();
                const activeId = Number(
                  event.dataTransfer.getData("text/plain"),
                );
                if (!Number.isFinite(activeId) || activeId === id) return;

                persistOrder(moveItem(ids, activeId, id));
              }}
            >
              {child}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
