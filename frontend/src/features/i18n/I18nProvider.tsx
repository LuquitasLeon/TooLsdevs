import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "@toolsdevs/shared";
import { DEFAULT_LOCALE, dictionaries } from "@/content";
import { I18nContext } from "./context";
import type { I18nValue } from "./context";

const STORAGE_KEY = "toolsdevs:locale";

function isLocale(value: string | null): value is Locale {
  return value === "es" || value === "en";
}

/**
 * Decide con qué idioma arrancar: primero lo que la persona eligió antes, y si
 * no hay nada guardado, el idioma del navegador. Se lee de forma perezosa para
 * que ocurra una sola vez y no en cada render.
 */
function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    // Algunos navegadores lanzan al leer localStorage en modo privado.
  }

  return window.navigator.language.toLowerCase().startsWith("en") ? "en" : DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  // El atributo `lang` del documento no es decorativo: de él dependen la
  // pronunciación de los lectores de pantalla y la separación silábica.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Modo privado o almacenamiento lleno: el cambio vale igual para esta
      // visita, sólo no se recuerda para la próxima.
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ locale, content: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
