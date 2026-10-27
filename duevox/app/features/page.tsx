import { Bell, Clock, Link2, Lock, Mail, PiggyBank, Repeat, Sprout, TrendingUp } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import { FloatingCard, PhoneMockup } from "@/components/Mockups";

export const metadata: Metadata = { title: "Features" };

const features = [
  { icon: Repeat, title: "Subscription Tracking", description: "Find and manage all your recurring payments in one clean dashboard." },
  { icon: TrendingUp, title: "Financial Forecasting", description: "Plan for the future with smart predictions and insights." },
  { icon: Bell, title: "Smart Alerts", description: "Get notified about unusual spending and upcoming payments." },
  { icon: Mail, title: "Gmail Integration", description: "Track email receipts and confirmations automatically." },
  { icon: Link2, title: "Account Connections", description: "Link your bank accounts, cards, and financial services." },
  { icon: Lock, title: "Advanced Security", description: "All data is encrypted and protected with bank-grade security." },
];

const more = [
  { icon: Clock, title: "Save time", description: "Automate the stuff you shouldn’t have to do." },
  { icon: PiggyBank, title: "Reduce costs", description: "Find and cancel unused subscriptions." },
  { icon: Sprout, title: "Build better habits", description: "Make smarter decisions with real-time insights." },
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
          <SectionHeading align="left" title="Everything you need, in one place" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Ready to take control of your finances?"
        description="Connect your accounts and experience the full power of Duevox."
      />
      <section className="py-16">
        <Container>
          <SectionHeading align="left" title="More than just tracking" />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {more.map((f) => <FeatureCard key={f.title} {...f} />)}
          </div>
        </Container>
      </section>
    </>
  );
}
