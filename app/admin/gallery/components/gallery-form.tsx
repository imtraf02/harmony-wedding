"use client";

import { ImageIcon, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { uploadImageAction } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { GalleryItem } from "@/types";
import { createGalleryItemAction, updateGalleryItemAction } from "../actions";

interface GalleryFormProps {
  initialData?: GalleryItem;
}

export function GalleryForm({ initialData }: GalleryFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [srcText, setSrcText] = useState(initialData?.src || "");

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, { description: `"${file.name}" bị từ chối` });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      let finalSrc = srcText;
      if (files.length > 0) {
        const fd = new FormData();
        fd.append("file", files[0]);
        const res = await uploadImageAction(fd, "gallery");
        if (res.success) {
          finalSrc = res.url!;
        } else {
          toast.error(`Lỗi tải ảnh: ${res.message}`);
          setIsPending(false);
          return;
        }
      }

      formData.delete("src_file");
      if (finalSrc) {
        formData.set("src", finalSrc);
      }

      if (initialData) {
        await updateGalleryItemAction(initialData.id, formData);
      } else {
        await createGalleryItemAction(formData);
      }
    } catch (_err) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 font-sans">
      <FieldGroup className="space-y-10">
        {/* ── Image source ── */}
        <Field>
          <FieldLabel className="mb-3 block text-ash text-label-luxury">
            Ảnh Gallery
          </FieldLabel>
          <div className="space-y-6">
            <Input
              id="src"
              name="src"
              type="text"
              value={srcText}
              onChange={(e) => setSrcText(e.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Nhập URL ảnh (https://...)"
            />
            {srcText && files.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="group relative size-20 border border-black/5 bg-whisper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={srcText}
                    alt="Current image"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSrcText("")}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                    title="Xóa ảnh này"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Ảnh đã lưu
                </span>
              </div>
            )}
            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={100 * 1024 * 1024}
              value={files}
              onValueChange={setFiles}
              onFileReject={onFileReject}
              name="src_file"
              className="w-full"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-10 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <ImageIcon className="size-6 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                      Hoặc tải ảnh lên
                    </p>
                    <p className="mt-1 text-[10px] text-mist">
                      PNG, JPG tối đa 100MB
                    </p>
                  </div>
                  <FileUploadTrigger
                    render={
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 rounded-none border-black/5 px-6 font-bold text-[9px] uppercase tracking-widest"
                      />
                    }
                  >
                    Chọn tệp
                  </FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="mt-4">
                {files.map((file, i) => (
                  <FileUploadItem
                    key={i}
                    value={file}
                    className="rounded-none border-black/5 bg-white"
                  >
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata className="font-light text-[11px]" />
                    <FileUploadItemDelete
                      render={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-mist hover:text-red-500"
                        />
                      }
                    >
                      <X className="size-4" />
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </div>
        </Field>

        {/* ── Alt text + Label ── */}
        <div className="grid gap-12 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="alt"
              className="mb-3 block text-ash text-label-luxury"
            >
              Alt text (mô tả ảnh)
            </FieldLabel>
            <Input
              id="alt"
              name="alt"
              type="text"
              defaultValue={initialData?.alt}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="VD: Cặp đôi trong khu vườn"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="label"
              className="mb-3 block text-ash text-label-luxury"
            >
              Nhãn hiển thị (Label)
            </FieldLabel>
            <Input
              id="label"
              name="label"
              type="text"
              defaultValue={initialData?.label ?? ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="VD: The Ceremony"
            />
          </Field>
        </div>

        {/* ── Sort order ── */}
        <Field>
          <FieldLabel
            htmlFor="sort_order"
            className="mb-3 block text-ash text-label-luxury"
          >
            Thứ tự hiển thị
          </FieldLabel>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={initialData?.sort_order ?? 0}
            className="h-12 w-40 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
          />
        </Field>

        {/* ── Active ── */}
        <div className="group flex items-center gap-4 pt-4">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked={initialData ? initialData.is_active : true}
              className="peer size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
            />
            <svg
              className="pointer-events-none absolute hidden size-5 text-ivory peer-checked:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <label
            htmlFor="is_active"
            className="cursor-pointer font-bold text-[11px] text-smoke uppercase tracking-[0.2em] transition-colors group-hover:text-obsidian"
          >
            Hiển thị ảnh này trên trang chủ
          </label>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col gap-6 pt-12 sm:flex-row">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-none bg-obsidian py-8 font-medium text-[11px] text-ivory uppercase tracking-[0.3em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {isPending && <Spinner className="mr-2" />}
            {isPending
              ? "Đang lưu..."
              : initialData
                ? "Cập nhật ảnh"
                : "Thêm ảnh"}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/gallery" />}
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
