"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Heart, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expert {
  id: string;
  name: string;
  profession: string;
  location: string;
  rating: number;
  reviews: number;
  experience: string;
  price: string;
  verified: boolean;
  image: string;
  slug: string;
}

const EXPERTS: Expert[] = [
  {
    id: "ahmed-raza",
    name: "Ahmed Raza",
    profession: "Plumber",
    location: "Lahore, Punjab",
    rating: 4.9,
    reviews: 24,
    experience: "9 years experience",
    price: "PKR 1,500+",
    verified: true,
    image: "/images/assets/expert-ahmed.jpg",
    slug: "ahmed-raza",
  },
  {
    id: "sara-khan",
    name: "Sara Khan",
    profession: "Electrician",
    location: "Lahore, Punjab",
    rating: 4.8,
    reviews: 18,
    experience: "6 years experience",
    price: "PKR 1,200+",
    verified: true,
    image: "/images/assets/expert-sara.jpg",
    slug: "sara-khan",
  },
  {
    id: "usman-ali",
    name: "Usman Ali",
    profession: "Home Cleaner",
    location: "Lahore, Punjab",
    rating: 4.7,
    reviews: 32,
    experience: "4 years experience",
    price: "PKR 1,000+",
    verified: true,
    image: "/images/assets/expert-usman.jpg",
    slug: "usman-ali",
  },
  {
    id: "ayesha-malik",
    name: "Ayesha Malik",
    profession: "Mathematics Tutor",
    location: "Lahore, Punjab",
    rating: 4.9,
    reviews: 41,
    experience: "8 years experience",
    price: "PKR 1,000+",
    verified: true,
    image: "/images/assets/expert-ayesha.jpg",
    slug: "ayesha-malik",
  },
];

export function Professionals() {
  const [activeFilter, setActiveFilter] = useState("Top Rated");
  const [sortBy, setSortBy] = useState("Relevance");
  const [sortOpen, setSortOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-[#F2F5F8] py-8 sm:py-10 border-t border-[#E4E7EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading & Filter Row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[#DCE4ED] pb-3">
          <div>
            <h2 className="font-barlow text-2xl sm:text-[26px] font-black uppercase tracking-tight text-[#082B60]">
              MEET YOUR LOCAL EXPERTS
            </h2>
            <div className="mt-1 h-[3px] w-12 bg-[#FF6900]" />
          </div>

          {/* Right Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#65758B] font-medium mr-1">Filter:</span>
            {["Top Rated", "Verified", "Available Soon"].map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-[#FF6900] text-white shadow-sm"
                      : "bg-white border border-[#DCE4ED] text-[#082B60] hover:border-[#FF6900]"
                  )}
                >
                  {filter}
                </button>
              );
            })}

            <span className="text-[#65758B] font-medium ml-2 mr-1">Sort by:</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#DCE4ED] text-[#082B60] text-xs font-semibold hover:border-[#FF6900] transition-colors"
              >
                <span>{sortBy}</span>
                <ChevronDown className="h-3 w-3 text-[#65758B]" />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-1 w-32 rounded-md bg-white border border-[#DCE4ED] py-1 shadow-lg z-30">
                  {["Relevance", "Highest Rated", "Most Reviews", "Price: Low to High"].map(
                    (opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#082B60] hover:bg-[#F2F5F8]"
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERTS.map((expert) => {
            const isFav = !!favorites[expert.id];
            return (
              <div
                key={expert.id}
                className="group relative flex flex-col justify-between rounded-md border border-[#DCE4ED] bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Favorite Button (Upper right) */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(expert.id)}
                  aria-label={isFav ? "Remove from saved" : "Save expert"}
                  className="absolute top-3 right-3 text-[#A0AEC0] hover:text-[#FF6900] transition-colors z-10"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-colors",
                      isFav ? "fill-[#FF6900] text-[#FF6900]" : "text-[#94A3B8]"
                    )}
                  />
                </button>

                {/* Top: Portrait on left + Info on right */}
                <div className="flex gap-3">
                  {/* Portrait */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100 border border-[#E2E8F0]">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="font-bold text-sm text-[#082B60] truncate leading-tight">
                      {expert.name}
                    </h3>
                    <p className="text-[11px] text-[#65758B] font-medium leading-tight mt-0.5">
                      {expert.profession}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-[11px] text-[#65758B] mt-1">
                      <MapPin className="h-3 w-3 text-[#FF6900] shrink-0" />
                      <span className="truncate">{expert.location}</span>
                    </div>

                    {/* Star Rating & Reviews */}
                    <div className="flex items-center gap-1 text-[11px] mt-1">
                      <Star className="h-3 w-3 fill-[#FF6900] text-[#FF6900] shrink-0" />
                      <span className="font-bold text-[#082B60]">{expert.rating.toFixed(1)}</span>
                      <span className="text-[#65758B]">({expert.reviews})</span>
                    </div>

                    {/* Experience */}
                    <p className="text-[10px] text-[#65758B] mt-0.5">{expert.experience}</p>

                    {/* Price & Verified Badge */}
                    <div className="mt-1.5 flex items-center justify-between">
                      <span className="font-extrabold text-xs text-[#082B60]">
                        {expert.price}
                      </span>
                      {expert.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#15965A]">
                          <CheckCircle2 className="h-3 w-3 fill-[#15965A] text-white" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-3.5 pt-3 border-t border-[#F1F5F9] grid grid-cols-2 gap-2">
                  <Link
                    href={`/providers/${expert.slug}`}
                    className="inline-flex items-center justify-center py-1.5 px-2 rounded text-[11px] font-bold text-[#082B60] bg-white border border-[#082B60] hover:bg-[#F2F5F8] transition-colors text-center"
                  >
                    View Profile
                  </Link>

                  <Link
                    href="/customer/find-services"
                    className="inline-flex items-center justify-center py-1.5 px-2 rounded text-[11px] font-bold text-white bg-[#FF6900] hover:bg-[#E95B00] transition-colors text-center shadow-sm"
                  >
                    Request Booking
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
