import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRIMARY_SERVICE_COUNT, SERVICES } from '@/data/services';
import { photo } from '@/data/images';
import { hasServicePage, serviceHref } from '@/lib/routes';
import { pad2 } from '@/lib/format';
import { useEnquiry } from '@/providers/EnquiryProvider';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import type { Service } from '@/types';
import './Categories.css';

function CategoryCard({ service, index, delay }: { service: Service; index: number; delay: number }) {
  const { selectService } = useEnquiry();
  const large = index === 0;
  return (
    <Reveal as="li" delay={delay}>
      <Link
        className="cat"
        to={serviceHref(service)}
        onClick={() => !hasServicePage(service.slug) && selectService(service.title)}
      >
        <img src={photo(service.image, large ? 1000 : 700, large ? 1000 : 700)} alt="" loading="lazy" />
        <span className="corner tl" />
        <span className="corner br" />
        <span className="cat-num">{pad2(index + 1)}</span>
        <span className="cat-info">
          <h3>
            {service.title}
            <small>{service.blurb}</small>
          </h3>
          <span className="cat-go">
            <Icon name="arrow" />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function Categories() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? SERVICES : SERVICES.slice(0, PRIMARY_SERVICE_COUNT);

  return (
    <section className="section cats" id="categories" aria-labelledby="cats-heading">
      <div className="wrap">
        <SectionHead
          eyebrow="Services"
          headingId="cats-heading"
          title={['Find your kind of ', { em: 'story.' }]}
          description="Whatever you're celebrating, there's a way to frame it. Pick a category to see packages, sample galleries and pricing."
          action={
            <Button
              variant="ghost"
              arrow
              aria-expanded={expanded}
              aria-controls="category-grid"
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? 'Show Less' : 'View All Categories'}
            </Button>
          }
        />
        <ul className="cat-grid" id="category-grid">
          {visible.map((service, i) => (
            <CategoryCard key={service.slug} service={service} index={i} delay={i < PRIMARY_SERVICE_COUNT ? i : i - PRIMARY_SERVICE_COUNT} />
          ))}
        </ul>
      </div>
    </section>
  );
}
