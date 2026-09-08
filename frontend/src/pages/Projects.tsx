import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import ContactCta from "@/components/sections/ContactCta";
import ClientCard from "@/components/ui/ClientCard";
import Reveal from "@/components/ui/Reveal";
import { useContent } from "@/features/i18n/useI18n";
import { useClients } from "@/features/clients/useClients";
import { ClientProjectModel } from "@/lib/ClientProjectModel";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Projects() {
  const { projects } = useContent();
  const { clients: rawClients } = useClients();
  const clients = ClientProjectModel.fromList(rawClients);

  usePageMeta({ title: `${projects.title} | ToolsDevs`, description: projects.intro });

  return (
    <PageTransition>
      <PageHeader eyebrow={projects.eyebrow} title={projects.title} description={projects.intro} />

      {/* El producto propio primero: es lo que queremos que resalte. */}
      <FeaturedProduct product={projects.featured} />

      {/* Los clientes: cinta de logos y después las tarjetas con el detalle. */}
      <ClientsMarquee models={clients} eyebrow={projects.clientsEyebrow} />

      <section className="pb-section sm:pb-section-lg pt-4">
        <Container className="flex flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((model, i) => (
              <Reveal key={model.name} delay={(i % 3) * 0.07}>
                <ClientCard
                  model={model}
                  visitLabel={projects.visitLabel}
                  comingSoonLabel={projects.comingSoonLabel}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </PageTransition>
  );
}
