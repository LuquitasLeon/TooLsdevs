import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ThemeContext } from "./context";
import type { Theme, ThemeValue } from "./context";

const STORAGE_KEY = "toolsdevs:theme";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Decide con qué tema arrancar: primero lo que la persona eligió antes, y si
 * no hay nada guardado, la preferencia del sistema. Por defecto oscuro — es
 * la identidad de siempre del sitio, no un genérico "seguir al sistema".
 */
function detectInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    // Algunos navegadores lanzan al leer localStorage en modo privado.
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(detectInitialTheme);

  // El script inline en index.html ya deja la clase `dark` puesta antes del
  // primer pintado (evita el flash del tema incorrecto); acá solo se
  // mantiene sincronizada con el estado de React de ahí en más.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", theme === "dark" ? "#12151c" : "#e7ebf1");
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Modo privado o almacenamiento lleno: el cambio vale igual para esta
      // visita, sólo no se recuerda para la próxima.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
