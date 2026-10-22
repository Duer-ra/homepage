import type { LucideIcon } from "lucide-react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  boxed = false,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  boxed?: boolean;
}) {
  return (
    <div className={boxed ? "rounded-2xl border border-line bg-white p-6 shadow-sm" : ""}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-700">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-semibold text-brand-950">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
