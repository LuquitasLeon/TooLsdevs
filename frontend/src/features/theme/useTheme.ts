import { useContext } from "react";
import { ThemeContext } from "./context";

/** Acceso al tema activo y a las funciones para cambiarlo. */
export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
  }
  return value;
}
