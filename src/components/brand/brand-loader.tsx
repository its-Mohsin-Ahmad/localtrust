"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { InvolveLoader } from "@/components/brand/involve-loader";

/**
 * Fired by any part of the app to tell the loader that the UI is ready.
 *
 * Usage (client component):
 *   signalAppReady();
 */
export const APP_READY_EVENT = "involve:app-ready";

/** Shortest time the loader stays on screen, so it never flashes. */
const MIN_VISIBLE_MS = 700;
/** Hard safety net: the loader always dismisses, even if init never settles. */
const SAFETY_TIMEOUT_MS = 7000;
/** If webfonts hang, we stop waiting for them. */
const FONT_TIMEOUT_MS = 2500;
/**
 * Total length of the staged entrance animation (glow + emblem + wordmark +
 * tagline). The exit never starts before it is over, otherwise the reveal
 * would be cut in half.
 */
const REVEAL_MS = 1250;
/** Duration of the exit fade (must match `.involve-anim-exit`). */
const EXIT_MS = 320;

type Phase = "loading" | "exiting" | "hidden";

/**
 * Signals the app loader that the application finished initialising.
 * Safe to call from anywhere in the client.
 */
export function signalAppReady(detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(APP_READY_EVENT, { detail }));
}

/**
 * Timestamp (ms, same origin as `performance.now()`) at which the loader
 * became visible. Uses the navigation response time so the minimum
 * duration is measured against the real first paint, not hydration.
 */
function getVisibleSince(): number {
  if (typeof performance === "undefined") return 0;
  const entry = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming | undefined;
  if (entry && typeof entry.responseEnd === "number" && entry.responseEnd > 0) {
    return entry.responseEnd;
  }
  return performance.now();
}

/**
 * Startup loader controller.
 *
 * The loader is shown once, on app startup. It hides as soon as the real
 * initialisation signals are in (static assets loaded, webfonts ready,
 * optional explicit `signalAppReady()` call), but never before
 * `MIN_VISIBLE_MS` so it cannot flash. A hard `SAFETY_TIMEOUT_MS` timeout
 * guarantees it can never stay on screen forever, and the user can always
 * dismiss it with the Escape key or by clicking the overlay.
 */
export function BrandLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [ready, setReady] = useState<{ done: boolean; immediate: boolean }>({
    done: false,
    immediate: false,
  });
  const phaseRef = useRef<Phase>("loading");
  const visibleSinceRef = useRef<number>(0);

  useEffect(() => {
    visibleSinceRef.current = getVisibleSince();
  }, []);

  // ---- Real initialisation signals -------------------------------------
  useEffect(() => {
    let windowReady = document.readyState === "complete";
    let fontsReady = false;
    let settled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const settle = () => {
      if (settled) return;
      settled = true;
      setReady((prev) => (prev.done ? prev : { done: true, immediate: false }));
    };

    const check = () => {
      if (windowReady && fontsReady) settle();
    };

    // (1) Every static asset of the route has been fetched.
    const onLoad = () => {
      windowReady = true;
      check();
    };
    if (!windowReady) window.addEventListener("load", onLoad);

    // (2) Webfonts are ready (the wordmark needs them to look right).
    const fonts = document.fonts;
    if (fonts && fonts.ready) {
      fonts.ready.then(
        () => {
          fontsReady = true;
          check();
        },
        () => {
          fontsReady = true;
          check();
        }
      );
    } else {
      fontsReady = true;
    }
    timers.push(
      setTimeout(() => {
        fontsReady = true;
        check();
      }, FONT_TIMEOUT_MS)
    );

    // (3) Explicit signal from the app (e.g. first meaningful data loaded).
    const onAppReady = () => settle();
    window.addEventListener(APP_READY_EVENT, onAppReady);

    // (4) Safety net - never stay on screen forever.
    timers.push(setTimeout(settle, SAFETY_TIMEOUT_MS));

    // (5) Restored from the back/forward cache: nothing left to wait for.
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) settle();
    };
    window.addEventListener("pageshow", onPageShow);

    // (6) The user can always skip the loader.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (phaseRef.current !== "loading") return;
      setReady({ done: true, immediate: true });
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener(APP_READY_EVENT, onAppReady);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("keydown", onKeyDown);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // ---- Exit sequence ----------------------------------------------------
  useEffect(() => {
    if (!ready.done) return;
    if (phaseRef.current !== "loading") return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const elapsed = performance.now() - visibleSinceRef.current;
    const wait = ready.immediate
      ? 0
      : Math.max(0, MIN_VISIBLE_MS - elapsed, REVEAL_MS - elapsed);

    timers.push(
      setTimeout(() => {
        phaseRef.current = "exiting";
        setPhase("exiting");
        timers.push(
          setTimeout(() => {
            phaseRef.current = "hidden";
            setPhase("hidden");
          }, EXIT_MS)
        );
      }, wait)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [ready]);

  const handlePointerDown = useCallback(() => {
    if (phaseRef.current !== "loading") return;
    const elapsed = performance.now() - visibleSinceRef.current;
    if (elapsed < MIN_VISIBLE_MS) return;
    setReady({ done: true, immediate: true });
  }, []);

  if (phase === "hidden") return null;

  return (
    <InvolveLoader
      exiting={phase === "exiting"}
      onPointerDown={handlePointerDown}
    />
  );
}

export default BrandLoader;