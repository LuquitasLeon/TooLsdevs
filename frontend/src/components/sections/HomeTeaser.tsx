import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { HomeTeaser as HomeTeaserType } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface Props {
  teaser: HomeTeaserType;
}

export default function HomeTeaser({ teaser }: Props) {
  return (
    <section className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow={teaser.eyebrow} title={teaser.title} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teaser.highlights.map((highlight, i) => (
            <Reveal key={highlight} delay={i * 0.07}>
              <Card padding="compact" className="flex items-start gap-3 text-left h-full">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-teal" />
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
