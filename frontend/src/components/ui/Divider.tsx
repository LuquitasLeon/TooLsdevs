import { cn } from "@/lib/cn";

/**
 * Separador horizontal entre secciones.
 *
 * Reemplaza al `border-t` de 5%, que se veía como una línea entrecortada: en vez
 * de un borde parejo y apenas visible, una línea con degradado que se enciende en
 * el centro y se difumina hacia los bordes.
 *
 * Usa `line` (el token que ThemeProvider invierte entre claro y oscuro) y no un
 * blanco fijo, que en el tema claro sería invisible.
 *
 * Se posiciona en el borde superior de su sección, así que la sección tiene que
 * ser `relative`.
 */
export default function Divider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line/20 to-transparent",
        className,
      )}
    />
  );
}
