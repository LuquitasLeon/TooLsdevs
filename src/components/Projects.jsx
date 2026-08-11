import { Boxes, Building2, Globe, Network, ShieldCheck, Workflow } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { projects } from "../data/content";

const icons = [Workflow, Globe, Boxes, Building2, Network, ShieldCheck];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 sm:py-32 border-t border-white/5">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Trabajos realizados" title={projects.title} description={projects.intro} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.items.map((project, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={project.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 transition-colors hover:border-brand-teal/30 hover:bg-white/[0.05]">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/20 to-brand-teal/20 text-brand-teal transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-300/90">{project.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
