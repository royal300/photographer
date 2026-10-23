import { cn } from '@/lib/cn';
import { pad2 } from '@/lib/format';
import { Icon } from './Icon';
import './CarouselControls.css';

interface DotsProps {
  count: number;
  index: number;
  onSelect: (index: number) => void;
  label: string;
  className?: string;
}

/**
 * Progress dots. The active dot's bar animates over `--interval`; the parent
 * listens for that animation ending (`data-bar`) to advance autoplay.
 */
export function CarouselDots({ count, index, onSelect, label, className }: DotsProps) {
  return (
    <div className={cn('dots', className)} role="group" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className={cn('dot', i === index && 'is-active', i < index && 'is-done')}
          aria-label={`Go to ${label.toLowerCase()} ${i + 1}`}
          aria-current={i === index}
          onClick={() => onSelect(i)}
        >
          <span className="bar" data-bar />
        </button>
      ))}
    </div>
  );
}

export function ArrowButton({ direction, onClick, label }: { direction: 'prev' | 'next'; onClick: () => void; label: string }) {
  return (
    <button type="button" className="arrow" aria-label={label} onClick={onClick}>
      <Icon name={direction === 'prev' ? 'left' : 'arrow'} />
    </button>
  );
}

export function PlayPauseButton({ stopped, onToggle }: { stopped: boolean; onToggle: () => void }) {
  return (
    <button type="button" className="pp" aria-label={stopped ? 'Play slideshow' : 'Pause slideshow'} onClick={onToggle}>
      <Icon name={stopped ? 'play' : 'pause'} />
    </button>
  );
}

export function SlideCounter({ index, total, className }: { index: number; total: number; className?: string }) {
  return (
    <span className={cn('count', className)} aria-hidden="true">
      <b>{pad2(index + 1)}</b> / {pad2(total)}
    </span>
  );
}
