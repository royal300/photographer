import { Link } from 'react-router-dom';
import { SITE } from '@/data/site';
import './Logo.css';

export function Logo() {
  return (
    <Link className="logo" to="/" aria-label={`${SITE.name} — home`}>
      <svg viewBox="0 0 34 34" aria-hidden="true">
        <circle cx="17" cy="17" r="17" fill="#d91626" />
        <g fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <circle cx="17" cy="17" r="9.5" />
          <path d="M17 7.5l5.2 9M26.5 17l-5.2 9M17 26.5l-5.2-9M7.5 17l5.2-9" />
        </g>
      </svg>
      <span>
        <b>{SITE.shortName.toUpperCase()}</b>
        <small>{SITE.tagline}</small>
      </span>
    </Link>
  );
}
