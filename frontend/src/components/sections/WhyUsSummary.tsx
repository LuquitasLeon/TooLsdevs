import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Divider from "@/components/ui/Divider";
import { useContent } from "@/features/i18n/useI18n";

export default function WhyUsSummary() {
  const { whyUs } = useContent();

  return (
    <section className="relative py-section sm:py-section-lg">
      <Divider />
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
              <Card padding="compact" accent="green" className="flex items-start gap-3 text-left h-full">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-green-text" />
                <span className="text-sm sm:text-base text-muted">{reason}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <Link
            to={whyUs.homeCta.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-fg hover:text-brand-teal-text transition-colors"
          >
            {whyUs.homeCta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
