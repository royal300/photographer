export const pad2 = (n: number): string => String(n).padStart(2, '0');

/** Today's date as `YYYY-MM-DD` in the visitor's local time zone. */
export function todayISO(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

/** `2026-12-05` -> `5 December 2026`. */
export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const formatNumber = (n: number): string => new Intl.NumberFormat('en-IN').format(n);
