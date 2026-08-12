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
        {...(withWordmark ? {} : { title: "ToolsDevs" })}
      />
      {withWordmark && (
        <span className={cn("font-display font-bold tracking-tight text-white", wordmarkClassName)}>
          TOOLS<span className="text-gradient">DEVS</span>
        </span>
      )}
    </div>
  );
}
