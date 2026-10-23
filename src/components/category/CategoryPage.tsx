"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Star, MapPin, Search, CheckCircle2 } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";
import { getCategory } from "@/lib/category-data";
import { TESTIMONIALS } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export interface CategoryPageProps { slug?: string; }

export function CategoryPage({ slug: slugProp }: CategoryPageProps) {
  const params = useParams();
  const slug = (slugProp ?? (params?.slug as string)) || "cleaning";
  const cat = getCategory(slug) ?? getCategory("cleaning")!;
  const [location, setLocation] = React.useState("Lahore");
  const [locOpen, setLocOpen] = React.useState(false);
  const [slide, setSlide] = React.useState(0);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [activeService, setActiveService] = React.useState(0);
  const LOCATIONS = ["Lahore","Karachi","Islamabad","Rawalpindi","Peshawar"];
  const providers = [
    { name: "Ahmed Raza", service: cat.name, specialty: "General Servicing", location: location + ", Pakistan", distance: "6.4 km (12 min away)", rating: 4.8, reviewCount: 124, verified: true, price: cat.startingPrice, avatarKey: "providerAhmedRaza", imageKey: cat.heroImageKey, href: "/providers/ahmed-raza" },
    { name: "Sara Khan", service: cat.name, specialty: "Engine Diagnostics", location: location + ", Pakistan", distance: "7.1 km (14 min away)", rating: 4.6, reviewCount: 98, verified: true, price: cat.startingPrice, avatarKey: "providerSaraKhan", imageKey: cat.heroImageKey, href: "/providers/sara-khan" },
    { name: "Usman Ali", service: cat.name, specialty: "Brake Repair", location: location + ", Pakistan", distance: "5.9 km (11 min away)", rating: 4.7, reviewCount: 87, verified: true, price: cat.startingPrice, avatarKey: "providerUsmanAli", imageKey: cat.heroImageKey, href: "/providers/usman-ali" },
    { name: "Hina Malik", service: cat.name, specialty: "Oil & Filter Change", location: location + ", Pakistan", distance: "8.2 km (16 min away)", rating: 4.5, reviewCount: 64, verified: false, price: cat.startingPrice, avatarKey: "providerHinaMalik", imageKey: cat.heroImageKey, href: "/providers/hina-malik" },
    { name: "Bilal Ahmed", service: cat.name, specialty: "Battery Replacement", location: location + ", Pakistan", distance: "4.8 km (9 min away)", rating: 4.9, reviewCount: 156, verified: true, price: cat.startingPrice, avatarKey: "providerBilalAhmed", imageKey: cat.heroImageKey, href: "/providers/bilal-ahmed" },
  ];
  const visibleCards = 4;
  const maxSlide = Math.max(0, cat.carousel.length - visibleCards);
  const next = () => setSlide((s) => Math.min(s + 1, maxSlide));
  const prev = () => setSlide((s) => Math.max(s - 1, 0));
  const relatedCats = cat.related.map((s) => getCategory(s)).filter(Boolean) as any[];
  const reviews = TESTIMONIALS.filter((t) => t.category.toLowerCase().includes(cat.name.toLowerCase().split(" ")[0])).concat(TESTIMONIALS).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F3F7FB]">
      <section className="relative overflow-hidden bg-[#062653] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <nav className="text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1">/</span>
            <Link href="/services" className="hover:text-white">Services</Link> <span className="mx-1">/</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-[#FF6900] text-xs font-bold uppercase tracking-widest mb-3">{cat.label}</p>
              <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-tight mb-4">
                {cat.heroTitle.replace(cat.heroHighlight, "")}
                <span className="text-[#FF6900]">{cat.heroHighlight}</span>
              </h1>
              <p className="text-white/80 text-sm md:text-base mb-6 max-w-xl">{cat.heroSubtitle}</p>
"""
              <form className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-lg backdrop-blur" onSubmit={(e) => { e.preventDefault(); }}>
                <div className="flex items-center gap-2 flex-1 bg-white rounded-md px-3">
                  <Search className="h-4 w-4 text-[#647B99]" />
                  <input placeholder={cat.searchPlaceholder} className="w-full py-2.5 text-sm text-[#092B59] outline-none bg-transparent" />
                </div>
                <div className="relative">
                  <button type="button" onClick={() => setLocOpen(!locOpen)} className="flex items-center gap-2 bg-white rounded-md px-3 py-2.5 text-sm text-[#092B59] w-full sm:w-40 justify-between">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#FF6900]" />{location}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {locOpen && (
                    <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 border border-[#DCE5EF]">
                      {LOCATIONS.map((l) => (
                        <button key={l} type="button" onClick={() => { setLocation(l); setLocOpen(false); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-[#F3F7FB] text-[#092B59]">{l}</button>
                      ))}
                    </div>
                  )}
                </div>
                <button type="submit" className="bg-[#FF6900] hover:bg-[#E85B00] text-white font-semibold text-sm px-6 py-2.5 rounded-md transition-colors">
                  Search {cat.name}
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.popularSearches.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageAsset asset={cat.heroImageKey} alt={cat.name} className="w-full h-[320px] md:h-[420px] object-cover" priority />
              </div>
            </div>
          </div>
        </div>
      </section>
"""
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#092B59]">Popular {cat.name} Services</h2>
            <div className="flex gap-2">
              <button onClick={prev} className="h-9 w-9 rounded-full border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB]" aria-label="Previous"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={next} className="h-9 w-9 rounded-full border border-[#DCE5EF] flex items-center justify-center hover:bg-[#F3F7FB]" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500" style={{ transform: "translateX(-" + (slide * (100 / visibleCards)) + "%)" }}>
              {cat.carousel.map((c, i) => (
                <div key={i} className="w-1/2 md:w-1/3 lg:w-1/4 shrink-0 px-2">
                  <div className="rounded-xl overflow-hidden border border-[#DCE5EF] bg-white shadow-sm hover:shadow-md transition-shadow">
                    <ImageAsset asset={c.imageKey} alt={c.title} className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-[#092B59]">{c.title}</h3>
                      <p className="text-xs text-[#647B99] mt-1">{c.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-4">
            {Array.from({ length: maxSlide + 1 }).map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} className={cn("h-2 rounded-full transition-all", i === slide ? "w-6 bg-[#FF6900]" : "w-2 bg-[#DCE5EF]")} aria-label={"Slide " + (i + 1)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#F3F7FB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#092B59]">Popular {cat.name} Services</h2>
            <Link href={"/services/" + cat.slug} className="text-sm font-medium text-[#FF6900] hover:underline">View All Services</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cat.services.map((s, i) => (
              <button key={s.name} onClick={() => setActiveService(i)} className={cn("flex items-center justify-between p-4 rounded-xl border transition-all text-left", activeService === i ? "bg-[#FF6900] text-white border-[#FF6900]" : "bg-white text-[#092B59] border-[#DCE5EF] hover:border-[#FF6900]")}>
                <div>
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className={cn("text-xs mt-1", activeService === i ? "text-white/90" : "text-[#647B99]")}>{s.price}</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
      </section>
"""
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
            <h2 className="text-2xl font-bold text-[#092B59]">Featured {cat.name} in Your Area</h2>
            <div className="flex items-center gap-2 text-sm text-[#647B99]">
              <MapPin className="h-4 w-4 text-[#FF6900]" />
              <span>{location}</span>
              <button onClick={() => setLocOpen(true)} className="text-[#FF6900] font-medium hover:underline">Change Location</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {cat.filters.map((f) => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full border border-[#DCE5EF] bg-white text-[#092B59] hover:border-[#FF6900] cursor-pointer">{f}</span>
            ))}
            <select className="text-xs px-3 py-1.5 rounded-full border border-[#DCE5EF] bg-white text-[#092B59]">
              <option>Highest Rated</option>
              <option>Most Reviewed</option>
              <option>Price: Low to High</option>
              <option>Experience</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {providers.map((p) => (
              <div key={p.name} className="bg-white border border-[#DCE5EF] rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="relative h-36 rounded-t-xl overflow-hidden bg-[#F3F7FB]">
                  <ImageAsset asset={p.avatarKey ?? p.imageKey} alt={p.name} className="w-full h-full object-cover" />
                  {p.verified && (
                    <div className="absolute bottom-2 right-2 bg-white rounded-full px-2 py-0.5 shadow-sm flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-[#16A36A]" />
                      <span className="text-[10px] font-bold text-[#16A36A]">Verified</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sm text-[#092B59] truncate">{p.name}</h3>
                    {p.verified && (
                      <span className="h-5 px-2 rounded bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold">Verified</span>
                    )}
                  </div>
                  <p className="text-xs text-[#647B99] mb-2">{p.specialty}</p>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-3 w-3",
                          star <= Math.floor(p.rating) ? "text-[#FF6900] fill-[#FF6900]" : "text-[#DCE5EF]"
                        )}
                      />
                    ))}
                    <span className="text-xs font-medium text-[#092B59] ml-1">{p.rating.toFixed(1)}</span>
                    <span className="text-xs text-[#647B99] ml-1">({p.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#647B99] mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{p.location}</span>
                    <span className="text-[#092B59] font-medium">♦ {p.distance}</span>
                  </div>
                  <p className="text-xs font-medium text-[#092B59] mb-3">{p.price}</p>
                  <div className="flex gap-1.5">
                    <Link href={p.href} className="flex-1 text-center text-[10px] py-1.5 rounded-md border border-[#DCE5EF] text-[#092B59] hover:bg-[#F3F7FB] transition-colors">View Profile</Link>
                    <Link href={"/book?provider=" + encodeURIComponent(p.name) + "&service=" + encodeURIComponent(cat.name)} className="flex-1 text-center text-[10px] py-1.5 rounded-md bg-[#FF6900] text-white text-xs hover:bg-[#E85B00] transition-colors">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
"""
      <section className="py-12 bg-[#062653] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl overflow-hidden">
            <ImageAsset asset={cat.heroImageKey} alt={cat.name} className="w-full h-[320px] object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">WHY CHOOSE INVOLVE FOR {cat.name.toUpperCase()}?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Verified Professionals","Transparent Pricing","Clear Communication","Convenient Booking","Genuine Customer Feedback","Safe & Secure"].map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#FF6900] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{b}</p>
                    <p className="text-xs text-white/70">Trusted {cat.name.toLowerCase()} providers near you.</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={"/providers?category=" + cat.slug} className="inline-block mt-6 bg-[#FF6900] hover:bg-[#E85B00] text-white font-semibold text-sm px-6 py-3 rounded-md">Find Your Expert</Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#092B59] text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "SEARCH", desc: "Find professionals near you and compare services." },
              { title: "COMPARE", desc: "Check reviews, prices and experience." },
              { title: "BOOK", desc: "Request an appointment and get confirmation." },
            ].map((s, i) => (
              <div key={s.title} className="bg-[#F3F7FB] border border-[#DCE5EF] rounded-xl p-6 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-[#FF6900] text-white flex items-center justify-center font-bold text-lg mb-3">{i + 1}</div>
                <h3 className="font-bold text-[#092B59] mb-2">{s.title}</h3>
                <p className="text-sm text-[#647B99]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
"""
      <section className="py-12 bg-[#F3F7FB]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-[#092B59] mb-6">What Our Customers Say</h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="bg-white border border-[#DCE5EF] rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageAsset src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm text-[#092B59]">{r.name}</p>
                      <p className="text-xs text-[#647B99]">{r.category}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-[#FF6900] fill-[#FF6900]" />
                      <span className="text-xs font-medium">{r.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#647B99]">{r.quote}</p>
                  <p className="text-xs text-[#647B99] mt-2">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#092B59] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {cat.faqs.map((f, i) => (
                <div key={i} className="bg-white border border-[#DCE5EF] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-left">
                    <span className="font-medium text-sm text-[#092B59]">{f.q}</span>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", openFaq === i && "rotate-90")} />
                  </button>
                  {openFaq === i && <div className="px-4 pb-3 text-sm text-[#647B99]">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
"""
      <section className="py-12 bg-[#062653] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase">NEED A TRUSTED {cat.name.toUpperCase()}?</h2>
            <p className="text-white/80 text-sm mt-2">Find verified {cat.name.toLowerCase()} providers near you.</p>
          </div>
          <div className="flex gap-3">
            <Link href={"/providers?category=" + cat.slug} className="bg-[#FF6900] hover:bg-[#E85B00] text-white font-semibold text-sm px-6 py-3 rounded-md">Find a {cat.name}</Link>
            <Link href={"/services/" + cat.slug} className="border border-white/40 text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-white/10">Explore {cat.name} Services</Link>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#092B59] mb-6">Related Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {relatedCats.slice(0, 6).map((rc: any) => (
              <Link key={rc.slug} href={"/services/" + rc.slug} className="bg-[#F3F7FB] border border-[#DCE5EF] rounded-xl p-3 text-center hover:border-[#FF6900] transition-colors">
                <p className="text-sm font-medium text-[#092B59]">{rc.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default CategoryPage;
