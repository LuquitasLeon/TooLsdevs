import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  /** Distancia en píxeles desde la que entra el contenido. */
  y?: number;
  className?: string;
  /**
   * Si la animación corre una sola vez. Por defecto sí: re-animar cada vez que
   * se pasa por encima marea al volver a subir y no aporta nada.
   */
  once?: boolean;
  /** Arranca difuminado y se enfoca al entrar. Para remates que piden énfasis. */
  blur?: boolean;
  /** Escala inicial (ej. 0.95) que crece hasta 1: un "medio zoom" al aparecer. */
  scale?: number;
  /** Cuánto del bloque tiene que verse para disparar (0–1). Por defecto 0.2. */
  amount?: number;
  /**
   * Margen del área de disparo, formato rootMargin. Un valor negativo abajo
   * (ej. "0px 0px -200px 0px") retrasa la animación hasta que el bloque está
   * más adentro de la pantalla, no apenas asoma por el borde inferior.
   */
  margin?: string;
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
  blur = false,
  scale,
  amount = 0.2,
  margin,
}: RevealProps) {
  const initial: Record<string, number | string> = { opacity: 0, y };
  const inView: Record<string, number | string> = { opacity: 1, y: 0 };
  if (scale !== undefined) {
    initial.scale = scale;
    inView.scale = 1;
  }
  if (blur) {
    initial.filter = "blur(12px)";
    inView.filter = "blur(0px)";
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={inView}
      viewport={{ once, amount, ...(margin ? { margin } : {}) }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
