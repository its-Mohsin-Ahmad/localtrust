"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageAsset } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    key: "homeHeroRepair",
    eyebrow: "LOCAL SERVICES, MADE SIMPLE",
    heading: "Find Trusted Professionals Near You.",
    description:
      "Discover skilled local professionals for home repairs, maintenance, and everyday services.",
    primary: "Explore Services",
    primaryHref: "/services",
    secondary: "Become a Provider",
    secondaryHref: "/auth/create-account/provider",
  },
  {
    key: "homeHeroProfessionals",
    eyebrow: "SKILLED HELP WHEN YOU NEED IT",
    heading: "The Right Expert for Every Job.",
    description:
      "Explore local professionals, compare service options, and find the right help for your needs.",
    primary: "Find a Professional",
    primaryHref: "/search",
    secondary: "Browse Categories",
    secondaryHref: "/services",
  },
  {
    key: "homeHeroCustomer",
    eyebrow: "A BETTER WAY TO BOOK",
    heading: "Your Local Services, Made Simpler.",
    description:
      "Manage requests, appointments, and communication in one convenient place.",
    primary: "Get Started",
    primaryHref: "/auth/create-account",
    secondary: "How It Works",
    secondaryHref: "/how-it-works",
  },
  {
    key: "homeHeroBusiness",
    eyebrow: "GROW WITH INVOLVE",
    heading: "Turn Your Skills Into Opportunities.",
    description:
      "Build your professional profile and connect with customers in your service areas.",
    primary: "Join as a Provider",
    primaryHref: "/auth/create-account/provider",
    secondary: "Learn More",
    secondaryHref: "/become-a-provider",
  },
] as const;

const AUTO_PLAY_MS = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || typeof window === "undefined") return;
    const t = setInterval(next, AUTO_PLAY_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[index];
  const image = images[slide.key];

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="relative w-full overflow-hidden bg-[#082B60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.7 }}
        className="absolute inset-0 z-0"
        key={slide.key}
      >
        <ImageAsset
          asset={slide.key}
          className="w-full h-[480px] md:h-[520px] lg:h-[560px] object-cover object-center"
          alt={image.alt}
          priority={index === 0}
          objectPosition="center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#082B60]/85 via-[#082B60]/60 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex flex-col h-full justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-20">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" placeholder="What service do you need?" className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E4E7EC] bg-white text-[#182230] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900] text-sm" />
            </div>
            <div className="relative flex-1 md:flex-none md:w-72">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <select className="w-full pl-10 pr-10 py-3 rounded-full border border-[#E4E7EC] bg-white text-[#182230] appearance-none focus-outline-none focus-visible:ring-2 focus-visible:ring-[#FF6900] text-sm"><option>City, area or postal code</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Rawalpindi</option><option>Faisalabad</option><option>Multan</option><option>Peshawar</option><option>Quetta</option></select>
            </div>
            <Button className="md:w-48 h-auto py-3">Find Services</Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-[#FF6900]/10 text-[#FF6900] text-xs font-semibold tracking-wider uppercase">{slide.eyebrow}</span>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.15, duration: 0.5 }} className="text-[52px] md:text-[60px] font-extrabold text-white leading-tight mb-6">{slide.heading}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.25, duration: 0.5 }} className="text-lg md:text-xl text-[#E4E7EC] mb-8 leading-relaxed">{slide.description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.35, duration: 0.5 }} className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-[#FF6900] text-white hover:bg-[#e55a00]" asChild><a href={slide.primaryHref}>{slide.primary}</a></Button>
            <Button size="lg" variant="ghost" className="text-white border border-white/30 hover:bg-white/10" asChild><a href={slide.secondaryHref}>{slide.secondary}</a></Button>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} aria-current={i === index ? "true" : undefined} className={cn("w-2 h-2 rounded-full transition-all duration-300", i === index ? "bg-white w-8" : "bg-white/40 hover:bg-white/60")} />
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-8 pointer-events-none">
          <button onClick={prev} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Previous slide" className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-0"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={next} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-label="Next slide" className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-0"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
