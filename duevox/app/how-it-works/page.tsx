import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Container from "@/components/Container";
import CtaBanner from "@/components/CtaBanner";
import { PhoneMockup } from "@/components/Mockups";

export const metadata: Metadata = { title: "How it works" };

const steps = [
  { title: "Create Your Account", text: "Sign up in seconds with your email or Google account." },
  { title: "Connect Your Accounts", text: "Link your bank accounts, cards, and financial services securely." },
  { title: "Set Your Goals", text: "Choose your goals, budget, and preferences." },
  { title: "Start Getting Insights", text: "Receive personalized insights, alerts, and recommendations." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="Get started in 4 simple steps."
        description="Connect your accounts, link your financial services, and get real-time insights — all in just a few minutes."
        visual={<PhoneMockup className="w-48" />}
      />
      <section className="py-16">
        <Container>
          <ol className="relative mx-auto max-w-xl space-y-10 before:absolute before:left-[15px] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-brand-200">
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex gap-5">
                <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-800 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-brand-950">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBanner
        title="That’s it!"
        description="You’re all set. Start exploring your finances with confidence."
      />
    </>
  );
}
