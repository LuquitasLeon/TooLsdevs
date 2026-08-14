import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * El contexto vive en su propio archivo, separado del provider.
 *
 * No es capricho: si un archivo exporta un componente y además otra cosa, la
 * recarga en caliente de Vite deja de funcionar para ese archivo y hay que
 * refrescar a mano en cada cambio.
 */
export const ThemeContext = createContext<ThemeValue | null>(null);
