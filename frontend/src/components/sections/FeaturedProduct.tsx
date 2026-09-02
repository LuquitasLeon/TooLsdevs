import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { FeaturedProduct as FeaturedProductType } from "@toolsdevs/shared";
import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import { useSlideshow } from "@/hooks/useSlideshow";
import { cn } from "@/lib/cn";

interface Props {
  product: FeaturedProductType;
}

/**
 * Vitrina del producto propio (ToolsShop).
 *
 * Es lo que más tiene que resaltar de la página, así que va en grande y con un
 * carrusel lento: cada captura queda en pantalla el tiempo suficiente para leer
 * su descripción. Se pausa al pasar el mouse o al enfocar los controles, para
 * que nadie tenga que leer a las apuradas.
 *
 * La transición es un fundido por `key={index}` sin animación de salida: la
 * imagen y el texto entrantes aparecen y el saliente se va al instante. Se evita
 * `AnimatePresence` a propósito, porque en modo "wait" se traba si los cambios
 * (auto-avance + clics) llegan más rápido de lo que dura la animación.
 */
export default function FeaturedProduct({ product }: Props) {
  const [paused, setPaused] = useState(false);
  const total = product.slides.length;
  const { index, goTo, next, prev } = useSlideshow(total, { paused });
  const slide = product.slides[index];
  if (!slide) return null;

  const position = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24">
      <Divider />
      {/* Halo de marca detrás del producto, para separarlo del resto. */}
      <div className="pointer-events-none absolute left-1/2 top-16 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-teal/10 blur-[130px]" />

      <Container className="relative flex flex-col gap-8">
        <Reveal
          blur
          scale={0.96}
          y={30}
          margin="0px 0px -220px 0px"
          className="flex flex-col items-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/40 bg-brand-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal">
            <Sparkles size={14} aria-hidden="true" />
            {product.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold">
            <span className="text-gradient">{product.name}</span>
          </h2>
          <p className="max-w-2xl font-display text-lg sm:text-xl font-semibold text-white text-balance">
            {product.tagline}
          </p>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-200/90">
            {product.description}
          </p>
        </Reveal>

        {/* Carrusel: imagen + descripción, controlable a mano. Ancho acotado
            para que no domine la página, pero con las capturas bien visibles. */}
        <Reveal delay={0.1} className="mx-auto w-full max-w-4xl">
          <div
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-3 sm:p-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {/* Alto fijo (16:10): las capturas tienen relaciones distintas, así el
                visor no salta de tamaño al cambiar de vista. */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-navy-950">
              <motion.img
                key={index}
                src={slide.image}
                alt={slide.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full object-contain"
              />

              {/* Contador */}
              <span className="absolute right-3 top-3 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold tabular-nums text-slate-200 backdrop-blur">
                {position}
              </span>

              {/* Flechas */}
              <button
                type="button"
                onClick={prev}
                aria-label="Vista anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/70 text-white backdrop-blur transition-colors hover:bg-brand-teal hover:text-navy-950"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Vista siguiente"
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/70 text-white backdrop-blur transition-colors hover:bg-brand-teal hover:text-navy-950"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Descripción de la vista actual */}
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[4.5rem] px-1 text-center"
              aria-live="polite"
            >
              <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                {slide.title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200/90">
                {slide.description}
              </p>
            </motion.div>

            {/* Puntos: una vista de un vistazo, y navegación directa. */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {product.slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Ir a la vista ${i + 1}: ${s.title}`}
                  aria-current={i === index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-brand-teal" : "w-2 bg-white/20 hover:bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="flex justify-center">
          <Button to={product.cta.href}>
            {product.cta.label}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
