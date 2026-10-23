import { useEffect, useRef, useState } from 'react';
import { RATING_SUMMARY, TESTIMONIALS } from '@/data/testimonials';
import { photo } from '@/data/images';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';
import { ArrowButton } from '@/components/ui/CarouselControls';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import './Testimonials.css';

const ROTATE_MS = 6500;

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={i < rating ? undefined : 'star--off'} />
      ))}
    </div>
  );
}

/** Stacked review cards: the front card is emphasised, the rest peek from behind. */
export function Testimonials() {
  const n = TESTIMONIALS.length;
  const [front, setFront] = useState(0);
  const hovering = useRef(false);
  const [stackRef, visible] = useInView<HTMLDivElement>({ threshold: 0.4 });

  useEffect(() => {
    const id = window.setInterval(() => {
      if (visible && !hovering.current && !document.hidden) setFront((f) => (f + 1) % n);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [visible, n]);

  return (
    <section className="section light" aria-labelledby="testimonials-heading">
      <div className="wrap t-grid">
        <div>
          <Reveal as="span" className="eyebrow">
            Kind words
          </Reveal>
          <Reveal as="h2" className="h2" id="testimonials-heading" delay={1}>
            <RichTitle text={["Loved by the people we've ", { em: 'photographed.' }]} />
          </Reveal>
          <Reveal className="rating" delay={2}>
            <strong>{RATING_SUMMARY.score}</strong>
            <div>
              <Stars rating={5} label={`Rated ${RATING_SUMMARY.score} out of 5`} />
              <small>{RATING_SUMMARY.caption}</small>
            </div>
          </Reveal>
          <Reveal className="t-ctrl" delay={3}>
            <ArrowButton direction="prev" label="Previous review" onClick={() => setFront((f) => (f - 1 + n) % n)} />
            <ArrowButton direction="next" label="Next review" onClick={() => setFront((f) => (f + 1) % n)} />
          </Reveal>
        </div>

        <Reveal className="stack" delay={2}>
          <div
            ref={stackRef}
            className="stack-inner"
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            onPointerEnter={(e) => (hovering.current = e.pointerType === 'mouse')}
            onPointerLeave={() => (hovering.current = false)}
          >
            {TESTIMONIALS.map((t, k) => {
              const pos = (k - front + n) % n;
              return (
                <figure
                  key={t.id}
                  className={cn('t-card')}
                  data-pos={pos}
                  aria-hidden={pos !== 0}
                  onClick={() => pos !== 0 && setFront(k)}
                >
                  <span className="qmark" aria-hidden="true">
                    “
                  </span>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption className="t-meta">
                    <img src={photo(t.avatar, 120, 120)} alt="" width={48} height={48} loading="lazy" />
                    <div>
                      <b>{t.name}</b>
                      <span>{t.event}</span>
                    </div>
                    <Stars rating={t.rating} label={`${t.rating} out of 5`} />
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
