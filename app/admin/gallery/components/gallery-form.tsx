'use client';

import { useTransition, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import { ImageIcon, X } from 'lucide-react';
import { toast } from 'sonner';
import type { GalleryItem } from '@/types';
import { createGalleryItemAction, updateGalleryItemAction } from '../actions';

interface GalleryFormProps {
  initialData?: GalleryItem;
}

export function GalleryForm({ initialData }: GalleryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);
  const [srcText, setSrcText] = useState(initialData?.src || '');

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, { description: `"${file.name}" bị từ chối` });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Manually attach files to formData
    if (files.length > 0) {
      formData.set('src_file', files[0]);
    }

    startTransition(() => {
      if (initialData) {
        updateGalleryItemAction(initialData.id, formData);
      } else {
        createGalleryItemAction(formData);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 font-sans">
      <FieldGroup className="space-y-10">

        {/* ── Image source ── */}
        <Field>
          <FieldLabel className="text-label-luxury text-ash mb-3 block">
            Ảnh Gallery
          </FieldLabel>
          <div className="space-y-6">
            <Input
              id="src"
              name="src"
              type="text"
              value={srcText}
              onChange={(e) => setSrcText(e.target.value)}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Nhập URL ảnh (https://...)"
            />
            {srcText && files.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="size-20 relative border border-black/5 bg-whisper group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={srcText} alt="Current image" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => setSrcText('')}
                    className="absolute -top-2 -right-2 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Xóa ảnh này"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">Ảnh đã lưu</span>
              </div>
            )}
            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={20 * 1024 * 1024}
              value={files}
              onValueChange={setFiles}
              onFileReject={onFileReject}
              name="src_file"
              className="w-full"
            >
              <FileUploadDropzone className="border-dashed border-black/5 bg-luxury-surface hover:bg-white hover:border-gold/30 transition-all duration-500 py-10 group">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none bg-white p-4 shadow-sm border border-black/5 group-hover:border-gold/20 transition-colors">
                    <ImageIcon className="size-6 text-ash group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">
                      Hoặc tải ảnh lên
                    </p>
                    <p className="text-[10px] text-mist mt-1">PNG, JPG tối đa 20MB</p>
                  </div>
                  <FileUploadTrigger
                    render={
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 rounded-none border-black/5 text-[9px] uppercase tracking-widest font-bold px-6"
                      />
                    }
                  >
                    Chọn tệp
                  </FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="mt-4">
                {files.map((file, i) => (
                  <FileUploadItem key={i} value={file} className="bg-white border-black/5 rounded-none">
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata className="text-[11px] font-light" />
                    <FileUploadItemDelete
                      render={<Button variant="ghost" size="icon" className="size-8 text-mist hover:text-red-500" />}
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
        <div className="grid md:grid-cols-2 gap-12">
          <Field>
            <FieldLabel htmlFor="alt" className="text-label-luxury text-ash mb-3 block">
              Alt text (mô tả ảnh)
            </FieldLabel>
            <Input
              id="alt"
              name="alt"
              type="text"
              defaultValue={initialData?.alt}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="VD: Cặp đôi trong khu vườn"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="label" className="text-label-luxury text-ash mb-3 block">
              Nhãn hiển thị (Label)
            </FieldLabel>
            <Input
              id="label"
              name="label"
              type="text"
              defaultValue={initialData?.label ?? ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="VD: The Ceremony"
            />
          </Field>
        </div>

        {/* ── Sort order ── */}
        <Field>
          <FieldLabel htmlFor="sort_order" className="text-label-luxury text-ash mb-3 block">
            Thứ tự hiển thị
          </FieldLabel>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={initialData?.sort_order ?? 0}
            className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 w-40 text-obsidian focus:ring-0 focus:border-gold transition-all"
          />
        </Field>

        {/* ── Active ── */}
        <div className="flex items-center gap-4 pt-4 group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="is_active"
              name="is_active"
              defaultChecked={initialData ? initialData.is_active : true}
              className="peer size-5 appearance-none border border-black/10 rounded-none checked:bg-gold checked:border-gold transition-all cursor-pointer"
            />
            <svg
              className="absolute size-5 pointer-events-none hidden peer-checked:block text-ivory"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <label
            htmlFor="is_active"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke cursor-pointer group-hover:text-gold transition-colors"
          >
            Hiển thị ảnh này trên trang chủ
          </label>
        </div>

        {/* ── Actions ── */}
        <div className="flex flex-col sm:flex-row gap-6 pt-12">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 py-8 bg-obsidian text-ivory rounded-none font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-luxury"
          >
            {isPending && <Spinner className="mr-2" />}
            {isPending ? 'Đang lưu...' : initialData ? 'Cập nhật ảnh' : 'Thêm ảnh'}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/gallery" />}
            nativeButton={false}
            className="flex-1 py-8 bg-transparent border border-black/5 text-mist rounded-none font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-luxury-surface transition-all duration-500"
          >
            Hủy bỏ
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
