import { getRecentContacts } from '@/lib/queries/stats';
import { getDb } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

async function updateContactStatus(id: number, status: string) {
  'use server';
  const db = getDb();
  db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
}

export default async function AdminContacts() {
  const db = getDb();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all() as any[];

  return (
    <div className="space-y-12 font-sans">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-cormorant text-foreground mb-2">Quản lý liên hệ</h1>
          <p className="text-muted-foreground text-sm">Xem và cập nhật trạng thái yêu cầu từ khách hàng.</p>
        </div>
      </header>

      <Card className="border-border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Thông tin tiệc</th>
              <th className="px-6 py-4">Lời nhắn</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Ngày nhận</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-6 align-top">
                  <p className="font-semibold text-base">{c.name}</p>
                  <p className="text-sm text-zinc-500 mt-1">{c.phone}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{c.email}</p>
                </td>
                <td className="px-6 py-6 align-top">
                  <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-gold border-gold/20 bg-gold/5 mb-1">
                    {c.service}
                  </Badge>
                  {c.wedding_date && (
                    <p className="text-xs text-muted-foreground">📅 {new Date(c.wedding_date).toLocaleDateString('vi-VN')}</p>
                  )}
                  {c.guest_count && (
                    <p className="text-xs text-muted-foreground">👥 {c.guest_count} khách</p>
                  )}
                </td>
                <td className="px-6 py-6 align-top max-w-xs">
                  <p className="text-xs line-clamp-3 text-zinc-600 font-light italic">
                    {c.message ? `"${c.message}"` : '—'}
                  </p>
                </td>
                <td className="px-6 py-6 align-top">
                  <form action={async (formData) => {
                    'use server';
                    const id = Number(formData.get('id'));
                    const status = formData.get('status') as string;
                    const db = getDb();
                    db.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
                  }} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={c.id} />
                    <select
                      name="status"
                      defaultValue={c.status}
                      className="text-[10px] font-bold uppercase tracking-widest bg-muted border-none rounded-lg px-2 py-1.5 focus:ring-1 focus:ring-gold appearance-none cursor-pointer"
                    >
                      <option value="new">🆕 Mới</option>
                      <option value="contacted">📞 Đã liên hệ</option>
                      <option value="booked">📅 Đã đặt lịch</option>
                      <option value="completed">✅ Hoàn thành</option>
                      <option value="cancelled">❌ Đã hủy</option>
                    </select>
                    <Button type="submit" variant="ghost" size="sm" className="h-7 text-[10px] text-gold hover:text-gold uppercase tracking-widest font-bold">Lưu</Button>
                  </form>
                </td>
                <td className="px-6 py-6 align-top text-xs text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString('vi-VN')}
                  <br />
                  <span className="text-[10px] opacity-50">{new Date(c.created_at).toLocaleTimeString('vi-VN')}</span>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-24 text-center">
                  <div className="flex flex-col items-center gap-4 text-muted-foreground">
                    <span className="text-4xl">📭</span>
                    <p className="italic">Chưa có yêu cầu liên hệ nào được gửi đến.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
