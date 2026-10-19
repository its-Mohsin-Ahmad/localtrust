"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X, Menu, Bell, User } from "lucide-react";
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
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
            <defs><linearGradient id="mobilePinGradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF8A33"/><stop offset="45%" stopColor="#FF6900"/><stop offset="100%" stopColor="#E55A00"/></linearGradient></defs>
            <path d="M24 4 C16.2 4 9.7 10.5 9.7 18.3 C9.7 26.1 24 34 24 34 S38.3 26.1 38.3 18.3 C38.3 10.5 31.8 4 24 4 Z" fill="url(#mobilePinGradient)" stroke="#D94A00" strokeWidth="1.5"/>
            <circle cx="24" cy="15" r="5.5" fill="#061B40" stroke="#FF6900" strokeWidth="2"/>
            <path d="M21.2 15 L22.6 16.4 L26.8 12.2" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-bold text-[#082B60] tracking-tight hidden sm:inline">LocalTrust</span>
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
          <span className="font-bold text-[#082B60] text-sm">LocalTrust</span>
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

