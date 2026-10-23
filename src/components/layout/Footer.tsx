import { Link } from 'react-router-dom';
import { BookingCta } from '@/features/contact/BookingCta';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '@/data/site';
import { PRIMARY_SERVICE_COUNT, SERVICES } from '@/data/services';
import { hasServicePage, servicePath } from '@/lib/routes';
import { Icon } from '@/components/ui/Icon';
import { Logo } from '@/components/ui/Logo';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <BookingCta />

        <div className="f-cols">
          <div className="f-brand">
            <Logo />
            <p>{SITE.description}</p>
            <div className="social">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="f-col">
            <h3>Quick links</h3>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="f-col">
            <h3>Services</h3>
            <ul>
              {SERVICES.slice(0, PRIMARY_SERVICE_COUNT).map((s) => (
                <li key={s.slug}>
                  <Link to={hasServicePage(s.slug) ? servicePath(s.slug) : '/#categories'}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="f-col contact">
            <h3>Get in touch</h3>
            <ul>
              <li className="ct">
                <Icon name="pin" />
                <span>
                  {SITE.addressLines[0]}
                  <br />
                  {SITE.addressLines[1]}
                </span>
              </li>
              <li className="ct">
                <Icon name="phone" />
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
              </li>
              <li className="ct">
                <Icon name="whatsapp" />
                <a href={`https://wa.me/${SITE.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="ct">
                <Icon name="clock" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="legal">
          <span>
            © {SITE.year} {SITE.name}. All rights reserved.
          </span>
          <nav aria-label="Legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
