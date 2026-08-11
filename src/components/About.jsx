import { Compass, Target } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { about } from "../data/content";

export default function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Quiénes somos" title="Tres amigos, una misma idea" />

        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <Reveal delay={0.1} className="lg:col-span-3 flex flex-col justify-center gap-5">
            {about.paragraphs.map((p) => (
              <p key={p} className="text-base sm:text-lg leading-relaxed text-slate-300/90 text-pretty">
                {p}
              </p>
            ))}
          </Reveal>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Target size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{about.mission.title}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300/90">
                  {about.mission.text}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Compass size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{about.vision.title}</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300/90">
                  {about.vision.text}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
