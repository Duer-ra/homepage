import { Bell, Check, Link2, Mail, PiggyBank, Repeat, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import Button from "@/components/Button";
import CtaBanner from "@/components/CtaBanner";
import { FloatingCard, PhoneMockup } from "@/components/Mockups";

export const metadata: Metadata = { title: "Features" };

const features = [
  {
    icon: Repeat,
    title: "Subscription management",
    tagline: "Every subscription. One organised view.",
    description: "Know what you pay for, how often you pay, and when your next renewal is due.",
    bullets: [
      "View recurring payments in one place.",
      "Track billing amounts, currencies, and renewal dates.",
      "Organise subscriptions by category and status.",
      "Review payment sources and subscription history.",
      "Identify services you may no longer need.",
    ],
    cta: { href: "/how-it-works", label: "Explore Subscription Management" },
  },
  {
    icon: TrendingUp,
    title: "Financial forecasting",
    tagline: "Prepare for payments before they happen.",
    description:
      "Upcoming charges can affect more than your monthly budget. Duevox helps you understand expected financial commitments and how they could affect your projected balance.",
    bullets: [
      "Review upcoming recurring payments.",
      "See estimated future expenses.",
      "Understand potential balance shortfalls.",
      "Plan around important payment dates.",
      "Make informed decisions before renewal time.",
    ],
    note: "Forecasts are estimates based on available information and may change when actual charges or balances differ.",
  },
  {
    icon: Bell,
    title: "Smart alerts and reminders",
    tagline: "The right reminder, before the right moment.",
    description: "Stay informed about the events that matter to your financial plans.",
    bullets: [
      "Upcoming subscription renewals.",
      "Trials approaching their end date.",
      "Detected subscription price changes.",
      "Relevant cancellation confirmations.",
      "Potential balance concerns.",
    ],
    note: "Choose the reminders that suit your needs and reduce the chance of overlooking an important payment.",
  },
  {
    icon: Mail,
    title: "Email-powered subscription discovery",
    tagline: "Turn relevant emails into useful financial information.",
    description:
      "Connect Gmail to help Duevox identify subscription-related messages without turning your financial dashboard into another inbox.",
    bullets: [
      "Discover potential subscriptions from receipts.",
      "Identify renewal and trial-ending notices.",
      "Detect relevant price-change information.",
      "Find cancellation confirmations.",
      "Review uncertain matches before adding them.",
    ],
    note: "You decide which detected subscriptions to confirm, match to an existing record, or ignore.",
  },
  {
    icon: Link2,
    title: "Connected accounts and payment sources",
    tagline: "Bring your financial picture together.",
    description:
      "Organise supported bank accounts, payment services, and cards alongside your recurring expenses.",
    bullets: [
      "Review connected accounts and their connection status.",
      "Associate subscriptions with payment sources.",
      "Understand which account may be charged.",
      "Manage supported connections from one place.",
    ],
    note: "Available integrations and data depend on the providers you connect.",
  },
  {
    icon: PiggyBank,
    title: "Insights and spending visibility",
    tagline: "Understand the patterns behind your spending.",
    description:
      "Move beyond individual transactions and understand your recurring financial commitments.",
    bullets: [
      "Review recurring spending trends.",
      "Compare subscription costs over time.",
      "Understand changes in your spending.",
      "Identify potentially unused subscriptions.",
      "Explore opportunities to reduce recurring expenses.",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Powerful tools for smarter financial decisions"
        description="More than tracking. A clearer picture of what comes next. 
                    Duevox brings subscription management, payment forecasting, alerts, and financial insights 
                    together to help you stay ahead of recurring expenses."
        visual={
          <div className="relative">
            <PhoneMockup />
            <FloatingCard title="Total Balance" value="$12,480.32" className="absolute -left-16 top-6" />
          </div>
        }
      />
      <section className="py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-brand-950">{f.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-700">{f.tagline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                <ul className="mt-4 space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                {f.note && <p className="mt-4 text-xs leading-relaxed text-muted">{f.note}</p>}
                {f.cta && (
                  <div className="mt-auto pt-6">
                    <Button href={f.cta.href} variant="outline" size="sm">
                      {f.cta.label}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Built around your decisions"
        description="Duevox helps you understand your options. You remain responsible for deciding whether to keep, change, pause, or cancel a subscription."
        primary={{ href: "/pricing", label: "Discover a Clearer Way to Manage Money" }}
      />
    </>
  );
}
