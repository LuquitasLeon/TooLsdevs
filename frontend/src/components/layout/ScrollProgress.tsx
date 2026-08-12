import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra fina arriba de todo que indica cuánto queda de página.
 *
 * En un sitio largo ubica a quien está leyendo. Es decorativa, así que queda
 * oculta para los lectores de pantalla.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand-green to-brand-teal"
    />
  );
}
