"use client";

import {
  HomeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MailIcon,
  PresentationIcon,
  SparklesIcon,
  StarIcon,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboardIcon },
  { label: "Slide Hero", href: "/admin/hero", icon: PresentationIcon },
  { label: "Dịch vụ", href: "/admin/services", icon: SparklesIcon },
  { label: "Portfolio", href: "/admin/portfolio", icon: ImageIcon },
  { label: "Hậu kỳ", href: "/admin/post-production", icon: VideoIcon },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Blog", href: "/admin/blog", icon: PresentationIcon },
  { label: "Liên hệ", href: "/admin/contacts", icon: MailIcon },
  { label: "Đánh giá", href: "/admin/testimonials", icon: StarIcon },
  { label: "Studio", href: "/admin/studios", icon: HomeIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show sidebar on login page
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/admin");
    router.refresh();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-luxury">
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-black/5 border-r bg-sidebar text-sidebar-foreground"
        >
          <SidebarHeader className="p-8 pb-4">
            <Link href="/admin/dashboard" className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="animate-obsidian-pulse text-obsidian text-sm">
                  ◆
                </span>
                <span className="truncate font-light font-sans text-sidebar-foreground text-xl uppercase tracking-[0.2em]">
                  HARMONY
                </span>
              </div>
              <span className="ml-5 font-medium text-[9px] text-sidebar-foreground/30 uppercase tracking-[0.3em]">
                Admin Panel
              </span>
            </Link>
          </SidebarHeader>

          <div className="my-4 px-8">
            <div className="divider-hairline border-black/5" />
          </div>

          <SidebarContent className="gap-0 p-2">
            <SidebarGroup>
              <SidebarGroupLabel className="mb-4 px-8 font-bold text-[9px] text-sidebar-foreground/20 uppercase tracking-[0.25em]">
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
                            "h-11 rounded-none px-4 transition-all duration-300",
                            active
                              ? "border-obsidian border-l-2 bg-sidebar-accent text-obsidian shadow-none"
                              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          )}
                        >
                          <item.icon className="size-4 stroke-[1.5px]" />
                          <span className="font-light text-[13px] tracking-wide">
                            {item.label}
                          </span>
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
                  className="h-11 rounded-none px-4 text-sidebar-foreground/30 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  tooltip="Đăng xuất"
                >
                  <LogOutIcon className="size-4 stroke-[1.5px]" />
                  <span className="font-light text-[13px]">Đăng xuất</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 overflow-auto bg-luxury">
          <header className="glass sticky top-0 z-10 flex h-16 items-center gap-4 border-black/5 border-b px-8 md:px-12">
            <SidebarTrigger className="text-ash md:hidden" />
            <div className="flex-1">
              <nav className="font-medium text-[10px] text-smoke uppercase tracking-[0.2em]">
                {pathname
                  .split("/")
                  .filter(Boolean)
                  .map((part, i, arr) => (
                    <span key={part}>
                      <span
                        className={i === arr.length - 1 ? "text-obsidian" : ""}
                      >
                        {part}
                      </span>
                      {i < arr.length - 1 && (
                        <span className="mx-2 opacity-30">/</span>
                      )}
                    </span>
                  ))}
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2.5">
                <div className="size-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="font-bold text-[9px] text-smoke uppercase tracking-[0.15em]">
                  {new Date().toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </header>
          <div className="animate-fade-in-up-luxury p-8 md:p-14">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
