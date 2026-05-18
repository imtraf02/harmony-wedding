"use client";

import { ImageIcon, PlusIcon, X } from "lucide-react";
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
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { uploadImageFile } from "@/lib/upload-image-client";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/types";
import { createServiceAction, updateServiceAction } from "../actions";

interface ServiceFormProps {
  initialData?: Service;
}

export function ServiceForm({ initialData }: ServiceFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [heroFiles, setHeroFiles] = useState<File[]>([]);
  const [demoFiles, setDemoFiles] = useState<File[]>([]);
  const [heroImageText, setHeroImageText] = useState(
    initialData?.hero_image || "",
  );
  const [demoImagesText, setDemoImagesText] = useState(
    initialData?.demo_images.join("\n") || "",
  );

  const [uploadedDemoUrls, setUploadedDemoUrls] = useState<Map<File, string>>(new Map());
  const [activeUploads, setActiveUploads] = useState(0);

  const handleUploadDemo = useCallback(async (
    files: File[],
    options: {
      onProgress: (file: File, progress: number) => void;
      onSuccess: (file: File) => void;
      onError: (file: File, error: Error) => void;
    }
  ) => {
    setActiveUploads(prev => prev + files.length);
    const promises = files.map(async (file) => {
      try {
        const result = await uploadImageFile(file, "services", (progress) => {
          options.onProgress(file, progress);
        });
        if (result.success && result.url) {
          setUploadedDemoUrls((prev) => {
            const next = new Map(prev);
            next.set(file, result.url!);
            return next;
          });
          options.onSuccess(file);
        } else {
          options.onError(file, new Error(result.message || "Tải ảnh thất bại"));
        }
      } catch (err) {
        options.onError(file, err instanceof Error ? err : new Error("Tải ảnh thất bại"));
      } finally {
        setActiveUploads(prev => Math.max(0, prev - 1));
      }
    });
    await Promise.all(promises);
  }, []);

  const handleUploadHero = useCallback(async (
    files: File[],
    options: {
      onProgress: (file: File, progress: number) => void;
      onSuccess: (file: File) => void;
      onError: (file: File, error: Error) => void;
    }
  ) => {
    if (files.length === 0) return;
    const file = files[0];
    setActiveUploads(prev => prev + 1);
    try {
      const result = await uploadImageFile(file, "services", (progress) => {
        options.onProgress(file, progress);
      });
      if (result.success && result.url) {
        setHeroImageText(result.url);
        options.onSuccess(file);
      } else {
        options.onError(file, new Error(result.message || "Tải ảnh đại diện thất bại"));
      }
    } catch (err) {
      options.onError(file, err instanceof Error ? err : new Error("Tải ảnh đại diện thất bại"));
    } finally {
      setActiveUploads(prev => Math.max(0, prev - 1));
    }
  }, []);

  const parsedDemoImages = demoImagesText
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  const removeDemoImage = (urlToRemove: string) => {
    setDemoImagesText(
      parsedDemoImages.filter((url) => url !== urlToRemove).join("\n"),
    );
  };

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, { description: `"${file.name}" bị từ chối` });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeUploads > 0) {
      toast.error("Vui lòng đợi quá trình tải ảnh lên hoàn tất!");
      return;
    }
    setIsPending(true);

    try {
      const formData = new FormData(event.currentTarget);

      formData.delete("hero_image_file");
      formData.delete("demo_images_files");

      formData.set("hero_image", heroImageText);

      // Map current demo files to their uploaded URLs
      const newDemoUrls = demoFiles
        .map((file) => uploadedDemoUrls.get(file))
        .filter((url): url is string => !!url);

      formData.set(
        "demo_images",
        [...parsedDemoImages, ...newDemoUrls].join("\n"),
      );

      if (initialData) {
        await updateServiceAction(initialData.id, formData);
      } else {
        await createServiceAction(formData);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra khi lưu dịch vụ",
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-sans">
      <FieldGroup className="gap-10">
        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="title"
              className="mb-3 block text-ash text-label-luxury"
            >
              Tên dịch vụ
            </FieldLabel>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initialData?.title}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Gói Chụp Ảnh Album"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="slug"
              className="mb-3 block text-ash text-label-luxury"
            >
              Slug
            </FieldLabel>
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={initialData?.slug}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="photography"
            />
          </Field>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Field>
            <FieldLabel
              htmlFor="subtitle"
              className="mb-3 block text-ash text-label-luxury"
            >
              Nhãn phụ
            </FieldLabel>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={initialData?.subtitle}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Pre-wedding"
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

          <Field>
            <FieldLabel
              htmlFor="pricing_href"
              className="mb-3 block text-ash text-label-luxury"
            >
              Link báo giá
            </FieldLabel>
            <Input
              id="pricing_href"
              name="pricing_href"
              defaultValue={initialData?.pricing_href || "/pricing"}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="/pricing"
            />
          </Field>
        </div>

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
            required
            defaultValue={initialData?.description}
            className="min-h-36 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="Mô tả ngắn hiển thị ở trang dịch vụ..."
          />
        </Field>

        <Field>
          <FieldLabel
            htmlFor="hero_image"
            className="mb-3 block text-ash text-label-luxury"
          >
            Ảnh đại diện
          </FieldLabel>
          <div className="flex flex-col gap-6">
            <Input
              id="hero_image"
              name="hero_image"
              value={heroImageText}
              onChange={(event) => setHeroImageText(event.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="/img/prewedding.jpg hoặc /uploads/..."
            />

            {heroImageText && heroFiles.length === 0 && (
              <div className="flex items-center gap-4">
                <div className="group relative size-20 border border-black/5 bg-whisper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImageText}
                    alt="Ảnh đại diện đã lưu"
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setHeroImageText("")}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                    title="Xóa ảnh đại diện"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Ảnh đại diện đã lưu
                </span>
              </div>
            )}

            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={100 * 1024 * 1024}
              value={heroFiles}
              onValueChange={setHeroFiles}
              onFileReject={onFileReject}
              onUpload={handleUploadHero}
              name="hero_image_file"
              className="w-full"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-10 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <ImageIcon className="size-6 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                      Tải ảnh đại diện lên
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
                {heroFiles.map((file, index) => (
                  <FileUploadItem
                    key={index}
                    value={file}
                    className="rounded-none border-black/5 bg-white"
                  >
                    <FileUploadItemPreview />
                    <div className="flex-1 min-w-0">
                      <FileUploadItemMetadata className="font-light text-[11px]" />
                      <FileUploadItemProgress className="mt-1" />
                    </div>
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

        <Field>
          <FieldLabel
            htmlFor="detail_href"
            className="mb-3 block text-ash text-label-luxury"
          >
            Link chi tiết
          </FieldLabel>
          <Input
            id="detail_href"
            name="detail_href"
            defaultValue={initialData?.detail_href}
            className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="/services/photography"
          />
        </Field>

        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="features"
              className="mb-3 block text-ash text-label-luxury"
            >
              Điểm nổi bật
            </FieldLabel>
            <Textarea
              id="features"
              name="features"
              defaultValue={initialData?.features.join("\n") || ""}
              className="min-h-44 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Mỗi dòng một điểm nổi bật"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="demo_images"
              className="mb-3 block text-ash text-label-luxury"
            >
              Ảnh demo
            </FieldLabel>
            <div className="flex flex-col gap-6">
              <Textarea
                id="demo_images"
                name="demo_images"
                value={demoImagesText}
                onChange={(event) => setDemoImagesText(event.target.value)}
                className="min-h-44 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
                placeholder="Mỗi dòng một URL ảnh demo"
              />

              {parsedDemoImages.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] text-mist uppercase tracking-widest">
                    Ảnh demo đã lưu ({parsedDemoImages.length})
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {parsedDemoImages.map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="group relative size-16 border border-black/5 bg-whisper"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={`Ảnh demo ${index + 1}`}
                          className="size-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeDemoImage(image)}
                          className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                          title="Xóa ảnh này"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <FileUpload
                accept="image/*"
                maxFiles={20}
                maxSize={100 * 1024 * 1024}
                value={demoFiles}
                onValueChange={setDemoFiles}
                onFileReject={onFileReject}
                onUpload={handleUploadDemo}
                multiple
                name="demo_images_files"
                className="w-full"
              >
                <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-12 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-none border border-black/5 bg-white p-5 shadow-sm transition-colors group-hover:border-obsidian/20">
                      <PlusIcon className="size-8 text-ash transition-colors group-hover:text-obsidian" />
                    </div>
                    <div>
                      <p className="font-bold text-[12px] text-obsidian uppercase tracking-[0.2em]">
                        Tải ảnh demo lên
                      </p>
                      <p className="mt-1 text-[10px] text-mist uppercase tracking-widest">
                        Chọn nhiều ảnh, tối đa 20 ảnh
                      </p>
                    </div>
                    <FileUploadTrigger
                      render={
                        <Button
                          variant="outline"
                          className="mt-4 rounded-none border-black/5 px-8 py-6 font-bold text-[10px] uppercase tracking-[0.2em]"
                        />
                      }
                    >
                      Duyệt file
                    </FileUploadTrigger>
                  </div>
                </FileUploadDropzone>
                <FileUploadList className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {demoFiles.map((file, index) => (
                    <FileUploadItem
                      key={index}
                      value={file}
                      className="rounded-none border-black/5 bg-white p-3"
                    >
                      <FileUploadItemPreview className="size-12 rounded-none" />
                      <div className="flex-1 min-w-0">
                        <FileUploadItemMetadata className="truncate font-light text-[10px]" />
                        <FileUploadItemProgress className="mt-1" />
                      </div>
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
            Hiển thị trên trang dịch vụ
          </label>
        </div>

        <div className="flex flex-col gap-6 pt-10 sm:flex-row">
          <Button
            type="submit"
            disabled={isPending || activeUploads > 0}
            className="flex-1 rounded-none bg-obsidian py-8 font-medium text-[11px] text-ivory uppercase tracking-[0.3em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {(isPending || activeUploads > 0) && <Spinner data-icon="inline-start" />}
            {isPending
              ? "Đang lưu..."
              : activeUploads > 0
                ? `Đang tải ${activeUploads} ảnh...`
                : initialData
                  ? "Cập nhật dịch vụ"
                  : "Tạo dịch vụ"}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/services" />}
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
