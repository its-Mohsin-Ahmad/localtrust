"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MapPin,
  Search,
  User,
  LogOut,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageAsset } from "@/components/ui/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Explore Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/become-a-provider", label: "Become a Provider" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // In a real app this comes from auth context; here we read a lightweight
  // marker set by middleware/server. For now the UI renders both states and the
  // links are role-aware via the session-aware dashboard link below.
  const isAuthenticated = typeof window !== "undefined" && !!localStorage.getItem("lt:authed");

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="LocalTrust homepage"
        >
          <ImageAsset
            asset="fallback"
            className="h-8 w-8"
            alt="LocalTrust logo"
            priority
          />
          <span className="font-extrabold text-[#082B60] tracking-tight">
            LocalTrust
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[#182230] hover:text-[#FF6900] transition-colors",
                pathname === link.href && "text-[#FF6900]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 text-sm font-medium text-[#182230]">
            <MapPin className="w-4 h-4 mr-1 text-[#667085]" />
            <span>Lahore <ChevronDown className="ml-1 w-3 h-3" /></span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/create-account">
              <Button size="sm">Create Account</Button>
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden z-50 w-full border-t border-[#E4E7EC] bg-white">
          <div className="px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-[#182230]">
                <MapPin className="w-4 h-4 text-[#667085]" />
                <span>Location: Lahore</span>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="border-t pt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-2 rounded-lg text-sm font-medium",
                    pathname === link.href
                      ? "bg-[#FF6900]/10 text-[#FF6900]"
                      : "text-[#182230] hover:bg-[#F1F3F5]"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/customer/dashboard"
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-[#182230] hover:bg-[#F1F3F5]"
                  >
                    Dashboard
                  </Link>
                  <Button onClick={() => localStorage.removeItem("lt:authed")} variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-[#182230] hover:bg-[#F1F3F5]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/create-account"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-lg text-sm font-medium text-[#182230] hover:bg-[#F1F3F5]"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
