"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { faqGroups } from "@/lib/faq";

export default function FaqList() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>("Is Duevox free to use?");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqGroups;
    return faqGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length);
  }, [query]);

  return (
    <div>
      <div className="relative mx-auto max-w-2xl">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a question..."
          className="w-full rounded-lg border border-line bg-white py-3 pl-4 pr-14 text-sm outline-none focus:border-brand-500"
        />
        <span className="absolute right-1.5 top-1.5 grid h-9 w-10 place-items-center rounded-md bg-brand-800 text-white">
          <Search className="h-4 w-4" />
        </span>
      </div>

      <div className="mx-auto mt-8 max-w-3xl space-y-8">
        {groups.length === 0 && (
          <p className="text-center text-sm text-muted">No questions match “{query}”.</p>
        )}
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="mb-2 font-semibold text-brand-950">{g.title}</h3>
            <div className="divide-y divide-line rounded-xl border border-line bg-white">
              {g.items.map((item) => {
                const isOpen = open === item.q;
                return (
                  <div key={item.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium"
                    >
                      {item.q}
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isOpen && <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{item.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
