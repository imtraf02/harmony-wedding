'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import type { Testimonial } from '@/types';
import { createTestimonialAction, updateTestimonialAction } from '../actions';

const serviceItems = [
  { label: 'Chụp ảnh cưới', value: 'photography' },
  { label: 'Quay phim cưới', value: 'videography' },
  { label: 'Phóng sự cưới', value: 'wedding-film' },
  { label: 'Combo Ảnh + Phim', value: 'combo' },
];

interface TestimonialFormProps {
  initialData?: Testimonial;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    couple_name: initialData?.couple_name || '',
    content: initialData?.content || '',
    rating: initialData?.rating || 5,
    avatar: initialData?.avatar || '',
    service: initialData?.service || 'photography',
    wedding_year: initialData?.wedding_year || new Date().getFullYear(),
    is_active: initialData?.is_active ?? true,
    sort_order: initialData?.sort_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = initialData
        ? await updateTestimonialAction(initialData.id, form)
        : await createTestimonialAction(form);

      if (res.success) {
        router.push('/admin/testimonials');
        router.refresh();
      } else {
        alert(res.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      alert('Lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="couple_name" className="text-[10px] uppercase tracking-widest font-bold text-ash">
              Tên cặp đôi *
            </FieldLabel>
            <Input
              id="couple_name"
              type="text"
              required
              value={form.couple_name}
              onChange={(e) => setForm({ ...form, couple_name: e.target.value })}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
              placeholder="Anh & Chị..."
            />
          </Field>

          <Field>
            <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-ash">
              Dịch vụ *
            </FieldLabel>
            <Select
              items={serviceItems}
              value={form.service}
              onValueChange={(val) => setForm({ ...form, service: val as string })}
            >
              <SelectTrigger className="h-12 w-full bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {serviceItems.map((item) => (
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
          <FieldLabel htmlFor="content" className="text-[10px] uppercase tracking-widest font-bold text-ash">
            Nội dung đánh giá *
          </FieldLabel>
          <Textarea
            id="content"
            required
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="min-h-36 bg-transparent border border-black/5 rounded-none p-4 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all resize-y"
            placeholder="Cảm nhận của khách hàng về dịch vụ..."
          />
        </Field>

        <div className="grid gap-8 md:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="rating" className="text-[10px] uppercase tracking-widest font-bold text-ash">
              Đánh giá *
            </FieldLabel>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              required
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) as Testimonial['rating'] })}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="wedding_year" className="text-[10px] uppercase tracking-widest font-bold text-ash">
              Năm tổ chức *
            </FieldLabel>
            <Input
              id="wedding_year"
              type="number"
              required
              value={form.wedding_year}
              onChange={(e) => setForm({ ...form, wedding_year: Number(e.target.value) })}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="sort_order" className="text-[10px] uppercase tracking-widest font-bold text-ash">
              Thứ tự
            </FieldLabel>
            <Input
              id="sort_order"
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
              className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian focus:ring-0 focus:border-gold transition-all"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="avatar" className="text-[10px] uppercase tracking-widest font-bold text-ash">
            URL ảnh đại diện
          </FieldLabel>
          <Input
            id="avatar"
            type="text"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="h-12 bg-transparent border-0 border-b border-black/5 rounded-none px-0 text-obsidian placeholder:text-mist focus:ring-0 focus:border-gold transition-all"
            placeholder="https://..."
          />
        </Field>

        <label className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-smoke cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="size-5 appearance-none border border-black/10 rounded-none checked:bg-gold checked:border-gold transition-all cursor-pointer"
          />
          Hiển thị đánh giá
        </label>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 py-7 bg-obsidian text-ivory rounded-none font-medium text-[11px] uppercase tracking-[0.2em] hover:bg-gold transition-all duration-500 shadow-luxury"
          >
            {loading && <Spinner data-icon="inline-start" />}
            {loading ? 'Đang lưu...' : initialData ? 'Lưu thay đổi' : 'Lưu đánh giá'}
          </Button>
          <Button
            variant="outline"
            render={<Link href="/admin/testimonials" />}
            nativeButton={false}
            className="flex-1 py-7 rounded-none font-medium text-[11px] uppercase tracking-[0.2em]"
          >
            Hủy
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
