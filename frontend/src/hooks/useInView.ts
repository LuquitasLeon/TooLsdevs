import { useEffect, useRef, useState } from "react";

/**
 * Espera dos `requestAnimationFrame` anidados antes de correr `fn`.
 *
 * Con uno solo, el navegador a veces junta el estado "antes" (recién
 * montado) y el "después" (la clase que dispara la transición) en el mismo
 * cuadro — y entonces no hay nada que transicionar, aparece directo. Es un
 * problema conocido de esta técnica; Safari cae en esto más seguido que
 * Chrome. El segundo `requestAnimationFrame` garantiza que el navegador ya
 * pintó el estado "antes" antes de pasar al "después".
 */
function afterTwoFrames(fn: () => void): () => void {
  let raf2 = 0;
  const raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(fn);
  });
  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}

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

    let cancelShow: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          // Si el elemento ya estaba en pantalla desde el vamos (página corta,
          // o esto arranca más abajo del todo), el observer puede avisar casi
          // en el mismo cuadro del montaje — mismo riesgo que en
          // `useMountedIn`, así que se espera igual.
          cancelShow = afterTwoFrames(() => setVisible(true));
          if (once) observer.disconnect();
        } else if (!once) {
          cancelShow?.();
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelShow?.();
    };
  }, [once]);

  return { ref, visible } as const;
}

/**
 * `true` dos cuadros después del montaje — para disparar una transición CSS
 * al aparecer. Ver `afterTwoFrames`.
 *
 * Mismo motivo que `useInView`: alternativa sin Framer Motion para elementos
 * que animan al montarse en vez de al entrar en pantalla (la Hero, el
 * encabezado de las páginas internas, la transición entre páginas, el menú
 * mobile).
 */
export function useMountedIn(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => afterTwoFrames(() => setMounted(true)), []);

  return mounted;
}
