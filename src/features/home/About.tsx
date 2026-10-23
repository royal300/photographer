import { ABOUT, ABOUT_STATS } from '@/data/about';
import { photo } from '@/data/images';
import { useCountUp } from '@/hooks/useCountUp';
import { useInView } from '@/hooks/useInView';
import { formatNumber } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import './About.css';

function ExperienceBadge({ years }: { years: number }) {
  return (
    <div className="exp" role="img" aria-label={`${years} plus years of experience`}>
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <defs>
          <path id="about-ring" d="M64 64 m-47 0 a47 47 0 1 1 94 0 a47 47 0 1 1 -94 0" />
        </defs>
        <text>
          <textPath href="#about-ring">Years of experience • Behind the lens •</textPath>
        </text>
      </svg>
      <strong>
        {years}
        <sup>+</sup>
      </strong>
    </div>
  );
}

function StatCounter({ value, label }: { value: number; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, threshold: 0.6 });
  const shown = useCountUp(value, inView);
  return (
    <div className="stat" ref={ref}>
      <b>
        {formatNumber(inView ? shown : 0)}
        <i>+</i>
      </b>
      <span>{label}</span>
    </div>
  );
}

export function About() {
  return (
    <section className="section light" id="about" aria-labelledby="about-heading">
      <div className="wrap about">
        <Reveal variant="zoom" className="portrait">
          <div className="ph">
            <img src={photo('photographer', 800, 1000)} width={800} height={1000} alt={ABOUT.portraitAlt} loading="lazy" />
          </div>
          <ExperienceBadge years={ABOUT.experienceYears} />
        </Reveal>

        <div>
          <Reveal as="span" className="eyebrow">
            {ABOUT.eyebrow}
          </Reveal>
          <Reveal as="h2" className="h2" id="about-heading" delay={1}>
            <RichTitle text={ABOUT.title} />
          </Reveal>
          <Reveal as="p" className="lead" delay={2}>
            {ABOUT.body}
          </Reveal>
          <Reveal className="cta-row" delay={3}>
            <Button to="/#gallery" variant="dark" arrow>
              Know My Story
            </Button>
            <Button to="/#gallery" variant="outline-dark">
              Explore My Work
            </Button>
          </Reveal>
          <Reveal className="stats" delay={4}>
            {ABOUT_STATS.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
