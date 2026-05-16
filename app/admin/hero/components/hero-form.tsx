"use client";

import { ImageIcon, X } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { uploadImageAction } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
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
import type { HeroSlide } from "@/lib/queries/hero";
import { createHeroSlideAction, updateHeroSlideAction } from "../actions";

interface HeroFormProps {
  initialData?: HeroSlide;
}

export function HeroForm({ initialData }: HeroFormProps) {
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
        const res = await uploadImageAction(fd, "hero");
        if (res.success) {
          finalSrc = res.url!;
        } else {
          toast.error(`Lỗi tải ảnh slide: ${res.message}`);
          setIsPending(false);
          return;
        }
      }

      formData.delete("src_file");
      if (finalSrc) {
        formData.set("src", finalSrc);
      }

      if (initialData) {
        await updateHeroSlideAction(initialData.id, formData);
      } else {
        await createHeroSlideAction(formData);
      }
    } catch (_err) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <Field>
            <FieldLabel
              htmlFor="title"
              className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
            >
              Tiêu đề chính
            </FieldLabel>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Ví dụ: Moments of Love"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="subtitle"
              className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
            >
              Tag (Nhãn nhỏ trên tiêu đề)
            </FieldLabel>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={initialData?.subtitle || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Ví dụ: Pre-wedding"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
            >
              Mô tả (Dòng văn bản phía dưới)
            </FieldLabel>
            <Input
              id="description"
              name="description"
              defaultValue={initialData?.description || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Ví dụ: Không gian phim trường chuyên nghiệp..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-6">
            <Field>
              <FieldLabel
                htmlFor="cta_label"
                className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
              >
                Nhãn nút (CTA)
              </FieldLabel>
              <Input
                id="cta_label"
                name="cta_label"
                defaultValue={initialData?.cta_label || ""}
                className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
                placeholder="Xem chi tiết"
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="cta_href"
                className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
              >
                Link nút (HREF)
              </FieldLabel>
              <Input
                id="cta_href"
                name="cta_href"
                defaultValue={initialData?.cta_href || ""}
                className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
                placeholder="/portfolio/..."
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Field>
              <FieldLabel
                htmlFor="sort_order"
                className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
              >
                Thứ tự hiển thị
              </FieldLabel>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={initialData?.sort_order ?? 0}
                className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              />
            </Field>

            <div className="flex items-end pb-3">
              <label className="group flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={initialData ? initialData.is_active : true}
                  className="size-5 rounded-none border-black/10 text-obsidian focus:ring-obsidian/20"
                />
                <span className="font-bold text-[10px] text-ash uppercase tracking-[0.2em] transition-colors group-hover:text-obsidian">
                  Đang hoạt động
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Field>
            <FieldLabel
              htmlFor="src"
              className="mb-3 block font-bold text-[10px] text-ash uppercase tracking-[0.2em]"
            >
              Hình ảnh Slide
            </FieldLabel>
            <Input
              id="src"
              name="src"
              type="text"
              value={srcText}
              onChange={(e) => setSrcText(e.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Nhập URL hoặc tải ảnh lên bên dưới"
            />

            {srcText && files.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="group relative size-20 border border-black/5 bg-whisper">
                  <img
                    src={srcText}
                    alt="Current"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSrcText("")}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Ảnh hiện tại
                </span>
              </div>
            )}

            <div className="mt-6">
              <FileUpload
                accept="image/*"
                maxFiles={1}
                maxSize={100 * 1024 * 1024}
                value={files}
                onValueChange={setFiles}
                onFileReject={onFileReject}
              >
                <FileUploadDropzone className="border-black/5 border-dashed bg-luxury-surface py-10 transition-all hover:border-obsidian/30 hover:bg-white">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm">
                      <ImageIcon className="size-6 text-ash" />
                    </div>
                    <div>
                      <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                        Tải ảnh slide lên
                      </p>
                      <p className="mt-1 text-[10px] text-mist uppercase">
                        Tối đa 100MB
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
                  {files.map((file, index) => (
                    <FileUploadItem
                      key={index}
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
        </div>
      </div>

      <div className="flex justify-end gap-4 border-black/5 border-t pt-10">
        <Button
          type="submit"
          disabled={isPending}
          className="rounded-none bg-obsidian px-12 py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" /> Đang xử lý...
            </>
          ) : initialData ? (
            "Cập nhật Slide"
          ) : (
            "Tạo Slide mới"
          )}
        </Button>
      </div>
    </form>
  );
}
