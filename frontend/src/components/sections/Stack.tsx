import type { StackCategory } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

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

  return (
    <section className="py-section sm:py-section-lg border-t border-white/5">
      <Container className="flex flex-col gap-12">
        <SectionHeading eyebrow={stack.eyebrow} title={stack.title} description={stack.intro} />

        <ul className="flex flex-wrap gap-3">
          {stack.items.map((item) => (
            <li
              key={item.id}
              className={`rounded-full border bg-white/[0.03] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.07] ${categoryStyles[item.category]}`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
