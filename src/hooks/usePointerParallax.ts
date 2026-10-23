import { useEffect, type RefObject } from 'react';
import { useMediaQuery } from './useMediaQuery';

type VarNames = readonly [x: string, y: string];
const DEFAULT_VARS: VarNames = ['--mx', '--my'];

/**
 * Writes the pointer position (-1..1) to a pair of CSS variables on the element
 * so children can drift with the mouse. Mouse only, and skipped when the
 * visitor prefers reduced motion.
 */
export function usePointerParallax(ref: RefObject<HTMLElement>, names: VarNames = DEFAULT_VARS): void {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let raf = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty(names[0], x.toFixed(3));
      el.style.setProperty(names[1], y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        set(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2);
      });
    };
    const onLeave = () => set(0, 0);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [ref, reduce, names]);
}
