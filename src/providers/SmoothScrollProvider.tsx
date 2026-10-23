import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export interface ScrollOptions {
  /** Pixel offset applied to the target (negative scrolls above it). */
  offset?: number;
  immediate?: boolean;
  duration?: number;
}

export interface SmoothScroll {
  scrollTo: (target: number | HTMLElement, options?: ScrollOptions) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScroll | null>(null);

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Wheel / trackpad smoothing via Lenis.
 *
 * Lenis runs in `lerp` mode: every frame the page glides a fixed fraction of the
 * remaining distance toward the target, which stays fluid even when wheel ticks
 * arrive back-to-back. (Passing `duration` / `easing` would switch it to a
 * restart-on-every-tick tween that feels jerky, so those are only used for
 * programmatic jumps such as anchor links.) Touch screens keep native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const api = useMemo<SmoothScroll>(
    () => ({
      scrollTo(target, { offset = 0, immediate = false, duration = 1.3 } = {}) {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, { offset, immediate, duration, easing: easeOutQuart });
          return;
        }
        const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + offset, behavior: immediate ? 'auto' : 'smooth' });
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScroll {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error('useSmoothScroll must be used inside <SmoothScrollProvider>');
  return ctx;
}
