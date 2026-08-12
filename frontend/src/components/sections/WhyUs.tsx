import { CheckCircle2 } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

export default function WhyUs() {
  const { whyUs } = useContent();
  return (
    <section className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          title={whyUs.title}
          description={whyUs.intro}
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {whyUs.reasons.map((reason, i) => (
            <Reveal key={reason} delay={(i % 4) * 0.06}>
              <Card padding="compact" className="flex items-start gap-3 text-left">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-green" />
                <span className="text-sm sm:text-base text-slate-200">{reason}</span>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
