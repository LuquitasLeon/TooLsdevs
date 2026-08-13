import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * Si la animación corre una sola vez. Por defecto sí: re-animar cada vez que
   * se pasa por encima marea al volver a subir y no aporta nada.
   */
  once?: boolean;
}

/**
 * Fundido de opacidad al entrar en pantalla, sin desplazamiento.
 *
 * A propósito, sin `y`/transform: animar solo `opacity` es lo más liviano que
 * existe en CSS — no exige armar una capa de composición aparte, así que no
 * hay riesgo de parpadeos por renders a medio hacer en ningún navegador.
 */
export default function Reveal({ children, delay = 0, className = "", once = true }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
