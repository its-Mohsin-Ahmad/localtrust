"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { LocalTrustLogo } from "@/components/ui/logo";

const COLUMNS = [
  {
    title: "Explore Services",
    links: [
      { label: "Plumbing", href: "/services/plumbing" },
      { label: "Electrical", href: "/services/electrical" },
      { label: "Cleaning", href: "/services/cleaning" },
      { label: "More Services", href: "/services" },
    ],
  },
  {
    title: "Find Professionals",
    links: [
      { label: "Top Rated", href: "/providers?filter=top-rated" },
      { label: "Verified Providers", href: "/providers?filter=verified" },
      { label: "New Providers", href: "/providers?filter=new" },
      { label: "Browse All", href: "/providers" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { label: "Join as a Provider", href: "/become-a-provider" },
      { label: "Provider Resources", href: "/help" },
      { label: "Verification", href: "/provider/verification" },
      { label: "Provider Support", href: "/provider/support" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety & Verification", href: "/safety" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Community Guidelines", href: "/safety" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { label: "X", icon: Twitter, href: "https://twitter.com" },
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#041D43] text-[#A0AEC0] border-t border-[#092957]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Main 6-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-95"
              aria-label="TrustLocal homepage"
            >
              <LocalTrustLogo className="h-6 w-5" />
              <span className="text-white font-black tracking-tight text-xl font-sans">
                TrustLocal
              </span>
            </Link>

            <p className="mt-3 text-xs text-[#CBD5E1] leading-relaxed">
              Find Trusted Experts. Get It Done.
            </p>

            {/* Social Media Circular Buttons */}
            <div className="mt-4 flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-[#1C3E70] text-[#CBD5E1] hover:border-[#FF6900] hover:text-[#FF6900] hover:bg-white/5 transition-colors"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2 to 6: Navigation */}
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col">
              <h3 className="font-bold text-xs uppercase tracking-wider text-white">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#A0AEC0] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-5 border-t border-[#0E2B56] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#718096]">
          <p>&copy; 2025 TrustLocal. All rights reserved.</p>
          <p>Your local services marketplace.</p>
        </div>
      </div>
    </footer>
  );
}
