import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HomeTeaser from "@/components/sections/HomeTeaser";
import WhyUsSummary from "@/components/sections/WhyUsSummary";
import Philosophy from "@/components/sections/Philosophy";
import Container from "@/components/layout/Container";
import PageTransition from "@/components/layout/PageTransition";
import ClientCard from "@/components/ui/ClientCard";
import Reveal from "@/components/ui/Reveal";
import Divider from "@/components/ui/Divider";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";
import { useClients } from "@/features/clients/useClients";
import { ClientProjectModel } from "@/lib/ClientProjectModel";
import { routes } from "@/app/routes";
import { usePageMeta } from "@/lib/usePageMeta";

/**
 * Portada: un recorrido corto y contundente.
 *
 * El detalle largo —todos los servicios, todos los proyectos, la metodología
 * paso a paso— vive en sus propias páginas. Acá va lo justo para que alguien
 * entienda quiénes somos y quiera seguir.
 */
export default function Home() {
  const { projects, homeTeasers, ui } = useContent();
  const { clients } = useClients();
  // En la portada mostramos sólo tres, como adelanto; el resto vive en /proyectos.
  const preview = ClientProjectModel.fromList(clients).slice(0, 3);

  usePageMeta({
    title: "ToolsDevs | Creamos herramientas",
    description:
      "Desarrollo de software y ciberseguridad a medida en Tucumán, Argentina. Desarrollamos ideas, construimos soluciones.",
  });

  return (
    <PageTransition>
      <Hero />
      <About />

      <section className="relative py-section sm:py-section-lg">
        <Divider />
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={projects.eyebrow}
            title={projects.title}
            description={projects.intro}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((model, i) => (
              <Reveal key={model.name} delay={(i % 3) * 0.08}>
                <ClientCard
                  model={model}
                  visitLabel={projects.visitLabel}
                  comingSoonLabel={projects.comingSoonLabel}
                />
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

      <HomeTeaser teaser={homeTeasers.services} />
      <HomeTeaser teaser={homeTeasers.process} />
      <WhyUsSummary />
      <Philosophy />
    </PageTransition>
  );
}
