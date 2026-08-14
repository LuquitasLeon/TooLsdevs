import { Check, Code2, ShieldHalf, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

const icons = [Code2, ShieldHalf];
const cardAccents = ["teal", "amber"] as const;
const badgeColors = [
  "bg-brand-teal/15 text-brand-teal",
  "bg-accent-amber/15 text-accent-amber",
] as const;

interface ServicesProps {
  /**
   * En la página de servicios, el encabezado ya lo pone `PageHeader`. Repetirlo
   * acá dejaría dos títulos iguales seguidos y dos `h1`/`h2` compitiendo.
   */
  hideHeading?: boolean;
}

export default function Services({ hideHeading = false }: ServicesProps) {
  const { services } = useContent();
  return (
    <section id="servicios" className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col gap-14">
        {!hideHeading && (
          <SectionHeading
            eyebrow={services.eyebrow}
            title={services.title}
            description={services.intro}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {services.groups.map((group, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <Reveal key={group.title} delay={i * 0.1}>
                <Card padding="roomy" accent={cardAccents[i] ?? "teal"}>
                  <div
                    className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${badgeColors[i] ?? badgeColors[0]}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-200/90">
                        <Check size={18} className="mt-0.5 shrink-0 text-brand-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <Card accent="teal" padding="roomy" className="flex items-start gap-4">
            <Sparkles size={22} className="mt-0.5 shrink-0 text-brand-teal" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">{services.callout}</p>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
