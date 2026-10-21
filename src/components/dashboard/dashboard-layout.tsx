"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Menu, Bell, User } from "lucide-react";
import { InvolveSymbol } from "@/components/brand/involve-logo";
import { cn } from "@/lib/utils";
import { DashboardSidebar, SIDEBAR_LINKS_BY_VARIANT, type DashboardVariant } from "./dashboard-sidebar";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  variant?: DashboardVariant;
}

export function DashboardLayout({ children, variant = "customer" }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const mobileLinks = SIDEBAR_LINKS_BY_VARIANT[variant];

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-[#F1F3F5]">
      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between px-4 py-4 border-b border-[#E4E7EC] bg-white">
        <button onClick={() => setMobileSidebarOpen(true)} className="flex items-center justify-center w-8 h-8 rounded-full text-[#667085] hover:text-[#082B60] transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <InvolveSymbol className="h-6 w-6" idPrefix="involve-dash-mobile" />
          <span className="font-bold text-[#082B60] tracking-tight hidden sm:inline">INVOLVE</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-8 h-8 rounded-full text-[#667085] hover:text-[#082B60] transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#082B60]/10 text-[#082B60]">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Desktop sidebar */}
      <DashboardSidebar currentPath={pathname} variant={variant} />

      {/* Mobile sidebar panel */}
      <aside className={cn("md:hidden fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#E4E7EC] transform transition-transform duration-300", mobileSidebarOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4E7EC]">
          <span className="font-bold text-[#082B60] text-sm">INVOLVE</span>
          <button onClick={() => setMobileSidebarOpen(false)} className="text-[#667085] hover:text-[#082B60]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {mobileLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileSidebarOpen(false)} className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium transition-colors",
                isActive ? "bg-[#FF6900]/10 text-[#FF6900] border-r-2 border-[#FF6900]" : "text-[#667085] hover:bg-[#F1F3F5] hover:text-[#182230]"
              )}>
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

