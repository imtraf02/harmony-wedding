'use client';

import { useState } from 'react';

interface FormState {
  name       : string;
  phone      : string;
  email      : string;
  service    : string;
  weddingDate: string;
  guestCount : string;
  message    : string;
}

const INITIAL: FormState = {
  name: '', phone: '', email: '', service: 'photography',
  weddingDate: '', guestCount: '', message: '',
};

export function ContactForm() {
  const [form,    setForm]    = useState<FormState>(INITIAL);
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/contact', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          ...form,
          guestCount: form.guestCount ? Number(form.guestCount) : undefined,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(INITIAL);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrMsg(data?.message ?? 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch {
      setStatus('error');
      setErrMsg('Lỗi kết nối. Vui lòng kiểm tra lại mạng.');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center text-center py-12 animate-fade-in" role="status">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-sans mb-2 text-foreground">Cảm ơn bạn!</h3>
        <p className="text-muted-foreground font-light">Chúng tôi đã nhận được thông tin và sẽ liên hệ lại với bạn trong vòng 24 giờ.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Họ và tên *</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
            placeholder="Nguyễn Văn An"
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-phone" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Số điện thoại *</label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
            placeholder="0901 234 567"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Địa chỉ Email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
            placeholder="email@vidu.com"
            autoComplete="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-service" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Dịch vụ quan tâm *</label>
          <select
            id="cf-service"
            name="service"
            required
            value={form.service}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold appearance-none"
          >
            <option value="photography">Chụp ảnh cưới</option>
            <option value="videography">Quay phim cưới</option>
            <option value="wedding-film">Phóng sự cưới</option>
            <option value="combo">Gói Combo (Ảnh + Phim)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-date" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Ngày cưới (dự kiến)</label>
          <input
            id="cf-date"
            name="weddingDate"
            type="date"
            value={form.weddingDate}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-guests" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Số lượng khách</label>
          <input
            id="cf-guests"
            name="guestCount"
            type="number"
            min="1"
            max="2000"
            value={form.guestCount}
            onChange={handleChange}
            className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
            placeholder="150"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cf-message" className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground ml-1">Lời nhắn của bạn</label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          maxLength={1000}
          value={form.message}
          onChange={handleChange}
          className="px-6 py-4 bg-background border border-border rounded-2xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold resize-none"
          placeholder="Hãy kể cho chúng tôi về kế hoạch của bạn..."
        />
      </div>

      {status === 'error' && (
        <p className="text-destructive text-xs font-medium ml-1" role="alert">{errMsg}</p>
      )}

      <button
        type="submit"
        id="cf-submit"
        className="w-full inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-md disabled:opacity-50"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Đang gửi…
          </span>
        ) : 'Gửi thông tin'}
      </button>
    </form>
  );
}
