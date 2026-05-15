'use client';

import { useTransition, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { HeroSlide } from '@/lib/queries/hero';
import { createHeroSlideAction, updateHeroSlideAction } from '../actions';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger
} from "@/components/ui/file-upload";
import { ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

interface HeroFormProps {
  initialData?: HeroSlide;
}

export function HeroForm({ initialData }: HeroFormProps) {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [srcText, setSrcText] = useState(initialData?.src || '');

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, { description: `"${file.name}" bị từ chối` });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (files.length > 0) {
      formData.set('src_file', files[0]);
    }

    startTransition(() => {
      if (initialData) {
        updateHeroSlideAction(initialData.id, formData);
      } else {
        createHeroSlideAction(formData);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Field>
            <FieldLabel htmlFor="title" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Tiêu đề chính</FieldLabel>
            <Input
              id="title"
              name="title"
              defaultValue={initialData?.title || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Ví dụ: Moments of Love"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="subtitle" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Tag (Nhãn nhỏ trên tiêu đề)</FieldLabel>
            <Input
              id="subtitle"
              name="subtitle"
              defaultValue={initialData?.subtitle || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Ví dụ: Pre-wedding"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Mô tả (Dòng văn bản phía dưới)</FieldLabel>
            <Input
              id="description"
              name="description"
              defaultValue={initialData?.description || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Ví dụ: Không gian phim trường chuyên nghiệp..."
            />
          </Field>

          <div className="grid grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="cta_label" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Nhãn nút (CTA)</FieldLabel>
              <Input
                id="cta_label"
                name="cta_label"
                defaultValue={initialData?.cta_label || ''}
                className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
                placeholder="Xem chi tiết"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="cta_href" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Link nút (HREF)</FieldLabel>
              <Input
                id="cta_href"
                name="cta_href"
                defaultValue={initialData?.cta_href || ''}
                className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
                placeholder="/portfolio/..."
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="sort_order" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Thứ tự hiển thị</FieldLabel>
              <Input
                id="sort_order"
                name="sort_order"
                type="number"
                defaultValue={initialData?.sort_order ?? 0}
                className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              />
            </Field>

            <div className="flex items-end pb-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={initialData ? initialData.is_active : true}
                  className="size-5 rounded-none border-black/10 text-gold focus:ring-gold/20"
                />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash group-hover:text-gold transition-colors">Đang hoạt động</span>
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Field>
            <FieldLabel htmlFor="src" className="text-[10px] uppercase tracking-[0.2em] font-bold text-ash mb-3 block">Hình ảnh Slide</FieldLabel>
            <Input
              id="src"
              name="src"
              type="text"
              value={srcText}
              onChange={(e) => setSrcText(e.target.value)}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Nhập URL hoặc tải ảnh lên bên dưới"
            />
            
            {srcText && files.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="size-20 relative border border-black/5 bg-whisper group">
                  <img src={srcText} alt="Current" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => setSrcText('')}
                    className="absolute -top-2 -right-2 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">Ảnh hiện tại</span>
              </div>
            )}

            <div className="mt-6">
              <FileUpload
                accept="image/*"
                maxFiles={1}
                maxSize={4 * 1024 * 1024}
                value={files}
                onValueChange={setFiles}
                onFileReject={onFileReject}
              >
                <FileUploadDropzone className="border-dashed border-black/5 bg-luxury-surface hover:bg-white hover:border-gold/30 transition-all py-10">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-none bg-white p-4 shadow-sm border border-black/5">
                      <ImageIcon className="size-6 text-ash" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Tải ảnh slide lên</p>
                      <p className="text-[10px] text-mist mt-1 uppercase">Tối đa 4MB</p>
                    </div>
                    <FileUploadTrigger render={<Button variant="outline" size="sm" className="mt-2 rounded-none border-black/5 text-[9px] uppercase tracking-widest font-bold px-6" />}>Chọn tệp</FileUploadTrigger>
                  </div>
                </FileUploadDropzone>
                <FileUploadList className="mt-4">
                  {files.map((file, index) => (
                    <FileUploadItem key={index} value={file} className="bg-white border-black/5 rounded-none">
                      <FileUploadItemPreview />
                      <FileUploadItemMetadata className="text-[11px] font-light" />
                      <FileUploadItemDelete render={<Button variant="ghost" size="icon" className="size-8 text-mist hover:text-red-500" />}><X className="size-4" /></FileUploadItemDelete>
                    </FileUploadItem>
                  ))}
                </FileUploadList>
              </FileUpload>
            </div>
          </Field>
        </div>
      </div>

      <div className="pt-10 border-t border-black/5 flex justify-end gap-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-obsidian text-ivory px-12 py-7 rounded-none text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-gold transition-all duration-500 shadow-luxury"
        >
          {isPending ? (
            <>
              <Spinner className="mr-2 size-4" /> Đang xử lý...
            </>
          ) : (
            initialData ? 'Cập nhật Slide' : 'Tạo Slide mới'
          )}
        </Button>
      </div>
    </form>
  );
}
