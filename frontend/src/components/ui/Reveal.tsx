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
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      // Sin esto, Chrome arma la capa GPU para el transform recién cuando
      // arranca la animación — y el texto adentro tiembla ese primer frame,
      // sobre todo en Chrome de Android. Avisarle de antemano lo evita.
      style={{ willChange: "transform, opacity" }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
