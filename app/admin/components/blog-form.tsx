"use client";

import { ImageIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { createBlogPostAction, updateBlogPostAction } from "@/app/actions/blog";
import { uploadImageAction } from "@/app/actions/upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/types";

interface BlogFormProps {
  initialData?: Post;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(", ") || "");

  const isEditing = !!initialData;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "blog");

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        setCoverImage(result.url);
        toast.success("Đã tải ảnh lên thành công");
      } else {
        toast.error(result.message || "Lỗi khi tải ảnh");
      }
    } catch (_error) {
      toast.error("Có lỗi xảy ra khi tải ảnh");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("cover_image", coverImage);
    formData.set("tags", tagsStr);

    startTransition(async () => {
      const result = isEditing
        ? await updateBlogPostAction(initialData.id, formData)
        : await createBlogPostAction(formData);

      if (result.success) {
        toast.success(
          isEditing ? "Đã cập nhật bài viết" : "Đã tạo bài viết thành công",
        );
        router.push("/admin/blog");
      } else {
        toast.error(result.error || "Có lỗi xảy ra, vui lòng thử lại");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="space-y-8 lg:col-span-2">
          <div className="space-y-4">
            <Label
              htmlFor="title"
              className="font-semibold text-obsidian text-sm uppercase tracking-widest"
            >
              Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initialData?.title}
              placeholder="VD: Cẩm nang chuẩn bị cho ngày cưới hoàn hảo..."
              className="rounded-none border-black/10 py-6 text-lg focus-visible:border-obsidian focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="slug"
              className="font-semibold text-obsidian text-sm uppercase tracking-widest"
            >
              Đường dẫn (Slug)
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              placeholder="cam-nang-chuan-bi-cuoi (để trống để tự động tạo từ tiêu đề)"
              className="rounded-none border-black/10 focus-visible:border-obsidian focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="excerpt"
              className="font-semibold text-obsidian text-sm uppercase tracking-widest"
            >
              Đoạn trích (Excerpt)
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={initialData?.excerpt || ""}
              placeholder="Mô tả ngắn gọn nội dung bài viết..."
              className="min-h-[100px] resize-none rounded-none border-black/10 focus-visible:border-obsidian focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="content"
              className="font-semibold text-obsidian text-sm uppercase tracking-widest"
            >
              Nội dung chính (HTML) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              defaultValue={initialData?.content}
              placeholder="<h2>Bắt đầu hành trình...</h2><p>Đám cưới là một sự kiện trọng đại...</p>"
              className="min-h-[500px] rounded-none border-black/10 font-mono text-sm leading-relaxed focus-visible:border-obsidian focus-visible:ring-0"
            />
            <p className="text-smoke text-xs">
              Hỗ trợ các thẻ HTML cơ bản (h2, p, strong, blockquote, ul, li...)
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status */}
          <div className="space-y-6 border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="border-black/5 border-b pb-4 font-semibold text-obsidian text-sm uppercase tracking-widest">
              Trạng thái
            </h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_published" className="text-base">
                  Xuất bản
                </Label>
                <p className="text-smoke text-xs">
                  Hiển thị bài viết này trên trang chủ
                </p>
              </div>
              <Switch
                id="is_published"
                name="is_published"
                defaultChecked={initialData?.is_published}
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-none bg-obsidian py-6 font-medium text-ivory uppercase tracking-[0.2em] transition-all duration-500 hover:bg-obsidian"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Cập nhật" : "Đăng bài viết"}
            </Button>
          </div>

          {/* Cover Image */}
          <div className="space-y-6 border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="border-black/5 border-b pb-4 font-semibold text-obsidian text-sm uppercase tracking-widest">
              Ảnh bìa
            </h3>

            <div className="space-y-4">
              {coverImage ? (
                <div className="group relative aspect-[4/3] w-full overflow-hidden border border-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white px-4 py-2 font-medium text-obsidian text-xs uppercase tracking-wider transition-colors hover:bg-obsidian hover:text-white"
                    >
                      Đổi ảnh
                    </Label>
                  </div>
                </div>
              ) : (
                <Label
                  htmlFor="image-upload"
                  className="flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center border-2 border-black/10 border-dashed bg-whisper transition-colors hover:border-obsidian hover:bg-obsidian/5"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                      <Loader2 className="mb-4 h-8 w-8 animate-spin text-smoke" />
                    ) : (
                      <ImageIcon className="mb-4 h-8 w-8 text-smoke" />
                    )}
                    <p className="font-medium text-obsidian text-sm">
                      Click để tải ảnh lên
                    </p>
                    <p className="mt-1 text-smoke text-xs">
                      JPEG, PNG hoặc WebP
                    </p>
                  </div>
                </Label>
              )}
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-6 border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="border-black/5 border-b pb-4 font-semibold text-obsidian text-sm uppercase tracking-widest">
              Thẻ phân loại (Tags)
            </h3>
            <div className="space-y-2">
              <Label htmlFor="tags" className="sr-only">
                Tags
              </Label>
              <Input
                id="tags"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="tip, kinh nghiệm, xu hướng..."
                className="rounded-none border-black/10 focus-visible:border-obsidian focus-visible:ring-0"
              />
              <p className="text-smoke text-xs">Cách nhau bởi dấu phẩy</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
