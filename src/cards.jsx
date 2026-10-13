const CARD_DATA = {
  renewals: {
    eyebrow: "Runway",
    title: "Upcoming renewals",
    className: "card-runway",
    rows: [
      ["Streaming · Oct 14", "₦4,400"],
      ["Cloud hosting · Oct 16", "$24.00"],
      ["AI assistant · Oct 19", "$20.00"],
      ["Music · Oct 22", "₦2,900"],
    ],
    note: "Five renewals this month, in date order.",
  },
  balance: {
    eyebrow: "Forecast · verified 2 days ago",
    title: "Your balance runway",
    className: "card-forecast",
    rows: [
      ["Available now", "₦85,000"],
      ["Upcoming charges", "₦25,000"],
      ["Projected shortfall", "Nov 02"],
    ],
    note: "The coral mark is where the balance may fall below zero.",
  },
  sources: {
    eyebrow: "Accounts",
    title: "Money from different places",
    className: "card-accounts",
    rows: [
      ["Nigerian bank · synced", "₦85,000"],
      ["Dollar card · manual", "$42.00"],
      ["Cloud account · manual", "$18.50"],
    ],
    note: "Add a balance by hand or connect a supported provider.",
  },
  discover: {
    eyebrow: "Possible subscription",
    title: "Cloud hosting",
    className: "card-discover",
    rows: [
      ["Jul 16", "$24.00"],
      ["Aug 16", "$24.00"],
      ["Sep 16", "$24.00"],
    ],
    note: "Three monthly charges from the same merchant. Confirm or reject it.",
  },
  decide: {
    eyebrow: "Savings",
    title: "Worth a second look",
    className: "card-savings",
    rows: [
      ["Expected", "$30.00 a month"],
      ["Realised so far", "$15.00"],
      ["Next step", "Review the merchant"],
    ],
    note: "Keep, cancel or change the account that pays it.",
  },
};

function CardIcon({ type }) {
  return <span className={`card-icon card-icon-${type}`} aria-hidden="true" />;
}

function MiniChart() {
  return (
    <svg className="mini-chart" viewBox="0 0 240 72" aria-hidden="true">
      <line x1="0" y1="50" x2="240" y2="50" />
      <polyline points="0,14 42,18 82,23 122,32 166,50" />
      <polyline className="chart-risk" points="166,50 202,59 240,65" />
      <circle cx="166" cy="50" r="5" />
      <text x="4" y="45">₦0</text>
      <text x="180" y="68">Nov 02</text>
    </svg>
  );
}

export function StoryCard({ type }) {
  const card = CARD_DATA[type] || CARD_DATA.renewals;

  return (
    <article className={`story-card ${card.className}`} aria-label={`${card.eyebrow}: ${card.title}`}>
      <div className="story-card-inner">
        <header className="story-card-header">
          <CardIcon type={type} />
          <span>Duevox</span>
          <time>now</time>
        </header>
        <p className="story-card-eyebrow">{card.eyebrow}</p>
        <h3>{card.title}</h3>

        {type === "balance" ? <MiniChart /> : null}

        <div className="story-card-rows">
          {card.rows.map(([label, value]) => (
            <div key={`${label}-${value}`}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        {type === "discover" ? (
          <div className="story-card-actions" aria-hidden="true">
            <span>Confirm</span>
            <span>Reject</span>
          </div>
        ) : null}

        <p className="story-card-note">{card.note}</p>
      </div>
    </article>
  );
}

