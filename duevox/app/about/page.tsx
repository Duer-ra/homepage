import { Eye, Handshake, Lightbulb, ShieldCheck, Target } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";
import { PhotoPlaceholder } from "@/components/Mockups";

export const metadata: Metadata = { title: "About" };

const values = [
  { icon: ShieldCheck, title: "Trust", description: "We put your security and privacy first." },
  { icon: Lightbulb, title: "Innovation", description: "We build tools that make a real difference." },
  { icon: Handshake, title: "Customer Focus", description: "Your goals are our priority." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built for a smarter, more secure financial future."
        description="At Duevox, we believe everyone deserves financial clarity. Our mission is to make money management simple, accessible, and empowering — for everyone."
        visual={<PhotoPlaceholder label="Office photo" className="h-64 w-full max-w-sm rounded-2xl" />}
      />
      <section className="py-16">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-brand-700"><Target /></span>
            <div>
              <h3 className="font-semibold">Our Mission</h3>
              <p className="mt-1 text-sm text-muted">To help people take control of their finances through innovative technology, simple tools, and trusted security.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-brand-700"><Eye /></span>
            <div>
              <h3 className="font-semibold">Our Vision</h3>
              <p className="mt-1 text-sm text-muted">A world where everyone has the knowledge, tools, and confidence to build a better financial future.</p>
            </div>
          </div>
        </Container>
      </section>
      <section className="pb-16">
        <Container>
          <SectionHeading align="left" title="Our Values" />
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {values.map((v) => <FeatureCard key={v.title} {...v} />)}
          </div>
        </Container>
      </section>
      <section className="pb-20">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <PhotoPlaceholder label="Team photo" className="h-64 rounded-2xl" />
          <div>
            <h2 className="text-2xl font-bold text-brand-950">Why We Exist</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We saw a gap — people were struggling to track subscriptions, manage spending, and
              plan for the future. So we built Duevox: a smarter, simpler way to take control.
            </p>
            <Button href="/contact" className="mt-6">Join Duevox</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
