import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

interface RevealProps {
  /** Element to render (default `div`). */
  as?: ElementType;
  /** Stagger step; each step adds ~110ms. */
  delay?: number;
  variant?: 'up' | 'zoom';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [prop: string]: unknown;
}

/** Fades and rises its content into view the first time it scrolls on screen. */
export function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className, style, children, ...rest }: RevealProps) {
  const [ref, inView] = useInView({ once: true, threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  return (
    <Tag
      ref={ref}
      className={cn('reveal', variant === 'zoom' && 'reveal--zoom', inView && 'in', className)}
      style={{ '--i': delay, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
