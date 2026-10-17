"use client";

import Link from "next/link";
import { ImageAsset } from "@/components/ui/image";
import { Mail, X, Phone, MapPin, Pin } from "lucide-react";

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Providers", href: "/providers" },
  { label: "Locations", href: "/locations" },
];

const CUSTOMER_LINKS = [
  { label: "Find Services", href: "/customer/find-services" },
  { label: "My Bookings", href: "/customer/bookings" },
  { label: "Saved Providers", href: "/customer/saved-providers" },
  { label: "Reviews", href: "/customer/reviews" },
  { label: "Payments", href: "/customer/payments" },
];

const PROVIDER_LINKS = [
  { label: "Become a Provider", href: "/become-a-provider" },
  { label: "Provider Dashboard", href: "/provider/dashboard" },
  { label: "Services", href: "/provider/services" },
  { label: "Earnings", href: "/provider/earnings" },
  { label: "Verification", href: "/provider/verification" },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Safety", href: "/safety" },
  { label: "Support", href: "/customer/support" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Registration Payment Policy", href: "/registration-payment-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: <Pin size={18} /> },
  { label: "X (Twitter)", href: "#", icon: <X size={18} /> },
  { label: "Instagram", href: "#", icon: <Mail size={18} /> },
  { label: "LinkedIn", href: "#", icon: <Phone size={18} /> },
  { label: "YouTube", href: "#", icon: <Pin size={18} /> },
];

export function Footer() {
  return (
    <footer className="bg-[#061B40] text-[#E4E7EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <ImageAsset
                asset="fallback"
                className="h-7 w-7"
                alt="LocalTrust logo"
              />
              <span className="font-extrabold text-white tracking-tight">
                LocalTrust
              </span>
            </Link>
            <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs">
              Find Trusted Professionals Near You. Trusted Services. Better Living.
            </p>
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-md border border-[#E4E7EC]/30 bg-[#082B60]/40 flex items-center justify-center text-[#E4E7EC] hover:text-[#FF6900] hover:border-[#FF6900]/50 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore Services</h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#FF6900] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Customer</h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {CUSTOMER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#FF6900] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Provider</h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {PROVIDER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#FF6900] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#FF6900] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-[#9CA3AF]">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-[#FF6900] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E4E7EC]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9CA3AF]">
          <div>
            © {new Date().getFullYear()} LocalTrust. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[#667085]">
            <MapPin size={14} />
            <span>Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
