import { ArrowRight, CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useContent } from "@/features/i18n/useI18n";

export default function WhyUsSummary() {
  const { whyUs } = useContent();

  return (
    <section className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          title={whyUs.title}
          description={whyUs.intro}
          align="center"
        />

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.reasons.slice(0, 3).map((reason, i) => (
            <Reveal key={reason} delay={i * 0.07}>
              <Card padding="compact" className="flex items-start gap-3 text-left h-full">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-green" />
                <span className="text-sm sm:text-base text-slate-200">{reason}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Button variant="secondary" to={whyUs.homeCta.href}>
            {whyUs.homeCta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
