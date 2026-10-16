import LogoMark from "./LogoMark";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * El isotipo junto al nombre escrito, como aparece en la barra y en el pie.
 *
 * Cuando el nombre acompaña, la marca es decorativa: si además tuviera texto
 * alternativo, un lector de pantalla diría "ToolsDevs" dos veces.
 */
export default function Logo({
  className = "h-9 w-9",
  withWordmark = true,
  wordmarkClassName = "",
}: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark
        className={cn("shrink-0", className)}
        animate={false}
        // Acá el logo va chico, junto al nombre escrito: necesita el verde/teal
        // "seguro para texto" (mismo que usa el gradiente del wordmark), no el
        // extra brillante de LogoMark — ese pierde casi todo el contraste sobre
        // fondo claro.
        colorFrom="var(--color-brand-green-text)"
        colorTo="var(--color-brand-teal-text)"
        {...(withWordmark ? {} : { title: "ToolsDevs" })}
      />
      {withWordmark && (
        <span className={cn("font-display font-bold tracking-tight text-fg", wordmarkClassName)}>
          TOOLS<span className="text-gradient">DEVS</span>
        </span>
      )}
    </div>
  );
}
