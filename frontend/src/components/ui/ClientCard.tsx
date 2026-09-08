import { ArrowUpRight, Clock } from "lucide-react";
import type { ClientProjectModel } from "@/lib/ClientProjectModel";
import ClientLogo from "@/components/ui/ClientLogo";

interface Props {
  model: ClientProjectModel;
  visitLabel: string;
  comingSoonLabel: string;
}

/**
 * Tarjeta de un proyecto de cliente.
 *
 * Muestra el logo, el rubro, un resumen y —según el modelo— un enlace al sitio
 * en vivo o el sello "Próximamente". Toda la decisión de qué mostrar la resuelve
 * el modelo, no la tarjeta. Sigue la misma base sólida que `Card`, con el borde
 * verde de la marca como distintivo.
 */
export default function ClientCard({ model, visitLabel, comingSoonLabel }: Props) {
  const comingSoon = model.isComingSoon();

  const inner = (
    <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-brand-green/12 bg-surface p-6 transition-colors duration-300 hover:border-brand-green/25 hover:bg-surface-hover">
      {/* Filo superior de marca. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />

      <div className="relative flex items-center justify-between gap-4">
        <ClientLogo logo={model.logo} name={model.name} size={72} wideMaxWidth={148} />
        <span className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal-text">
          {model.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-fg">{model.name}</h3>
        <p className="text-sm sm:text-base leading-relaxed text-muted/90">{model.summary}</p>
      </div>

      {comingSoon ? (
        <span className="relative inline-flex items-center gap-2 self-start rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-sm font-semibold text-accent-amber-text">
          <Clock size={15} aria-hidden="true" />
          {comingSoonLabel}
        </span>
      ) : (
        <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-text transition-transform group-hover:translate-x-0.5">
          {visitLabel}
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      )}
    </div>
  );

  if (comingSoon) return inner;

  return (
    <a
      href={model.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${visitLabel}: ${model.name}`}
      className="block h-full rounded-2xl focus-visible:outline-none"
    >
      {inner}
    </a>
  );
}
