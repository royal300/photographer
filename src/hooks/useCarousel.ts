import { useCallback, useEffect, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react';

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0);
  const goTo = useCallback((i: number) => setIndex(((i % length) + length) % length), [length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + length) % length), [length]);
  return { index, goTo, next, prev };
}

/**
 * Tracks whether autoplay should be paused (mouse hover, keyboard focus,
 * off-screen, hidden tab) and whether the visitor stopped it explicitly.
 * Pair with the `is-paused` / `is-stopped` classes that the progress bars read.
 */
export function useAutoplayState(rootRef: RefObject<HTMLElement>) {
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [rootRef]);

  const handlers = {
    onPointerEnter: (e: ReactPointerEvent) => e.pointerType === 'mouse' && setHovering(true),
    onPointerLeave: () => setHovering(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return {
    paused: hovering || focused || !visible || tabHidden,
    stopped,
    toggleStopped: () => setStopped((s) => !s),
    handlers,
  };
}

/** Horizontal swipe detection for touch / pen input. */
export function useSwipe(onPrev: () => void, onNext: () => void) {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  return {
    onPointerDown: (e: ReactPointerEvent) => {
      if (e.pointerType !== 'mouse') setStart({ x: e.clientX, y: e.clientY });
    },
    onPointerUp: (e: ReactPointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      setStart(null);
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? onNext : onPrev)();
    },
    onPointerCancel: () => setStart(null),
  };
}
