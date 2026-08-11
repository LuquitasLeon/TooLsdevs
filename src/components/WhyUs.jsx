import { CheckCircle2 } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { whyUs } from "../data/content";

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32 border-t border-white/5">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Nos eligen porque..."
          title={whyUs.title}
          description={whyUs.intro}
          align="center"
        />

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
          {whyUs.reasons.map((reason, i) => (
            <Reveal key={reason} delay={(i % 4) * 0.06}>
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-brand-green" />
                <span className="text-sm sm:text-base text-slate-200">{reason}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
