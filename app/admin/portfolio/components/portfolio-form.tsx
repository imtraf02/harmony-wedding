'use client';

import { useTransition, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import type { Portfolio } from '@/types';
import { createPortfolioAction, updatePortfolioAction } from '../actions';
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
import { ImageIcon, X, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PortfolioFormProps {
  initialData?: Portfolio;
}

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const [isPending, startTransition] = useTransition();
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const onFileReject = useCallback((file: File, message: string) => {
    toast.error(message, {
      description: `"${file.name}" bị từ chối`,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Manual append files if needed (standard input should handle it if 'name' is correct)
    // But FileUpload uses a hidden input, so we should ensure the files are there.
    // Actually FileUpload updates the hidden input's 'files' property.

    startTransition(() => {
      if (initialData) {
        updatePortfolioAction(initialData.id, formData);
      } else {
        createPortfolioAction(formData);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 font-jost">
      <FieldGroup className="space-y-10">
        <div className="grid md:grid-cols-2 gap-12">
          <Field>
            <FieldLabel htmlFor="title" className="text-label-luxury text-ash mb-3 block">Tiêu đề tác phẩm</FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={initialData?.title}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="VD: Mùa Thu Yêu Thương"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="slug" className="text-label-luxury text-ash mb-3 block">Đường dẫn tĩnh (Slug)</FieldLabel>
            <Input
              id="slug"
              name="slug"
              type="text"
              required
              defaultValue={initialData?.slug}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="mua-thu-yeu-thuong"
            />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Field>
            <FieldLabel className="text-label-luxury text-ash mb-3 block">Phong cách nhiếp ảnh</FieldLabel>
            <Select name="style" defaultValue={initialData?.style || 'modern'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue placeholder="Chọn phong cách" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  <SelectItem value="modern" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Modern (Hiện đại)</SelectItem>
                  <SelectItem value="vintage" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Vintage (Cổ điển)</SelectItem>
                  <SelectItem value="fineart" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Fine Art (Nghệ thuật)</SelectItem>
                  <SelectItem value="romantic" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Romantic (Lãng mạn)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-label-luxury text-ash mb-3 block">Loại hình địa điểm</FieldLabel>
            <Select name="location_type" defaultValue={initialData?.location_type || 'studio'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue placeholder="Chọn địa điểm" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  <SelectItem value="studio" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Studio</SelectItem>
                  <SelectItem value="outdoor" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Outdoor (Ngoại cảnh)</SelectItem>
                  <SelectItem value="destination" className="focus:bg-gold-dim focus:text-gold rounded-none py-3">Destination (Điểm đến)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field>
          <FieldLabel className="text-label-luxury text-ash mb-3 block">Ảnh bìa đại diện</FieldLabel>
          <div className="space-y-6">
            <Input
              id="cover_image"
              name="cover_image"
              type="url"
              defaultValue={initialData?.cover_image}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Nhập link ảnh bìa (https://...)"
            />

            <FileUpload
              accept="image/*"
              maxFiles={1}
              maxSize={4 * 1024 * 1024}
              value={coverFiles}
              onValueChange={setCoverFiles}
              onFileReject={onFileReject}
              name="cover_image_file"
              className="w-full"
            >
              <FileUploadDropzone className="border-dashed border-black/5 bg-luxury-surface hover:bg-white hover:border-gold/30 transition-all duration-500 py-10 group">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none bg-white p-4 shadow-sm border border-black/5 group-hover:border-gold/20 transition-colors">
                    <ImageIcon className="size-6 text-ash group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Tải ảnh bìa lên</p>
                    <p className="text-[10px] text-mist mt-1">PNG, JPG tối đa 4MB</p>
                  </div>
                  <FileUploadTrigger render={<Button variant="outline" size="sm" className="mt-2 rounded-none border-black/5 text-[9px] uppercase tracking-widest font-bold px-6" />}>Chọn tệp</FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="mt-4">
                {coverFiles.map((file, index) => (
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

        <Field>
          <FieldLabel className="text-label-luxury text-ash mb-3 block">Bộ sưu tập hình ảnh</FieldLabel>
          <div className="space-y-6">
            <Input
              id="images"
              name="images"
              type="text"
              defaultValue={initialData?.images?.join(', ')}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Các link ảnh cách nhau bằng dấu phẩy (,)"
            />

            <FileUpload
              accept="image/*"
              maxFiles={20}
              maxSize={8 * 1024 * 1024}
              value={galleryFiles}
              onValueChange={setGalleryFiles}
              onFileReject={onFileReject}
              multiple
              name="images_files"
              className="w-full"
            >
              <FileUploadDropzone className="border-dashed border-black/5 bg-luxury-surface hover:bg-white hover:border-gold/30 transition-all duration-500 py-12 group">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none bg-white p-5 shadow-sm border border-black/5 group-hover:border-gold/20 transition-colors">
                    <PlusIcon className="size-8 text-ash group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-obsidian">Tải bộ sưu tập lên</p>
                    <p className="text-[10px] text-mist mt-1 uppercase tracking-widest">Kéo thả hoặc chọn nhiều ảnh (Tối đa 20 ảnh)</p>
                  </div>
                  <FileUploadTrigger render={<Button variant="outline" className="mt-4 rounded-none border-black/5 text-[10px] uppercase tracking-[0.2em] font-bold px-8 py-6" />}>Duyệt file</FileUploadTrigger>
                </div>
              </FileUploadDropzone>
              <FileUploadList className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {galleryFiles.map((file, index) => (
                  <FileUploadItem key={index} value={file} className="bg-white border-black/5 rounded-none p-3">
                    <FileUploadItemPreview className="size-12 rounded-none" />
                    <FileUploadItemMetadata className="text-[10px] font-light truncate" />
                    <FileUploadItemDelete render={<Button variant="ghost" size="icon" className="size-8 text-mist hover:text-red-500" />}><X className="size-4" /></FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </div>
        </Field>

        <div className="grid md:grid-cols-2 gap-12">
          <Field>
            <FieldLabel htmlFor="video_url" className="text-label-luxury text-ash mb-3 block">Link Video (YouTube/Vimeo)</FieldLabel>
            <Input
              id="video_url"
              name="video_url"
              type="url"
              defaultValue={initialData?.video_url || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="https://..."
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="sort_order" className="text-label-luxury text-ash mb-3 block">Thứ tự hiển thị</FieldLabel>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order || 0}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all"
            />
          </Field>
        </div>

        <div className="flex items-center gap-4 pt-4 group">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              defaultChecked={initialData?.is_featured}
              className="peer size-5 appearance-none border border-black/10 rounded-none checked:bg-gold checked:border-gold transition-all cursor-pointer"
            />
            <svg className="absolute size-5 pointer-events-none hidden peer-checked:block text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <label htmlFor="is_featured" className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke cursor-pointer group-hover:text-gold transition-colors">
            Đánh dấu là tác phẩm tiêu biểu (Featured)
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-12">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 py-8 bg-obsidian text-ivory rounded-none font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-luxury"
          >
            {isPending && <Spinner className="mr-2" />}
            {isPending ? 'Đang lưu hệ thống...' : 'Lưu Portfolio'}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/portfolio" />}
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


