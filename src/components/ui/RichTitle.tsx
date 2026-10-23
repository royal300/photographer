import { Fragment } from 'react';
import type { RichText } from '@/types';

/** Renders heading copy, turning `{ em }` segments into italic accents. */
export function RichTitle({ text }: { text: RichText }) {
  return (
    <>
      {text.map((part, i) =>
        typeof part === 'string' ? <Fragment key={i}>{part}</Fragment> : <em key={i}>{part.em}</em>,
      )}
    </>
  );
}
