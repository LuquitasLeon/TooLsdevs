import { AlertCircle, Lightbulb } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { problems } from "../data/content";

export default function Problems() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow="Desafíos" title={problems.title} description={problems.intro} />

        <div className="grid gap-3 sm:grid-cols-2">
          {problems.items.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                <AlertCircle size={18} className="mt-0.5 shrink-0 text-brand-teal" />
                <span className="text-sm sm:text-base text-slate-300/90">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="flex items-start gap-4 rounded-2xl border border-brand-green/20 bg-gradient-to-br from-brand-green/10 to-brand-teal/5 p-6 sm:p-8">
            <Lightbulb size={22} className="mt-0.5 shrink-0 text-brand-green" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
              {problems.callout}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
