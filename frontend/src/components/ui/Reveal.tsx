import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useIsIOS } from "@/hooks/useMediaQuery";
import { useInView } from "@/hooks/useInView";

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
 * En iOS usa una transición CSS nativa con `IntersectionObserver` en vez de
 * Framer Motion (ver `useInView`): es la prueba de si el parpadeo venía
 * específicamente de cómo Framer Motion anima ahí.
 */
export default function Reveal({ children, delay = 0, className = "", once = true }: RevealProps) {
  const isIOS = useIsIOS();
  const { ref, visible } = useInView<HTMLDivElement>(once);

  if (isIOS) {
    return (
      <div
        ref={ref}
        className={`${className} transition-opacity ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          transitionDuration: "600ms",
          transitionDelay: `${delay}s`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </div>
    );
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
