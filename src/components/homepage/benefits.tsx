"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageSquare, DollarSign, Calendar, Star, Lock } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "VERIFIED PROFESSIONALS",
    description: "Identity, business and qualification checks where applicable.",
  },
  {
    icon: MessageSquare,
    title: "CLEAR COMMUNICATION",
    description: "Message directly with your chosen professional.",
  },
  {
    icon: DollarSign,
    title: "TRANSPARENT PRICING",
    description: "Know the cost before you book. No hidden fees.",
  },
  {
    icon: Calendar,
    title: "CONVENIENT BOOKING",
    description: "Request appointments in just a few clicks.",
  },
  {
    icon: Star,
    title: "GENUINE CUSTOMER FEEDBACK",
    description: "Real reviews from real customers.",
  },
  {
    icon: Lock,
    title: "SAFE & SECURE",
    description: "Your data and conversations are protected.",
  },
];

export function Benefits() {
  return (
    <section className="relative w-full bg-[#082B60] overflow-hidden my-0">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] lg:min-h-[340px] items-stretch">
          {/* Left: Full-height Angled Photograph with orange accents (42% width) */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full">
            <div className="relative w-full h-full min-h-[240px] lg:min-h-full">
              <Image
                src={withBasePath("/images/assets/benefits-technician.jpg")}
                alt="Service technician with clipboard and van"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />

              {/* Orange angular chevron accents on left and diagonal transition */}
              <div
                className="absolute top-0 left-0 w-0 h-0 border-t-[50px] border-t-[#FF6900] border-r-[50px] border-r-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute bottom-0 left-0 w-0 h-0 border-b-[50px] border-b-[#FF6900] border-r-[50px] border-r-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Diagonal transition line on desktop */}
            <div
              className="hidden lg:block absolute inset-y-0 -right-6 w-12 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(72deg, transparent 48%, #FF6900 48%, #FF6900 52%, #082B60 52%)",
              }}
            />
          </div>

          {/* Right: Benefits Content (58% width) */}
          <div className="lg:col-span-7 flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:py-8 lg:pl-10 z-20">
            {/* Eyebrow */}
            <span className="text-[#FF6900] text-xs font-bold tracking-[0.16em] uppercase">
              WHY CHOOSE TRUSTLOCAL?
            </span>

            {/* Title & Action Button Row */}
            <div className="mt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="font-barlow text-2xl sm:text-3xl lg:text-[34px] font-black uppercase tracking-tight text-white leading-tight">
                TRUSTED. TRANSPARENT. LOCAL.
              </h2>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#FF6900] hover:bg-[#E95B00] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-md self-start sm:self-auto"
              >
                <span>FIND YOUR EXPERT</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* 6 Benefits in 2 Columns x 3 Rows */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  {/* Orange circular icon */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF6900] text-white shadow-sm mt-0.5">
                    <b.icon className="h-4 w-4 stroke-[2.2]" />
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-[13px] font-bold text-white tracking-wide uppercase">
                      {b.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-[#CBD5E1] leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
