"use client";

import { Maximize2Icon, PlayIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PostProduction } from "@/types";

interface PostProductionGridProps {
  items: PostProduction[];
}

const CATEGORY_LABELS: Record<string, string> = {
  reels: "Reels dọc",
  "highlight-film": "Highlight film",
  "color-grading": "Blend màu",
  "skin-retouch": "Retouch da",
  "cinematic-edit": "Dựng cinematic",
};

function VideoPreview({ item }: { item: PostProduction }) {
  return (
    <video
      src={item.video_url}
      poster={item.poster_image || undefined}
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={(event) => {
        void event.currentTarget.play();
      }}
      onMouseLeave={(event) => {
        event.currentTarget.pause();
        event.currentTarget.currentTime = 0;
      }}
      className="h-full w-full object-cover"
    >
      Trình duyệt không hỗ trợ phát video.
    </video>
  );
}

function VideoModal({
  item,
  onClose,
}: {
  item: PostProduction;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeydown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[500] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-md sm:p-8"
    >
      <button
        type="button"
        aria-label="Đóng video"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="relative flex max-h-full w-full max-w-6xl flex-col gap-5 lg:flex-row lg:items-end">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-0 right-0 z-10 rounded-full border border-white/15 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          aria-label="Đóng video"
        >
          <XIcon data-icon="inline-start" />
        </Button>

        <div
          className={cn(
            "mx-auto overflow-hidden bg-black shadow-2xl",
            item.orientation === "vertical" && "aspect-[9/16] max-h-[82vh]",
            item.orientation === "horizontal" && "aspect-video w-full",
            item.orientation === "square" && "aspect-square max-h-[82vh]",
          )}
        >
          {/* biome-ignore lint/a11y/useMediaCaption: post-production entries do not collect caption tracks yet. */}
          <video
            src={item.video_url}
            poster={item.poster_image || undefined}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          >
            Trình duyệt không hỗ trợ phát video.
          </video>
        </div>

        <div className="max-w-sm pb-2 text-white">
          <p className="mb-3 font-bold text-[10px] text-white/45 uppercase tracking-[0.28em]">
            {CATEGORY_LABELS[item.category] ?? item.category}
          </p>
          <h2 className="font-light text-3xl leading-tight">{item.title}</h2>
          {item.description && (
            <p className="mt-4 font-light text-sm text-white/65 leading-7">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function PostProductionGrid({ items }: PostProductionGridProps) {
  const [selected, setSelected] = useState<PostProduction | null>(null);

  if (!items.length) {
    return (
      <div className="border border-black/10 border-dashed py-32 text-center">
        <p className="font-bold text-[10px] text-ash uppercase tracking-[0.28em]">
          Chưa có video hậu kỳ
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-7">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative aspect-[9/16] animate-fade-in-up-luxury overflow-hidden bg-obsidian text-left"
            style={
              {
                "--delay": `${Math.min(index, 8) * 70}ms`,
              } as React.CSSProperties
            }
          >
            <VideoPreview item={item} />

            <div className="absolute inset-0 bg-linear-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute top-4 right-4 flex size-10 items-center justify-center border border-white/20 bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
              <Maximize2Icon data-icon="inline-start" />
            </div>

            <div className="absolute right-0 bottom-0 left-0 p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md">
                  <PlayIcon data-icon="inline-start" />
                </span>
                <span className="font-bold text-[9px] text-white/55 uppercase tracking-[0.24em]">
                  {CATEGORY_LABELS[item.category] ?? item.category}
                </span>
              </div>

              <h3 className="line-clamp-2 font-light text-white text-xl leading-tight">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-3 line-clamp-2 font-light text-white/55 text-xs leading-6">
                  {item.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <VideoModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
