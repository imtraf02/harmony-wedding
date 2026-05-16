'use client';

import { useState } from 'react';
import { submitContact } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: 'photography' | 'videography' | 'wedding-film' | 'combo';
  weddingDate: string;
  guestCount: string;
  message: string;
}

const INITIAL: FormState = {
  name: '',
  phone: '',
  email: '',
  service: 'photography',
  weddingDate: '',
  guestCount: '',
  message: '',
};

const serviceItems = [
  { label: 'Chụp ảnh cưới', value: 'photography' },
  { label: 'Quay phim cưới', value: 'videography' },
  { label: 'Phóng sự cưới', value: 'wedding-film' },
  { label: 'Gói Combo (Ảnh + Phim)', value: 'combo' },
];

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await submitContact({
        ...form,
        guestCount: form.guestCount ? Number(form.guestCount) : undefined,
      });

      if (res.success) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        setStatus('error');
        setErrMsg(res.message ?? 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Lỗi kết nối. Vui lòng kiểm tra lại mạng.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
        <div className="mb-8 flex h-16 min-w-16 items-center justify-center rounded-none border border-gold/30 bg-gold-dim px-5 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
          Đã gửi
        </div>
        <h3 className="text-3xl font-sans font-light text-obsidian">Cảm ơn bạn</h3>
        <p className="mt-4 max-w-md text-smoke font-light leading-relaxed">
          Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong vòng 24 giờ.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setStatus('idle')}
          className="mt-10 rounded-none border-black/10 px-8 py-6 text-[10px] font-bold uppercase tracking-[0.25em]"
        >
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup className="gap-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="cf-name" className="text-label-luxury text-ash">
              Họ và tên *
            </FieldLabel>
            <Input
              id="cf-name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              className="h-12 rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian placeholder:text-mist focus:border-gold focus:ring-0"
              placeholder="Nguyễn Văn An"
              autoComplete="name"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="cf-phone" className="text-label-luxury text-ash">
              Số điện thoại *
            </FieldLabel>
            <Input
              id="cf-phone"
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              className="h-12 rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian placeholder:text-mist focus:border-gold focus:ring-0"
              placeholder="0901 234 567"
              autoComplete="tel"
            />
          </Field>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="cf-email" className="text-label-luxury text-ash">
              Địa chỉ Email
            </FieldLabel>
            <Input
              id="cf-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="h-12 rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian placeholder:text-mist focus:border-gold focus:ring-0"
              placeholder="email@vidu.com"
              autoComplete="email"
            />
          </Field>

          <Field>
            <FieldLabel className="text-label-luxury text-ash">
              Dịch vụ quan tâm *
            </FieldLabel>
            <Select
              items={serviceItems}
              value={form.service}
              onValueChange={(value) => setForm((prev) => ({ ...prev, service: value as FormState['service'] }))}
            >
              <SelectTrigger className="h-12 w-full rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian focus:border-gold focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-none border-black/5 shadow-luxury">
                <SelectGroup>
                  {serviceItems.map((item) => (
                    <SelectItem key={item.value} value={item.value} className="rounded-none py-3 focus:bg-gold-dim focus:text-gold">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="cf-date" className="text-label-luxury text-ash">
              Ngày cưới dự kiến
            </FieldLabel>
            <Input
              id="cf-date"
              name="weddingDate"
              type="date"
              value={form.weddingDate}
              onChange={handleChange}
              className="h-12 rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian focus:border-gold focus:ring-0"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="cf-guests" className="text-label-luxury text-ash">
              Số lượng khách
            </FieldLabel>
            <Input
              id="cf-guests"
              name="guestCount"
              type="number"
              min="1"
              max="2000"
              value={form.guestCount}
              onChange={handleChange}
              className="h-12 rounded-none border-0 border-b border-black/10 bg-transparent px-0 text-obsidian placeholder:text-mist focus:border-gold focus:ring-0"
              placeholder="150"
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="cf-message" className="text-label-luxury text-ash">
            Lời nhắn của bạn
          </FieldLabel>
          <Textarea
            id="cf-message"
            name="message"
            rows={5}
            maxLength={1000}
            value={form.message}
            onChange={handleChange}
            className="min-h-36 resize-y rounded-none border-black/10 bg-transparent p-4 text-obsidian placeholder:text-mist focus:border-gold focus:ring-0"
            placeholder="Hãy kể cho chúng tôi về kế hoạch của bạn..."
          />
        </Field>

        {status === 'error' && (
          <p className="text-sm text-destructive" role="alert">
            {errMsg}
          </p>
        )}

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="mt-4 w-full rounded-none bg-obsidian py-8 text-[11px] font-medium uppercase tracking-[0.28em] text-ivory shadow-luxury transition-all duration-500 hover:bg-gold"
        >
          {status === 'loading' ? 'Đang gửi...' : 'Gửi thông tin'}
        </Button>
      </FieldGroup>
    </form>
  );
}
