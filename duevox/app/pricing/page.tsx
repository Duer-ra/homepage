import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingPlans from "@/components/PricingPlans";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing."
        description="Choose the plan that fits your needs. All plans come with bank-grade security and full access to your data."
      />
      <PricingPlans />
    </>
  );
}
