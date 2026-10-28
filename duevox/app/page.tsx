import { Bell, Wallet, Link2, Repeat, ShieldCheck, LayoutGrid } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import Reveal from "@/components/Reveal";
import { LaptopMockup, PhoneMockup } from "@/components/Mockups";

const why = [
  { icon: Repeat, title: "Track your subscriptions", description: "Keep recurring payments organised in one place. See subscription costs, billing frequency, renewal dates, payment sources, and status without searching through multiple services." },
  { icon: LayoutGrid, title: "Know what is coming", description: "See upcoming payments and renewal dates before they arrive. Use financial forecasts to understand how expected charges could affect your available balance." },
  { icon: Bell, title: "Get alerts that matter", description: "Receive reminders about upcoming renewals, expiring trials, detected price changes, and other important subscription events." },
  { icon: Wallet, title: "Find opportunities to save", description: "Identify subscriptions you may no longer need, review recurring costs, and discover opportunities to reduce unnecessary spending." },
  { icon: Link2, title: "Connect your financial information", description: "Bring supported accounts and payment sources into one organised view. Connect your email to help identify receipts, renewals, trial notices, and subscription changes." },
  { icon: ShieldCheck, title: "Stay in control", description: "Review information, adjust reminders, and decide what actions to take. You remain in control of your financial decisions." },
];

const steps = [
  { value: "Connect", label: "Connect supported financial accounts or add your subscriptions manually." },
  { value: "Discover", label: "Bring recurring payments and relevant subscription evidence together." },
  { value: "Understand", label: "Review your spending, upcoming renewals, and potential balance changes." },
  { value: "Prepare", label: "Set reminders, review recommendations, and make decisions before charges arrive." },
];

// TODO: replace with your real web app and mobile app links
const WEB_APP_URL = "#";
const MOBILE_APP_URL = "#";

export default function HomePage() {
  return (
    <>
      <section className="bg-mint-glow overflow-hidden">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <h1 className="animate-fade-up mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-brand-950 md:text-6xl">
              Know what leaves.
              <br />
              <span className="text-brand-500">Stay in control.</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-md text-muted" style={{ animationDelay: "250ms" }}>
              Take control of your subscriptions, upcoming payments, and financial commitments — all
              from one clear view.
            </p>
            <p className="animate-fade-up mt-3 max-w-md text-muted" style={{ animationDelay: "350ms" }}>
              Duevox helps you track recurring expenses, anticipate upcoming charges, connect
              financial accounts, and make more informed decisions about your money.
            </p>
            <div className="animate-fade-up animate-fade-down mt-7 flex flex-wrap gap-3" style={{ animationDelay: "450ms" }}>
              <Button href="/pricing" arrow>Get Started Free</Button>
              <Button href="/how-it-works" variant="outline">
                Explore How It Works
              </Button>
            </div>
            <p className="animate-fade-up animate-fade-down  mt-7 max-w-md text-xs text-muted" style={{ animationDelay: "450ms" }}>
              Available on web and mobile. Choose the experience that works best for you.
            </p>
          </div>
          <div className="animate-fade-up animate-fade-down  relative flex items-end justify-center pb-6" style={{ animationDelay: "250ms" }}>
            <div className="animate-float">
              <LaptopMockup />
            </div>
            <PhoneMockup className="animate-float-slow absolute -bottom-2 right-0 w-38 md:w-42" />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="More visibility. Better decisions."
              title="Your financial life, all in one place"
              description="Your money moves in different directions every day. Subscriptions renew, bills arrive, trials expire, and unexpected charges can disrupt your plans. Duevox brings these financial commitments together so you can see what is coming, understand what you are paying for, and prepare with confidence."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((f, i) => (
              <Reveal key={f.title} delay={(i % 9) * 100}>
                <div className="transition-transform duration-300 hover:-translate-y-1">
                  <FeatureCard {...f} />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-6">
        <Container>
          <Reveal>
            <div className="bg-dark-card rounded-3xl px-8 py-10 text-white md:px-14">
              <p className="text-xs font-semibold uppercase tracking-wider ">See it. Understand it. Prepare for it.</p>
              <h2 className="mt-1 text-2xl text-brand-300 font-bold">From financial uncertainty to clarity</h2>
              <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                {steps.map((s, i) => (
                  <Reveal key={s.value} delay={200 + i * 120}>
                    <dd className="text-3xl font-bold">{s.value}</dd>
                    <dt className="mt-1 text-xs text-white/70">{s.label}</dt>
                  </Reveal>
                ))}
              </dl>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <SectionHeading
              title="One account. Your preferred device."
              description="Start on the web for a broader view of your finances, or continue on mobile for convenient access wherever you are."
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href={WEB_APP_URL}>Continue on Web</Button>
              <Button href={MOBILE_APP_URL} variant="outline">Continue on Mobile</Button>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-xs text-muted">
              Your financial overview stays connected to your account, so you can continue your
              journey across supported devices.
            </p>
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <CtaBanner
          title="Your money deserves a clearer picture"
          description="Stop relying on memory to manage recurring expenses. Give yourself a better way to understand what is coming and plan what happens next. No complicated spreadsheets. No unnecessary guesswork. Just a clearer view of your financial commitments."
          primary={{ href: "/pricing", label: "Start Managing Your Money" }}
        />
      </Reveal>

      <Reveal>
        <CtaBanner
          title="Take the next step"
          description="Your financial commitments are easier to manage when you can see them clearly. Know what leaves. Stay in control."
          primary={{ href: "/pricing", label: "Get Started Free" }}
          visual={<PhoneMockup className="translate-y-25 scale-90" />}
        />
      </Reveal>
    </>
  );
}
