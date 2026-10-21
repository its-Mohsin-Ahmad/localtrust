"use client";

import { InvolveSymbol } from "@/components/brand/involve-logo";
import { BRAND } from "@/lib/brand";

export type InvolveLoaderProps = {
  /** True while the loader plays its exit fade. */
  exiting?: boolean;
  /** Fired when the user interacts with the overlay to dismiss it. */
  onPointerDown?: () => void;
};

/**
 * Keyframes + reduced-motion overrides for the INVOLVE loader.
 *
 * The keyframes live in an inline <style> element (instead of globals.css)
 * so the whole loader stays self-contained and is already present in the
 * statically exported HTML - the first paint is fully styled, no flash.
 */
const LOADER_CSS = `
@keyframes involve-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes involve-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@keyframes involve-glow-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes involve-emblem-in {
  from { opacity: 0; transform: scale(0.88); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes involve-wordmark-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes involve-tagline-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes involve-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Stage 1 - background glow entrance (400ms) */
.involve-anim-glow { animation: involve-glow-in 400ms ease-in-out 0ms both; }
/* Stage 2 - emblem reveal (640ms) */
.involve-anim-emblem { animation: involve-emblem-in 640ms ease-in-out 160ms both; }
/* Stage 3 - continuous emblem rotation (3.2s, linear, infinite) */
.involve-anim-spin {
  animation: involve-spin 3.2s linear 160ms infinite both;
  transform-origin: 50% 50%;
  will-change: transform;
}
/* Stage 4 - wordmark reveal (500ms) */
.involve-anim-wordmark { animation: involve-wordmark-in 500ms ease-in-out 380ms both; }
/* Stage 5 - tagline reveal (400ms) */
.involve-anim-tagline { animation: involve-tagline-in 400ms ease-in-out 820ms both; }
/* Exit */
.involve-anim-exit { animation: involve-fade-out 320ms ease-in-out both; }

/* The emblem always fills its box, whatever the symbol component does. */
.involve-emblem svg { width: 100%; height: 100%; display: block; }

@media (prefers-reduced-motion: reduce) {
  .involve-anim-glow,
  .involve-anim-emblem,
  .involve-anim-wordmark,
  .involve-anim-tagline {
    animation: involve-fade-in 180ms ease-in-out 0ms both !important;
  }
  .involve-anim-spin { animation: none !important; }
  .involve-anim-exit { animation: involve-fade-out 150ms ease-in-out both !important; }
}
`;

const EMBLEM_SIZE =
  "!h-[120px] !w-[120px] sm:!h-[180px] sm:!w-[180px] lg:!h-[220px] lg:!w-[220px]";

/**
 * Full-screen premium loader for the INVOLVE brand.
 *
 * Composition (vertically centred, no chrome at all):
 *   1. orange INVOLVE emblem - reveals, then rotates continuously
 *   2. INVOLVE wordmark - "IN" white / "V" orange / "OLVE" white
 *   3. tagline - muted
 */
export function InvolveLoader({
  exiting = false,
  onPointerDown,
}: InvolveLoaderProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LOADER_CSS }} />

      <div
        role="status"
        aria-live="polite"
        aria-label={`Loading ${BRAND.name}`}
        onPointerDown={onPointerDown}
        className={[
          "involve-loader fixed inset-0 z-[100] select-none overflow-hidden",
          exiting ? "involve-anim-exit" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="sr-only">{`Loading ${BRAND.name}. Press Escape to skip.`}</span>

        {/* Background: deep navy gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(170deg, ${BRAND.colors.navyDeep} 0%, ${BRAND.colors.navy} 52%, ${BRAND.colors.navyDeep} 100%)`,
          }}
        />

        {/* Central blue glow */}
        <div
          aria-hidden="true"
          className="involve-anim-glow absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(58,130,255,0.26) 0%, rgba(32,96,196,0.12) 38%, rgba(4,19,47,0) 70%)",
          }}
        />

        {/* Vignette toward the edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 50%, rgba(4,19,47,0) 38%, rgba(2,7,20,0.62) 100%)",
          }}
        />

        {/* Composition */}
        <div
          aria-hidden="true"
          className="relative flex h-full w-full flex-col items-center justify-center px-6"
        >
          {/* 1. Emblem - reveals, then spins around its own centre */}
          <div
            className={`involve-anim-emblem involve-emblem flex items-center justify-center ${EMBLEM_SIZE}`}
            style={{ filter: "drop-shadow(0 18px 38px rgba(255,105,0,0.22))" }}
          >
            <div className="involve-anim-spin motion-reduce:!animate-none h-full w-full">
              <InvolveSymbol
                className={EMBLEM_SIZE}
                title={`${BRAND.name} emblem`}
              />
            </div>
          </div>

          {/* 2. Wordmark */}
          <div className="involve-anim-wordmark mt-7 select-none text-center font-sans text-[42px] font-extrabold uppercase leading-none tracking-[0.08em] sm:mt-8 sm:text-[62px] lg:text-[76px]">
            <span style={{ color: "#FFFFFF" }}>IN</span>
            <span style={{ color: BRAND.colors.orange }}>V</span>
            <span style={{ color: "#FFFFFF" }}>OLVE</span>
          </div>

          {/* 3. Tagline */}
          <p
            className="involve-anim-tagline mt-2.5 select-none text-center text-[15px] font-medium tracking-[0.01em] sm:mt-3 sm:text-[21px] lg:text-[24px]"
            style={{ color: BRAND.colors.muted }}
          >
            {BRAND.tagline}
          </p>
        </div>
      </div>
    </>
  );
}

export default InvolveLoader;