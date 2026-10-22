import Link from "next/link";
import Logo from "./Logo";
import Container from "./Container";
import { footerColumns } from "@/lib/nav";

const social = [
  { label: "X", d: "M4 4l16 16M20 4L4 20" },
  { label: "Instagram", d: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 5a4 4 0 100 8 4 4 0 000-8z" },
  { label: "LinkedIn", d: "M6 9v10M6 5v.01M11 19v-6a3 3 0 016 0v6M11 9v10" },
  { label: "YouTube", d: "M3 8a3 3 0 013-3h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3zm7 1.5v5l4.5-2.5z" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.3fr_repeat(3,1fr)_auto]">
        <div>
          <Logo />
          <p className="mt-3 max-w-[200px] text-xs text-muted">
            Smarter money. A brighter future.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-3 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex gap-3 md:justify-end">
          {social.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="grid h-8 w-8 place-items-center rounded-full border border-line text-brand-800 hover:bg-brand-50"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.d} />
              </svg>
            </a>
          ))}
        </div>
      </Container>
      <div className="border-t border-line py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Duevox. All rights reserved.
      </div>
    </footer>
  );
}
