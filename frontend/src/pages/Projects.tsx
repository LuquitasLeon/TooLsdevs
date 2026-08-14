import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { ProjectCategory } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import ContactCta from "@/components/sections/ContactCta";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";
import { usePageMeta } from "@/lib/usePageMeta";
import { cn } from "@/lib/cn";
import { projectCategoryText } from "@/lib/projectAccent";

type Filter = ProjectCategory | "todos";

export default function Projects() {
  const { projects, ui } = useContent();
  const [filter, setFilter] = useState<Filter>("todos");

  usePageMeta({ title: `${projects.title} | ToolsDevs`, description: projects.intro });

  // Sólo se ofrecen los filtros que tienen proyectos detrás: un filtro que
  // devuelve una lista vacía es una promesa incumplida.
  const availableCategories = [...new Set(projects.items.map((p) => p.category))];
  const filters: Filter[] = ["todos", ...availableCategories];

  const visible =
    filter === "todos" ? projects.items : projects.items.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <PageHeader eyebrow={projects.eyebrow} title={projects.title} description={projects.intro} />

      <section className="pb-section sm:pb-section-lg">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-2" role="group" aria-label={ui.filterAll}>
            {filters.map((value) => {
              const active = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "border-brand-green bg-brand-green text-navy-950"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:text-white",
                  )}
                >
                  {value === "todos" ? ui.filterAll : ui.categories[value]}
                </button>
              );
            })}
          </div>

          {/* `aria-live` avisa a quien usa lector de pantalla que la lista
              cambió: si no, filtrar no produce ninguna señal audible. */}
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-live="polite"
            aria-atomic="false"
          >
            {visible.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 3) * 0.07}>
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
                  <h2 className="mt-3 font-display text-lg font-semibold text-white">
                    {project.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-400">{project.client}</p>
                  <p className="mt-3 flex-1 text-sm sm:text-base leading-relaxed text-slate-200/90">
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
        </Container>
      </section>

      <ContactCta />
    </PageTransition>
  );
}
