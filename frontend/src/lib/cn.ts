type ClassValue = string | false | null | undefined;

/**
 * Une clases descartando lo que sea falso.
 *
 * Alcanza para lo que necesitamos: no hay conflictos de clases de Tailwind que
 * resolver porque las variantes se definen en un solo lugar, así que no vale la
 * pena sumar una dependencia para esto.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
