import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsIOS } from "@/hooks/useMediaQuery";

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
 * Fundido de opacidad al entrar en pantalla.
 *
 * Desactivado en iOS (ver `useIsIOS`): ahí este mismo fundido producía un
 * parpadeo de texto persistente que sobrevivió a todos los ajustes de CSS
 * probados. En el resto de los navegadores anima normal.
 */
export default function Reveal({ children, delay = 0, className = "", once = true }: RevealProps) {
  const isIOS = useIsIOS();

  if (isIOS) {
    return <div className={className}>{children}</div>;
  }

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
