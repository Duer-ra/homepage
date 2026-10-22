"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import Button from "./Button";
import Container from "./Container";

const PRO_MONTHLY = 6.99;
const YEARLY_DISCOUNT = 0.2;

const free = ["Link up to 3 accounts", "Track subscriptions", "Basic insights", "Email support"];
const pro = [
  "Unlimited accounts",
  "Advanced insights",
  "AI-powered forecasting",
  "Priority support",
];

const compare: { feature: string; free: boolean; pro: boolean }[] = [
  { feature: "Account Connections", free: true, pro: true },
  { feature: "Subscription Tracking", free: true, pro: true },
  { feature: "Financial Forecasting", free: false, pro: true },
  { feature: "Smart Alerts", free: true, pro: true },
  { feature: "Gmail Integration", free: false, pro: true },
  { feature: "Priority Support", free: false, pro: true },
];

export default function PricingPlans() {
  const [yearly, setYearly] = useState(false);
  const proPrice = yearly ? PRO_MONTHLY * (1 - YEARLY_DISCOUNT) : PRO_MONTHLY;

  return (
    <Container className="py-12">
      <div className="mx-auto mb-8 flex w-fit rounded-lg bg-brand-50 p-1 text-sm font-medium">
        {(["Monthly", "Yearly"] as const).map((label) => {
          const active = (label === "Yearly") === yearly;
          return (
            <button
              key={label}
              onClick={() => setYearly(label === "Yearly")}
              className={`rounded-md px-5 py-1.5 transition-colors ${
                active ? "bg-brand-800 text-white" : "text-brand-900"
              }`}
            >
              {label}
              {label === "Yearly" && (
                <span className="ml-2 rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">
                  Save 20%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-7">
          <h3 className="text-lg font-bold">Free</h3>
          <p className="text-xs text-muted">Perfect for getting started.</p>
          <p className="mt-5 text-4xl font-bold text-brand-950">
            $0<span className="text-sm font-medium text-muted"> /month</span>
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {free.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-600" /> {f}
              </li>
            ))}
          </ul>
          <Button href="/contact" variant="outline" className="mt-7 w-full">
            Get Started
          </Button>
        </div>

        <div className="relative rounded-2xl border-2 border-brand-500 bg-white p-7 shadow-lg shadow-brand-100">
          <span className="absolute right-5 top-5 rounded bg-brand-800 px-2 py-0.5 text-[10px] font-semibold text-white">
            Most Popular
          </span>
          <h3 className="text-lg font-bold">Pro</h3>
          <p className="text-xs text-muted">For power users and families.</p>
          <p className="mt-5 text-4xl font-bold text-brand-950">
            ${proPrice.toFixed(2)}
            <span className="text-sm font-medium text-muted"> /month</span>
          </p>
          {yearly && (
            <p className="mt-1 text-xs text-muted">Billed ${(proPrice * 12).toFixed(2)} yearly</p>
          )}
          <ul className="mt-6 space-y-3 text-sm">
            {pro.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand-600" /> {f}
              </li>
            ))}
          </ul>
          <Button href="/contact" className="mt-7 w-full">
            Start Free Trial
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <h3 className="mb-4 font-semibold text-brand-950">Compare Plans</h3>
        <div className="overflow-hidden rounded-xl border border-line text-sm">
          <div className="grid grid-cols-[1fr_80px_80px] bg-brand-50 px-4 py-2.5 text-xs font-semibold text-muted">
            <span>Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center">Pro</span>
          </div>
          {compare.map((row) => (
            <div key={row.feature} className="grid grid-cols-[1fr_80px_80px] items-center border-t border-line px-4 py-3">
              <span>{row.feature}</span>
              {[row.free, row.pro].map((v, i) => (
                <span key={i} className="grid place-items-center">
                  {v ? <Check className="h-4 w-4 text-brand-600" /> : <Minus className="h-4 w-4 text-muted/50" />}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
