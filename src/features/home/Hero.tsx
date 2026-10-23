import { useRef, type AnimationEvent } from 'react';
import { HERO_HIGHLIGHTS, HERO_SLIDES } from '@/data/slides';
import { photo, photoSet } from '@/data/images';
import { useAutoplayState, useCarousel, useSwipe } from '@/hooks/useCarousel';
import { usePointerParallax } from '@/hooks/usePointerParallax';
import { cn } from '@/lib/cn';
import { cssVars, highPriority, inertWhen } from '@/lib/dom';
import { ArrowButton, CarouselDots, PlayPauseButton, SlideCounter } from '@/components/ui/CarouselControls';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import './Hero.css';

const HERO_IMAGE_WIDTHS = [760, 1400] as const;

/** Auto-advancing promotional slider (3s per slide, progress bars drive the timing). */
export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const total = HERO_SLIDES.length;
  const { index, goTo, next, prev } = useCarousel(total);
  const { paused, stopped, toggleStopped, handlers } = useAutoplayState(rootRef);
  const swipe = useSwipe(prev, next);
  usePointerParallax(rootRef);

  // The active progress bar finishing its animation is the autoplay tick.
  const onAnimationEnd = (e: AnimationEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).hasAttribute('data-bar')) next();
  };

  return (
    <section className="hero" id="top" aria-label="Featured offers">
      <div className="hero-wrap">
        <Reveal variant="zoom">
          <div
            ref={rootRef}
            className={cn('carousel', paused && 'is-paused', stopped && 'is-stopped')}
            role="region"
            aria-roledescription="carousel"
            aria-label="Photography packages and offers"
            onAnimationEnd={onAnimationEnd}
            {...handlers}
            {...swipe}
          >
            <div className="slides">
              {HERO_SLIDES.map((slide, i) => {
                const active = i === index;
                return (
                  <article
                    key={slide.id}
                    className={cn('slide', active && 'is-active')}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${total}`}
                    aria-hidden={!active}
                    {...inertWhen(!active)}
                  >
                    <div className="bg">
                      <img
                        src={photo(slide.image, 1400)}
                        srcSet={photoSet(slide.image, HERO_IMAGE_WIDTHS)}
                        sizes="(max-width: 760px) 100vw, 1080px"
                        width={1400}
                        height={933}
                        alt={slide.imageAlt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        {...highPriority(i === 0)}
                      />
                    </div>
                    <div className="slide-body">
                      <span className="eyebrow rise" style={cssVars({ '--d': 0 })}>
                        {slide.eyebrow}
                      </span>
                      <h1 className="rise" style={cssVars({ '--d': 1 })}>
                        <RichTitle text={slide.title} />
                      </h1>
                      <p className="rise" style={cssVars({ '--d': 2 })}>
                        {slide.text}
                      </p>
                      <div className="cta-row rise" style={cssVars({ '--d': 3 })}>
                        <Button to={slide.primary.to} arrow>
                          {slide.primary.label}
                        </Button>
                        <Button to={slide.secondary.to} variant="ghost">
                          {slide.secondary.label}
                        </Button>
                      </div>
                    </div>
                    <span className="chip">
                      <i />
                      {slide.chip}
                    </span>
                    <div className="polaroid" aria-hidden="true">
                      <img src={photo(slide.polaroid, 360, 450)} alt="" loading="lazy" />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="ui">
              <div className="ui-progress">
                <CarouselDots count={total} index={index} onSelect={goTo} label="Slide" />
                <SlideCounter index={index} total={total} />
              </div>
              <div className="arrows">
                <PlayPauseButton stopped={stopped} onToggle={toggleStopped} />
                <ArrowButton direction="prev" label="Previous slide" onClick={prev} />
                <ArrowButton direction="next" label="Next slide" onClick={next} />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="strip" delay={1}>
          {HERO_HIGHLIGHTS.map((text) => (
            <span key={text}>
              <Icon name="check" />
              {text}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
