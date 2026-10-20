"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { withBasePath } from "@/lib/base-path";

const POPULAR_SEARCHES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Mechanics",
  "Tutoring",
  "Computer Repair",
];

export function Hero() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (service.trim()) params.set("service", service.trim());
    if (location.trim()) params.set("location", location.trim());
    const query = params.toString();
    router.push(query ? `/search?${query}` : "/services");
  };

  const handleChipClick = (term: string) => {
    setService(term);
    router.push(`/search?service=${encodeURIComponent(term)}`);
  };

  return (
    <section className="relative w-full bg-[#082B60] overflow-hidden">
      {/* Top-left orange geometric triangle accent */}
      <div
        className="absolute top-0 left-0 w-0 h-0 border-t-[54px] border-t-[#FF6900] border-r-[54px] border-r-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[300px] lg:min-h-[325px] items-stretch">
          {/* Left Content Area (58% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center px-4 py-7 sm:px-6 sm:py-9 lg:py-8 lg:pr-8 z-20">
            {/* Eyebrow */}
            <span className="text-[#FF6900] text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase">
              LOCAL SERVICES MARKETPLACE
            </span>

            {/* Main Headline */}
            <h1 className="mt-2 font-barlow text-3xl sm:text-4xl lg:text-[42px] font-black uppercase leading-[1.05] tracking-tight">
              <span className="text-white block">FIND TRUSTED EXPERTS.</span>
              <span className="text-[#FF6900] block">GET IT DONE.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-2.5 max-w-xl text-xs sm:text-sm text-[#D1D9E4] leading-relaxed">
              Connect with reliable local professionals, compare services and reviews, and request
              appointments with confidence.
            </p>

            {/* Search Container */}
            <form
              onSubmit={handleSearch}
              className="mt-5 w-full max-w-2xl bg-white rounded-md p-1.5 shadow-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5"
            >
              {/* Service Input */}
              <div className="relative flex-[1.2] flex items-center min-w-0">
                <Search className="absolute left-2.5 h-4 w-4 text-[#082B60] shrink-0" />
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="What service do you need?"
                  className="w-full bg-[#F2F5F8] sm:bg-transparent rounded sm:rounded-none pl-8 pr-2 py-2 text-xs sm:text-sm text-[#082B60] placeholder:text-[#8898AA] focus:outline-none focus:bg-[#F2F5F8] transition-colors border-0"
                />
              </div>

              {/* Separator on desktop */}
              <div className="hidden sm:block h-6 w-[1px] bg-[#DCE4ED]" />

              {/* Location Input */}
              <div className="relative flex-1 flex items-center min-w-0">
                <MapPin className="absolute left-2.5 h-4 w-4 text-[#082B60] shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, area or postal code"
                  className="w-full bg-[#F2F5F8] sm:bg-transparent rounded sm:rounded-none pl-8 pr-2 py-2 text-xs sm:text-sm text-[#082B60] placeholder:text-[#8898AA] focus:outline-none focus:bg-[#F2F5F8] transition-colors border-0"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#FF6900] hover:bg-[#E95B00] text-white font-bold text-xs sm:text-[13px] px-5 py-2.5 rounded uppercase tracking-wider transition-colors shrink-0 whitespace-nowrap shadow-sm"
              >
                SEARCH SERVICES
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs">
              <span className="text-[#A4B3C6] font-medium text-[11px] sm:text-xs">
                Popular searches:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleChipClick(term)}
                  className="px-2.5 py-0.5 rounded-full border border-[#2D4F82] hover:border-[#FF6900] text-white hover:text-[#FF6900] bg-[#0A3370]/60 text-[11px] font-medium transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Right Image Container (42% width on desktop) */}
          <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[290px] lg:min-h-full">
            {/* Angular diagonal border line accent */}
            <div
              className="hidden lg:block absolute inset-y-0 -left-6 w-12 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(108deg, #082B60 48%, #FF6900 48%, #FF6900 52%, transparent 52%)",
              }}
            />

            {/* Hero Image */}
            <div className="relative w-full h-full min-h-[240px] lg:min-h-full">
              <Image
                src={withBasePath("/images/assets/hero-plumber.jpg")}
                alt="Plumber repairing kitchen sink with customer watching"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center lg:object-[30%_center]"
              />

              {/* Gradient wash overlay on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#082B60] via-transparent to-transparent lg:hidden" />

              {/* Bottom right orange accent polygon */}
              <div
                className="absolute bottom-0 right-0 w-0 h-0 border-b-[42px] border-b-[#FF6900] border-l-[42px] border-l-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
