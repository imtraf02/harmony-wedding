import { getDashboardStats, getRecentContacts } from '@/lib/queries/stats';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const stats = getDashboardStats();
  const recent = getRecentContacts(5);

  return (
    <div className="space-y-12 font-sans">
      <header>
        <h1 className="text-4xl font-cormorant text-foreground mb-2">Tổng quan hệ thống</h1>
        <p className="text-muted-foreground text-sm">Chào mừng bạn trở lại, quản trị viên.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Portfolio" value={stats.portfolioCount} icon="🖼️" href="/admin/portfolio" />
        <StatCard title="Liên hệ mới" value={stats.newContactCount} icon="✉️" href="/admin/contacts" trend="Gáp" />
        <StatCard title="Đánh giá" value={stats.testimonialCount} icon="⭐" href="/admin/testimonials" />
        <StatCard title="Tổng liên hệ" value={stats.totalContacts} icon="📈" href="/admin/contacts" />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-cormorant text-foreground">Liên hệ gần đây</h2>
            <Button 
              variant="link" 
              render={<Link href="/admin/contacts" />} 
              nativeButton={false}
              className="text-xs font-semibold text-gold uppercase tracking-widest p-0"
            >
              Xem tất cả
            </Button>
          </div>
          
          <Card className="rounded-3xl overflow-hidden shadow-sm border-border">
            <CardContent className="p-0">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Khách hàng</th>
                    <th className="px-6 py-4">Dịch vụ</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recent.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.phone}</p>
                      </td>
                      <td className="px-6 py-4 uppercase text-[10px] tracking-wide">{c.service}</td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className={`text-[10px] font-bold uppercase tracking-tighter ${
                          c.status === 'new' ? 'bg-gold/10 text-gold hover:bg-gold/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          {c.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground">
                        {new Date(c.created_at).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic">
                        Chưa có liên hệ nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-cormorant text-foreground">Hành động nhanh</h2>
          <div className="flex flex-col gap-4">
            <QuickAction href="/admin/portfolio/new" label="Thêm Portfolio mới" icon="➕" color="bg-gold" />
            <QuickAction href="/admin/testimonials/new" label="Thêm Đánh giá mới" icon="✍️" color="bg-sage" />
            <QuickAction href="/" label="Xem trang chủ" icon="🌐" color="bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, href, trend }: any) {
  return (
    <Link href={href} className="group/stat-link block">
      <Card className="rounded-3xl border-border hover:shadow-xl transition-all group relative overflow-hidden cursor-pointer">
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl">{icon}</span>
            {trend && <Badge variant="destructive" className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">{trend}</Badge>}
          </div>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">{title}</p>
          <p className="text-3xl font-semibold font-cormorant text-foreground">{value}</p>
        </CardContent>
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
          {icon}
        </div>
      </Card>
    </Link>
  );
}

function QuickAction({ href, label, icon, color }: any) {
  return (
    <Link href={href} className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:bg-muted/50 transition-all group">
      <div className={`size-10 ${color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-gold transition-colors">{label}</span>
      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </Link>
  );
}
