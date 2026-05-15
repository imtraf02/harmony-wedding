'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SERVICE_ITEMS = [
  { label: 'Chọn dịch vụ', value: null },
  { label: 'Chụp ảnh cưới', value: 'photography' },
  { label: 'Quay phim cưới', value: 'videography' },
  { label: 'Phóng sự cưới', value: 'wedding-film' },
  { label: 'Combo Ảnh + Phim', value: 'combo' },
];

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    couple_name: '',
    content: '',
    rating: 5,
    avatar: '',
    service: 'photography',
    wedding_year: new Date().getFullYear(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/testimonials');
        router.refresh();
      } else {
        alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch {
      alert('Lỗi kết nối.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 font-sans">
      <header className="flex items-center gap-6">
        <Button variant="outline" size="icon" render={<Link href="/admin/testimonials" />} nativeButton={false} className="rounded-full size-10">
          ←
        </Button>
        <div>
          <h1 className="text-4xl font-sans text-foreground mb-2">Thêm Đánh giá mới</h1>
          <p className="text-muted-foreground text-sm">Chia sẻ cảm nhận từ các cặp đôi về dịch vụ của bạn.</p>
        </div>
      </header>

      <Card className="max-w-2xl rounded-[2.5rem] border-zinc-100 shadow-2xl shadow-zinc-200/50">
        <CardHeader className="sr-only">
          <CardTitle>Thông tin đánh giá</CardTitle>
          <CardDescription>Vui lòng điền đầy đủ các thông tin bên dưới</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="grid md:grid-cols-2 gap-8">
                <Field>
                  <FieldLabel htmlFor="couple_name" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Tên cặp đôi *</FieldLabel>
                  <Input
                    id="couple_name"
                    type="text"
                    required
                    value={form.couple_name}
                    onChange={(e) => setForm({ ...form, couple_name: e.target.value })}
                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                    placeholder="Anh & Chị..."
                  />
                </Field>

                <Field>
                  <FieldLabel className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Dịch vụ *</FieldLabel>
                  <Select
                    items={SERVICE_ITEMS}
                    value={form.service}
                    onValueChange={(val) => setForm({ ...form, service: val as string })}
                  >
                    <SelectTrigger className="h-12 w-full bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SERVICE_ITEMS.filter(i => i.value !== null).map(item => (
                          <SelectItem key={item.value} value={item.value!}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="content" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Nội dung đánh giá *</FieldLabel>
                <Textarea
                  id="content"
                  required
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold resize-none p-4"
                  placeholder="Cảm nhận của khách hàng về dịch vụ..."
                />
              </Field>

              <div className="grid md:grid-cols-2 gap-8">
                <Field>
                  <FieldLabel htmlFor="rating" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Đánh giá (1-5 sao) *</FieldLabel>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="wedding_year" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Năm tổ chức *</FieldLabel>
                  <Input
                    id="wedding_year"
                    type="number"
                    required
                    value={form.wedding_year}
                    onChange={(e) => setForm({ ...form, wedding_year: Number(e.target.value) })}
                    className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="avatar" className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">URL Ảnh đại diện (Link ảnh)</FieldLabel>
                <Input
                  id="avatar"
                  type="text"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  className="h-12 bg-zinc-50 border-zinc-100 rounded-2xl focus:ring-4 focus:ring-gold/10 focus:border-gold"
                  placeholder="https://..."
                />
              </Field>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-7 bg-gold text-white rounded-full font-bold text-sm hover:opacity-90 shadow-xl shadow-gold/20"
                >
                  {loading && <Spinner data-icon="inline-start" />}
                  {loading ? 'Đang lưu...' : 'Lưu đánh giá'}
                </Button>
                <Button
                  variant="secondary"
                  render={<Link href="/admin/testimonials" />}
                  nativeButton={false}
                  className="flex-1 py-7 bg-zinc-100 text-zinc-600 rounded-full font-bold text-sm hover:bg-zinc-200"
                >
                  Hủy
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
