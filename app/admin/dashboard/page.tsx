import { getDashboardStats, getRecentContacts } from '@/lib/queries/stats';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlusIcon, PenLineIcon, GlobeIcon } from 'lucide-react';

export default async function AdminDashboard() {
  const stats = getDashboardStats();
  const recent = getRecentContacts(5);

  return (
    <div className="space-y-16 font-sans">
      <header className="space-y-2">
        <h1 className="text-display font-sans font-light text-obsidian tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-smoke text-[11px] uppercase tracking-[0.2em] font-medium">Chào mừng trở lại, Harmony Admin</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Portfolio" value={stats.portfolioCount} href="/admin/portfolio" />
        <StatCard title="Liên hệ mới" value={stats.newContactCount} href="/admin/contacts" trend="Mới" />
        <StatCard title="Đánh giá" value={stats.testimonialCount} href="/admin/testimonials" />
        <StatCard title="Tổng số liên hệ" value={stats.totalContacts} href="/admin/contacts" />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-end justify-between border-b border-black/5 pb-4">
            <h2 className="text-headline font-sans font-light text-obsidian">Liên hệ gần đây</h2>
            <Button
              variant="link"
              render={<Link href="/admin/contacts" />}
              nativeButton={false}
              className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] p-0 hover:no-underline hover:opacity-70 transition-all"
            >
              Xem tất cả ↗
            </Button>
          </div>

          <div className="bg-white border border-black/5 rounded-none shadow-luxury overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-whisper border-b border-black/5">
                    <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Khách hàng</th>
                    <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Dịch vụ</th>
                    <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-bold text-ash">Trạng thái</th>
                    <th className="px-8 py-5 text-[9px] uppercase tracking-[0.2em] font-bold text-ash text-right">Ngày gửi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {recent.map((c) => (
                    <tr key={c.id} className="group hover:bg-whisper transition-colors">
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-medium text-obsidian group-hover:text-gold transition-colors">{c.name}</p>
                          <p className="text-[11px] text-smoke tracking-wide font-light">{c.phone}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[10px] uppercase tracking-widest text-smoke font-medium">{c.service}</span>
                      </td>
                      <td className="px-8 py-6">
                        <Badge variant="outline" className={cn(
                          "rounded-none border-0 px-0 text-[9px] uppercase tracking-[0.15em] font-bold",
                          c.status === 'new' ? "text-gold" : "text-ash"
                        )}>
                          &bull; {c.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="text-[11px] text-smoke font-light">
                          {new Date(c.created_at).toLocaleDateString('vi-VN')}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-smoke  font-light tracking-wide">
                        Hệ thống hiện chưa ghi nhận liên hệ mới.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-8">
          <div className="border-b border-black/5 pb-4">
            <h2 className="text-headline font-sans font-light text-obsidian">Hành động</h2>
          </div>
          <div className="flex flex-col border-t border-black/5">
            <QuickAction href="/admin/portfolio/new" label="Thêm Portfolio mới" icon={PlusIcon} />
            <QuickAction href="/admin/testimonials/new" label="Soạn Đánh giá mới" icon={PenLineIcon} />
            <QuickAction href="/" label="Xem trang hiển thị" icon={GlobeIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, href, trend }: any) {
  return (
    <Link href={href} className="group block">
      <Card className="rounded-none border-black/5 bg-white hover:border-gold/30 transition-all duration-500 shadow-none hover:shadow-gold-lg relative overflow-hidden h-full">
        <CardContent className="p-8 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-ash group-hover:text-gold transition-colors">{title}</p>
            {trend && <span className="text-[9px] font-bold uppercase text-gold bg-gold-dim px-2 py-0.5 tracking-tighter">{trend}</span>}
          </div>
          <p className="text-display font-sans font-light text-obsidian group-hover:translate-x-1 transition-transform duration-500">{value}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function QuickAction({ href, label, icon: Icon }: any) {
  return (
    <Link href={href} className="flex items-center gap-5 py-6 border-b border-black/5 hover:bg-whisper transition-all group px-4 -mx-4">
      <div className="size-10 bg-luxury-surface group-hover:bg-white rounded-none border border-black/5 flex items-center justify-center text-ash group-hover:text-gold group-hover:border-gold/20 transition-all duration-500 shadow-sm group-hover:shadow-gold-sm">
        <Icon className="size-4 stroke-[1.2px]" />
      </div>
      <span className="text-[13px] font-light text-smoke group-hover:text-obsidian transition-colors tracking-wide">{label}</span>
      <span className="ml-auto text-mist group-hover:text-gold group-hover:translate-x-1 transition-all duration-500 text-xs font-light">→</span>
    </Link>
  );
}


import { cn } from "@/lib/utils";

