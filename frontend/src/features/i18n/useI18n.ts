import { useContext } from "react";
import { I18nContext } from "./context";

/** Acceso al idioma activo y a la función para cambiarlo. */
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n debe usarse dentro de <I18nProvider>");
  }
  return value;
}

/**
 * El contenido del sitio en el idioma activo.
 *
 * Es el hook que usan las secciones: `const { hero } = useContent()`.
 */
export function useContent() {
  return useI18n().content;
}
