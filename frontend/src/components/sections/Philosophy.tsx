import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import LogoMark from "@/components/brand/LogoMark";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";

export default function Philosophy() {
  const { philosophy, ui } = useContent();
  return (
    <section className="relative py-section sm:py-section-lg overflow-hidden border-t border-line/5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <LogoMark className="h-16 w-16 sm:h-20 sm:w-20" animate={false} />
        </Reveal>

        <Reveal delay={0.1} className="max-w-2xl flex flex-col gap-4">
          {philosophy.paragraphs.map((p) => (
            <p key={p} className="text-base sm:text-lg leading-relaxed text-muted/90">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-display text-3xl sm:text-5xl font-bold text-fg max-w-3xl text-balance leading-tight">
            “<span className="text-gradient">{philosophy.quote}</span>”
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Magnetic>
            <Button to={routes.contact} className="mt-2">
              {ui.contactCta}
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Button>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  );
}
