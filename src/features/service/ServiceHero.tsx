import { Link } from 'react-router-dom';
import { photo } from '@/data/images';
import { highPriority } from '@/lib/dom';
import { SERVICES } from '@/data/services';
import { useEnquiry } from '@/providers/EnquiryProvider';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import type { ServiceDetail } from '@/types';
import './ServiceHero.css';

export function ServiceHero({ detail }: { detail: ServiceDetail }) {
  const { selectService } = useEnquiry();
  const service = SERVICES.find((s) => s.slug === detail.slug);

  return (
    <section className="page-hero" aria-label={`${service?.title ?? detail.eyebrow} photography`}>
      <div className="wrap">
        <Reveal variant="zoom" className="ph-card">
          <img src={photo(detail.heroImage, 1600)} width={1600} height={1067} alt={detail.heroAlt} {...highPriority(true)} />
          <div className="ph-body">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/#categories">Services</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{service?.title ?? detail.eyebrow}</span>
            </nav>
            <span className="eyebrow">{detail.eyebrow}</span>
            <h1>
              <RichTitle text={detail.title} />
            </h1>
            <p>{detail.intro}</p>
            <div className="cta-row">
              <Button to="/#contact" arrow onClick={() => service && selectService(service.title)}>
                Book This Shoot
              </Button>
              <Button to="#videos" variant="ghost">
                Watch Reels
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal className="facts" delay={1}>
          {detail.facts.map((fact) => (
            <div key={fact.label}>
              <b>{fact.value}</b>
              <span>{fact.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
