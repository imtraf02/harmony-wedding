import {
  GlobeIcon,
  type LucideIcon,
  PenLineIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardStats, getRecentContacts } from "@/lib/queries/stats";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = getDashboardStats();
  const recent = getRecentContacts(5);

  return (
    <div className="space-y-16 font-sans">
      <header className="space-y-2">
        <h1 className="font-light font-sans text-display text-obsidian tracking-tight">
          Tổng quan hệ thống
        </h1>
        <p className="font-medium text-[11px] text-smoke uppercase tracking-[0.2em]">
          Chào mừng trở lại, Harmony Admin
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <StatCard
          title="Portfolio"
          value={stats.portfolioCount}
          href="/admin/portfolio"
        />
        <StatCard
          title="Liên hệ mới"
          value={stats.newContactCount}
          href="/admin/contacts"
          trend="Mới"
        />
        <StatCard
          title="Đánh giá"
          value={stats.testimonialCount}
          href="/admin/testimonials"
        />
        <StatCard
          title="Tổng số liên hệ"
          value={stats.totalContacts}
          href="/admin/contacts"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid items-start gap-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="flex items-end justify-between border-black/5 border-b pb-4">
            <h2 className="font-light font-sans text-headline text-obsidian">
              Liên hệ gần đây
            </h2>
            <Button
              variant="link"
              render={<Link href="/admin/contacts" />}
              nativeButton={false}
              className="p-0 font-bold text-[10px] text-obsidian uppercase tracking-[0.2em] transition-all hover:no-underline hover:opacity-70"
            >
              Xem tất cả ↗
            </Button>
          </div>

          <div className="overflow-hidden rounded-none border border-black/5 bg-white shadow-luxury">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-black/5 border-b bg-whisper">
                    <th className="px-8 py-5 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                      Khách hàng
                    </th>
                    <th className="px-8 py-5 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                      Dịch vụ
                    </th>
                    <th className="px-8 py-5 font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                      Trạng thái
                    </th>
                    <th className="px-8 py-5 text-right font-bold text-[9px] text-ash uppercase tracking-[0.2em]">
                      Ngày gửi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {recent.map((c) => (
                    <tr
                      key={c.id}
                      className="group transition-colors hover:bg-whisper"
                    >
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-medium text-obsidian transition-colors group-hover:text-obsidian">
                            {c.name}
                          </p>
                          <p className="font-light text-[11px] text-smoke tracking-wide">
                            {c.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-medium text-[10px] text-smoke uppercase tracking-widest">
                          {c.service}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-none border-0 px-0 font-bold text-[9px] uppercase tracking-[0.15em]",
                            c.status === "new" ? "text-obsidian" : "text-ash",
                          )}
                        >
                          &bull; {c.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <span className="font-light text-[11px] text-smoke">
                          {new Date(c.created_at).toLocaleDateString("vi-VN")}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recent.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-8 py-16 text-center font-light text-smoke tracking-wide"
                      >
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
          <div className="border-black/5 border-b pb-4">
            <h2 className="font-light font-sans text-headline text-obsidian">
              Hành động
            </h2>
          </div>
          <div className="flex flex-col border-black/5 border-t">
            <QuickAction
              href="/admin/portfolio/new"
              label="Thêm Portfolio mới"
              icon={PlusIcon}
            />
            <QuickAction
              href="/admin/hero/new"
              label="Thêm Slide Hero"
              icon={PlusIcon}
            />
            <QuickAction
              href="/admin/gallery/new"
              label="Thêm ảnh Gallery"
              icon={PlusIcon}
            />
            <QuickAction
              href="/admin/testimonials/new"
              label="Soạn Đánh giá mới"
              icon={PenLineIcon}
            />
            <QuickAction href="/" label="Xem trang hiển thị" icon={GlobeIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  href: string;
  trend?: string;
}

function StatCard({ title, value, href, trend }: StatCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="relative h-full overflow-hidden rounded-none border-black/5 bg-white shadow-none transition-all duration-500 hover:border-obsidian/30 hover:shadow-obsidian-lg">
        <CardContent className="space-y-4 p-8">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[9px] text-ash uppercase tracking-[0.25em] transition-colors group-hover:text-obsidian">
              {title}
            </p>
            {trend && (
              <span className="bg-obsidian-dim px-2 py-0.5 font-bold text-[9px] text-obsidian uppercase tracking-tighter">
                {trend}
              </span>
            )}
          </div>
          <p className="font-light font-sans text-display text-obsidian transition-transform duration-500 group-hover:translate-x-1">
            {value}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface QuickActionProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

function QuickAction({ href, label, icon: Icon }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="group -mx-4 flex items-center gap-5 border-black/5 border-b px-4 py-6 transition-all hover:bg-whisper"
    >
      <div className="flex size-10 items-center justify-center rounded-none border border-black/5 bg-luxury-surface text-ash shadow-sm transition-all duration-500 group-hover:border-obsidian/20 group-hover:bg-white group-hover:text-obsidian group-hover:shadow-obsidian-sm">
        <Icon className="size-4 stroke-[1.2px]" />
      </div>
      <span className="font-light text-[13px] text-smoke tracking-wide transition-colors group-hover:text-obsidian">
        {label}
      </span>
      <span className="ml-auto font-light text-mist text-xs transition-all duration-500 group-hover:translate-x-1 group-hover:text-obsidian">
        →
      </span>
    </Link>
  );
}
