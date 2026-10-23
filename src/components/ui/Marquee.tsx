import './Marquee.css';

/** Endless, decorative text ticker. The list is doubled so the loop is seamless. */
export function Marquee({ items }: { items: readonly string[] }) {
  const track = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={i} className="marquee-item">
            <span>{item}</span>
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
