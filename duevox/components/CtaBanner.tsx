import Container from "./Container";
import Button from "./Button";

export default function CtaBanner({
  title,
  description,
  primary = { href: "/pricing", label: "Get Started Free" },
  secondary,
  visual,
}: {
  title: string;
  description: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual?: React.ReactNode;
}) {
  return (
    <section className="py-12">
      <Container>
        <div className="bg-dark-card relative overflow-hidden rounded-3xl px-8 py-12 text-white md:px-14">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
            <p className="mt-3 text-sm text-white/75">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={primary.href} variant="light">
                {primary.label}
              </Button>
              {secondary && (
                <Button
                  href={secondary.href}
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                >
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
          {visual && <div className="absolute inset-y-0 right-6 hidden items-center md:flex">{visual}</div>}
        </div>
      </Container>
    </section>
  );
}
