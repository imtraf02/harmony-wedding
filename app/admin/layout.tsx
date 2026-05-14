'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { STUDIO_NAME } from '@/lib/constants';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { LayoutDashboardIcon, ImageIcon, MailIcon, StarIcon, HomeIcon, LogOutIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const MENU_ITEMS = [
  { label: 'Tổng quan',    href: '/admin/dashboard',    icon: LayoutDashboardIcon },
  { label: 'Portfolio',    href: '/admin/portfolio',    icon: ImageIcon },
  { label: 'Liên hệ',      href: '/admin/contacts',     icon: MailIcon },
  { label: 'Đánh giá',     href: '/admin/testimonials', icon: StarIcon },
  { label: 'Studio',       href: '/admin/studios',      icon: HomeIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  // Don't show sidebar on login page
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
    router.refresh();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-zinc-50 font-sans">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-zinc-200">
          <SidebarHeader className="p-6">
            <Link href="/admin/dashboard" className="flex flex-col gap-1">
              <span className="text-xl font-cormorant font-bold tracking-widest uppercase truncate">
                {STUDIO_NAME}
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-semibold">
                Admin Panel
              </span>
            </Link>
          </SidebarHeader>
          
          <Separator className="mx-4 w-auto opacity-50" />

          <SidebarContent className="gap-0 p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400 mb-2">
                Menu Quản trị
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {MENU_ITEMS.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton 
                          render={<Link href={item.href} />}
                          nativeButton={false}
                          isActive={active}
                          tooltip={item.label}
                          className={active ? "bg-gold text-white hover:bg-gold/90 hover:text-white shadow-lg shadow-gold/20" : "text-zinc-600 hover:bg-zinc-100"}
                        >
                          <item.icon data-icon="inline-start" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/5 hover:text-destructive"
                  tooltip="Đăng xuất"
                >
                  <LogOutIcon data-icon="inline-start" />
                  <span>Đăng xuất</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex h-16 items-center gap-4 border-b border-zinc-100 bg-white px-6 md:px-12 sticky top-0 z-10">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Trạng thái: Online</span>
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </header>
          <div className="p-8 md:p-12 max-w-6xl mx-auto">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
