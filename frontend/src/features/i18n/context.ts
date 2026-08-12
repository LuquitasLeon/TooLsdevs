import { createContext } from "react";
import type { Locale, SiteContent } from "@toolsdevs/shared";

export interface I18nValue {
  locale: Locale;
  content: SiteContent;
  setLocale: (locale: Locale) => void;
}

/**
 * El contexto vive en su propio archivo, separado del provider.
 *
 * No es capricho: si un archivo exporta un componente y además otra cosa, la
 * recarga en caliente de Vite deja de funcionar para ese archivo y hay que
 * refrescar a mano en cada cambio.
 */
export const I18nContext = createContext<I18nValue | null>(null);
