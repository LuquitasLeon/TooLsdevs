import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { process } from "../data/content";

export default function Process() {
  return (
    <section id="proceso" className="py-24 sm:py-32 border-t border-white/5">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Metodología" title={process.title} description={process.intro} />

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-green via-brand-teal to-transparent sm:left-6" />
          <div className="flex flex-col gap-8">
            {process.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07} className="relative flex gap-5 sm:gap-6 pl-0">
                <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-navy-900 font-display text-sm sm:text-base font-bold text-brand-teal">
                  {i + 1}
                </div>
                <div className="pt-1 sm:pt-2">
                  <h3 className="font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-slate-200/90 max-w-xl">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
