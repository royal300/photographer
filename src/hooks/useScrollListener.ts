import { useEffect, useRef } from 'react';

/**
 * Calls `callback(scrollY, progress)` at most once per animation frame while the
 * page scrolls (progress is 0..1). It never touches React state itself, so
 * callers can write straight to the DOM and avoid re-rendering on every frame —
 * that, plus not writing CSS variables on `<html>`, is what keeps scrolling smooth.
 */
export function useScrollListener(callback: (y: number, progress: number) => void): void {
  const latest = useRef(callback);
  latest.current = callback;

  useEffect(() => {
    let max = 1;
    let frame = 0;

    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    const run = () => {
      frame = 0;
      const y = window.scrollY;
      latest.current(y, Math.min(1, Math.max(0, y / max)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    run();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
    };
  }, []);
}
