"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Search, ChevronDown } from "lucide-react";

const POPULAR_LOCATIONS = [
  "Gulberg",
  "DHA",
  "Johar Town",
  "Wapda Town",
  "Model Town",
];

const CITIES = ["Lahore", "Peshawar", "Islamabad", "Karachi", "Rawalpindi"];

export function Nearby() {
  const router = useRouter();
  const [city, setCity] = useState("Lahore");
  const [query, setQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("location", city);
    if (query.trim()) params.set("service", query.trim());
    router.push(`/search?${params.toString()}`);
  };

  const handleLocationClick = (loc: string) => {
    router.push(`/search?location=${encodeURIComponent(loc)}`);
  };

  return (
    <section className="bg-[#F2F5F8] py-8 sm:py-10 border-t border-[#E4E7EC]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left area: Search form & Popular locations (col 8) */}
          <div className="lg:col-span-8">
            <h2 className="font-barlow text-2xl sm:text-[26px] font-black uppercase tracking-tight text-[#082B60]">
              FIND SERVICES NEAR YOU
            </h2>

            {/* Inputs row */}
            <form
              onSubmit={handleSearch}
              className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-2xl"
            >
              {/* City selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCityOpen(!cityOpen)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 bg-white rounded border border-[#DCE4ED] text-xs font-semibold text-[#082B60] hover:border-[#FF6900] transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#FF6900]" />
                    <span>{city}</span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-[#65758B]" />
                </button>

                {cityOpen && (
                  <div className="absolute left-0 mt-1 w-36 rounded bg-white border border-[#DCE4ED] py-1 shadow-lg z-30">
                    {CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => {
                          setCity(c);
                          setCityOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-[#082B60] hover:bg-[#F2F5F8]"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Service or area input */}
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-[#65758B]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search service or area"
                  className="w-full bg-white rounded border border-[#DCE4ED] pl-9 pr-3 py-2 text-xs sm:text-sm text-[#082B60] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF6900]"
                />
              </div>

              {/* Search button */}
              <button
                type="submit"
                className="bg-[#FF6900] hover:bg-[#E95B00] text-white font-bold text-xs uppercase px-6 py-2.5 rounded transition-colors tracking-wide shrink-0 shadow-sm"
              >
                SEARCH
              </button>
            </form>

            {/* Popular locations */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#65758B] font-semibold text-xs mr-1">
                Popular locations:
              </span>
              {POPULAR_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleLocationClick(loc)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#082B60] hover:text-[#FF6900] transition-colors"
                >
                  <MapPin className="h-3 w-3 text-[#FF6900]" />
                  <span>{loc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right area: Map illustration with pin (col 4) */}
          <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs h-28 sm:h-32 rounded-md overflow-hidden border border-[#DCE4ED] bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/images/reference/nearby-map.jpg"
                alt="Map of nearby services"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-center"
              />

              {/* Prominent orange map pin marker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6900] text-white shadow-lg ring-4 ring-white/80 animate-bounce">
                    <MapPin className="h-5 w-5 fill-white text-[#FF6900]" />
                  </div>
                  <div className="h-1.5 w-4 rounded-full bg-black/20 blur-[1px] mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
