"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocalTrustLogo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/locations", label: "Locations" },
  { href: "/become-a-provider", label: "Become a Provider" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-40 w-full border-b border-[#E4E7EC] bg-white/95 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-[76px]">
        {/* Brand — left */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label="LocalTrust homepage"
        >
          <LocalTrustLogo className="h-9 w-9 shrink-0" />
          <span className="font-extrabold text-[#082B60] tracking-tight text-[20px]">
            LocalTrust
          </span>
        </Link>

        {/* Desktop navigation — center */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[#182230] hover:text-[#FF6900] transition-colors duration-200",
                pathname === link.href && "text-[#FF6900]"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 text-[#667085]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lahore</span>
            <ChevronDown className="ml-1 w-3 h-3" />
          </div>
        </div>

        {/* Desktop actions — right */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative w-48 md:w-60">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search services"
              className="w-full h-9 pl-9 pr-3 rounded-md border border-[#E4E7EC] bg-white text-[#182230] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]"
            />
          </div>
          <Link href="/auth/sign-in">
            <Button variant="ghost" size="sm" className="text-[#182230] hover:text-[#FF6900]">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/create-account">
            <Button size="sm">Create Account</Button>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="relative w-40">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[#667085]">
              <Search className="w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full h-8 pl-7 pr-2 rounded-md border border-[#E4E7EC] bg-white text-[#182230] text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900]"
            />
          </div>
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

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="lg:hidden z-50 w-full border-t border-[#E4E7EC] bg-white">
          <div className="px-4 py-4 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-[#182230]">
                <MapPin className="w-4 h-4 text-[#667085]" />
                <span>Lahore</span>
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
                    "block px-4 py-2.5 rounded-lg text-sm font-medium",
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
              <Link
                href="/auth/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#182230] hover:bg-[#F1F3F5]"
              >
                Sign In
              </Link>
              <Link
                href="/auth/create-account"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#182230] hover:bg-[#F1F3F5]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
