import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import { useContent } from "@/features/i18n/useI18n";
import type { ContactPrefill } from "@/features/contact-form/ContactForm";

/**
 * Diagnóstico interactivo.
 *
 * Guía por unas preguntas y, al terminar, ofrece pasar al formulario ya con
 * contexto: el servicio recomendado y un resumen de las respuestas. Así el "wow"
 * de la feria se convierte en una consulta que llega calificada.
 *
 * `onComplete` recibe el prefill listo para el formulario.
 */
export default function Diagnostico({ onComplete }: { onComplete: (prefill: ContactPrefill) => void }) {
  const content = useContent();
  const { diagnosis } = content.ui;
  const { hero } = content;
  const prefersReducedMotion = useReducedMotion();

  // -1 = pantalla de inicio · 0..n-1 = pasos · n = resultado
  const [stepIndex, setStepIndex] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const total = diagnosis.steps.length;
  const atResult = stepIndex >= total;

  const choose = (stepId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: optionId }));
    setStepIndex((i) => i + 1);
  };

  const restart = () => {
    setAnswers({});
    setStepIndex(-1);
  };

  /** Arma el resumen legible de las respuestas, para precargar el formulario. */
  const buildPrefill = (): ContactPrefill => {
    const problemId = answers["problema"];
    const recommendation = problemId ? diagnosis.recommendations[problemId] : undefined;

    const summary = diagnosis.steps
      .map((step) => {
        const chosen = step.options.find((o) => o.id === answers[step.id]);
        return chosen ? `${step.question} ${chosen.label}` : null;
      })
      .filter(Boolean)
      .join(" · ");

    return {
      ...(recommendation ? { service: recommendation } : {}),
      diagnosis: summary,
      message: recommendation ? `${recommendation}\n\n(${summary})` : summary,
    };
  };

  const transition = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <Card padding="roomy" className="overflow-hidden">
      <div className="flex items-center gap-2 text-brand-teal-text">
        <Sparkles size={18} aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.2em]">{diagnosis.eyebrow}</span>
      </div>

      <AnimatePresence mode="wait">
        {stepIndex === -1 && (
          <motion.div key="start" {...transition} className="mt-4 flex flex-col gap-5">
            <h2 className="font-display text-2xl font-semibold text-fg text-balance">
              {diagnosis.title}
            </h2>
            <p className="text-muted/90">{diagnosis.intro}</p>
            <button
              type="button"
              onClick={() => setStepIndex(0)}
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-brand-teal px-6 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03] motion-reduce:transform-none"
            >
              {diagnosis.start}
              <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        )}

        {stepIndex >= 0 && !atResult && (
          <motion.div key={`step-${stepIndex}`} {...transition} className="mt-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-teal transition-[width] duration-300"
                  style={{ width: `${((stepIndex + 1) / total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-faint">
                {diagnosis.progress
                  .replace("{current}", String(stepIndex + 1))
                  .replace("{total}", String(total))}
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold text-fg text-balance">
              {diagnosis.steps[stepIndex]!.question}
            </h2>

            <div className="flex flex-col gap-2.5">
              {diagnosis.steps[stepIndex]!.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => choose(diagnosis.steps[stepIndex]!.id, option.id)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line/10 bg-line/[0.03] px-5 py-3.5 text-left text-sm text-muted transition-colors hover:border-brand-teal/25 hover:bg-line/[0.06]"
                >
                  {option.label}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand-teal"
                  />
                </button>
              ))}
            </div>

            {stepIndex > 0 && (
              <button
                type="button"
                onClick={() => setStepIndex((i) => i - 1)}
                className="inline-flex w-fit items-center gap-1.5 text-sm text-faint hover:text-fg transition-colors"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                {diagnosis.back}
              </button>
            )}
          </motion.div>
        )}

        {atResult && (
          <motion.div key="result" {...transition} className="mt-4 flex flex-col gap-5">
            <h2 className="font-display text-xl font-semibold text-fg">{diagnosis.resultTitle}</h2>
            <p className="rounded-xl border border-brand-teal/12 bg-gradient-to-br from-brand-teal/10 to-brand-green/5 px-5 py-4 text-fg">
              {answers["problema"] ? diagnosis.recommendations[answers["problema"]] : hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onComplete(buildPrefill())}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-brand-teal px-6 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03] motion-reduce:transform-none"
              >
                {diagnosis.toForm}
                <ArrowRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full border border-line/15 px-5 py-3 text-sm font-semibold text-fg hover:bg-line/5 transition-colors"
              >
                <RotateCcw size={15} aria-hidden="true" />
                {diagnosis.restart}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
