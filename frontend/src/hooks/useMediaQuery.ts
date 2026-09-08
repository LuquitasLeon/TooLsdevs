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
 * WebKit por regla de Apple, así que el user-agent los delata igual).
 *
 * Primer intento: `CSS.supports("-webkit-touch-callout", "none")`, una
 * propiedad que en teoría solo existe en WebKit-en-iOS. Dejó de alcanzar: en
 * un iPhone 16 Pro (iOS más nuevo) esa propiedad ya no se detecta como
 * soportada, así que ahí la función devolvía `false` — creía que no era iOS
 * — y volvía el parpadeo, mientras que en modelos más viejos (13, 13 Pro
 * Max) sí funcionaba. Una sola señal CSS resultó demasiado frágil frente a
 * cambios de versión.
 *
 * Ahora se arma con user-agent + plataforma, la forma estándar de detectar
 * iOS específicamente (no hay una API de feature-detection limpia para
 * "es WebKit-en-iOS", a propósito: todos los navegadores ahí son WebKit por
 * regla de Apple, así que no se puede usar la presencia de una función o
 * propiedad como señal — hay que mirar el string).
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
  const [isIOS] = useState(() => {
    if (typeof navigator === "undefined") return false;

    const isIPhoneOrIPad = /iPhone|iPad|iPod/.test(navigator.userAgent);
    // Desde iPadOS 13, un iPad se reporta como "Macintosh" en el
    // user-agent — a diferencia de una Mac de verdad, tiene pantalla táctil.
    const isIPadAsMac = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    // Se mantiene como señal extra por si en algún momento vuelve a
    // funcionar; no hace daño tenerla de respaldo.
    const supportsWebkitTouchCallout =
      typeof CSS !== "undefined" && CSS.supports("-webkit-touch-callout", "none");

    return isIPhoneOrIPad || isIPadAsMac || supportsWebkitTouchCallout;
  });

  return isIOS;
}
