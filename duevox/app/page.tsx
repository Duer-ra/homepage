import { Bell, Wallet, Link2, Lock, Repeat, ShieldCheck, Play, LayoutGrid, Zap, Star } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import { LaptopMockup, PhoneMockup } from "@/components/Mockups";

const why = [
  { icon: Link2, title: "Connect Your Accounts", description: "Link your bank accounts, cards, and financial services in seconds." },
  { icon: Repeat, title: "Track Subscriptions", description: "See all your recurring payments, and never miss a renewal." },
  { icon: Bell, title: "Get Smart Alerts", description: "Be notified about upcoming payments and savings opportunities." },
  { icon: Wallet, title: "Manage Your Money", description: "Understand your spending, set budgets, and reach your goals." },
  { icon: ShieldCheck, title: "Secure & Private", description: "Your data is encrypted and protected with industry-leading security." },
  { icon: LayoutGrid, title: "All in One Place", description: "Banking, subscriptions, spending and more — no more switching between apps." },
];

const stats = [
  { value: "500K+", label: "Active Users" },
  { value: "4.8/5", label: "App Store Rating" },
  { value: "$2.3M+", label: "Saved by Users" },
  { value: "99.9%", label: "Uptime" },
];

const testimonials = [
  { name: "Sarah L.", text: "Duevox has completely changed the way I manage my money. I finally feel in control of my subscriptions and spending." },
  { name: "Michael T.", text: "The insights and alerts are incredibly helpful. I’ve saved hundreds just by cancelling unused subscriptions." },
  { name: "Priya M.", text: "Simple, clean, and easy to use. I love how everything I need lives in one app." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-mint-glow overflow-hidden">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-block rounded-md bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
              Your Financial Life, Simplified
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-brand-950 md:text-6xl">
              Track. Manage. Grow.
              <br />
              <span className="text-brand-500">All in One Place.</span>
            </h1>
            <p className="mt-5 max-w-md text-muted">
              Duevox connects your accounts, subscriptions, and financial services so you can
              take control of your finances today and tomorrow.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/pricing" arrow>Get Started Free</Button>
              <Button href="/how-it-works" variant="outline">
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
              <li className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-600" /> Secure &amp; Encrypted</li>
              <li className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-brand-600" /> Connect in Minutes</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-600" /> Cancel Anytime</li>
            </ul>
          </div>
          <div className="relative flex items-end justify-center pb-6">
            <LaptopMockup />
            <PhoneMockup className="absolute -bottom-2 right-0 w-36 md:w-40" />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Why Duevox"
            title="Smarter finance for a brighter future."
            description="We help you save time, reduce costs, and build better financial habits — with powerful tools, real-time insights, and bank-level security."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </Container>
      </section>

      <section className="pb-6">
        <Container>
          <div className="bg-dark-card rounded-3xl px-8 py-10 text-white md:px-14">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-300">Trusted by millions</p>
            <h2 className="mt-1 text-2xl font-bold">Real people. Real results.</h2>
            <dl className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="text-3xl font-bold">{s.value}</dd>
                  <dt className="mt-1 text-xs text-white/70">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="What our users say" title="Trusted by people like you." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-line bg-white p-6 shadow-sm">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-muted">“{t.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-200 text-sm font-bold text-brand-800">
                    {t.name[0]}
                  </span>
                  <span className="text-sm font-semibold">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Your financial journey starts here."
        description="Join thousands today and get the tools you need to manage, save, and grow your money — all in one place."
        secondary={{ href: "/how-it-works", label: "Watch Demo" }}
        visual={<PhoneMockup className="translate-y-8 scale-90" />}
      />
    </>
  );
}
