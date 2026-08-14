import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HomeTeaser from "@/components/sections/HomeTeaser";
import WhyUsSummary from "@/components/sections/WhyUsSummary";
import Philosophy from "@/components/sections/Philosophy";
import Container from "@/components/layout/Container";
import PageTransition from "@/components/layout/PageTransition";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";
import { usePageMeta } from "@/lib/usePageMeta";
import { projectCategoryText } from "@/lib/projectAccent";

/**
 * Portada: un recorrido corto y contundente.
 *
 * El detalle largo —todos los servicios, todos los proyectos, la metodología
 * paso a paso— vive en sus propias páginas. Acá va lo justo para que alguien
 * entienda quiénes somos y quiera seguir.
 */
export default function Home() {
  const { projects, homeTeasers, ui } = useContent();
  const featured = projects.items.filter((project) => project.featured);

  usePageMeta({
    title: "ToolsDevs | Creamos herramientas",
    description:
      "Desarrollo de software y ciberseguridad a medida en Tucumán, Argentina. Desarrollamos ideas, construimos soluciones.",
  });

  return (
    <PageTransition>
      <Hero />
      <About />

      <section className="relative overflow-hidden py-section sm:py-section-lg border-t border-white/5">
        <div className="pointer-events-none absolute -top-24 left-0 h-96 w-96 rounded-full bg-brand-green/8 blur-[110px]" />

        <Container className="relative flex flex-col gap-12">
          <SectionHeading
            eyebrow={projects.eyebrow}
            title={projects.title}
            description={projects.intro}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.08}>
                <Card interactive className="group flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.15em] ${projectCategoryText[project.category]}`}
                    >
                      {ui.categories[project.category]}
                    </span>
                    {project.draft && (
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-amber-300">
                        {ui.draftBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm sm:text-base leading-relaxed text-slate-200/90">
                    {project.summary}
                  </p>
                  <Link
                    to={routes.project(project.slug)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal"
                  >
                    {ui.viewProject}
                    <ArrowRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link
              to={routes.projects}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-teal transition-colors"
            >
              {ui.allProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <HomeTeaser teaser={homeTeasers.services} accent="teal" />
      <HomeTeaser teaser={homeTeasers.process} accent="violet" />
      <WhyUsSummary />
      <Philosophy />
    </PageTransition>
  );
}
