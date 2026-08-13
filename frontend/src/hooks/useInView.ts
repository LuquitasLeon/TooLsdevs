import { useEffect, useRef, useState } from "react";

/**
 * `true` cuando el elemento entra en pantalla, usando `IntersectionObserver`
 * nativo — sin pasar por Framer Motion.
 *
 * Existe para probar una hipótesis puntual: en un iPhone 16 Pro, las
 * animaciones de Framer Motion (que van moviendo `opacity`/`transform` cuadro
 * a cuadro por JavaScript) producían un parpadeo de texto que sobrevivió a
 * sacarles todo el peso posible. Una transición CSS nativa, que el navegador
 * maneja de punta a punta sin que JS le vaya empujando valores en cada
 * cuadro, es un mecanismo distinto — capaz ahí no pasa lo mismo.
 */
export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return { ref, visible } as const;
}

/**
 * `true` un cuadro después del montaje — para disparar una transición CSS al
 * aparecer (no sirve pintar ya con la clase final: el navegador necesita ver
 * el estado "antes" primero, o no hay nada que transicionar).
 *
 * Mismo motivo que `useInView`: alternativa sin Framer Motion para elementos
 * que animan al montarse en vez de al entrar en pantalla (la Hero, el
 * encabezado de las páginas internas, la transición entre páginas).
 */
export function useMountedIn(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return mounted;
}
