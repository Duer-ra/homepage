"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import Container from "./Container";
import { mainNav, resourcesNav } from "@/lib/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors hover:text-brand-600 ${
      pathname === href ? "text-brand-600" : "text-ink"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {mainNav.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setResOpen(true)}
            onMouseLeave={() => setResOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium hover:text-brand-600"
              aria-expanded={resOpen}
              onClick={() => setResOpen((v) => !v)}
            >
              Resources <ChevronDown className="h-4 w-4" />
            </button>
            {resOpen && (
              <div className="absolute left-1/2 top-full w-48 -translate-x-1/2 pt-3">
                <div className="rounded-xl border border-line bg-white p-2 shadow-lg">
                  {resourcesNav.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setResOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-brand-50"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link href="/contact" className="text-sm font-medium hover:text-brand-600">
            Log in
          </Link>
          <Button href="/pricing" size="sm">
            Get Started Free
          </Button>
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {[...mainNav, ...resourcesNav].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-brand-50"
              >
                {l.label}
              </Link>
            ))}
            <Button href="/pricing" className="mt-2">
              Get Started Free
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
