import { SITE } from '@/data/site';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from './EnquiryForm';
import './BookingCta.css';

/** Red booking banner at the top of the footer: contact details + enquiry form. */
export function BookingCta() {
  return (
    <Reveal className="book">
      <div className="book-info">
        <h2>
          Ready to freeze your <em>moment?</em>
        </h2>
        <p>Share a few details and we'll carry on the conversation on WhatsApp.</p>
        <ul className="book-meta">
          <li>
            <Icon name="pin" />
            <span>
              {SITE.addressLines[0]}
              <br />
              {SITE.addressLines[1]}
            </span>
          </li>
          <li>
            <Icon name="phone" />
            <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
          </li>
        </ul>
      </div>
      <EnquiryForm />
    </Reveal>
  );
}
