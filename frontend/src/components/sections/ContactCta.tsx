import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";

/** Cierre de las páginas internas: una sola invitación clara a escribir. */
export default function ContactCta() {
  const { ui } = useContent();

  return (
    <section className="relative overflow-hidden py-section border-t border-white/5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance max-w-2xl">
            {ui.contactHeading}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-xl text-base sm:text-lg text-slate-200/90">{ui.contactText}</p>
        </Reveal>
        <Reveal delay={0.16}>
          <Magnetic>
            <Button to={routes.contact}>
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
