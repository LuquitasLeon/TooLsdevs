import { Boxes, Building2, Globe, Network, ShieldCheck, Workflow } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

const icons = [Workflow, Globe, Boxes, Building2, Network, ShieldCheck];

export default function Projects() {
  const { projects } = useContent();
  return (
    <section id="proyectos" className="relative overflow-hidden py-section sm:py-section-lg border-t border-white/5">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-[110px]" />

      <Container className="relative flex flex-col gap-14">
        <SectionHeading eyebrow={projects.eyebrow} title={projects.title} description={projects.intro} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, i) => {
            const Icon = icons[i % icons.length] ?? Workflow;
            return (
              <Reveal key={project.title} delay={(i % 3) * 0.08}>
                <Card interactive className="group">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-teal/20 text-brand-teal transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-200/90">{project.summary}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
