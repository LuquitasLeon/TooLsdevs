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
 * el modelo, no la tarjeta. Lleva acento verde de la marca y una luz que se
 * enciende al pasar el mouse, para que no se sienta plana.
 */
export default function ClientCard({ model, visitLabel, comingSoonLabel }: Props) {
  const comingSoon = model.isComingSoon();

  const inner = (
    <div className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border border-brand-green/15 bg-gradient-to-br from-brand-green/[0.08] via-white/[0.015] to-brand-teal/[0.06] p-6 transition-all duration-300 hover:border-brand-green/40 hover:shadow-[0_0_34px_-10px_rgba(74,222,128,0.4)]">
      {/* Luz verde que aparece al pasar el mouse, arriba a la derecha. */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-green/15 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Filo superior de marca. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />

      <div className="relative flex items-center justify-between gap-4">
        <ClientLogo logo={model.logo} name={model.name} size={72} wideMaxWidth={148} />
        <span className="text-right text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal">
          {model.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col gap-2">
        <h3 className="font-display text-lg font-semibold text-white">{model.name}</h3>
        <p className="text-sm sm:text-base leading-relaxed text-slate-200/90">{model.summary}</p>
      </div>

      {comingSoon ? (
        <span className="relative inline-flex items-center gap-2 self-start rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-sm font-semibold text-amber-300">
          <Clock size={15} aria-hidden="true" />
          {comingSoonLabel}
        </span>
      ) : (
        <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-transform group-hover:translate-x-0.5">
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
