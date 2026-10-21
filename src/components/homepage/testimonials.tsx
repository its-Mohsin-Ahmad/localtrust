"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/base-path";
import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 3 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev >= TESTIMONIALS.length - 3 ? 0 : prev + 1));
  };

  const visibleCards = [
    TESTIMONIALS[startIndex % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 1) % TESTIMONIALS.length],
    TESTIMONIALS[(startIndex + 2) % TESTIMONIALS.length],
  ];

  return (
    <section className="bg-[#F2F5F8] py-8 sm:py-10 border-t border-[#E4E7EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-end justify-between border-b border-[#DCE4ED] pb-3">
          <div>
            <h2 className="font-barlow text-2xl sm:text-[26px] font-black uppercase tracking-tight text-[#082B60]">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="mt-1 h-[3px] w-12 bg-[#FF6900]" />
          </div>

          <Link
            href="/reviews"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#082B60] hover:text-[#FF6900] transition-colors"
          >
            <span>View All Reviews</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative mt-6 px-1 sm:px-6">
          {/* Previous Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous testimonials"
            className="absolute -left-1 sm:left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#DCE4ED] text-[#082B60] shadow-sm hover:border-[#FF6900] hover:text-[#FF6900] transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibleCards.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex flex-col justify-between rounded-md border border-[#DCE4ED] bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  {/* Top user row */}
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#DCE4ED] bg-slate-100">
                      <Image
                        src={withBasePath(item.avatar)}
                        alt={item.name}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs sm:text-[13px] text-[#082B60] leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[10px] text-[#65758B] leading-tight">{item.category}</p>
                    </div>
                  </div>

                  {/* 5 Orange Stars */}
                  <div className="mt-2.5 flex items-center gap-0.5 text-[#FF6900]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FF6900]" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="mt-2 text-xs text-[#082B60] leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Verification & Date */}
                <div className="mt-4 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#15965A]">
                    <CheckCircle2 className="h-3 w-3 fill-[#15965A] text-white" />
                    Verified Booking
                  </span>
                  <span className="text-[#65758B]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonials"
            className="absolute -right-1 sm:right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#DCE4ED] text-[#082B60] shadow-sm hover:border-[#FF6900] hover:text-[#FF6900] transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 5 Pagination Dots */}
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStartIndex(i % (TESTIMONIALS.length - 2))}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-200",
                startIndex === i ? "w-4 bg-[#FF6900]" : "w-1.5 bg-[#CBD5E1] hover:bg-[#94A3B8]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
