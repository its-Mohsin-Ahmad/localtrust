'use client';

import { useCallback, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/** Animation types supported by the hook */
export type AnimationType =
  | 'fadeInUp'
  | 'fadeIn'
  | 'scaleIn'
  | 'slideInLeft'
  | 'slideInRight'
  | 'parallax';

/** Configuration options for animations */
export interface AnimationOptions {
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Easing function */
  ease?: string;
  /** Stagger delay between multiple elements in seconds */
  stagger?: number;
  /** Start position for ScrollTrigger (0-1) */
  scrollTriggerStart?: number;
  /** End position for ScrollTrigger (0-1 or pixel value) */
  scrollTriggerEnd?: string | number;
  /** Whether to scrub the animation */
  scrub?: boolean | number;
  /** Whether to toggle animations */
  toggleActions?: string;
  /** Y distance for parallax effect */
  parallaxY?: number;
  /** Custom y values for fadeInUp */
  yFrom?: number;
  /** Custom x values for slide animations */
  xFrom?: number;
}

/** Animation config type */
type AnimationConfig = {
  [key: string]: unknown;
};

/** Default animation configurations */
const defaultAnimations: Record<AnimationType, (options?: AnimationOptions) => AnimationConfig> = {
  fadeInUp: (options) => ({
    opacity: [0, 1],
    y: [options?.yFrom ?? 20, 0],
    duration: options?.duration ?? 0.6,
    ease: options?.ease ?? 'power2.out',
    delay: options?.delay ?? 0,
  }),
  fadeIn: (options) => ({
    opacity: [0, 1],
    duration: options?.duration ?? 0.5,
    ease: options?.ease ?? 'power2.out',
    delay: options?.delay ?? 0,
  }),
  scaleIn: (options) => ({
    opacity: [0, 1],
    scale: [0.9, 1],
    duration: options?.duration ?? 0.5,
    ease: options?.ease ?? 'back.out(1.2)',
    delay: options?.delay ?? 0,
  }),
  slideInLeft: (options) => ({
    opacity: [0, 1],
    x: [options?.xFrom ?? -30, 0],
    duration: options?.duration ?? 0.5,
    ease: options?.ease ?? 'power2.out',
    delay: options?.delay ?? 0,
  }),
  slideInRight: (options) => ({
    opacity: [0, 1],
    x: [options?.xFrom ?? 30, 0],
    duration: options?.duration ?? 0.5,
    ease: options?.ease ?? 'power2.out',
    delay: options?.delay ?? 0,
  }),
  parallax: (options) => {
    const yValue = options?.parallaxY ?? 30;
    return {
      y: [-yValue, yValue],
      ease: 'none',
      duration: 1,
    };
  },
};

/** Hook return type */
export interface UseGsapAnimationReturn {
  /** Apply animation to a single element */
  animate: (
    element: gsap.TweenTarget,
    type: AnimationType,
    options?: AnimationOptions
  ) => gsap.core.Tween | undefined;
  /** Apply the same animation to multiple elements with stagger */
  animateStagger: (
    elements: gsap.TweenTarget,
    type: AnimationType,
    options?: AnimationOptions
  ) => gsap.core.Tween | undefined;
  /** Create a scroll-triggered animation */
  animateScroll: (
    element: gsap.TweenTarget,
    type: AnimationType,
    options?: AnimationOptions
  ) => gsap.core.Tween | undefined;
  /** Refresh ScrollTrigger (useful after dynamic content loads) */
  refreshScrollTrigger: () => void;
}

/**
 * Custom hook for GSAP animations with ScrollTrigger integration
 * Provides reusable animation functions with proper cleanup and reduced motion support
 * 
 * **Validates: Requirements 1.5, 1.6**
 */
export function useGsapAnimation(): UseGsapAnimationReturn {
  const contextRef = useRef<gsap.Context | null>(null);
  const scrollTriggerInstances = useRef<ScrollTrigger[]>([]);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Animate single element
  const animate = useCallback(
    (
      element: gsap.TweenTarget,
      type: AnimationType,
      options?: AnimationOptions
    ): gsap.core.Tween | undefined => {
      if (!element) return undefined;

      // Handle reduced motion - show instantly
      if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
        return undefined;
      }

      const config = defaultAnimations[type](options);
      
      // Set initial state and animate
      gsap.set(element, { opacity: 0, x: 0, y: 0, scale: 0.9 });
      return gsap.to(element, config as gsap.TweenVars);
    },
    [prefersReducedMotion]
  );

  // Animate with stagger
  const animateStagger = useCallback(
    (
      elements: gsap.TweenTarget,
      type: AnimationType,
      options?: AnimationOptions
    ): gsap.core.Tween | undefined => {
      if (!elements) return undefined;

      // Handle reduced motion - show instantly
      if (prefersReducedMotion()) {
        gsap.set(elements, { opacity: 1, x: 0, y: 0, scale: 1 });
        return undefined;
      }

      const config = defaultAnimations[type](options);
      const stagger = options?.stagger ?? 0.1;

      gsap.set(elements, { opacity: 0, x: 0, y: 0, scale: 0.9 });
      return gsap.to(elements, { ...config, stagger } as gsap.TweenVars);
    },
    [prefersReducedMotion]
  );

  // Scroll-triggered animation
  const animateScroll = useCallback(
    (
      element: gsap.TweenTarget,
      type: AnimationType,
      options?: AnimationOptions
    ): gsap.core.Tween | undefined => {
      if (!element) return undefined;

      // Handle reduced motion - show instantly
      if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, x: 0, y: 0, scale: 1 });
        return undefined;
      }

      const config = defaultAnimations[type](options);
      
      const scrollTriggerOptions: ScrollTrigger.Vars = {
        trigger: element as gsap.DOMTarget,
        start: options?.scrollTriggerStart !== undefined
          ? `top ${100 - options.scrollTriggerStart * 100}%`
          : 'top 80%',
        end: options?.scrollTriggerEnd !== undefined
          ? typeof options.scrollTriggerEnd === 'string'
            ? options.scrollTriggerEnd
            : `bottom ${100 - (options.scrollTriggerEnd as number) * 100}%`
          : 'bottom 20%',
        toggleActions: options?.toggleActions ?? 'play none none none',
        scrub: options?.scrub ?? false,
      };

      // Set initial state
      if (type === 'parallax') {
        gsap.set(element, { y: -20 });
      } else {
        gsap.set(element, { opacity: 0, x: 0, y: 0, scale: 0.9 });
      }

      const tween = type === 'parallax'
        ? gsap.to(element, { 
            ...config, 
            scrollTrigger: scrollTriggerOptions 
          } as gsap.TweenVars)
        : gsap.to(element, { 
            ...config, 
            scrollTrigger: scrollTriggerOptions 
          } as gsap.TweenVars);

      return tween;
    },
    [prefersReducedMotion]
  );

  // Refresh ScrollTrigger
  const refreshScrollTrigger = useCallback(() => {
    ScrollTrigger.refresh();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Kill all ScrollTrigger instances created by this hook
      scrollTriggerInstances.current.forEach((st) => st.kill());
      scrollTriggerInstances.current = [];
    };
  }, []);

  // Use GSAP context for proper React cleanup
  useGSAP(() => {
    contextRef.current = gsap.context(() => {
      // Context is ready
    });
  }, []);

  return {
    animate,
    animateStagger,
    animateScroll,
    refreshScrollTrigger,
  };
}

/**
 * Hook to animate elements on mount with automatic cleanup
 * Simplified version for declarative usage
 */
export interface UseGsapOnMountOptions {
  /** Animation type */
  type: AnimationType;
  /** Animation options */
  options?: AnimationOptions;
  /** Whether the animation is enabled */
  enabled?: boolean;
}

/**
 * useGsapOnMount - Animation hook that runs on component mount
 * 
 * **Validates: Requirements 1.5, 1.6**
 */
export function useGsapOnMount<T extends HTMLElement>(
  options: UseGsapOnMountOptions
): React.RefObject<T | null> {
  const { type, options: animOptions, enabled = true } = options;
  const ref = useRef<T>(null);
  const { animate, animateScroll } = useGsapAnimation();

  useEffect(() => {
    if (!ref.current || !enabled) return;

    // Use scroll animation for parallax, regular for others
    if (type === 'parallax') {
      animateScroll(ref.current, type, animOptions);
    } else {
      animate(ref.current, type, animOptions);
    }
  }, [type, animOptions, enabled, animate, animateScroll]);

  return ref;
}