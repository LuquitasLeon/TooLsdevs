import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsIOS } from "@/hooks/useMediaQuery";

/**
 * Envuelve el contenido de cada página con una entrada suave.
 *
 * Es breve a propósito: una transición larga entre páginas se siente lenta,
 * no elegante. Desactivada en iOS (ver `useIsIOS`): ahí producía un parpadeo
 * de texto que no se resolvió con ningún ajuste de CSS.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const isIOS = useIsIOS();
  const prefersReducedMotion = useReducedMotion();

  if (isIOS || prefersReducedMotion) return <>{children}</>;

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
