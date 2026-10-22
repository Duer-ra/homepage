import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
  size?: "sm" | "md";
  arrow?: boolean;
  className?: string;
};

const variants = {
  primary: "bg-brand-800 text-white hover:bg-brand-900",
  outline: "border border-brand-800/30 text-brand-900 hover:bg-brand-50",
  light: "bg-white text-brand-900 hover:bg-brand-50",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${
        size === "sm" ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm"
      } ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}
