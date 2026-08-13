import { motion } from "framer-motion";
import type { StackCategory } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";
import { useIsIOS } from "@/hooks/useMediaQuery";

/** Un color por familia de tecnología, para que el bloque se lea de un vistazo. */
const categoryStyles: Record<StackCategory, string> = {
  frontend: "border-brand-teal/25 text-brand-teal",
  backend: "border-brand-green/25 text-brand-green",
  datos: "border-sky-400/25 text-sky-300",
  infraestructura: "border-violet-400/25 text-violet-300",
  seguridad: "border-amber-400/25 text-amber-300",
};

export default function Stack() {
  const { stack } = useContent();
  const isIOS = useIsIOS();

  return (
    <section className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={stack.eyebrow} title={stack.title} description={stack.intro} />

        {/* Los `li` se animan directamente en vez de envolverse en `Reveal`:
            un `div` entre `ul` y `li` es HTML inválido y rompe la semántica de
            lista que anuncian los lectores de pantalla. Sin animación en iOS
            (ver `useIsIOS`): el mismo parpadeo de texto que en el resto del
            sitio, sin resolución posible por CSS. */}
        <ul className="flex flex-wrap gap-3">
          {stack.items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={isIOS ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: (i % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-full border bg-white/[0.03] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.07] ${categoryStyles[item.category]}`}
            >
              {item.name}
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
