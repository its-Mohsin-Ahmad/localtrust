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

/** Absolute floor on the loader's visible time, so it can never flash. */
const MIN_VISIBLE_MS = 700;
/**
 * Total time the loader stays on screen, measured from the moment the loader
 * appears: the staged entrance (glow + emblem + wordmark + tagline) plus the
 * dwell carried by the emblem's continuous rotation. The exit never starts
 * before it is over, otherwise the reveal would be cut in half.
 */
const REVEAL_MS = 3200;
/**
 * The pointer can only dismiss the loader once the emblem reveal is over
 * (160ms delay + 640ms), so the opening is never chopped in half.
 */
const CLICK_DISMISS_FLOOR_MS = 1200;
/** Hard safety net: the loader always dismisses, even if init never settles. */
const SAFETY_TIMEOUT_MS = 5000;
/** If webfonts hang, we stop waiting for them. */
const FONT_TIMEOUT_MS = 2500;
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
 * became visible on screen.
 *
 * The loader is part of the statically exported HTML, so it is in the DOM
 * before React hydrates - but the browser only paints it once the page's
 * render-blocking assets are in. The staged entrance starts on that very
 * first frame, so the earliest animation start time inside the loader is
 * exactly when the user first sees it. Returns 0 while the loader has not
 * been painted yet.
 */
function getLoaderShownAt(): number {
  const root = document.querySelector<HTMLElement>(".involve-loader");
  if (!root) return 0;
  let earliest = 0;
  root.querySelectorAll<HTMLElement>("*").forEach((el) => {
    el.getAnimations().forEach((animation) => {
      const start = animation.startTime;
      if (typeof start === "number" && start > 0 && (earliest === 0 || start < earliest)) {
        earliest = start;
      }
    });
  });
  return earliest;
}

/**
 * The moment the loader became visible on screen.
 *
 * `mountedAt` is the value captured when the component mounted; the
 * loader's own entrance animation is preferred because it starts on the
 * first painted frame, which is the real "the loader is on screen" moment.
 * A value of 0 means "not known yet" and is treated as "just now".
 */
function resolveVisibleSince(mountedAt: number): number {
  const shownAt = getLoaderShownAt();
  if (shownAt > 0) return shownAt;
  return mountedAt;
}

/**
 * Startup loader controller.
 *
 * The loader is shown once, on app startup, and stays on screen for about
 * 3.5 seconds in total: the staged entrance is never cut short and the
 * remaining time is spent on the emblem's continuous rotation. It hides as
 * soon as the real initialisation signals are in (static assets loaded,
 * webfonts ready, optional explicit `signalAppReady()` call), but never
 * before `REVEAL_MS` has elapsed since the loader appeared. A hard
 * `SAFETY_TIMEOUT_MS` timeout guarantees it can never stay on screen
 * forever, and the user can always dismiss it with the Escape key or by
 * clicking the overlay.
 */
export function BrandLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [ready, setReady] = useState<{ done: boolean; immediate: boolean }>({
    done: false,
    immediate: false,
  });
  const phaseRef = useRef<Phase>("loading");
  const visibleSinceRef = useRef<number>(0);

  // The loader is part of the statically exported HTML, so it is already in
  // the DOM before React hydrates. The visible duration is therefore measured
  // from the moment the loader is actually painted - not from the navigation
  // timing, which is much earlier and would silently deduct the loading
  // time from the time the user actually sees the loader.
  useEffect(() => {
    visibleSinceRef.current = getLoaderShownAt() || performance.now();
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
    // Defensive: if the mount effect has not run yet, treat the loader as
    // having appeared right now.
    const startedAt = resolveVisibleSince(visibleSinceRef.current);
    const elapsed = startedAt > 0 ? performance.now() - startedAt : 0;
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
    const startedAt = resolveVisibleSince(visibleSinceRef.current);
    const elapsed = startedAt > 0 ? performance.now() - startedAt : 0;
    if (elapsed < CLICK_DISMISS_FLOOR_MS) return;
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