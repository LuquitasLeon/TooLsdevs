import { useCallback, useEffect, useState } from "react";

interface Options {
  /** Milisegundos que cada diapositiva queda en pantalla. */
  intervalMs?: number;
  /** Cuando es `true`, el avance automático se detiene (ej. mouse encima). */
  paused?: boolean;
}

interface Slideshow {
  index: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
}

/**
 * Índice que avanza solo por una lista circular.
 *
 * Se detiene mientras `paused` sea `true` y no auto-avanza si la persona pidió
 * reducir el movimiento: en ese caso las diapositivas sólo cambian a mano. Al
 * navegar manualmente el temporizador se reinicia, así una diapositiva recién
 * elegida no salta enseguida.
 */
export function useSlideshow(count: number, { intervalMs = 6500, paused = false }: Options = {}): Slideshow {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => window.clearInterval(id);
    // `index` en las dependencias hace que el temporizador se reinicie al
    // navegar a mano, manteniendo un ritmo parejo desde la nueva diapositiva.
  }, [paused, count, intervalMs, index]);

  return { index, goTo, next, prev };
}
