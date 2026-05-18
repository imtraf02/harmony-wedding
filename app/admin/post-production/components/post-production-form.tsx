"use client";

import { FileVideoIcon, ImageIcon, X } from "lucide-react";
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
import { uploadVideoFile } from "@/lib/upload-video-client";
import type { PostProduction } from "@/types";
import {
  createPostProductionAction,
  updatePostProductionAction,
} from "../actions";

interface PostProductionFormProps {
  initialData?: PostProduction;
}

const categoryItems = [
  { label: "Reels dọc", value: "reels" },
  { label: "Highlight film", value: "highlight-film" },
  { label: "Blend màu", value: "color-grading" },
  { label: "Retouch da", value: "skin-retouch" },
  { label: "Dựng cinematic", value: "cinematic-edit" },
];

const orientationItems = [
  { label: "Dọc - 9/16", value: "vertical" },
  { label: "Ngang - 16/9", value: "horizontal" },
  { label: "Vuông - 1/1", value: "square" },
];

const VIDEO_MAX_SIZE = 99 * 1024 * 1024;

export function PostProductionForm({ initialData }: PostProductionFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [posterFiles, setPosterFiles] = useState<File[]>([]);
  const [videoUrlText, setVideoUrlText] = useState(
    initialData?.video_url || "",
  );
  const [posterText, setPosterText] = useState(initialData?.poster_image || "");
  const [activeUploads, setActiveUploads] = useState(0);

  const handleUploadVideo = useCallback(async (
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
      const result = await uploadVideoFile(file, "post-production", (progress) => {
        options.onProgress(file, progress);
      });
      if (result.success && result.url) {
        setVideoUrlText(result.url);
        options.onSuccess(file);
      } else {
        options.onError(file, new Error(result.message || "Tải video thất bại"));
      }
    } catch (err) {
      options.onError(file, err instanceof Error ? err : new Error("Tải video thất bại"));
    } finally {
      setActiveUploads(prev => Math.max(0, prev - 1));
    }
  }, []);

  const handleUploadPoster = useCallback(async (
    filesList: File[],
    options: {
      onProgress: (file: File, progress: number) => void;
      onSuccess: (file: File) => void;
      onError: (file: File, error: Error) => void;
    }
  ) => {
    if (filesList.length === 0) return;
    const file = filesList[0];
    setActiveUploads(prev => prev + 1);
    try {
      const result = await uploadImageFile(file, "post-production", (progress) => {
        options.onProgress(file, progress);
      });
      if (result.success && result.url) {
        setPosterText(result.url);
        options.onSuccess(file);
      } else {
        options.onError(file, new Error(result.message || "Tải poster thất bại"));
      }
    } catch (err) {
      options.onError(file, err instanceof Error ? err : new Error("Tải poster thất bại"));
    } finally {
      setActiveUploads(prev => Math.max(0, prev - 1));
    }
  }, []);

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, { description: `"${file.name}" bị từ chối` });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeUploads > 0) {
      toast.error("Vui lòng đợi quá trình tải lên hoàn tất!");
      return;
    }
    setIsPending(true);

    try {
      const formData = new FormData(event.currentTarget);

      formData.delete("video_file");
      formData.delete("poster_file");
      formData.set("video_url", videoUrlText);
      formData.set("poster_image", posterText);

      if (initialData) {
        await updatePostProductionAction(initialData.id, formData);
      } else {
        await createPostProductionAction(formData);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Có lỗi xảy ra khi lưu",
      );
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
              Tiêu đề nội bộ
            </FieldLabel>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initialData?.title}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="VD: Teaser hậu kỳ dọc"
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
              placeholder="teaser-hau-ky-doc"
            />
          </Field>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <Field>
            <FieldLabel className="mb-3 block text-ash text-label-luxury">
              Hạng mục hậu kỳ
            </FieldLabel>
            <Select
              items={categoryItems}
              name="category"
              defaultValue={initialData?.category || "reels"}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {categoryItems.map((item) => (
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
              Tỷ lệ video
            </FieldLabel>
            <Select
              items={orientationItems}
              name="orientation"
              defaultValue={initialData?.orientation || "vertical"}
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
            Video hậu kỳ
          </FieldLabel>
          <div className="flex flex-col gap-6">
            <Input
              id="video_url"
              name="video_url"
              value={videoUrlText}
              onChange={(event) => setVideoUrlText(event.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="/uploads/post-production/videos/..."
            />

            {videoUrlText && videoFiles.length === 0 && (
              <div className="overflow-hidden border border-black/5 bg-obsidian">
                {/* biome-ignore lint/a11y/useMediaCaption: admin previews do not collect caption tracks. */}
                <video
                  src={videoUrlText}
                  controls
                  preload="metadata"
                  className="aspect-[9/16] max-h-[520px] w-full bg-black object-contain"
                >
                  Trình duyệt không hỗ trợ phát video.
                </video>
              </div>
            )}

            <FileUpload
              accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-m4v"
              maxFiles={1}
              maxSize={VIDEO_MAX_SIZE}
              value={videoFiles}
              onValueChange={setVideoFiles}
              onFileReject={onFileReject}
              onUpload={handleUploadVideo}
              name="video_file"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-10 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <FileVideoIcon className="size-6 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                      Tải video dọc lên
                    </p>
                    <p className="mt-1 text-[10px] text-mist">
                      MP4, WebM, OGG, MOV tối đa 99MB (Giới hạn Cloudflare)
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
                    Chọn video
                  </FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="mt-4">
                {videoFiles.map((file, index) => (
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
          <FieldLabel className="mb-3 block text-ash text-label-luxury">
            Poster / thumbnail
          </FieldLabel>
          <div className="flex flex-col gap-6">
            <Input
              id="poster_image"
              name="poster_image"
              value={posterText}
              onChange={(event) => setPosterText(event.target.value)}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="/uploads/post-production/..."
            />

            {posterText && posterFiles.length === 0 && (
              <div className="relative flex items-center gap-4">
                <div className="group relative aspect-[9/16] h-32 border border-black/5 bg-whisper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posterText}
                    alt="Poster hiện tại"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPosterText("")}
                    className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                    title="Xóa poster"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">
                  Poster đã lưu
                </span>
              </div>
            )}

            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={100 * 1024 * 1024}
              value={posterFiles}
              onValueChange={setPosterFiles}
              onFileReject={onFileReject}
              onUpload={handleUploadPoster}
              name="poster_file"
            >
              <FileUploadDropzone className="group border-black/5 border-dashed bg-luxury-surface py-10 transition-all duration-500 hover:border-obsidian/30 hover:bg-white">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none border border-black/5 bg-white p-4 shadow-sm transition-colors group-hover:border-obsidian/20">
                    <ImageIcon className="size-6 text-ash transition-colors group-hover:text-obsidian" />
                  </div>
                  <div>
                    <p className="font-bold text-[11px] text-obsidian uppercase tracking-widest">
                      Tải poster lên
                    </p>
                    <p className="mt-1 text-[10px] text-mist">
                      Khuyên dùng tỷ lệ 9/16
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
                    Chọn ảnh
                  </FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="mt-4">
                {posterFiles.map((file, index) => (
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
            htmlFor="description"
            className="mb-3 block text-ash text-label-luxury"
          >
            Mô tả ngắn
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description || ""}
            className="min-h-[120px] resize-y rounded-none border border-black/5 bg-transparent p-4 text-[11px] text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="Mô tả kỹ thuật hậu kỳ, tone màu, format bàn giao..."
          />
        </Field>

        <div className="grid gap-12 md:grid-cols-3">
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
              defaultValue={initialData?.sort_order || 0}
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>

          <label className="flex items-center gap-4 pt-8">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={initialData?.is_featured}
              className="peer size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
            />
            <span className="font-bold text-[10px] text-smoke uppercase tracking-[0.2em]">
              Featured
            </span>
          </label>

          <label className="flex items-center gap-4 pt-8">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={initialData?.is_active ?? true}
              className="peer size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
            />
            <span className="font-bold text-[10px] text-smoke uppercase tracking-[0.2em]">
              Hiển thị
            </span>
          </label>
        </div>

        <div className="flex flex-col gap-6 pt-12 sm:flex-row">
          <Button
            type="submit"
            disabled={isPending || activeUploads > 0}
            className="flex-1 rounded-none bg-obsidian py-8 font-medium text-[11px] text-ivory uppercase tracking-[0.3em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {(isPending || activeUploads > 0) && <Spinner className="mr-2" />}
            {isPending
              ? "Đang lưu..."
              : activeUploads > 0
                ? "Đang tải tệp..."
                : "Lưu video hậu kỳ"}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/post-production" />}
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
