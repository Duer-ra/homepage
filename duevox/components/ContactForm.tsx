"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-500";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: POST `data` to your API route / email provider (Resend, Formspree, etc.)
    console.log("contact form", data);
    await new Promise((r) => setTimeout(r, 600));
    setStatus("sent");
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-xs font-medium">Name</label>
        <input id="name" name="name" required placeholder="Your name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-medium">Email</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-xs font-medium">Subject</label>
        <select id="subject" name="subject" className={inputClass} defaultValue="">
          <option value="" disabled>Select a subject</option>
          <option>General support</option>
          <option>Billing</option>
          <option>Partnerships</option>
          <option>Feedback</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-xs font-medium">Message</label>
        <textarea id="message" name="message" required rows={5} placeholder="How can we help you?" className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-brand-800 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-900 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "sent" && (
        <p role="status" className="text-center text-sm text-brand-700">
          Thanks! We’ll get back to you within 24 hours.
        </p>
      )}
    </form>
  );
}
