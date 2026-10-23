'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

/**
 * SmoothScrollProvider Component
 * 
 * Wraps the application with Lenis smooth scrolling functionality.
 * Integrates with GSAP ScrollTrigger for coordinated scroll animations.
 * 
 * Configuration:
 * - duration: 1.2s for smooth, premium feel
 * - smoothWheel: enabled for desktop mouse wheel scrolling
 * - smoothTouch: disabled for better mobile touch experience
 * 
 * Accessibility:
 * - Respects prefers-reduced-motion setting
 * - Falls back to native scrolling when reduced motion is preferred
 * 
 * Requirements: 1.2, 1.3, 1.4, 1.6
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If user prefers reduced motion, skip Lenis initialization
    // and use native scrolling for accessibility
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with the specified configuration
    // Using current Lenis API - duration 1.2, smooth wheel enabled
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Sync Lenis scroll with GSAP ScrollTrigger
    // This ensures ScrollTrigger updates when Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to the GSAP ticker for frame synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Configure GSAP ticker to use Lenis's delta
    // This ensures smooth synchronization between GSAP animations and Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup function
    return () => {
      // Remove scroll listener
      lenis.off('scroll', ScrollTrigger.update);

      // Remove GSAP ticker listener
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });

      // Destroy Lenis instance
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}