import { useRef } from 'react';
import { FEATURED_SPREADS } from '@/data/featured';
import { photo } from '@/data/images';
import { useAutoplayState, useCarousel, useSwipe } from '@/hooks/useCarousel';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { cn } from '@/lib/cn';
import { cssVars, inertWhen } from '@/lib/dom';
import { ArrowButton, CarouselDots, SlideCounter } from '@/components/ui/CarouselControls';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import './FeaturedGallery.css';

const PARALLAX_VARS = ['--px', '--py'] as const;
const FRAME_WIDTHS: Record<string, [number, number]> = { main: [800, 1000], print: [500, 500], plain: [700, 470] };

/** Editorial carousel of overlapping, slightly rotated frames. */
export function FeaturedGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const total = FEATURED_SPREADS.length;
  const { index, goTo, next, prev } = useCarousel(total);
  const { paused, handlers } = useAutoplayState(rootRef);
  const swipe = useSwipe(prev, next);
  usePointerParallax(rootRef, PARALLAX_VARS);

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-heading">
      <div
        ref={rootRef}
        className={cn('wrap g-grid', paused && 'is-paused')}
        style={cssVars({ '--interval': '6.5s' })}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured photographs"
        onAnimationEnd={(e) => (e.target as HTMLElement).hasAttribute('data-bar') && next()}
        {...handlers}
        {...swipe}
      >
        <div className="g-copy">
          <Reveal as="span" className="eyebrow">
            Featured work
          </Reveal>
          <Reveal as="h2" className="h2" id="gallery-heading" delay={1}>
            <RichTitle text={['Frames that stay ', { em: 'forever.' }]} />
          </Reveal>
          <Reveal as="p" delay={2}>
            A handful of favourites from recent weddings, couple shoots and celebrations — chosen for the light, the laughter and
            the little things you'd otherwise forget.
          </Reveal>
          <Reveal delay={3}>
            <CarouselDots className="g-prog" count={total} index={index} onSelect={goTo} label="Spread" />
          </Reveal>
          <Reveal className="g-ctrl" delay={4}>
            <div className="arrows">
              <ArrowButton direction="prev" label="Previous photographs" onClick={prev} />
              <ArrowButton direction="next" label="Next photographs" onClick={next} />
            </div>
            <SlideCounter index={index} total={total} />
          </Reveal>
          <Reveal className="cta-row" delay={5}>
            <Button to="/services/wedding#gallery" arrow>
              Explore Full Portfolio
            </Button>
          </Reveal>
        </div>

        <Reveal variant="zoom" className="stage" delay={2}>
          <div className="ring" aria-hidden="true" />
          {FEATURED_SPREADS.map((spread, s) => {
            const active = s === index;
            return (
              <div
                key={spread.id}
                className={cn('spread', `s${spread.id.toUpperCase()}`, active && 'is-active')}
                role="group"
                aria-roledescription="slide"
                aria-label={`${s + 1} of ${total}`}
                aria-hidden={!active}
                {...inertWhen(!active)}
              >
                {spread.frames.map((frame, f) => {
                  const [w, h] = FRAME_WIDTHS[frame.main ? 'main' : frame.print ? 'print' : 'plain'];
                  return (
                    <figure key={frame.photo} className={cn('frame', frame.main && 'main', frame.print && 'print', `f${f + 1}`)}>
                      <img src={photo(frame.photo, w, h)} alt={frame.alt} loading="lazy" />
                      <figcaption>{frame.caption}</figcaption>
                    </figure>
                  );
                })}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
