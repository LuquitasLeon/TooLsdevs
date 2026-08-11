import { Check, Code2, ShieldHalf, Sparkles } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { services } from "../data/content";

const icons = [Code2, ShieldHalf];

export default function Services() {
  return (
    <section id="servicios" className="py-24 sm:py-32 border-t border-white/5">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Qué hacemos" title="Nuestros servicios" description={services.intro} />

        <div className="grid gap-6 lg:grid-cols-2">
          {services.groups.map((group, i) => {
            const Icon = icons[i] ?? Code2;
            return (
              <Reveal key={group.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-teal/20 text-brand-teal">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-300/90">
                        <Check size={18} className="mt-0.5 shrink-0 text-brand-green" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.15}>
          <div className="flex items-start gap-4 rounded-2xl border border-brand-teal/20 bg-gradient-to-br from-brand-teal/10 to-brand-green/5 p-6 sm:p-8">
            <Sparkles size={22} className="mt-0.5 shrink-0 text-brand-teal" />
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">{services.callout}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
