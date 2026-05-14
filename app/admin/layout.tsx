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
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: 'Tổng quan', href: '/admin/dashboard', icon: LayoutDashboardIcon },
  { label: 'Portfolio', href: '/admin/portfolio', icon: ImageIcon },
  { label: 'Liên hệ', href: '/admin/contacts', icon: MailIcon },
  { label: 'Đánh giá', href: '/admin/testimonials', icon: StarIcon },
  { label: 'Studio', href: '/admin/studios', icon: HomeIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

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
      <div className="flex min-h-screen w-full bg-luxury font-jost">
        <Sidebar variant="sidebar" collapsible="icon" className="border-r border-black/5 bg-sidebar text-sidebar-foreground">
          <SidebarHeader className="p-8 pb-4">
            <Link href="/admin/dashboard" className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-gold text-sm animate-gold-pulse">◆</span>
                <span className="text-xl font-cormorant font-light tracking-[0.2em] uppercase truncate text-sidebar-foreground">
                  HARMONY
                </span>
              </div>
              <span className="text-[9px] text-sidebar-foreground/30 uppercase tracking-[0.3em] font-medium ml-5">
                Admin Panel
              </span>
            </Link>
          </SidebarHeader>

          <div className="px-8 my-4">
            <div className="divider-hairline border-black/5" />
          </div>

          <SidebarContent className="gap-0 p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="px-8 text-[9px] uppercase tracking-[0.25em] font-bold text-sidebar-foreground/20 mb-4">
                Quản trị hệ thống
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {MENU_ITEMS.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                      <SidebarMenuItem key={item.href} className="px-4">
                        <SidebarMenuButton
                          render={<Link href={item.href} />}
                          isActive={active}
                          tooltip={item.label}
                          className={cn(
                            "h-11 px-4 transition-all duration-300 rounded-none",
                            active 
                              ? "bg-sidebar-accent text-gold border-l-2 border-gold shadow-none" 
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                          )}
                        >
                          <item.icon className="size-4 stroke-[1.5px]" />
                          <span className="text-[13px] font-light tracking-wide">{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-6">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="h-11 text-sidebar-foreground/30 hover:bg-red-500/10 hover:text-red-400 transition-colors rounded-none px-4"
                  tooltip="Đăng xuất"
                >
                  <LogOutIcon className="size-4 stroke-[1.5px]" />
                  <span className="text-[13px] font-light">Đăng xuất</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 overflow-auto bg-luxury">
          <header className="flex h-16 items-center gap-4 border-b border-black/5 glass px-8 md:px-12 sticky top-0 z-10">
            <SidebarTrigger className="md:hidden text-ash" />
            <div className="flex-1">
              <nav className="text-[10px] uppercase tracking-[0.2em] text-smoke font-medium">
                {pathname.split('/').filter(Boolean).map((part, i, arr) => (
                  <span key={part}>
                    <span className={i === arr.length - 1 ? "text-gold" : ""}>{part}</span>
                    {i < arr.length - 1 && <span className="mx-2 opacity-30">/</span>}
                  </span>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-smoke">
                  {new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                </span>
              </div>
            </div>
          </header>
          <div className="p-8 md:p-14 max-w-6xl mx-auto animate-fade-in-up-luxury">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
