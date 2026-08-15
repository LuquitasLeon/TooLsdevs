import { motion } from "framer-motion";
import type { StackCategory } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";
import { useIsIOS } from "@/hooks/useMediaQuery";
import { useInView } from "@/hooks/useInView";

/** Un color por familia de tecnología, para que el bloque se lea de un vistazo.
 * El fondo vive acá adentro (no en el string base de la pill): agregar un
 * `bg-*` en los dos lugares generaría un choque de utilidades de Tailwind. */
const categoryStyles: Record<StackCategory, string> = {
  frontend: "border-brand-teal/12 text-brand-teal-text bg-brand-teal/[0.04]",
  backend: "border-brand-green/12 text-brand-green-text bg-brand-green/[0.04]",
  datos: "border-accent-sky/12 text-accent-sky-text bg-accent-sky/[0.04]",
  infraestructura: "border-accent-violet/12 text-accent-violet-text bg-accent-violet/[0.04]",
  seguridad: "border-accent-amber/12 text-accent-amber-text bg-accent-amber/[0.04]",
};

/** Pill de una tecnología, con transición CSS nativa — para la rama de iOS. */
function StackPillIOS({ name, className }: { name: string; className: string }) {
  const { ref, visible } = useInView<HTMLLIElement>(true);
  return (
    <li
      ref={ref}
      className={`${className} transition-[opacity,transform] ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3.5"
      }`}
      style={{ transitionDuration: "550ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {name}
    </li>
  );
}

export default function Stack() {
  const { stack } = useContent();
  const isIOS = useIsIOS();

  return (
    <section className="py-section sm:py-section-lg border-t border-line/5">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={stack.eyebrow} title={stack.title} description={stack.intro} />

        {/* Los `li` se animan directamente en vez de envolverse en `Reveal`:
            un `div` entre `ul` y `li` es HTML inválido y rompe la semántica de
            lista que anuncian los lectores de pantalla. */}
        <ul className="flex flex-wrap gap-3">
          {stack.items.map((item, i) =>
            isIOS ? (
              <StackPillIOS
                key={item.id}
                name={item.name}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${categoryStyles[item.category]}`}
              />
            ) : (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${categoryStyles[item.category]}`}
              >
                {item.name}
              </motion.li>
            ),
          )}
        </ul>
      </Container>
    </section>
  );
}
