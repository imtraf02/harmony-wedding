'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import type { Portfolio } from '@/types';
import { createPortfolioAction, updatePortfolioAction } from '../actions';
import { uploadImageAction } from '@/app/actions/upload';
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

interface PortfolioFormProps {
  initialData?: Portfolio;
}

const portfolioStyleItems = [
  { label: 'Hiện đại', value: 'modern' },
  { label: 'Cổ điển', value: 'vintage' },
  { label: 'Nghệ thuật', value: 'fineart' },
  { label: 'Lãng mạn', value: 'romantic' },
];

const locationTypeItems = [
  { label: 'Studio', value: 'studio' },
  { label: 'Ngoại cảnh', value: 'outdoor' },
  { label: 'Điểm đến', value: 'destination' },
];

const orientationItems = [
  { label: 'Dọc - 3/4', value: 'portrait' },
  { label: 'Ngang - 4/3', value: 'landscape' },
  { label: 'Vuông - 1/1', value: 'square' },
];

export function PortfolioForm({ initialData }: PortfolioFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [coverFiles, setCoverFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [coverImageText, setCoverImageText] = useState(initialData?.cover_image || '');
  const [imagesText, setImagesText] = useState(initialData?.images?.join(',\n') || '');

  const parsedImages = imagesText.split(/,|\n/).map(s => s.trim()).filter(Boolean);

  const removeImage = (urlToRemove: string) => {
    const newUrls = parsedImages.filter(url => url !== urlToRemove);
    setImagesText(newUrls.join(',\n'));
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
        fd.append('file', coverFiles[0]);
        const res = await uploadImageAction(fd, 'portfolio');
        if (res.success) {
          newCover = res.url!;
        } else {
          toast.error('Lỗi tải ảnh bìa: ' + res.message);
          setIsPending(false);
          return;
        }
      }
      
      // Upload gallery files one by one
      const newGalleryUrls: string[] = [];
      for (const file of galleryFiles) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await uploadImageAction(fd, 'portfolio');
        if (res.success) {
          newGalleryUrls.push(res.url!);
        } else {
          toast.error(`Lỗi tải ảnh "${file.name}": ` + res.message);
        }
      }

      // Cleanup files from formData
      formData.delete('images_files');
      formData.delete('cover_image_file');
      
      if (newCover) {
        formData.set('cover_image', newCover);
      }
      
      const allImages = [...parsedImages, ...newGalleryUrls];
      formData.set('images', allImages.join(','));

      if (initialData) {
        await updatePortfolioAction(initialData.id, formData);
      } else {
        await createPortfolioAction(formData);
      }
    } catch {
      toast.error('Có lỗi xảy ra trong quá trình lưu');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 font-sans">
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
            <Select items={portfolioStyleItems} name="style" defaultValue={initialData?.style || 'modern'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {portfolioStyleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="focus:bg-gold-dim focus:text-gold rounded-none py-3">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-label-luxury text-ash mb-3 block">Loại hình địa điểm</FieldLabel>
            <Select items={locationTypeItems} name="location_type" defaultValue={initialData?.location_type || 'studio'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {locationTypeItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="focus:bg-gold-dim focus:text-gold rounded-none py-3">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          
          <Field>
            <FieldLabel className="text-label-luxury text-ash mb-3 block">Tỷ lệ ảnh (Orientation)</FieldLabel>
            <Select items={orientationItems} name="orientation" defaultValue={initialData?.orientation || 'portrait'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {orientationItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="focus:bg-gold-dim focus:text-gold rounded-none py-3">
                      {item.label}
                    </SelectItem>
                  ))}
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
              type="text"
              value={coverImageText}
              onChange={(e) => setCoverImageText(e.target.value)}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Nhập link ảnh bìa (https://...)"
            />
            {coverImageText && coverFiles.length === 0 && (
              <div className="relative mt-4 flex items-center gap-4">
                <div className="size-20 relative border border-black/5 bg-whisper group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImageText} alt="Current cover" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => setCoverImageText('')}
                    className="absolute -top-2 -right-2 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    title="Xóa ảnh bìa"
                  >
                    <X className="size-3" />
                  </button>
                </div>
                <span className="text-[10px] text-mist uppercase tracking-widest">Ảnh bìa đã lưu</span>
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
              <FileUploadDropzone className="border-dashed border-black/5 bg-luxury-surface hover:bg-white hover:border-gold/30 transition-all duration-500 py-10 group">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-none bg-white p-4 shadow-sm border border-black/5 group-hover:border-gold/20 transition-colors">
                    <ImageIcon className="size-6 text-ash group-hover:text-gold transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-obsidian">Tải ảnh bìa lên</p>
                    <p className="text-[10px] text-mist mt-1">PNG, JPG tối đa 100MB</p>
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
            <Textarea
              id="images"
              name="images"
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              className="min-h-[120px] bg-transparent border border-black/5 rounded-none p-4 text-[11px] text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all resize-y"
              placeholder="Nhập các link ảnh. Mỗi link hoặc các link cách nhau bằng dấu phẩy (,)..."
            />
            
            {parsedImages.length > 0 && galleryFiles.length === 0 && (
              <div className="mt-4 space-y-3">
                <span className="text-[10px] text-mist uppercase tracking-widest">Bộ sưu tập đã lưu ({parsedImages.length} ảnh):</span>
                <div className="flex flex-wrap gap-4">
                  {parsedImages.map((img, i) => (
                    <div key={i} className="size-16 relative border border-black/5 bg-whisper group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Gallery image ${i}`} className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-2 -right-2 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
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
