"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LocalTrustLogo } from "@/components/ui/logo";

export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Logo appears first, then wordmark and tagline fade in, then fade out.
    const logoTimer = setTimeout(() => {
      setShowContent(true);
    }, 400);

    const exitTimer = setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  if (!visible) return null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#061B40] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      {/* 3D glossy orange location pin with white checkmark inside circular opening */}
      <motion.div
        initial={{ scale: 0.85, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.7 }}
        className="w-28 h-28 mb-10"
      >
        <LocalTrustLogo className="w-full h-full" />
      </motion.div>

      {/* Wordmark: Local (white) + Trust (orange) */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.5, duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-white"
      >
        <span className="text-white">Local</span>
        <span className="text-[#FF6900]">Trust</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { delay: 0.9, duration: 0.6 }}
        className="mt-4 text-sm md:text-base text-[#9CA3AF] text-center"
      >
        Find Trusted Professionals Near You.
      </motion.p>
    </div>
  );
}

