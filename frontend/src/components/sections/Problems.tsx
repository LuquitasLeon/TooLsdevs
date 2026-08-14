import { AlertCircle, Lightbulb } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

export default function Problems() {
  const { problems } = useContent();
  return (
    <section className="relative overflow-hidden py-section sm:py-section-lg border-t border-white/5">
      <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 rounded-full bg-brand-green/15 blur-[110px]" />

      <Container className="relative flex flex-col gap-12">
        <SectionHeading eyebrow={problems.eyebrow} title={problems.title} description={problems.intro} />

        <div className="grid gap-3 sm:grid-cols-2">
          {problems.items.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 0.06}>
              <Card padding="compact" className="flex items-start gap-3">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                <span className="text-sm sm:text-base text-slate-200/90">{item}</span>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Card accent="green" padding="roomy" className="flex items-start gap-4">
            <Lightbulb size={22} className="mt-0.5 shrink-0 text-brand-green" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
              {problems.callout}
            </p>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
