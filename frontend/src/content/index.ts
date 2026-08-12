import type { Locale, SiteContent } from "@toolsdevs/shared";
import { es } from "./es";
import { en } from "./en";

/**
 * Registro de idiomas.
 *
 * Al estar tipado como `Record<Locale, SiteContent>`, agregar un idioma nuevo a
 * `Locale` rompe la compilación hasta que exista su traducción completa. Es la
 * red que evita publicar una página a medio traducir.
 */
export const dictionaries: Record<Locale, SiteContent> = { es, en };

export const DEFAULT_LOCALE: Locale = "es";

export { contact } from "./contact";
