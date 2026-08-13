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

/**
 * `true` en iOS (Safari, y también Chrome/Firefox ahí — todos corren sobre
 * WebKit por regla de Apple).
 *
 * Se detecta por soporte de `-webkit-touch-callout`, una propiedad que solo
 * existe en WebKit-en-iOS — ni en Android, ni en Safari de escritorio. Es más
 * confiable que leer el user-agent, que cualquiera puede falsear.
 *
 * Existe puntualmente porque las animaciones de opacity+transform en
 * elementos que cambian de tamaño (una página al entrar, el menú al abrir)
 * producían ahí un parpadeo de texto que no se resolvió con ningún ajuste de
 * CSS — se prefiere desactivarlas del todo en iOS antes que arriesgarse a
 * que vuelva.
 *
 * A diferencia de `useMediaQuery`, esto se calcula ya en el primer render
 * (no en un `useEffect` posterior): esta app no tiene SSR, así que no hay
 * riesgo de desajuste servidor/cliente, y esperar un render de más significa
 * que una animación en la Hero llega a arrancar antes de que se detecte
 * iOS — y se congela a mitad de camino cuando el valor cambia debajo.
 */
export function useIsIOS(): boolean {
  const [isIOS] = useState(
    () => typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none"),
  );
  return isIOS;
}
