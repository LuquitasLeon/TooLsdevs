import { ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Logo from "./Logo";
import { philosophy } from "../data/content";

export default function Philosophy() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden border-t border-white/5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal>
          <Logo withWordmark={false} className="h-12 w-12 sm:h-14 sm:w-14 mx-auto" />
        </Reveal>

        <Reveal delay={0.1} className="max-w-2xl flex flex-col gap-4">
          {philosophy.paragraphs.map((p) => (
            <p key={p} className="text-sm sm:text-base leading-relaxed text-slate-300/90">
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <p className="font-display text-2xl sm:text-4xl font-bold text-white max-w-2xl text-balance">
            “<span className="text-gradient">{philosophy.quote}</span>”
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href="#contacto"
            className="group mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-xl shadow-brand-teal/25 transition-transform hover:scale-105"
          >
            Hablemos de tu proyecto
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
