import type { ClientProjectModel } from "@/lib/ClientProjectModel";
import Container from "@/components/layout/Container";
import ClientLogo from "@/components/ui/ClientLogo";
import Divider from "@/components/ui/Divider";

interface Props {
  models: ClientProjectModel[];
  eyebrow: string;
}

/** Un logo dentro de la cinta. El de las copias va oculto a lectores. */
function LogoItem({ model, decorative }: { model: ClientProjectModel; decorative?: boolean }) {
  const logo = (
    <div className="flex h-28 items-center justify-center px-4 transition-transform duration-300 hover:scale-105">
      <ClientLogo logo={model.logo} name={model.name} size={108} wideMaxWidth={210} />
    </div>
  );

  if (model.hasLink()) {
    return (
      <a
        href={model.url}
        target="_blank"
        rel="noreferrer"
        aria-hidden={decorative || undefined}
        tabIndex={decorative ? -1 : undefined}
        aria-label={decorative ? undefined : `Visitar el sitio de ${model.name}`}
      >
        {logo}
      </a>
    );
  }

  return <div aria-hidden={decorative || undefined}>{logo}</div>;
}

/**
 * Cinta de logos de clientes que se desplaza sola, lento y en bucle.
 *
 * Para un bucle sin huecos la cinta tiene que ser más ancha que la pantalla en
 * todo momento. Con pocos logos eso no se cumple, así que la secuencia se repite
 * varias veces hasta llenar de sobra; luego se renderiza dos veces seguidas y la
 * animación corre medio recorrido, así el salto cae justo donde una copia calca
 * a la otra y no se nota.
 */
export default function ClientsMarquee({ models, eyebrow }: Props) {
  if (models.length === 0) return null;

  // Repetir hasta tener al menos ~12 logos por mitad, para cubrir pantallas anchas.
  const repeat = Math.max(3, Math.ceil(12 / models.length));
  const sequence = Array.from({ length: repeat }, () => models).flat();

  return (
    <section className="relative py-14 sm:py-20">
      <Divider />
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/90">
          {eyebrow}
        </p>
      </Container>

      <div className="marquee relative mt-10 overflow-hidden">
        {/* Difuminado en los bordes para que los logos entren y salgan suave. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-navy-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-navy-950 to-transparent" />

        <div
          className="marquee-track flex w-max items-center gap-10"
          style={{ ["--marquee-duration" as string]: "45s" }}
        >
          {sequence.map((model, i) => (
            <LogoItem key={`a-${i}-${model.name}`} model={model} />
          ))}
          {sequence.map((model, i) => (
            <LogoItem key={`b-${i}-${model.name}`} model={model} decorative />
          ))}
        </div>
      </div>
    </section>
  );
}
