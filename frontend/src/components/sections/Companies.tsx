import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";
import { useCompanies } from "@/features/companies/useCompanies";

/**
 * Carrusel de logos de empresas. Si no hay ninguna cargada todavía (o falló
 * la carga), la sección directamente no se muestra: un carrusel vacío se ve
 * peor que no tener carrusel.
 */
export default function Companies() {
  const { companies: content } = useContent();
  const { companies, loading } = useCompanies();

  if (!loading && companies.length === 0) return null;

  // Se duplica la lista para que la animación (que corre el track -50%) haga
  // un loop continuo sin salto visible.
  const track = [...companies, ...companies];

  return (
    <section className="relative overflow-hidden py-section border-t border-white/5">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} align="center" />
      </Container>

      {companies.length > 0 && (
        <div
          className="relative mt-2 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
          aria-hidden={companies.length <= 1}
        >
          <div className="marquee-track flex w-max items-center gap-16 py-4">
            {track.map((company, i) => {
              const logo = (
                <img
                  src={company.logo}
                  alt={company.name}
                  title={company.name}
                  className="h-12 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-14"
                  loading="lazy"
                />
              );

              return (
                <div key={`${company.id}-${i}`} className="shrink-0">
                  {company.link ? (
                    <a href={company.link} target="_blank" rel="noreferrer noopener">
                      {logo}
                    </a>
                  ) : (
                    logo
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
