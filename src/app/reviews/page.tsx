import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-header";
import { TESTIMONIALS } from "@/lib/testimonials";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read verified customer reviews for INVOLVE professionals and services across Pakistan.",
};

const AVERAGE_RATING =
  TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length;

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      {/* Hero */}
      <section className="bg-[#061B40] border-b border-[#0A2E66]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-[#A0AEC0]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#4A5A73]">
                /
              </li>
              <li className="text-white font-medium">Reviews</li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="font-barlow text-3xl sm:text-[40px] font-black uppercase tracking-tight text-white">
                CUSTOMER REVIEWS
              </h1>
              <div className="mt-2 h-[3px] w-12 bg-[#FF6900]" />
              <p className="mt-4 max-w-xl text-sm text-[#C9D4E5] leading-relaxed">
                Real feedback from customers who booked a professional through
                INVOLVE. Every review below comes from a verified booking.
              </p>
            </div>

            {/* Rating summary */}
            <div className="shrink-0 rounded-card border border-[#1C3E70] bg-[#082B60] px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-[#FF6900] leading-none">
                  {AVERAGE_RATING.toFixed(1)}
                </span>
                <div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#FF6900] text-[#FF6900]"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-[#C9D4E5]">
                    Based on {TESTIMONIALS.length} verified customer reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews list */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What our customers say"
            description="Every rating below is tied to a completed booking."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-md border border-[#DCE4ED] bg-white p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#DCE4ED] bg-slate-100">
                      <Image
                        src={withBasePath(item.avatar)}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#082B60] leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[#65758B] leading-tight mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-0.5 text-[#FF6900]">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FF6900]" />
                    ))}
                  </div>

                  <Quote
                    className="mt-2.5 h-4 w-4 text-[#FF6900]/40"
                    aria-hidden="true"
                  />
                  <p className="mt-1 text-xs text-[#082B60] leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[10px]">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#15965A]">
                    <CheckCircle2 className="h-3 w-3 fill-[#15965A] text-white" />
                    Verified Booking
                  </span>
                  <span className="text-[#65758B]">{item.date}</span>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-card border border-[#E4E7EC] bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold text-[#182230]">
                Book a trusted professional
              </h2>
              <p className="mt-1 text-sm text-[#667085]">
                Browse services in your city and get an appointment in minutes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-card bg-[#FF6900] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e55a00] transition-colors"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-card border border-[#E4E7EC] px-5 py-3 text-sm font-semibold text-[#182230] hover:bg-[#F1F3F5] transition-colors"
              >
                Browse by city
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}