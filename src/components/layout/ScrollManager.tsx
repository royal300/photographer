import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ANCHOR_OFFSET } from '@/lib/constants';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';

/**
 * Router-aware scrolling: jumps to the top on page changes, and smooth-scrolls
 * to `#hash` targets (waiting for the section to mount after a navigation).
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    if (!hash) {
      scrollTo(0, { immediate: true });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let raf = 0;
    let tries = 0;
    const attempt = () => {
      if (id === 'top') return scrollTo(0);
      const el = document.getElementById(id);
      if (el) return scrollTo(el, { offset: -ANCHOR_OFFSET });
      if (tries++ < 40) raf = requestAnimationFrame(attempt);
    };
    raf = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key, scrollTo]);

  return null;
}
