'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createBlogPostAction, updateBlogPostAction } from '@/app/actions/blog';
import { uploadImageAction } from '@/app/actions/upload';
import { toast } from 'sonner';
import { Loader2, UploadCloud, ImageIcon } from 'lucide-react';
import type { Post } from '@/types';

interface BlogFormProps {
  initialData?: Post;
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '');
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(', ') || '');

  const isEditing = !!initialData;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'blog');

      const result = await uploadImageAction(formData);

      if (result.success && result.url) {
        setCoverImage(result.url);
        toast.success('Đã tải ảnh lên thành công');
      } else {
        toast.error(result.message || 'Lỗi khi tải ảnh');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải ảnh');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('cover_image', coverImage);
    formData.set('tags', tagsStr);

    startTransition(async () => {
      const result = isEditing
        ? await updateBlogPostAction(initialData.id, formData)
        : await createBlogPostAction(formData);

      if (result.success) {
        toast.success(isEditing ? 'Đã cập nhật bài viết' : 'Đã tạo bài viết thành công');
        router.push('/admin/blog');
      } else {
        toast.error(result.error || 'Có lỗi xảy ra, vui lòng thử lại');
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <Label htmlFor="title" className="text-sm font-semibold uppercase tracking-widest text-obsidian">
              Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initialData?.title}
              placeholder="VD: Cẩm nang chuẩn bị cho ngày cưới hoàn hảo..."
              className="text-lg py-6 rounded-none border-black/10 focus-visible:border-gold focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="slug" className="text-sm font-semibold uppercase tracking-widest text-obsidian">
              Đường dẫn (Slug)
            </Label>
            <Input
              id="slug"
              name="slug"
              defaultValue={initialData?.slug}
              placeholder="cam-nang-chuan-bi-cuoi (để trống để tự động tạo từ tiêu đề)"
              className="rounded-none border-black/10 focus-visible:border-gold focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="excerpt" className="text-sm font-semibold uppercase tracking-widest text-obsidian">
              Đoạn trích (Excerpt)
            </Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={initialData?.excerpt || ''}
              placeholder="Mô tả ngắn gọn nội dung bài viết..."
              className="min-h-[100px] resize-none rounded-none border-black/10 focus-visible:border-gold focus-visible:ring-0"
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="content" className="text-sm font-semibold uppercase tracking-widest text-obsidian">
              Nội dung chính (HTML) <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              defaultValue={initialData?.content}
              placeholder="<h2>Bắt đầu hành trình...</h2><p>Đám cưới là một sự kiện trọng đại...</p>"
              className="min-h-[500px] font-mono text-sm leading-relaxed rounded-none border-black/10 focus-visible:border-gold focus-visible:ring-0"
            />
            <p className="text-xs text-smoke">Hỗ trợ các thẻ HTML cơ bản (h2, p, strong, blockquote, ul, li...)</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Status */}
          <div className="bg-white p-6 border border-black/5 shadow-sm space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-obsidian border-b border-black/5 pb-4">
              Trạng thái
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_published" className="text-base">Xuất bản</Label>
                <p className="text-xs text-smoke">Hiển thị bài viết này trên trang chủ</p>
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
              className="w-full bg-obsidian text-ivory rounded-none uppercase tracking-[0.2em] font-medium py-6 hover:bg-gold transition-all duration-500"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Cập nhật' : 'Đăng bài viết'}
            </Button>
          </div>

          {/* Cover Image */}
          <div className="bg-white p-6 border border-black/5 shadow-sm space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-obsidian border-b border-black/5 pb-4">
              Ảnh bìa
            </h3>
            
            <div className="space-y-4">
              {coverImage ? (
                <div className="relative aspect-[4/3] w-full border border-black/10 group overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage} alt="Cover" className="object-cover w-full h-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Label htmlFor="image-upload" className="cursor-pointer bg-white text-obsidian px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-gold hover:text-white transition-colors">
                      Đổi ảnh
                    </Label>
                  </div>
                </div>
              ) : (
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full aspect-[4/3] border-2 border-dashed border-black/10 bg-whisper cursor-pointer hover:border-gold hover:bg-gold/5 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 text-smoke animate-spin mb-4" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-smoke mb-4" />
                    )}
                    <p className="text-sm text-obsidian font-medium">Click để tải ảnh lên</p>
                    <p className="text-xs text-smoke mt-1">JPEG, PNG hoặc WebP</p>
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
          <div className="bg-white p-6 border border-black/5 shadow-sm space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-obsidian border-b border-black/5 pb-4">
              Thẻ phân loại (Tags)
            </h3>
            <div className="space-y-2">
              <Label htmlFor="tags" className="sr-only">Tags</Label>
              <Input
                id="tags"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="tip, kinh nghiệm, xu hướng..."
                className="rounded-none border-black/10 focus-visible:border-gold focus-visible:ring-0"
              />
              <p className="text-xs text-smoke">Cách nhau bởi dấu phẩy</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
