import type { ReactNode } from 'react';
import type { RichText } from '@/types';
import { Reveal } from './Reveal';
import { RichTitle } from './RichTitle';

interface SectionHeadProps {
  eyebrow: string;
  title: RichText;
  headingId: string;
  description?: string;
  /** Optional action rendered on the right (e.g. a button). */
  action?: ReactNode;
}

export function SectionHead({ eyebrow, title, headingId, description, action }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2" id={headingId}>
          <RichTitle text={title} />
        </h2>
        {description && <p>{description}</p>}
      </Reveal>
      {action && <Reveal delay={1}>{action}</Reveal>}
    </div>
  );
}
