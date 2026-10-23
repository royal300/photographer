import { SERVICES } from '@/data/services';
import { useEnquiry } from '@/providers/EnquiryProvider';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { RichTitle } from '@/components/ui/RichTitle';
import type { ServiceDetail } from '@/types';
import './Coverage.css';

/** One "what we cover" section: a single list of inclusions and one enquiry button. */
export function Coverage({ coverage, serviceSlug }: { coverage: ServiceDetail['coverage']; serviceSlug: string }) {
  const { selectService } = useEnquiry();
  const service = SERVICES.find((s) => s.slug === serviceSlug);

  return (
    <section className="section light" id="coverage" aria-labelledby="coverage-heading">
      <div className="wrap split">
        <div>
          <Reveal as="span" className="eyebrow">
            {coverage.eyebrow}
          </Reveal>
          <Reveal as="h2" className="h2" id="coverage-heading" delay={1}>
            <RichTitle text={coverage.title} />
          </Reveal>
          <Reveal as="p" className="lead" delay={2}>
            {coverage.body}
          </Reveal>
          <Reveal className="cta-row" delay={3}>
            <Button to="/#contact" variant="dark" arrow onClick={() => service && selectService(service.title)}>
              Enquire now
            </Button>
            <Button to="#gallery" variant="outline-dark">
              See the Gallery
            </Button>
          </Reveal>
        </div>

        <ul className="incl">
          {coverage.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i % 2}>
              <div className="incl-card">
                <Icon name="check" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
