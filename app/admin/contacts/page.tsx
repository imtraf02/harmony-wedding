import { getDb } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserIcon, MailIcon, PhoneIcon, CalendarIcon } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import type { Contact } from '@/types';

async function updateContactStatus(formData: FormData) {
  'use server';
  const id = Number(formData.get('id'));
  const status = formData.get('status') as string;
  const db = getDb();
  db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
  revalidatePath('/admin/contacts');
}

export default async function AdminContactsPage() {
  const db = getDb();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all() as Contact[];

  return (
    <div className="space-y-16 font-sans">
      <header className="space-y-2">
        <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Yêu cầu liên hệ</h1>
        <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">Theo dõi và quản lý các yêu cầu tư vấn từ khách hàng</p>
      </header>

      <div className="grid gap-4 md:hidden">
        {contacts.map((c) => (
          <article key={c.id} className="bg-white border border-black/5 rounded-none shadow-sm p-5 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="size-10 bg-luxury-surface rounded-none border border-black/5 flex items-center justify-center text-ash shrink-0">
                <UserIcon className="size-4 stroke-[1.2px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-obsidian truncate">{c.name}</p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-smoke">
                    <MailIcon className="size-3 text-mist shrink-0" />
                    <span className="text-[11px] font-light truncate">{c.email || 'Không có email'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-smoke">
                    <PhoneIcon className="size-3 text-mist shrink-0" />
                    <span className="text-[11px] font-light">{c.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="rounded-none border-gold-dim text-gold text-[9px] uppercase tracking-widest bg-gold-dim font-bold">
                {c.service}
              </Badge>
              <p className="text-[12px] text-smoke font-light leading-relaxed line-clamp-4">
                {c.message ? `“${c.message}”` : 'Không có tin nhắn'}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-black/5 pt-4">
              <form action={updateContactStatus} className="flex items-center gap-3">
                <input type="hidden" name="id" value={c.id} />
                <select
                  name="status"
                  defaultValue={c.status}
                  className="h-10 flex-1 text-[10px] font-bold uppercase tracking-widest bg-luxury-surface border border-black/5 rounded-none px-3 focus:ring-1 focus:ring-gold cursor-pointer"
                >
                  <option value="new">Mới</option>
                  <option value="contacted">Đã liên hệ</option>
                  <option value="booked">Đã đặt lịch</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Hủy</option>
                </select>
                <Button type="submit" variant="outline" className="h-10 rounded-none text-[10px] uppercase tracking-[0.15em]">
                  Cập nhật
                </Button>
              </form>
              <div className="flex items-center gap-2 text-smoke">
                <CalendarIcon className="size-3 text-mist" />
                <span className="text-[11px] font-light">{new Date(c.created_at).toLocaleString('vi-VN')}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden bg-white border border-black/5 rounded-none shadow-luxury overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-whisper border-b border-black/5">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Khách hàng</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Dịch vụ & Tin nhắn</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Trạng thái</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.2em] font-bold text-ash text-right">Ngày nhận</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {contacts.map((c) => (
                <tr key={c.id} className="group hover:bg-whisper transition-colors animate-fade-in-up-luxury">
                  <td className="px-8 py-8 align-top">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-luxury-surface rounded-none border border-black/5 flex items-center justify-center text-ash">
                        <UserIcon className="size-4 stroke-[1.2px]" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-obsidian group-hover:text-gold transition-colors">{c.name}</p>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-smoke">
                            <MailIcon className="size-3 text-mist" />
                            <span className="text-[11px] font-light">{c.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-smoke">
                            <PhoneIcon className="size-3 text-mist" />
                            <span className="text-[11px] font-light">{c.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top max-w-sm">
                    <div className="space-y-2">
                      <Badge variant="outline" className="rounded-none border-gold-dim text-gold text-[9px] uppercase tracking-widest bg-gold-dim font-bold">
                        {c.service}
                      </Badge>
                      <p className="text-[12px] text-smoke font-light leading-relaxed  line-clamp-3">
                        {c.message ? `“${c.message}”` : 'Không có tin nhắn'}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-8 align-top">
                    <form action={updateContactStatus} className="flex flex-col gap-2">
                      <input type="hidden" name="id" value={c.id} />
                      <select
                        name="status"
                        defaultValue={c.status}
                        className="text-[10px] font-bold uppercase tracking-widest bg-luxury-surface border-black/5 rounded-none px-3 py-2 focus:ring-1 focus:ring-gold appearance-none cursor-pointer w-full max-w-[140px]"
                      >
                        <option value="new">Mới</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="booked">Đã đặt lịch</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Hủy</option>
                      </select>
                      <Button type="submit" variant="link" className="h-auto p-0 text-[9px] text-mist hover:text-gold uppercase tracking-[0.2em] font-bold justify-start w-fit">
                        Cập nhật
                      </Button>
                    </form>
                  </td>
                  <td className="px-8 py-8 align-top text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-smoke">
                        <CalendarIcon className="size-3 text-mist" />
                        <span className="text-[11px] font-light">{new Date(c.created_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <span className="text-[9px] text-mist font-bold uppercase tracking-widest">
                        {new Date(c.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center text-smoke  font-light tracking-wide">
                    Hệ thống chưa ghi nhận yêu cầu liên hệ nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {contacts.length === 0 && (
        <div className="md:hidden px-8 py-24 text-center border border-dashed border-black/10 text-smoke font-light tracking-wide">
          Hệ thống chưa ghi nhận yêu cầu liên hệ nào.
        </div>
      )}
    </div>
  );
}
