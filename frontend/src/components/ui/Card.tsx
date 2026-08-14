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
  none: "border-white/10 bg-navy-900",
  teal: "border-brand-teal/20 bg-navy-900",
  green: "border-brand-green/20 bg-navy-900",
  sky: "border-accent-sky/20 bg-navy-900",
  violet: "border-accent-violet/20 bg-navy-900",
  amber: "border-accent-amber/20 bg-navy-900",
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
          "transition-colors duration-300 hover:border-brand-teal/30 hover:bg-white/[0.05]",
        className,
      )}
    >
      {children}
    </div>
  );
}
