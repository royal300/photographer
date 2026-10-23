import type { CSSProperties } from 'react';

/** Typed helper for passing CSS custom properties through `style`. */
export const cssVars = (vars: Record<string, string | number>): CSSProperties => vars as CSSProperties;

/**
 * Spread onto an element to take it out of the tab order and accessibility tree
 * while it is visually hidden (e.g. inactive carousel slides).
 */
export const inertWhen = (inactive: boolean): Record<string, string> => (inactive ? { inert: '' } : {});

/**
 * `fetchpriority` hint for the LCP image. React 18 only forwards the lowercase
 * attribute, so it is spread in rather than set as a typed prop.
 */
export const highPriority = (enabled: boolean): Record<string, string> => (enabled ? { fetchpriority: 'high' } : {});
