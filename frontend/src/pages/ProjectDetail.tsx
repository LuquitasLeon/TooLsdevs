import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { Link, useParams } from "react-router";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import ContactCta from "@/components/sections/ContactCta";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";
import { usePageMeta } from "@/lib/usePageMeta";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { projects, ui, stack } = useContent();
  const project = projects.items.find((item) => item.slug === slug);

  usePageMeta({
    title: project ? `${project.title} | ToolsDevs` : `${ui.notFoundTitle} | ToolsDevs`,
    description: project?.summary ?? ui.notFoundText,
  });

  // Un slug inventado tiene que dar 404, no una ficha vacía.
  if (!project) return <NotFound />;

  const stackNames = (project.stack ?? []).map(
    (id) => stack.items.find((item) => item.id === id)?.name ?? id,
  );

  return (
    <PageTransition>
      <PageHeader
        eyebrow={ui.categories[project.category]}
        title={project.title}
        description={project.summary}
      />

      <section className="pb-section sm:pb-section-lg">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <Link
              to={routes.projects}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {ui.backToProjects}
            </Link>
          </Reveal>

          {/* Aviso visible mientras la ficha use datos de ejemplo. Desaparece
              solo al quitar `draft` del proyecto en el diccionario. */}
          {project.draft && (
            <Reveal delay={0.03}>
              <div
                role="note"
                className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.08] px-5 py-4 text-sm text-amber-200/90"
              >
                <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-amber-300" />
                <span>{ui.draftNotice}</span>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <Card padding="roomy" className="flex flex-col gap-2 sm:flex-row sm:gap-10">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal/90">
                  {ui.projectClient}
                </dt>
                <dd className="mt-1 text-base text-slate-200">{project.client}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal/90">
                    {project.year}
                  </dt>
                </div>
              )}
            </Card>
          </Reveal>

          {/* Cada bloque aparece sólo si tiene contenido cargado: así una ficha
              puede publicarse con lo básico y completarse cuando llegue el
              material, sin quedar con títulos vacíos colgando. */}
          {project.problem && (
            <Reveal delay={0.1} className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-white">
                {ui.projectProblem}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-200/90">
                {project.problem}
              </p>
            </Reveal>
          )}

          {project.solution && (
            <Reveal delay={0.12} className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-white">
                {ui.projectSolution}
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-200/90">
                {project.solution}
              </p>
            </Reveal>
          )}

          {project.results && project.results.length > 0 && (
            <Reveal delay={0.14} className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-white">
                {ui.projectResults}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {project.results.map((result) => (
                  <li key={result} className="flex items-start gap-3 text-base text-slate-200/90">
                    <CheckCircle2
                      size={20}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-brand-green"
                    />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {stackNames.length > 0 && (
            <Reveal delay={0.16} className="max-w-3xl">
              <h2 className="font-display text-2xl font-semibold text-white">{ui.projectStack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stackNames.map((name) => (
                  <li
                    key={name}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-slate-200"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {project.images && project.images.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.images.map((image) => (
                <Reveal key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    className="w-full rounded-2xl border border-white/10"
                  />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>

      <ContactCta />
    </PageTransition>
  );
}
