import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useContent } from "@/features/i18n/useI18n";

/** A partir de cuánto scroll (px) aparece el botón — aprox. una pantalla. */
const SHOW_AFTER_PX = 480;

/**
 * Botón flotante para volver al principio de la página.
 *
 * Siempre montado (no condicional): la visibilidad se anima con una
 * transición CSS simple disparada por el scroll, sin depender de Framer
 * Motion ni de la técnica de doble `requestAnimationFrame` que usan los
 * componentes de la rama iOS — acá no hay riesgo de que el navegador junte
 * el estado "antes" y "después" en el mismo cuadro, porque el scroll ya
 * dispara re-renders de forma continua.
 */
export default function BackToTopButton() {
  const { ui } = useContent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={ui.backToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 rounded-full border border-white/10 bg-navy-950 p-3 text-brand-teal shadow-lg shadow-brand-teal/10 transition-[opacity,transform] duration-200 hover:bg-white/5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}
