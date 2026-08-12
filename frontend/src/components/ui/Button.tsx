import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-transform duration-200 will-change-transform hover:scale-[1.04] active:scale-[0.98] " +
  "motion-reduce:transform-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-green to-brand-teal text-navy-950 shadow-lg shadow-brand-teal/25",
  secondary: "border border-white/15 text-white hover:bg-white/5",
  ghost: "text-slate-300 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-sm sm:text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type InternalLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "to"> & {
    /** Ruta interna: navega con el router, sin recargar la página. */
    to: string;
    href?: undefined;
  };

type ExternalLinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    /** Enlace externo, `mailto:` o `tel:`. */
    href: string;
    to?: undefined;
  };

type NativeButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
    to?: undefined;
  };

type ButtonProps = InternalLinkProps | ExternalLinkProps | NativeButtonProps;

/**
 * Botón de la marca, en sus tres formas.
 *
 * Con `to` navega por el router; con `href` es un enlace común (externo, mail o
 * teléfono); sin ninguno de los dos, un `<button>`. La distinción importa: un
 * enlace que navega tiene que ser un enlace de verdad, o se rompen el "abrir en
 * pestaña nueva", el teclado y los lectores de pantalla.
 */
export default function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.to === "string") {
    const { to, ...linkProps } = rest as InternalLinkProps;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ExternalLinkProps;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
