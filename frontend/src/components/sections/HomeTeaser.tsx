import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { HomeTeaser as HomeTeaserType } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import type { Accent } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface Props {
  teaser: HomeTeaserType;
  accent?: Accent;
}

const blobColors: Record<Accent, string> = {
  none: "bg-white/8",
  teal: "bg-brand-teal/8",
  green: "bg-brand-green/8",
  sky: "bg-accent-sky/8",
  violet: "bg-accent-violet/8",
  amber: "bg-accent-amber/8",
};

const iconColors: Record<Accent, string> = {
  none: "text-slate-300",
  teal: "text-brand-teal",
  green: "text-brand-green",
  sky: "text-accent-sky",
  violet: "text-accent-violet",
  amber: "text-accent-amber",
};

export default function HomeTeaser({ teaser, accent = "teal" }: Props) {
  return (
    <section className="relative overflow-hidden py-section sm:py-section-lg border-t border-white/5">
      <div className={`pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full blur-[110px] ${blobColors[accent]}`} />

      <Container className="relative flex flex-col gap-10">
        <SectionHeading eyebrow={teaser.eyebrow} title={teaser.title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.highlights.map((highlight, i) => (
            <Reveal key={highlight} delay={i * 0.07}>
              <Card padding="compact" accent={accent} className="flex items-start gap-3 text-left h-full">
                <CheckCircle2 size={20} className={`mt-0.5 shrink-0 ${iconColors[accent]}`} />
                <span className="text-sm sm:text-base text-slate-200">{highlight}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Button variant="secondary" to={teaser.cta.href}>
            {teaser.cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
