import { motion } from "framer-motion";
import Container from "./Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/**
 * Encabezado de las páginas internas.
 *
 * Deja aire bajo la barra fija y da un punto de entrada claro: al llegar desde
 * el menú, lo primero que se lee es dónde estás parado.
 */
export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_70%_at_30%_0%,#000_30%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-teal/15 blur-[120px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex max-w-3xl flex-col gap-4"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/90">
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-display-sm font-bold leading-[1.05] tracking-tight text-white text-balance">
            {title}
          </h1>
          {description && (
            <p className="text-base sm:text-lg leading-relaxed text-slate-200/90 text-pretty">
              {description}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
