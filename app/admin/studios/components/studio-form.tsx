'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import type { Studio } from '@/types';
import { createStudioAction, updateStudioAction } from '../actions';

interface StudioFormProps {
  initialData?: Studio;
}

const typeItems = [
  { label: 'Studio', value: 'studio' },
  { label: 'Ngoại cảnh', value: 'outdoor' },
  { label: 'Điểm đến', value: 'destination' },
];

export function StudioForm({ initialData }: StudioFormProps) {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(event.currentTarget);

      if (initialData) {
        await updateStudioAction(initialData.id, formData);
      } else {
        await createStudioAction(formData);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Có lỗi xảy ra khi lưu studio');
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-sans">
      <FieldGroup className="gap-10">
        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name" className="text-label-luxury text-ash mb-3 block">
              Tên địa điểm
            </FieldLabel>
            <Input
              id="name"
              name="name"
              required
              defaultValue={initialData?.name}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Harmony Studio Quận 1"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="slug" className="text-label-luxury text-ash mb-3 block">
              Đường dẫn tĩnh
            </FieldLabel>
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={initialData?.slug}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="harmony-studio-quan-1"
            />
          </Field>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Field>
            <FieldLabel className="text-label-luxury text-ash mb-3 block">
              Loại địa điểm
            </FieldLabel>
            <Select items={typeItems} name="type" defaultValue={initialData?.type || 'studio'}>
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {typeItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="focus:bg-gold-dim focus:text-gold rounded-none py-3">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="city" className="text-label-luxury text-ash mb-3 block">
              Thành phố
            </FieldLabel>
            <Input
              id="city"
              name="city"
              required
              defaultValue={initialData?.city}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="TP. Hồ Chí Minh"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="sort_order" className="text-label-luxury text-ash mb-3 block">
              Thứ tự
            </FieldLabel>
            <Input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order ?? 0}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="address" className="text-label-luxury text-ash mb-3 block">
            Địa chỉ
          </FieldLabel>
          <Input
            id="address"
            name="address"
            defaultValue={initialData?.address || ''}
            className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
            placeholder="Số nhà, đường, phường/xã..."
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description" className="text-label-luxury text-ash mb-3 block">
            Mô tả
          </FieldLabel>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description || ''}
            className="min-h-36 bg-transparent border border-black/5 rounded-none p-4 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all resize-y"
            placeholder="Mô tả phong cách, bối cảnh và trải nghiệm tại địa điểm..."
          />
        </Field>

        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="highlights" className="text-label-luxury text-ash mb-3 block">
              Điểm nổi bật
            </FieldLabel>
            <Textarea
              id="highlights"
              name="highlights"
              defaultValue={initialData?.highlights.join('\n') || ''}
              className="min-h-44 bg-transparent border border-black/5 rounded-none p-4 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all resize-y"
              placeholder="Mỗi dòng một điểm nổi bật"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="images" className="text-label-luxury text-ash mb-3 block">
              Hình ảnh
            </FieldLabel>
            <Textarea
              id="images"
              name="images"
              defaultValue={initialData?.images.join('\n') || ''}
              className="min-h-44 bg-transparent border border-black/5 rounded-none p-4 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all resize-y"
              placeholder="Mỗi dòng một URL ảnh"
            />
          </Field>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="best_time" className="text-label-luxury text-ash mb-3 block">
              Thời điểm đẹp nhất
            </FieldLabel>
            <Input
              id="best_time"
              name="best_time"
              defaultValue={initialData?.best_time || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="08:00 - 11:00 hoặc 15:00 - 17:30"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="map_embed_url" className="text-label-luxury text-ash mb-3 block">
              Link Google Maps
            </FieldLabel>
            <Input
              id="map_embed_url"
              name="map_embed_url"
              defaultValue={initialData?.map_embed_url || ''}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="https://maps.google.com/..."
            />
          </Field>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            defaultChecked={initialData ? initialData.is_active : true}
            className="size-5 appearance-none border border-black/10 rounded-none checked:bg-gold checked:border-gold transition-all cursor-pointer"
          />
          <label
            htmlFor="is_active"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-smoke cursor-pointer hover:text-gold transition-colors"
          >
            Hiển thị trên trang Studio
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 pt-10">
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 py-8 bg-obsidian text-ivory rounded-none font-medium text-[11px] uppercase tracking-[0.3em] hover:bg-gold transition-all duration-500 shadow-luxury"
          >
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? 'Đang lưu...' : initialData ? 'Cập nhật địa điểm' : 'Tạo địa điểm'}
          </Button>
          <Button
            variant="ghost"
            render={<Link href="/admin/studios" />}
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
