"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, Bell, ChevronDown, Menu, X } from "lucide-react";
import { LocalTrustLogo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Explore Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/providers", label: "Find Professionals" },
  { href: "/become-a-provider", label: "Become a Provider" },
];

const LOCATIONS = ["Lahore", "Peshawar", "Islamabad", "Karachi", "Rawalpindi"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Lahore");
  const [locOpen, setLocOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-[#041D43] border-b border-[#0A2E66] shadow-sm select-none"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-12 md:h-[48px]">
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 transition-opacity hover:opacity-95"
          aria-label="TrustLocal homepage"
        >
          <LocalTrustLogo className="h-6 w-5" />
          <span className="text-white font-black tracking-tight text-xl font-sans">
            TrustLocal
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || (link.href === "/" && pathname === "");
            return (
              <div key={link.href} className="relative flex items-center h-full">
                <Link
                  href={link.href}
                  className={cn(
                    "text-[13px] font-semibold transition-colors duration-150 py-1",
                    isActive ? "text-white" : "text-[#D1D9E4] hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6900]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={() => setLocOpen(!locOpen)}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#082B60]/90 hover:bg-[#082B60] border border-[#1C3E70] text-white text-xs font-medium transition-colors"
              aria-label="Select location"
            >
              <MapPin className="h-3 w-3 text-[#FF6900]" />
              <span className="text-white font-medium">{selectedLocation}</span>
              <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
            </button>

            {locOpen && (
              <div className="absolute right-0 mt-1 w-36 rounded-md bg-[#061B40] border border-[#1C3E70] py-1 shadow-xl z-50 text-xs">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-white hover:bg-[#082B60] transition-colors",
                      selectedLocation === loc ? "text-[#FF6900] font-semibold" : ""
                    )}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Icon with badge "1" */}
          <Link
            href="/search"
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF6900] text-[9px] font-bold text-white leading-none">
              1
            </span>
          </Link>

          {/* Notification Bell with orange indicator dot */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FF6900] ring-2 ring-[#041D43]" />
          </button>

          {/* Sign In Button */}
          <Link
            href="/auth/sign-in"
            className="hidden sm:inline-flex items-center justify-center h-7 px-3 text-xs font-semibold text-white bg-transparent hover:bg-white/10 border border-[#1C3E70] rounded transition-colors"
          >
            Sign In
          </Link>

          {/* Join TrustLocal Button */}
          <Link
            href="/auth/create-account"
            className="inline-flex items-center justify-center h-7 px-3 text-xs font-bold text-white bg-[#FF6900] hover:bg-[#E95B00] rounded shadow-sm transition-colors uppercase tracking-tight"
          >
            Join TrustLocal
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center text-white lg:hidden hover:bg-white/10 rounded"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#1C3E70] bg-[#041D43] lg:hidden px-4 py-3 space-y-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block py-2 text-sm font-medium transition-colors",
                pathname === link.href ? "text-[#FF6900] font-bold" : "text-[#D1D9E4] hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-[#1C3E70] flex items-center gap-2">
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2 text-xs font-semibold text-white border border-[#1C3E70] rounded"
            >
              Sign In
            </Link>
            <Link
              href="/auth/create-account"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-2 text-xs font-bold text-white bg-[#FF6900] rounded"
            >
              Join TrustLocal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
