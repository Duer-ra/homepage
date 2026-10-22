import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
  visual?: React.ReactNode;
}) {
  return (
    <section className="bg-mint-glow overflow-hidden">
      <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-md bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-brand-950 md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-muted">{description}</p>
          {children && <div className="mt-6">{children}</div>}
        </div>
        {visual && <div className="relative flex justify-center md:justify-end">{visual}</div>}
      </Container>
    </section>
  );
}
