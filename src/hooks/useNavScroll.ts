import { useRef, useState } from 'react';
import { useScrollListener } from './useScrollListener';

/**
 * `scrolled` once the page leaves the top; `hidden` while scrolling down past the
 * fold; `pastHero` once the hero is behind the visitor. State only changes when a
 * flag flips, so scrolling does not re-render the navbar every frame.
 */
export function useNavScroll(menuOpen: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const last = useRef(0);

  useScrollListener((y) => {
    setScrolled(y > 24);
    setPastHero(y > 450);
    if (y > last.current + 5 && y > 280) setHidden(true);
    else if (y < last.current - 5) setHidden(false);
    last.current = y;
  });

  return { scrolled, hidden: hidden && !menuOpen, pastHero };
}
