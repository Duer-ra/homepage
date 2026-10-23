export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-950 md:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-muted">{description}</p>}
    </div>
  );
}