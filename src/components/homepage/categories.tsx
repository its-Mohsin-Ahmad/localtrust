"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryItem {
  id: string;
  name: string;
  providers: string;
  image: string;
  slug: string;
  highlighted?: boolean;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: "plumbing",
    name: "Plumbing",
    providers: "152 providers",
    image: "/images/assets/cat-plumbing.jpg",
    slug: "plumbing",
  },
  {
    id: "electrical",
    name: "Electrical",
    providers: "134 providers",
    image: "/images/assets/cat-electrical.jpg",
    slug: "electrical",
    highlighted: true,
  },
  {
    id: "cleaning",
    name: "Home Cleaning",
    providers: "210 providers",
    image: "/images/assets/cat-cleaning.jpg",
    slug: "cleaning",
  },
  {
    id: "mechanics",
    name: "Mechanics",
    providers: "98 providers",
    image: "/images/assets/cat-mechanics.jpg",
    slug: "mechanics",
  },
  {
    id: "tutoring",
    name: "Tutoring",
    providers: "76 providers",
    image: "/images/assets/cat-tutoring.jpg",
    slug: "tutoring",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    providers: "64 providers",
    image: "/images/assets/cat-carpentry.jpg",
    slug: "carpentry",
  },
  {
    id: "painting",
    name: "Painting",
    providers: "82 providers",
    image: "/images/assets/cat-painting.jpg",
    slug: "painting",
  },
  {
    id: "appliance",
    name: "Appliance Repair",
    providers: "71 providers",
    image: "/images/assets/cat-appliance.jpg",
    slug: "appliance-repair",
  },
  {
    id: "computer",
    name: "Computer & IT",
    providers: "56 providers",
    image: "/images/assets/cat-computer.jpg",
    slug: "computer-repair",
  },
  {
    id: "gardening",
    name: "Gardening",
    providers: "49 providers",
    image: "/images/assets/cat-gardening.jpg",
    slug: "gardening",
  },
  {
    id: "moving",
    name: "Moving Services",
    providers: "38 providers",
    image: "/images/assets/cat-moving.jpg",
    slug: "moving",
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    providers: "43 providers",
    image: "/images/assets/cat-beauty.jpg",
    slug: "beauty",
  },
];

export function Categories() {
  return (
    <section className="bg-[#F2F5F8] py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading Row */}
        <div className="flex items-end justify-between border-b border-[#DCE4ED] pb-3">
          <div>
            <h2 className="font-barlow text-2xl sm:text-[26px] font-black uppercase tracking-tight text-[#082B60]">
              WHAT DO YOU NEED HELP WITH?
            </h2>
            {/* Orange bar underline */}
            <div className="mt-1 h-[3px] w-12 bg-[#FF6900]" />
          </div>

          <Link
            href="/services"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#082B60] hover:text-[#FF6900] transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 6 Columns x 2 Rows Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isHighlighted = cat.highlighted;
            return (
              <Link
                key={cat.id}
                href={`/services/${cat.slug}`}
                className={cn(
                  "group relative flex flex-col rounded-md overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
                  isHighlighted
                    ? "bg-[#FF6900] border-[#E95B00] shadow-sm text-white"
                    : "bg-white border-[#DCE4ED] hover:border-[#FF6900] text-[#082B60]"
                )}
              >
                {/* Image at top */}
                <div className="relative h-20 sm:h-24 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  {isHighlighted && (
                    <div className="absolute inset-0 bg-[#FF6900]/25 mix-blend-multiply pointer-events-none" />
                  )}
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-2.5 text-center">
                  <div>
                    <h3
                      className={cn(
                        "text-xs sm:text-[13px] font-bold leading-tight truncate",
                        isHighlighted ? "text-white" : "text-[#082B60]"
                      )}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-0.5 text-[10px] sm:text-[11px]",
                        isHighlighted ? "text-white/80" : "text-[#65758B]"
                      )}
                    >
                      {cat.providers}
                    </p>
                  </div>

                  {/* Outlined Action Button */}
                  <div className="mt-2.5">
                    <span
                      className={cn(
                        "inline-block w-full py-1 rounded text-[10px] font-bold uppercase tracking-wider border transition-colors",
                        isHighlighted
                          ? "border-white text-white group-hover:bg-white group-hover:text-[#FF6900]"
                          : "border-[#FF6900] text-[#FF6900] group-hover:bg-[#FF6900] group-hover:text-white"
                      )}
                    >
                      VIEW SERVICES
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
