import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import type { HomeTeaser as HomeTeaserType } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import type { Accent } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Props {
  teaser: HomeTeaserType;
  accent?: Accent;
}

const iconColors: Record<Accent, string> = {
  none: "text-faint",
  teal: "text-brand-teal",
  green: "text-brand-green",
  sky: "text-accent-sky",
  violet: "text-accent-violet",
  amber: "text-accent-amber",
};

export default function HomeTeaser({ teaser, accent = "teal" }: Props) {
  return (
    <section className="py-section sm:py-section-lg border-t border-line/5">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow={teaser.eyebrow} title={teaser.title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.highlights.map((highlight, i) => (
            <Reveal key={highlight} delay={i * 0.07}>
              <Card padding="compact" accent={accent} className="flex items-start gap-3 text-left h-full">
                <CheckCircle2 size={20} className={`mt-0.5 shrink-0 ${iconColors[accent]}`} />
                <span className="text-sm sm:text-base text-muted">{highlight}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Link
            to={teaser.cta.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-fg hover:text-brand-teal-text transition-colors"
          >
            {teaser.cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
