"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import type { Testimonial } from "@/types";
import { createTestimonialAction, updateTestimonialAction } from "../actions";

const serviceItems = [
  { label: "Chụp ảnh cưới", value: "photography" },
  { label: "Quay phim cưới", value: "videography" },
  { label: "Phóng sự cưới", value: "wedding-film" },
  { label: "Combo Ảnh + Phim", value: "combo" },
];

interface TestimonialFormProps {
  initialData?: Testimonial;
}

export function TestimonialForm({ initialData }: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    couple_name: initialData?.couple_name || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    avatar: initialData?.avatar || "",
    service: initialData?.service || "photography",
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
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        alert(res.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      alert("Lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel
              htmlFor="couple_name"
              className="font-bold text-[10px] text-ash uppercase tracking-widest"
            >
              Tên cặp đôi *
            </FieldLabel>
            <Input
              id="couple_name"
              type="text"
              required
              value={form.couple_name}
              onChange={(e) =>
                setForm({ ...form, couple_name: e.target.value })
              }
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
              placeholder="Anh & Chị..."
            />
          </Field>

          <Field>
            <FieldLabel className="font-bold text-[10px] text-ash uppercase tracking-widest">
              Dịch vụ *
            </FieldLabel>
            <Select
              items={serviceItems}
              value={form.service}
              onValueChange={(val) =>
                setForm({ ...form, service: val as string })
              }
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {serviceItems.map((item) => (
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
          <FieldLabel
            htmlFor="content"
            className="font-bold text-[10px] text-ash uppercase tracking-widest"
          >
            Nội dung đánh giá *
          </FieldLabel>
          <Textarea
            id="content"
            required
            rows={6}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="min-h-36 resize-y rounded-none border border-black/5 bg-transparent p-4 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="Cảm nhận của khách hàng về dịch vụ..."
          />
        </Field>

        <div className="grid gap-8 md:grid-cols-3">
          <Field>
            <FieldLabel
              htmlFor="rating"
              className="font-bold text-[10px] text-ash uppercase tracking-widest"
            >
              Đánh giá *
            </FieldLabel>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              required
              value={form.rating}
              onChange={(e) =>
                setForm({
                  ...form,
                  rating: Number(e.target.value) as Testimonial["rating"],
                })
              }
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="wedding_year"
              className="font-bold text-[10px] text-ash uppercase tracking-widest"
            >
              Năm tổ chức *
            </FieldLabel>
            <Input
              id="wedding_year"
              type="number"
              required
              value={form.wedding_year}
              onChange={(e) =>
                setForm({ ...form, wedding_year: Number(e.target.value) })
              }
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="sort_order"
              className="font-bold text-[10px] text-ash uppercase tracking-widest"
            >
              Thứ tự
            </FieldLabel>
            <Input
              id="sort_order"
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
              className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all focus:border-obsidian focus:ring-0"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel
            htmlFor="avatar"
            className="font-bold text-[10px] text-ash uppercase tracking-widest"
          >
            URL ảnh đại diện
          </FieldLabel>
          <Input
            id="avatar"
            type="text"
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="h-12 rounded-none border-0 border-black/5 border-b bg-transparent px-0 text-obsidian transition-all placeholder:text-mist focus:border-obsidian focus:ring-0"
            placeholder="https://..."
          />
        </Field>

        <label className="flex cursor-pointer items-center gap-3 font-bold text-[11px] text-smoke uppercase tracking-[0.2em]">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            className="size-5 cursor-pointer appearance-none rounded-none border border-black/10 transition-all checked:border-obsidian checked:bg-obsidian"
          />
          Hiển thị đánh giá
        </label>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-none bg-obsidian py-7 font-medium text-[11px] text-ivory uppercase tracking-[0.2em] shadow-luxury transition-all duration-500 hover:bg-obsidian"
          >
            {loading && <Spinner data-icon="inline-start" />}
            {loading
              ? "Đang lưu..."
              : initialData
                ? "Lưu thay đổi"
                : "Lưu đánh giá"}
          </Button>
          <Button
            variant="outline"
            render={<Link href="/admin/testimonials" />}
            nativeButton={false}
            className="flex-1 rounded-none py-7 font-medium text-[11px] uppercase tracking-[0.2em]"
          >
            Hủy
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
