/**
 * Animation Configuration
 * 
 * Centralized timing constants and configuration for GSAP animations
 * throughout the LocalTrust premium marketplace.
 * 
 * **Validates: Requirements 1.3**
 */

// ============================================================================
// Hero Animation Configuration
// ============================================================================

export const heroAnimations = {
  /** Duration for main hero entrance animation */
  entranceDuration: 0.8,
  /** Delay before hero text animations start */
  textDelay: 0.2,
  /** Delay between hero text elements (stagger) */
  textStagger: 0.15,
  /** Duration for hero subtitle */
  subtitleDuration: 0.6,
  /** Delay for hero subtitle */
  subtitleDelay: 0.4,
  /** Duration for CTA button reveal */
  ctaDuration: 0.5,
  /** Delay for CTA button */
  ctaDelay: 0.6,
  /** Easing for hero entrance */
  ease: 'power3.out',
  /** Scale animation for hero elements */
  scaleFrom: 0.95,
} as const;

// ============================================================================
// Card Animation Configuration
// ============================================================================

export const cardAnimations = {
  /** Duration for card fade-in animation */
  fadeInDuration: 0.5,
  /** Duration for card scale animation */
  scaleInDuration: 0.4,
  /** Default stagger delay between cards */
  staggerDelay: 0.1,
  /** Delay before card animations start */
  startDelay: 0,
  /** Easing for card entrance */
  ease: 'power2.out',
  /** Back easing for scale effects */
  backEase: 'back.out(1.2)',
  /** Y offset for fadeInUp */
  yFrom: 20,
  /** Scale start value */
  scaleFrom: 0.9,
  /** ScrollTrigger start position (0-1, represents percentage from top) */
  scrollTriggerStart: 0.8,
  /** ScrollTrigger end position */
  scrollTriggerEnd: 0.2,
} as const;

// ============================================================================
// Parallax Effect Configuration
// ============================================================================

export const parallaxEffects = {
  /** Default Y movement distance in pixels */
  defaultDistance: 30,
  /** Hero background parallax distance */
  heroDistance: 50,
  /** Image parallax distance */
  imageDistance: 40,
  /** Small element parallax (badges, icons) */
  smallDistance: 15,
  /** Parallax animation duration */
  duration: 1,
  /** Parallax easing (linear for natural feel) */
  ease: 'none',
  /** Whether to scrub with scroll position */
  scrub: false,
  /** ScrollTrigger start for parallax */
  triggerStart: 'top bottom',
  /** ScrollTrigger end for parallax */
  triggerEnd: 'bottom top',
} as const;

// ============================================================================
// General Animation Defaults
// ============================================================================

export const animationDefaults = {
  /** Default animation duration */
  duration: 0.5,
  /** Default delay before animation starts */
  delay: 0,
  /** Default stagger for multiple elements */
  stagger: 0.1,
  /** Default easing function */
  ease: 'power2.out',
  /** Default Y offset for slide animations */
  yFrom: 20,
  /** Default X offset for slide animations (right) */
  xFromRight: 30,
  /** Default X offset for slide animations (left) */
  xFromLeft: -30,
  /** Default scale start value */
  scaleFrom: 0.9,
  /** ScrollTrigger default start */
  scrollStart: 'top 80%',
  /** ScrollTrigger default end */
  scrollEnd: 'bottom 20%',
  /** Default toggle actions */
  toggleActions: 'play none none none',
} as const;

// ============================================================================
// Section Animation Configuration
// ============================================================================

export const sectionAnimations = {
  /** Duration for section title animation */
  titleDuration: 0.6,
  /** Delay for section title */
  titleDelay: 0,
  /** Stagger for section content */
  contentStagger: 0.08,
  /** Duration for section content items */
  contentDuration: 0.4,
  /** ScrollTrigger start for sections */
  sectionStart: 0.85,
  /** ScrollTrigger end for sections */
  sectionEnd: 0.15,
} as const;

// ============================================================================
// Transition Configuration
// ============================================================================

export const transitionConfig = {
  /** Fast transition duration */
  fast: 0.2,
  /** Normal transition duration */
  normal: 0.3,
  /** Slow transition duration */
  slow: 0.5,
  /** Very slow transition duration */
  verySlow: 0.8,
  /** Default transition easing */
  ease: 'power2.inOut',
} as const;

// ============================================================================
// Responsive Animation Adjustments
// ============================================================================

export const responsiveAnimations = {
  /** Duration multiplier for mobile animations (faster = smaller premium feel) */
  mobileDurationMultiplier: 0.8,
  /** Whether to disable complex animations on mobile */
  disableComplexOnMobile: false,
  /** Whether to reduce parallax on mobile */
  reduceParallaxOnMobile: true,
  /** Mobile parallax distance reduction */
  mobileParallaxReduction: 0.5,
} as const;

// ============================================================================
// Type Exports
// ============================================================================

/** Animation duration type */
export type AnimationDuration = typeof animationDefaults.duration;

/** Stagger delay type */
export type StaggerDelay = typeof cardAnimations.staggerDelay;

/** Parallax distance type */
export type ParallaxDistance = typeof parallaxEffects.defaultDistance;

/** ScrollTrigger position type */
export type ScrollPosition = typeof animationDefaults.scrollStart;

/** Complete animation config for a specific animation type */
export interface AnimationTimingConfig {
  duration: number;
  delay: number;
  ease: string;
  stagger?: number;
}

/** Hero animation configuration */
export interface HeroAnimationConfig {
  entranceDuration: number;
  textDelay: number;
  textStagger: number;
  subtitleDuration: number;
  subtitleDelay: number;
  ctaDuration: number;
  ctaDelay: number;
  ease: string;
  scaleFrom: number;
}

/** Card animation configuration */
export interface CardAnimationConfig {
  fadeInDuration: number;
  scaleInDuration: number;
  staggerDelay: number;
  startDelay: number;
  ease: string;
  backEase: string;
  yFrom: number;
  scaleFrom: number;
  scrollTriggerStart: number;
  scrollTriggerEnd: number;
}

/** Parallax effect configuration */
export interface ParallaxConfig {
  defaultDistance: number;
  heroDistance: number;
  imageDistance: number;
  smallDistance: number;
  duration: number;
  ease: string;
  scrub: boolean;
  triggerStart: string;
  triggerEnd: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get adjusted duration for mobile devices
 */
export function getMobileDuration(baseDuration: number): number {
  return baseDuration * responsiveAnimations.mobileDurationMultiplier;
}

/**
 * Get adjusted parallax distance for mobile
 */
export function getMobileParallaxDistance(baseDistance: number): number {
  if (!responsiveAnimations.reduceParallaxOnMobile) return baseDistance;
  return baseDistance * responsiveAnimations.mobileParallaxReduction;
}

/**
 * Get ScrollTrigger position string
 * @param start - Start position as percentage (0-1), where 0.8 means "top 20%"
 * @param end - End position as percentage (0-1), where 0.2 means "bottom 20%"
 */
export function getScrollTriggerPosition(
  start: number = 0.8,
  end: number = 0.2
): { start: string; end: string } {
  return {
    start: `top ${(1 - start) * 100}%`,
    end: `bottom ${end * 100}%`,
  };
}