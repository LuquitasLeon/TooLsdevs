import { useEffect, useState } from "react";

/**
 * Sigue una media query desde JavaScript.
 *
 * Arranca en `false` y se actualiza después del primer render: así el servidor
 * y el cliente coinciden y no hay parpadeo.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/**
 * `true` sólo con un puntero preciso (mouse o trackpad).
 *
 * Los efectos que siguen al cursor no tienen sentido con el dedo: en un celular
 * sólo agregan trabajo al procesador y gastan batería sin que se vea nada.
 */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
