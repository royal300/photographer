import type { AriaAttributes, MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';
import './Button.css';

export type ButtonVariant = 'red' | 'ghost' | 'dark' | 'outline-dark';

interface ButtonProps extends AriaAttributes {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Trailing arrow icon. */
  arrow?: boolean;
  /** Leading icon. */
  icon?: IconName;
  className?: string;
  children: ReactNode;
  /** Internal route — renders a router `<Link>`. */
  to?: string;
  /** External URL — renders a plain anchor. */
  href?: string;
  external?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
}

export function Button({
  variant = 'red',
  size = 'md',
  arrow,
  icon,
  className,
  children,
  to,
  href,
  external,
  type = 'button',
  disabled,
  onClick,
  ...aria
}: ButtonProps) {
  const classes = cn('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className);
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
      {arrow && <Icon name="arrow" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...aria}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...aria}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} {...aria}>
      {content}
    </button>
  );
}
