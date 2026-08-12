import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Envuelve el contenido de cada página con una entrada suave.
 *
 * Es breve a propósito: una transición larga entre páginas se siente lenta,
 * no elegante.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
