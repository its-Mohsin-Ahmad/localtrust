"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ImageAsset } from "@/components/ui/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hold the splash briefly during essential initialization, then fade out.
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#061B40] flex flex-col items-center justify-center text-white"
      aria-hidden="true"
    >
      {/* 3D-style location pin logo with raised checkmark centered inside the circular opening */}
      <div
        className="relative w-28 h-28 mb-8"
        aria-label="LocalTrust logo"
      >
        {/* Pin body */}
        <motion.div
          initial={{ scale: 0.9, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.7, type: "spring", stiffness: 260, damping: 20 }}
          className="w-full h-full bg-[#FF6900] rounded-[60%_40%_40%_40%/65%] shadow-[0_24px_48px_rgba(6,27,64,0.55)] relative overflow-hidden"
        >
          {/* Bevel highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-[60%_40%_40%_40%/65%] pointer-events-none" />
          {/* Circular opening near upper section */}
          <div className="absolute top-[28%] left-[50%] -translate-x-1/2 w-8 h-8 bg-[#061B40] rounded-full border-2 border-[#FF6900]/40 z-10" />
          {/* Soft shadow */}
          <div className="absolute bottom-[-14px] left-[50%] -translate-x-1/2 w-24 h-2 bg-black/25 blur-md rounded-full pointer-events-none" />
        </motion.div>

        {/* Raised white checkmark precisely inside the circular opening */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.35, duration: 0.5 }}
          className="absolute top-[28%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <CheckCircle2
            size={32}
            strokeWidth={3.5}
            className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
          />
        </motion.div>
      </div>

      {/* Wordmark: Local (white) + Trust (orange) */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.85, duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight"
      >
        <span className="text-white">Local</span>
        <span className="text-[#FF6900]">Trust</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 1.2, duration: 0.6 }}
        className="mt-3 text-sm md:text-base text-[#E4E7EC] text-center"
      >
        Find Trusted Professionals Near You.
      </motion.p>

      {/* Small brand lockup beneath wordmark for identity completeness */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 1.6, duration: 0.5 }}
        className="mt-6 flex items-center gap-2 text-xs text-[#9CA3AF]"
      >
        <MapPin size={14} className="text-[#FF6900]" />
        <span>LocalTrust</span>
        <ArrowRight size={14} className="opacity-50" />
        <span>Pakistan</span>
        <Sparkles size={14} className="opacity-50" />
      </motion.div>
    </div>
  );
}
