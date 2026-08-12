import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  /** Cuántos píxeles se deja arrastrar el elemento hacia el cursor. */
  strength?: number;
  className?: string;
}

/**
 * Acerca su contenido hacia el cursor cuando el mouse pasa cerca.
 *
 * Es el detalle que hace que un botón se sienta "vivo" sin llamar la atención.
 * Se desactiva solo en pantallas táctiles y con "reducir movimiento" activo.
 */
export default function Magnetic({ children, strength = 12, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = finePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    // Normalizado por el tamaño del elemento para que botones chicos y grandes
    // se sientan igual de "magnéticos".
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
