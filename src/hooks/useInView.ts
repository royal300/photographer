import { useEffect, useRef, useState, type RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  /** Stop observing after the first time the element is visible. */
  once?: boolean;
}

export function useInView<T extends Element = HTMLElement>(
  { once = false, threshold = 0.1, rootMargin = '0px' }: Options = {},
): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return [ref, inView];
}
