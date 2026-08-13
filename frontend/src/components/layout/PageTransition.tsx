import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsIOS } from "@/hooks/useMediaQuery";
import { useMountedIn } from "@/hooks/useInView";

/**
 * Envuelve el contenido de cada página con una entrada suave.
 *
 * Es breve a propósito: una transición larga entre páginas se siente lenta,
 * no elegante. En iOS usa una transición CSS nativa en vez de Framer Motion
 * — ver `useIsIOS`.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const isIOS = useIsIOS();
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMountedIn();

  if (prefersReducedMotion) return <>{children}</>;

  if (isIOS) {
    return (
      <div
        className={`transition-[opacity,transform] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{ transitionDuration: "450ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {children}
      </div>
    );
  }

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
