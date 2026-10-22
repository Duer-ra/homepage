import { Headphones } from "lucide-react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import FaqList from "@/components/FaqList";
import Button from "@/components/Button";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ & Help"
        title="Frequently asked questions."
        description="Find answers to common questions or get in touch with our team for more help."
      />
      <section className="py-14">
        <Container>
          <FaqList />
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-brand-50 p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-700"><Headphones className="h-5 w-5" /></span>
              <div>
                <p className="font-semibold">Still need help?</p>
                <p className="text-xs text-muted">Our support team is here for you 24/7.</p>
              </div>
            </div>
            <Button href="/contact" size="sm">Contact Support</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
