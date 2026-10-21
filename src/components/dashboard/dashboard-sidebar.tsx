"use client";

import Link from "next/link";
import {
  Layout,
  Search,
  Calendar,
  MessageSquare,
  Heart,
  CreditCard,
  Bell,
  Settings,
  User,
  Building2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { InvolveSymbol } from "@/components/brand/involve-logo";
import { cn } from "@/lib/utils";

const CUSTOMER_LINKS = [
  { href: "/customer/dashboard", label: "Overview", icon: Layout },
  { href: "/customer/find-services", label: "Find Services", icon: Search },
  { href: "/customer/bookings", label: "My Bookings", icon: Calendar },
  { href: "/customer/messages", label: "Messages", icon: MessageSquare },
  { href: "/customer/saved-providers", label: "Saved Providers", icon: Heart },
  { href: "/customer/reviews", label: "Reviews", icon: CheckCircle2 },
  { href: "/customer/payments", label: "Payments", icon: CreditCard },
  { href: "/customer/notifications", label: "Notifications", icon: Bell },
  { href: "/customer/addresses", label: "Addresses", icon: Building2 },
  { href: "/customer/support", label: "Support", icon: User },
  { href: "/customer/settings", label: "Settings", icon: Settings },
] as const;

const PROVIDER_LINKS = [
  { href: "/provider/dashboard", label: "Overview", icon: Layout },
  { href: "/provider/services", label: "My Services", icon: Search },
  { href: "/provider/bookings", label: "Bookings", icon: Calendar },
  { href: "/provider/messages", label: "Messages", icon: MessageSquare },
  { href: "/provider/reviews", label: "Reviews", icon: CheckCircle2 },
  { href: "/provider/earnings", label: "Earnings", icon: CreditCard },
  { href: "/provider/notifications", label: "Notifications", icon: Bell },
  { href: "/provider/profile", label: "Public Profile", icon: Building2 },
  { href: "/provider/support", label: "Support", icon: User },
  { href: "/provider/settings", label: "Settings", icon: Settings },
] as const;

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Overview", icon: Layout },
  { href: "/admin/users", label: "Users", icon: User },
  { href: "/admin/providers", label: "Providers", icon: Building2 },
  { href: "/admin/categories", label: "Categories", icon: Search },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/reviews", label: "Reviews", icon: CheckCircle2 },
  { href: "/admin/reports", label: "Reports", icon: TrendingUp },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export type DashboardVariant = "customer" | "provider" | "admin";

export const SIDEBAR_LINKS_BY_VARIANT: Record<DashboardVariant, readonly { href: string; label: string; icon: typeof Layout }[]> = {
  customer: CUSTOMER_LINKS,
  provider: PROVIDER_LINKS,
  admin: ADMIN_LINKS,
};

export interface DashboardSidebarProps {
  currentPath: string;
  variant?: DashboardVariant;
}

export function DashboardSidebar({ currentPath, variant = "customer" }: DashboardSidebarProps) {
  const links = SIDEBAR_LINKS_BY_VARIANT[variant];
  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r border-[#E4E7EC] bg-white h-[calc(100vh-72px)] sticky top-0">
      <div className="p-5">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <InvolveSymbol className="h-6 w-6" idPrefix="involve-dash-sidebar" />
          <span className="font-bold text-[#082B60]">INVOLVE</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-card text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#FF6900]/10 text-[#FF6900] border-r-2 border-[#FF6900]"
                  : "text-[#667085] hover:bg-[#F1F3F5] hover:text-[#182230]"
              )}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

