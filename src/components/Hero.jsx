import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Container from "./ui/Container";
import { hero } from "../data/content";

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-teal/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-20 right-0 h-72 w-72 rounded-full bg-brand-green/10 blur-[100px]" />

      <Container className="relative flex flex-col items-center text-center gap-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300"
        >
          <ShieldCheck size={16} className="text-brand-teal" />
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] text-balance"
        >
          <span className="text-gradient">{hero.title}</span>
          <br />
          <span className="text-white">{hero.subtitle}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-xl text-base sm:text-lg text-slate-300/90 text-pretty"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-2"
        >
          <a
            href={hero.ctaPrimary.href}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-xl shadow-brand-teal/25 transition-transform hover:scale-105"
          >
            {hero.ctaPrimary.label}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
