import { Building2, Headphones, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "Contact" };

const info = [
  { icon: Headphones, title: "General Support", lines: ["support@duevox.com", "We typically respond within 24 hours."] },
  { icon: Mail, title: "Business Inquiries", lines: ["partnerships@duevox.com", "Let’s build something great together."] },
  { icon: Phone, title: "Phone", lines: ["+1 (555) 123-4567", "Mon – Fri, 9am – 6pm (EST)"] },
  { icon: Building2, title: "Office", lines: ["123 Innovation Drive", "San Francisco, CA 94107"] },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We’d love to hear from you."
        description="Have a question, feedback, or business inquiry? Our team is here to help."
      />
      <section className="py-14">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold">Get in Touch</h2>
            <ul className="mt-6 space-y-6">
              {info.map((i) => (
                <li key={i.title} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                    <i.icon className="h-5 w-5" />
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold">{i.title}</p>
                    <p className="text-brand-700">{i.lines[0]}</p>
                    <p className="text-xs text-muted">{i.lines[1]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
        <Container className="mt-12">
          <div className="grid overflow-hidden rounded-2xl border border-line md:grid-cols-[1.6fr_1fr]">
            <div className="grid min-h-48 place-items-center bg-brand-50 text-sm text-muted">
              <MapPin className="h-6 w-6 text-brand-600" />
              {/* Replace with a Google Maps / Mapbox embed */}
            </div>
            <div className="p-6">
              <h3 className="font-semibold">Our Office</h3>
              <p className="mt-1 text-sm text-muted">Visit Our Office — 123 Innovation Drive, San Francisco, GFC 1030</p>
              <Button href="https://maps.google.com" size="sm" className="mt-4">Get Directions</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
