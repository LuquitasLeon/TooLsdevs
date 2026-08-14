import { Compass, Target } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

export default function About() {
  const { about } = useContent();
  return (
    <section id="nosotros" className="py-section sm:py-section-lg">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} />

        <Reveal delay={0.1} className="flex flex-col gap-5 max-w-3xl">
          {about.paragraphs.map((p) => (
            <p key={p} className="text-base sm:text-lg leading-relaxed text-slate-200/90 text-pretty">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <Reveal delay={0.15}>
            <Card accent="teal">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Target size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{about.mission.title}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200/90">
                {about.mission.text}
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <Card accent="green">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                <Compass size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{about.vision.title}</h3>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200/90">
                {about.vision.text}
              </p>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
