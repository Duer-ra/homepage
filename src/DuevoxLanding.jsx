import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { setupScene } from "./scene.js";
import { StoryCard } from "./cards.jsx";
import "./duevox.css";

const DEFAULT_WAITLIST_ENDPOINT = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${import.meta.env.VITE_SUPABASE_WAITLIST_TABLE || "waitlist"}`
  : "";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STORY_SECTIONS = [
  {
    key: "renewals",
    step: "Step 1 · Add or import",
    title: "See every renewal before it lands.",
    paragraphs: [
      "Add a subscription by hand or import a supported statement. Runway puts the next charge, amount, currency and account in date order.",
      "That gives you one place to check before a trial ends or a yearly plan renews.",
    ],
    z: 20,
    risk: 0,
    dawn: 0,
  },
  {
    key: "balance",
    step: "Step 2 · Match and check balance",
    title: "Check each charge against your balance.",
    paragraphs: [
      "Duevox subtracts upcoming payments from the balance you provide and shows where the runway could fall short.",
      "Every balance has a timestamp, so an old or missing number is not presented as safe.",
    ],
    z: 58,
    risk: 0.95,
    dawn: 0,
  },
  {
    key: "sources",
    step: "Step 2 · Match and check balance",
    title: "Bring in money from different places.",
    paragraphs: [
      "Track a Nigerian bank account, a USD virtual card or another balance side by side. Add amounts manually, upload a statement or connect a supported provider through Mono.",
      "Duevox shows what is known, what is estimated and what still needs your review.",
    ],
    z: 96,
    risk: 0,
    dawn: 0.12,
  },
  {
    key: "discover",
    step: "Step 3 · Get warned before shortfall",
    title: "Find forgotten charges before they surprise you.",
    paragraphs: [
      "Repeating transaction patterns become possible subscriptions. You confirm or reject each match, with the evidence kept nearby.",
      "Reminders arrive before a payment or trial end, while uncertain matches wait for your review.",
    ],
    z: 134,
    risk: 0,
    dawn: 0.22,
  },
  {
    key: "decide",
    step: "Step 3 · Get warned before shortfall",
    title: "Decide what is worth keeping.",
    paragraphs: [
      "Review commitments by category and currency, then spot the services that deserve a second look.",
      "Duevox points you to the merchant or app store when you choose to cancel. It never cancels anything for you.",
    ],
    z: 170,
    risk: 0,
    dawn: 0.7,
  },
];

const AUDIENCES = [
  {
    icon: "₦",
    title: "Professionals and remote workers",
    copy: "Track local bills and international software when work payments come from more than one account or card.",
  },
  {
    icon: "✦",
    title: "Freelancers and creators",
    copy: "See tools, platforms and storage before they renew, so irregular income does not meet a surprise charge.",
  },
  {
    icon: "↗",
    title: "Small teams and businesses",
    copy: "Keep recurring services visible as the team grows, without relying on old receipts or one person’s memory.",
  },
];

const PLANS = [
  {
    name: "Free",
    label: "Start with a clear view",
    copy: "The basics for tracking commitments across your money life.",
    features: ["Manual tracking", "Statement upload", "Calendar and Runway", "Reminders"],
  },
  {
    name: "Pro",
    label: "Planned",
    copy: "More automation for the payments you check every month.",
    features: ["Gmail detection", "One bank connection", "Recurring detection", "FX tracking"],
    featured: true,
  },
  {
    name: "Premium",
    label: "Planned",
    copy: "A wider forecast for people managing several accounts.",
    features: ["Multiple accounts", "Faster sync", "Cross-account forecast"],
  },
];

export default function DuevoxLanding({
  ctaHref = "#waitlist",
  waitlistEndpoint = DEFAULT_WAITLIST_ENDPOINT,
}) {
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState("idle");
  const [waitlistMessage, setWaitlistMessage] = useState("");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const titleWords = Array.from(root.querySelectorAll(".hero-title .hero-word"));
    if (reduceMotion) {
      gsap.set(titleWords, { clearProps: "all" });
    } else {
      gsap.from(titleWords, {
        yPercent: 70,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.03,
        delay: 0.2,
      });
    }

    const cleanupScene = setupScene({
      host: root.querySelector("#gl"),
      pauseButton: root.querySelector("#pause"),
      storySections: root.querySelectorAll("[data-scene-story]"),
    });

    return () => {
      cleanupScene?.();
      gsap.killTweensOf(titleWords);
    };
  }, []);

  async function handleWaitlistSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (honeypot) {
      setWaitlistStatus("success");
      setWaitlistMessage("We will email you when Duevox is ready for early access.");
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setWaitlistStatus("error");
      setWaitlistMessage("Enter a valid email address so we know where to send your invite.");
      return;
    }

    if (!waitlistEndpoint) {
      setWaitlistStatus("error");
      setWaitlistMessage("The waitlist is not connected yet. Please try again later.");
      return;
    }

    setWaitlistStatus("submitting");
    setWaitlistMessage("");

    try {
      const headers = { "Content-Type": "application/json", Prefer: "return=minimal" };
      const isDefaultSupabaseEndpoint = waitlistEndpoint === DEFAULT_WAITLIST_ENDPOINT;
      if (isDefaultSupabaseEndpoint && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        headers.apikey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        headers.Authorization = `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`;
      }

      const response = await fetch(waitlistEndpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ email: normalizedEmail, source: "duevox-landing" }),
      });

      if (response.ok || response.status === 409) {
        setWaitlistStatus("success");
        setWaitlistMessage("We will email you when Duevox is ready for early access.");
        return;
      }

      setWaitlistStatus("error");
      setWaitlistMessage("We could not save your email. Check it and try again.");
    } catch {
      setWaitlistStatus("error");
      setWaitlistMessage("We could not reach the waitlist. Check your connection and try again.");
    }
  }

  return (
    <div ref={rootRef} className="dv" id="top">
      <div id="gl" aria-hidden="true" />

      <nav className="site-nav" aria-label="Main navigation">
        <a className="mark" href="#top" aria-label="Duevox home">
          <img className="brand-symbol" src="/favicon.svg" alt="" />
          <span>Duevox</span>
        </a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#waitlist">Waitlist</a>
        </div>
        <div className="nav-actions">
          <button id="pause" type="button" aria-pressed="false">
            <span className="pause-label">Pause motion</span>
            <span className="resume-label">Resume motion</span>
          </button>
          <a className="btn btn-small" href={ctaHref}>Join the waitlist</a>
        </div>
      </nav>

      <main>
        <section className="section hero-section" aria-labelledby="hero-title">
          <h1 id="hero-title" className="hero-title">
            {"Know what's coming before your money goes.".split(" ").map((word, index, words) => (
              <span className="hero-word" key={`${word}-${index}`}>
                {word}{index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-sub">See upcoming payments before they leave your account.</p>
          <a className="btn" href={ctaHref}>Join the waitlist</a>
          <Stores />
        </section>

        <section className="section problem-section" aria-labelledby="problem-title">
          <div className="problem-copy">
            <span className="eyebrow">The problem</span>
            <h2 id="problem-title">Scattered payments make simple decisions feel uncertain.</h2>
            <p>Streaming, AI tools, cloud hosting, virtual dollar cards, bank accounts and free trials all bill on their own schedule. Duevox brings the dates, amounts, currencies and balances together before a charge catches you off guard.</p>
          </div>
        </section>

        <section id="how-it-works" className="section flow-section" aria-labelledby="flow-title">
          <div className="flow-intro">
            <span className="eyebrow">How it works</span>
            <h2 id="flow-title">A short path from scattered charges to a useful next step.</h2>
            <div className="step-list">
              <div><span>01</span><strong>Add or import</strong><p>Start manually, upload a statement or connect a supported bank through Mono.</p></div>
              <div><span>02</span><strong>Match and check balance</strong><p>Review recurring charges and compare what is due with the balances you provide.</p></div>
              <div><span>03</span><strong>Get warned before shortfall</strong><p>See the date a balance may run out, with time to decide what to change.</p></div>
            </div>
          </div>
        </section>

        {STORY_SECTIONS.map((story) => (
          <section
            key={story.key}
            className={`section story-section story-${story.key}`}
            data-scene-story
            data-camera-z={story.z}
            data-risk={story.risk}
            data-dawn={story.dawn}
            aria-labelledby={`story-${story.key}-title`}
          >
            <div className="story-layout">
              <div className="panel story-panel">
                <span className="eyebrow">{story.step}</span>
                <h2 id={`story-${story.key}-title`}>{story.title}</h2>
                {story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <StoryCard type={story.key} />
            </div>
          </section>
        ))}

        <section id="who-its-for" className="section audience-section" aria-labelledby="audience-title">
          <div className="content-width">
            <div className="section-heading">
              <span className="eyebrow">Who it is for</span>
              <h2 id="audience-title">For people paying across accounts and currencies.</h2>
            </div>
            <div className="audience-grid">
              {AUDIENCES.map((audience) => (
                <article className="audience-card" key={audience.title}>
                  <span className="audience-icon" aria-hidden="true">{audience.icon}</span>
                  <h3>{audience.title}</h3>
                  <p>{audience.copy}</p>
                </article>
              ))}
            </div>
            <div className="nigeria-note">
              <div>
                <span className="eyebrow">Why this matters in Nigeria</span>
                <h3>Subscriptions do not arrive in one currency or from one place.</h3>
              </div>
              <p>Local services may bill a Nigerian bank account while work tools, streaming platforms and virtual dollar cards charge in USD. Duevox keeps the amount and date visible, including when the exchange rate or balance is estimated.</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="section pricing-section static-zone" aria-labelledby="pricing-title">
          <div className="content-width">
            <div className="section-heading pricing-heading">
              <span className="eyebrow">Pricing</span>
              <h2 id="pricing-title">Start free. Add automation when you need it.</h2>
            </div>
            <div className="tier-grid">
              {PLANS.map((plan) => (
                <article className={`tier ${plan.featured ? "featured" : ""}`} key={plan.name}>
                  <div className="tier-topline">
                    <span className="tier-label">{plan.name}</span>
                    <span className="tier-status">{plan.label}</span>
                  </div>
                  <h3>{plan.name === "Free" ? "Know what is next" : plan.name === "Pro" ? "Stay ahead automatically" : "Forecast across accounts"}</h3>
                  <p>{plan.copy}</p>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <p className="pricing-footnote"><strong>Duevox never moves your money.</strong> Provider partnerships may support data connections or consent-based referrals. Your timeline is not a paid placement.</p>
          </div>
        </section>

        <section id="waitlist" className="section waitlist-section static-zone" aria-labelledby="waitlist-title">
          <div className="waitlist-card">
            <h2 id="waitlist-title">Get notified when Duevox is ready.</h2>
            <p>Join the list for launch updates. No payment details required.</p>

            {waitlistStatus === "success" ? (
              <div className="success-message" role="status">
                <strong>You are on the list.</strong>
                <span>{waitlistMessage || "We will email you when Duevox is ready for early access."}</span>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleWaitlistSubmit} noValidate>
                <label htmlFor="waitlist-email">Email address</label>
                <div className="form-row">
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (waitlistStatus !== "idle") setWaitlistStatus("idle");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={waitlistStatus === "error"}
                    aria-describedby={waitlistStatus === "error" ? "waitlist-message" : undefined}
                    required
                  />
                  <button className="btn" type="submit" disabled={waitlistStatus === "submitting"}>
                    {waitlistStatus === "submitting" ? "Joining…" : "Join the waitlist"}
                  </button>
                </div>
                <label className="honeypot" htmlFor="company-name">Company name, leave empty
                  <input id="company-name" name="company" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} tabIndex={-1} autoComplete="off" />
                </label>
                <small>We will only email you about the Duevox beta.</small>
                {waitlistStatus === "error" ? <p id="waitlist-message" className="form-message error-message" role="alert">{waitlistMessage}</p> : null}
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer static-zone">
        <div className="footer-inner">
          <div className="footer-brand">
            <a className="mark" href="#top" aria-label="Duevox home">
              <img className="brand-symbol" src="/favicon.svg" alt="" />
              <span>Duevox</span>
            </a>
            <p>Plan recurring payments with more confidence.</p>
          </div>
          <div className="footer-column">
            <strong>Product</strong>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="footer-column">
            <strong>Get started</strong>
            <a href="#waitlist">Join the waitlist</a>
            <a href="#top">Back to top</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Duevox</span>
          <span>Balances and forecasts are informational.</span>
        </div>
      </footer>
    </div>
  );
}

function Stores() {
  return (
    <div className="stores" aria-label="App availability">
      <span className="store" role="img" aria-label="Coming soon to the App Store">
        <span className="store-icon" aria-hidden="true"></span>
        <span><small>Coming soon to the</small><b>App Store</b></span>
      </span>
      <span className="store" role="img" aria-label="Coming soon to Google Play">
        <span className="store-icon play-icon" aria-hidden="true">▶</span>
        <span><small>Coming soon to</small><b>Google Play</b></span>
      </span>
    </div>
  );
}
