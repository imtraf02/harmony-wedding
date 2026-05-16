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
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
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
import type { Portfolio } from "@/types";
import { createPortfolioAction, updatePortfolioAction } from "../actions";

interface PortfolioFormProps {
  initialData?: Portfolio;
}

const portfolioStyleItems = [
  { label: "Hiện đại", value: "modern" },
  { label: "Cổ điển", value: "vintage" },
  { label: "Nghệ thuật", value: "fineart" },
  { label: "Lãng mạn", value: "romantic" },
];

const locationTypeItems = [
  { label: "Studio", value: "studio" },
  { label: "Ngoại cảnh", value: "outdoor" },
  { label: "Điểm đến", value: "destination" },
];

const orientationItems = [
  { label: "Dọc - 3/4", value: "portrait" },
  { label: "Ngang - 4/3", value: "landscape" },
  { label: "Vuông - 1/1", value: "square" },
];

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [coverImageText, setCoverImageText] = useState(
    initialData?.cover_image || "",
  );
  const [imagesText, setImagesText] = useState(
    initialData?.images?.join(",\n") || "",
  );

  const parsedImages = imagesText
    .split(/,|\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  const removeImage = (urlToRemove: string) => {
    const newUrls = parsedImages.filter((url) => url !== urlToRemove);
    setImagesText(newUrls.join(",\n"));
  };

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${file.name}" bị từ chối`,
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Upload cover file if any
      let newCover = coverImageText;
      if (coverFiles.length > 0) {
        const fd = new FormData();
        fd.append("file", coverFiles[0]);
        const res = await uploadImageAction(fd, "portfolio");
        if (res.success) {
          newCover = res.url!;
        } else {
          toast.error(`Lỗi tải ảnh bìa: ${res.message}`);
          setIsPending(false);
          return;
        }
      }

      // Upload gallery files one by one
      const newGalleryUrls: string[] = [];
      for (const file of galleryFiles) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await uploadImageAction(fd, "portfolio");
        if (res.success) {
          newGalleryUrls.push(res.url!);
        } else {
          toast.error(`Lỗi tải ảnh "${file.name}": ${res.message}`);
        }
      }

      // Cleanup files from formData
      formData.delete("images_files");
      formData.delete("cover_image_file");

      if (newCover) {
        formData.set("cover_image", newCover);
      }

      const allImages = [...parsedImages, ...newGalleryUrls];
      formData.set("images", allImages.join(","));

      if (initialData) {
        await updatePortfolioAction(initialData.id, formData);
      } else {
        await createPortfolioAction(formData);
      }
    } catch {
      toast.error("Có lỗi xảy ra trong quá trình lưu");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 font-sans">
      <FieldGroup className="space-y-10">
        <div className="grid gap-12 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="title"
              className="mb-3 block text-ash text-label-luxury"
            >
              Tiêu đề tác phẩm
            </FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={initialData?.title}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="VD: Mùa Thu Yêu Thương"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="slug"
              className="mb-3 block text-ash text-label-luxury"
            >
              Đường dẫn tĩnh (Slug)
            </FieldLabel>
            <Input
              id="slug"
              name="slug"
              type="text"
              required
              defaultValue={initialData?.slug}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="mua-thu-yeu-thuong"
            />
          </Field>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <Field>
            <FieldLabel className="mb-3 block text-ash text-label-luxury">
              Phong cách nhiếp ảnh
            </FieldLabel>
            <Select
              items={portfolioStyleItems}
              name="style"
              defaultValue={initialData?.style || "modern"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {portfolioStyleItems.map((item) => (
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
            <FieldLabel className="mb-3 block text-ash text-label-luxury">
              Loại hình địa điểm
            </FieldLabel>
            <Select
              items={locationTypeItems}
              name="location_type"
              defaultValue={initialData?.location_type || "studio"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {locationTypeItems.map((item) => (
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
            <FieldLabel className="mb-3 block text-ash text-label-luxury">
              Tỷ lệ ảnh (Orientation)
            </FieldLabel>
            <Select
              items={orientationItems}
              name="orientation"
              defaultValue={initialData?.orientation || "portrait"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {orientationItems.map((item) => (
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
        </div>

        <Field>
          <FieldLabel className="mb-3 block text-ash text-label-luxury">
            Ảnh bìa đại diện
          </FieldLabel>
          <div className="space-y-6">
            <Input
              id="cover_image"
              name="cover_image"
              type="text"
              value={coverImageText}
              onChange={(e) => setCoverImageText(e.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Nhập link ảnh bìa (https://...)"
            />
            {coverImageText && coverFiles.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="group relative size-20 border border-black/5 bg-whisper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImageText}
                    alt="Current cover"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCoverImageText("")}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                    title="Xóa ảnh bìa"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Ảnh bìa đã lưu
                </span>
              </div>
            )}

            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={100 * 1024 * 1024}
              value={coverFiles}
              onValueChange={setCoverFiles}
              onFileReject={onFileReject}
              name="cover_image_file"
              className="w-full"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-10 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <ImageIcon className="size-6 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                      Tải ảnh bìa lên
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
                {coverFiles.map((file, index) => (
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

        <Field>
          <FieldLabel className="mb-3 block text-ash text-label-luxury">
            Bộ sưu tập hình ảnh
          </FieldLabel>
          <div className="space-y-6">
            <Textarea
              id="images"
              name="images"
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              className="min-h-[120px] resize-y rounded-none border border-black/5 bg-transparent p-4 text-[11px] text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Nhập các link ảnh. Mỗi link hoặc các link cách nhau bằng dấu phẩy (,)..."
            />

            {parsedImages.length > 0 && galleryFiles.length === 0 && (
              <div className="mt-4 space-y-3">
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Bộ sưu tập đã lưu ({parsedImages.length} ảnh):
                </span>
                <div className="flex flex-wrap gap-4">
                  {parsedImages.map((img, i) => (
                    <div
                      key={i}
                      className="group relative size-16 border border-black/5 bg-whisper"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`Gallery image ${i}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
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
              value={galleryFiles}
              onValueChange={setGalleryFiles}
              onFileReject={onFileReject}
              multiple
              name="images_files"
              className="w-full"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-12 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-5 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <PlusIcon className="size-8 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[12px] text-obsidian uppercase tracking-[0.2em]">
                      Tải bộ sưu tập lên
                    </p>
                    <p className="mt-1 text-[10px] text-mist uppercase tracking-widest">
                      Kéo thả hoặc chọn nhiều ảnh (Tối đa 20 ảnh)
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
                {galleryFiles.map((file, index) => (
                  <FileUploadItem
                    key={index}
                    value={file}
                    className="rounded-none border-black/5 bg-white p-3"
                  >
                    <FileUploadItemPreview className="size-12 rounded-none" />
                    <FileUploadItemMetadata className="truncate font-light text-[10px]" />
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

        <div className="grid gap-12 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="video_url"
              className="mb-3 block text-ash text-label-luxury"
            >
              Link Video (YouTube/Vimeo)
            </FieldLabel>
            <Input
              id="video_url"
              name="video_url"
              type="url"
              defaultValue={initialData?.video_url || ""}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="https://..."
            />
          </Field>

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
              defaultValue={initialData?.sort_order || 0}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>
        </div>

        <div className="group flex items-center gap-4 pt-4">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              defaultChecked={initialData?.is_featured}
              className="peer size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
            />
            <svg
              className="pointer-events-none absolute hidden size-5 text-ivory peer-checked:block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <label
            htmlFor="is_featured"
            className="cursor-pointer font-bold text-[11px] text-smoke uppercase tracking-[0.2em] transition-colors group-hover:text-obsidian"
          >
            Đánh dấu là tác phẩm tiêu biểu (Featured)
          </label>
        </div>

        <div className="flex flex-col gap-6 pt-12 sm:flex-row">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-none bg-obsidian py-8 font-medium text-[11px] text-ivory uppercase tracking-[0.3em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {isPending && <Spinner className="mr-2" />}
            {isPending ? "Đang lưu hệ thống..." : "Lưu Portfolio"}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/portfolio" />}
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
