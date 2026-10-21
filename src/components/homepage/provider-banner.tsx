"use client";

import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/base-path";

export function ProviderBanner() {
  return (
    <section className="relative w-full bg-[#041D43] overflow-hidden my-0">
      {/* Left orange diagonal corner accent */}
      <div
        className="absolute top-0 left-0 w-0 h-0 border-t-[44px] border-t-[#FF6900] border-r-[44px] border-r-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[190px] sm:min-h-[210px] items-stretch">
          {/* Left Text Content (60% on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center px-4 py-7 sm:px-6 sm:py-8 lg:py-6 lg:pr-6 z-20">
            <span className="text-[#FF6900] text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase">
              ARE YOU A SKILLED PROFESSIONAL?
            </span>

            <h2 className="mt-1.5 font-barlow text-2xl sm:text-3xl lg:text-[32px] font-black uppercase tracking-tight text-white leading-tight">
              GROW YOUR BUSINESS WITH INVOLVE
            </h2>

            <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Build your profile, showcase your services, manage appointments, and reach customers
              in your area.
            </p>

            {/* Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/become-a-provider"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded text-xs font-bold uppercase tracking-wider text-white bg-[#FF6900] hover:bg-[#E95B00] transition-colors shadow-sm"
              >
                BECOME A PROVIDER
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded text-xs font-bold uppercase tracking-wider text-white bg-transparent hover:bg-white/10 border border-white/80 transition-colors"
              >
                LEARN HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* Right Image Container (40% with angled cut) */}
          <div className="lg:col-span-5 relative min-h-[160px] sm:min-h-[180px] lg:min-h-full">
            {/* Diagonal transition line */}
            <div
              className="hidden lg:block absolute inset-y-0 -left-6 w-12 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(108deg, #041D43 48%, #FF6900 48%, #FF6900 52%, transparent 52%)",
              }}
            />

            <div className="relative w-full h-full min-h-[170px] lg:min-h-full">
              <Image
                src={withBasePath("/images/assets/provider-technician.jpg")}
                alt="Service professional talking with customer"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              {/* Overlay gradient on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041D43] via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
