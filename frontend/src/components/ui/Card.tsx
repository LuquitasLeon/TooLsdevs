import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Accent = "none" | "teal" | "green";
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
  none: "border-white/10 bg-white/[0.03]",
  teal: "border-brand-teal/20 bg-gradient-to-br from-brand-teal/10 to-brand-green/5",
  green: "border-brand-green/20 bg-gradient-to-br from-brand-green/10 to-brand-teal/5",
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
