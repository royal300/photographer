import { useRef, useState } from 'react';
import { useScrollListener } from '@/hooks/useScrollListener';
import { useSmoothScroll } from '@/providers/SmoothScrollProvider';
import { cn } from '@/lib/cn';
import './ScrollIndicator.css';

/** Back-to-top button with a progress ring. Only the ring/percent are written per frame (via refs). */
export function ScrollIndicator() {
  const { scrollTo } = useSmoothScroll();
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useScrollListener((y, progress) => {
    setVisible(y > 280);
    buttonRef.current?.style.setProperty('--ring-progress', progress.toFixed(3));
    if (percentRef.current) percentRef.current.textContent = `${Math.round(progress * 100)}%`;
  });

  return (
    <div className={cn('scroll-indicator-wrap', visible && 'is-visible')}>
      <button ref={buttonRef} type="button" className="scroll-indicator-btn" aria-label="Back to top" onClick={() => scrollTo(0, { duration: 1.4 })}>
        <span className="scroll-tooltip">Back to top</span>
        <svg className="scroll-ring" viewBox="0 0 50 50" aria-hidden="true">
          <defs>
            <linearGradient id="scroll-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d91626" />
              <stop offset="60%" stopColor="#ff4655" />
              <stop offset="100%" stopColor="#ffd166" />
            </linearGradient>
          </defs>
          <circle className="scroll-ring-bg" cx="25" cy="25" r="22" strokeWidth="2.5" fill="none" />
          <circle className="scroll-ring-fill" cx="25" cy="25" r="22" strokeWidth="2.5" fill="none" />
        </svg>
        <div className="scroll-btn-inner">
          <span ref={percentRef} className="scroll-pct">
            0%
          </span>
          <svg className="scroll-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-6 6l6-6 6 6" />
          </svg>
        </div>
      </button>
    </div>
  );
}
