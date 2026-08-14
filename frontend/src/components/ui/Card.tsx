import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Accent = "none" | "teal" | "green" | "sky" | "violet" | "amber";
type Padding = "compact" | "normal" | "roomy";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Resalta el borde al pasar el mouse. Para tarjetas que llevan a algún lado. */
  interactive?: boolean;
  /** Fondo degradado de marca, para los bloques que rematan una sección. */
  accent?: Accent;
  padding?: Padding;
}

const accents: Record<Accent, string> = {
  none: "border-white/10 bg-white/[0.045]",
  teal: "border-brand-teal/25 bg-gradient-to-br from-brand-teal/15 to-brand-green/5 shadow-lg shadow-brand-teal/10",
  green: "border-brand-green/25 bg-gradient-to-br from-brand-green/15 to-brand-teal/5 shadow-lg shadow-brand-green/10",
  sky: "border-accent-sky/25 bg-gradient-to-br from-accent-sky/15 to-brand-teal/5 shadow-lg shadow-accent-sky/10",
  violet: "border-accent-violet/25 bg-gradient-to-br from-accent-violet/15 to-accent-sky/5 shadow-lg shadow-accent-violet/10",
  amber: "border-accent-amber/25 bg-gradient-to-br from-accent-amber/15 to-accent-violet/5 shadow-lg shadow-accent-amber/10",
};

const paddings: Record<Padding, string> = {
  compact: "rounded-xl px-5 py-4",
  normal: "rounded-2xl p-6 sm:p-7",
  roomy: "rounded-2xl p-6 sm:p-8",
};

export default function Card({
  children,
  className,
  interactive = false,
  accent = "none",
  padding = "normal",
}: CardProps) {
  return (
    <div
      className={cn(
        "h-full border",
        paddings[padding],
        accents[accent],
        interactive &&
          "transition-colors duration-300 hover:border-brand-teal/40 hover:bg-white/[0.07]",
        className,
      )}
    >
      {children}
    </div>
  );
}
