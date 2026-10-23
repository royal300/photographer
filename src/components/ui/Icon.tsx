import type { ReactNode, SVGProps } from 'react';

export type IconName =
  | 'arrow'
  | 'left'
  | 'star'
  | 'check'
  | 'pin'
  | 'phone'
  | 'clock'
  | 'whatsapp'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'play'
  | 'pause'
  | 'close';

const STROKE: SVGProps<SVGSVGElement> = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
const FILL: SVGProps<SVGSVGElement> = { fill: 'currentColor' };

const ICONS: Record<IconName, { attrs: SVGProps<SVGSVGElement>; body: ReactNode }> = {
  arrow: { attrs: STROKE, body: <path d="M5 12h14M13 6l6 6-6 6" /> },
  left: { attrs: STROKE, body: <path d="M19 12H5M11 6l-6 6 6 6" /> },
  close: { attrs: STROKE, body: <path d="M6 6l12 12M18 6L6 18" /> },
  check: { attrs: { ...STROKE, strokeWidth: 2.2 }, body: <path d="M4 12.5l5 5L20 6.5" /> },
  star: { attrs: FILL, body: <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" /> },
  pin: {
    attrs: STROKE,
    body: (
      <>
        <path d="M12 21s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  },
  phone: { attrs: STROKE, body: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /> },
  clock: {
    attrs: STROKE,
    body: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  whatsapp: {
    attrs: { ...STROKE, strokeWidth: 1.9 },
    body: (
      <>
        <path d="M3.5 20.5l1.2-4.2A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4-1z" />
        <path d="M9 8.5c0 3 2.5 5.5 5.5 6l1.2-1.4-2-1-.8.8a4 4 0 01-2-2l.8-.8-1-2z" />
      </>
    ),
  },
  instagram: {
    attrs: { ...STROKE, strokeWidth: 1.8 },
    body: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
      </>
    ),
  },
  facebook: { attrs: FILL, body: <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21z" /> },
  youtube: {
    attrs: { ...STROKE, strokeWidth: 1.8 },
    body: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
      </>
    ),
  },
  play: { attrs: FILL, body: <path d="M7 4.5v15l13-7.5z" /> },
  pause: {
    attrs: FILL,
    body: (
      <>
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </>
    ),
  },
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

/** Inline SVG icon; decorative by default (`aria-hidden`). */
export function Icon({ name, ...rest }: IconProps) {
  const { attrs, body } = ICONS[name];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...attrs} {...rest}>
      {body}
    </svg>
  );
}
