import { useRef } from 'react';
import { useScrollListener } from '@/hooks/useScrollListener';
import './ScrollProgressBar.css';

/** Thin red reading-progress bar pinned to the top of the viewport. */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLSpanElement>(null);

  useScrollListener((_y, progress) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    if (sparkRef.current) sparkRef.current.style.transform = `translate3d(${(progress * window.innerWidth).toFixed(1)}px,-50%,0)`;
  });

  return (
    <div className="scroll-progress-container" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
      <span ref={sparkRef} className="scroll-progress-spark" />
    </div>
  );
}
