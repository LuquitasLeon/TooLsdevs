import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "@/components/layout/Container";
import LogoMark from "@/components/brand/LogoMark";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { useContent } from "@/features/i18n/useI18n";

/** Entrada escalonada: cada elemento aparece un poco después del anterior. */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function Hero() {
  const { hero } = useContent();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_35%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand-teal/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-32 right-0 h-80 w-80 rounded-full bg-brand-green/10 blur-[110px]" />

      <Container className="relative">
        {/* Asimétrico a propósito: el texto pesa más que la imagen, y el logo
            queda a la derecha como remate en vez de centrado sobre el título. */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="flex flex-col items-start gap-6 text-left">
            <motion.span
              {...rise(0)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300"
            >
              <ShieldCheck size={16} className="text-brand-teal" aria-hidden="true" />
              {hero.eyebrow}
            </motion.span>

            {/* Un solo titular domina. El eslogan va debajo, a la mitad de
                tamaño: si los dos gritan igual, no se lee ninguno. */}
            <motion.h1
              {...rise(0.1)}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-display-sm xl:text-display leading-[1.02] tracking-tight text-balance text-gradient"
            >
              {hero.title}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className="-mt-3 font-display text-2xl sm:text-3xl font-semibold leading-snug text-white text-balance"
            >
              {hero.subtitle}
            </motion.p>

            <motion.p
              {...rise(0.26)}
              className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-200/90 text-pretty"
            >
              {hero.description}
            </motion.p>

            <motion.div
              {...rise(0.3)}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Magnetic>
                <Button to={hero.ctaPrimary.href} className="w-full sm:w-auto">
                  {hero.ctaPrimary.label}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Button>
              </Magnetic>
              <Magnetic strength={8}>
                <Button
                  to={hero.ctaSecondary.href}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {hero.ctaSecondary.label}
                </Button>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            // Se limita también por altura para que en una laptop de pantalla
            // baja el logo y los botones sigan entrando sin scrollear.
            className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-[min(24rem,40vh)]"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand-teal/10 blur-3xl" />
            <LogoMark
              className="w-full drop-shadow-[0_0_45px_rgba(34,211,238,0.25)]"
              animate={!prefersReducedMotion}
              interactive
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
