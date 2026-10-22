import { Eye, KeyRound, Lock, ToggleRight } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import CtaBanner from "@/components/CtaBanner";
import Button from "@/components/Button";
import { ShieldVisual } from "@/components/Mockups";

export const metadata: Metadata = { title: "Security & Privacy" };

const items = [
  { icon: Eye, title: "Read-Only Access", description: "We use read-only connections to access your data, so we can’t move or spend your money." },
  { icon: Lock, title: "Bank-Grade Encryption", description: "Your data is encrypted in transit and at rest using industry-standard protocols." },
  { icon: KeyRound, title: "OAuth Integration", description: "We use secure OAuth 2.0 to connect your accounts — no passwords needed." },
  { icon: ToggleRight, title: "You’re in Control", description: "You can disconnect your accounts at any time and manage your data preferences." },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security & Privacy"
        title="Your data. Our priority."
        description="We use industry-leading security practices to ensure your information is always protected, private, and under your control."
        visual={<ShieldVisual />}
      />
      <section className="py-16">
        <Container>
          <SectionHeading align="left" title="How We Keep Your Data Safe" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="grid gap-8 sm:grid-cols-2">
              {items.map((i) => <FeatureCard key={i.title} {...i} />)}
            </div>
            <aside className="h-fit rounded-2xl border border-line bg-brand-50 p-6">
              <h3 className="font-semibold">Your privacy matters.</h3>
              <p className="mt-2 text-sm text-muted">
                We do not sell your information, and we do not share your personal data with third
                parties without your permission.
              </p>
              <Button href="/faq" variant="outline" size="sm" className="mt-5">Learn More</Button>
            </aside>
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Security isn’t a feature — it’s our foundation."
        description="Built with privacy, transparency, and your trust in mind."
        secondary={{ href: "/how-it-works", label: "Watch Demo" }}
      />
    </>
  );
}
