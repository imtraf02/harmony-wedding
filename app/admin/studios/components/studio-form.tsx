"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Studio } from "@/types";
import { createStudioAction, updateStudioAction } from "../actions";

interface StudioFormProps {
  initialData?: Studio;
}

const typeItems = [
  { label: "Studio", value: "studio" },
  { label: "Ngoại cảnh", value: "outdoor" },
  { label: "Điểm đến", value: "destination" },
];

export function StudioForm({ initialData }: StudioFormProps) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(event.currentTarget);

      if (initialData) {
        await updateStudioAction(initialData.id, formData);
      } else {
        await createStudioAction(formData);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu studio",
      );
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-sans">
      <FieldGroup className="gap-10">
        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="name"
              className="mb-3 block text-ash text-label-luxury"
            >
              Tên địa điểm
            </FieldLabel>
            <Input
              id="name"
              name="name"
              required
              defaultValue={initialData?.name}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Harmony Studio Quận 1"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="slug"
              className="mb-3 block text-ash text-label-luxury"
            >
              Đường dẫn tĩnh
            </FieldLabel>
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={initialData?.slug}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="harmony-studio-quan-1"
            />
          </Field>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Field>
            <FieldLabel className="mb-3 block text-ash text-label-luxury">
              Loại địa điểm
            </FieldLabel>
            <Select
              items={typeItems}
              name="type"
              defaultValue={initialData?.type || "studio"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {typeItems.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="rounded-none py-3 focus:bg-obsidian-dim focus:text-obsidian"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="city"
              className="mb-3 block text-ash text-label-luxury"
            >
              Thành phố
            </FieldLabel>
            <Input
              id="city"
              name="city"
              required
              defaultValue={initialData?.city}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="TP. Hồ Chí Minh"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="sort_order"
              className="mb-3 block text-ash text-label-luxury"
            >
              Thứ tự
            </FieldLabel>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order ?? 0}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel
            htmlFor="address"
            className="mb-3 block text-ash text-label-luxury"
          >
            Địa chỉ
          </FieldLabel>
          <Input
            id="address"
            name="address"
            defaultValue={initialData?.address || ""}
            className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="Số nhà, đường, phường/xã..."
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="description"
            className="mb-3 block text-ash text-label-luxury"
          >
            Mô tả
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description || ""}
            className="min-h-36 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="Mô tả phong cách, bối cảnh và trải nghiệm tại địa điểm..."
          />
        </Field>

        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="highlights"
              className="mb-3 block text-ash text-label-luxury"
            >
              Điểm nổi bật
            </FieldLabel>
            <Textarea
              id="highlights"
              name="highlights"
              defaultValue={initialData?.highlights.join("\n") || ""}
              className="min-h-44 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Mỗi dòng một điểm nổi bật"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="images"
              className="mb-3 block text-ash text-label-luxury"
            >
              Hình ảnh
            </FieldLabel>
            <Textarea
              id="images"
              name="images"
              defaultValue={initialData?.images.join("\n") || ""}
              className="min-h-44 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Mỗi dòng một URL ảnh"
            />
          </Field>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="best_time"
              className="mb-3 block text-ash text-label-luxury"
            >
              Thời điểm đẹp nhất
            </FieldLabel>
            <Input
              id="best_time"
              name="best_time"
              defaultValue={initialData?.best_time || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="08:00 - 11:00 hoặc 15:00 - 17:30"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="map_embed_url"
              className="mb-3 block text-ash text-label-luxury"
            >
              Link Google Maps
            </FieldLabel>
            <Input
              id="map_embed_url"
              name="map_embed_url"
              defaultValue={initialData?.map_embed_url || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="https://maps.google.com/..."
            />
          </Field>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked={initialData ? initialData.is_active : true}
            className="size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
          />
          <label
            htmlFor="is_active"
            className="cursor-pointer font-bold text-[11px] text-smoke uppercase tracking-[0.2em] transition-colors hover:text-obsidian"
          >
            Hiển thị trên trang Studio
          </label>
        </div>

        <div className="flex flex-col gap-6 pt-10 sm:flex-row">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-none bg-obsidian py-8 font-medium text-[11px] text-ivory uppercase tracking-[0.3em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending
              ? "Đang lưu..."
              : initialData
                ? "Cập nhật địa điểm"
                : "Tạo địa điểm"}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/studios" />}
            nativeButton={false}
            className="flex-1 rounded-none border border-black/5 bg-transparent py-8 font-medium text-[11px] text-mist uppercase tracking-[0.3em] transition-all duration-500 hover:bg-luxury-surface"
          >
            Hủy bỏ
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
