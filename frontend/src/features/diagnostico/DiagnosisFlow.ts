import type { DiagnosisContent, DiagnosisStep } from "@toolsdevs/shared";
import type { ContactPrefill } from "@/features/contact-form/ContactForm";

/**
 * Lógica del diagnóstico interactivo, separada de la vista.
 *
 * Encapsula cómo se arma el recorrido —adaptado al rubro elegido— y cómo, al
 * terminar, se traduce en el prefill del formulario. El componente solo pinta lo
 * que esta clase decide, sin repartir la lógica de pasos por el JSX.
 *
 * Es una instancia liviana: se crea en cada render a partir del contenido y las
 * respuestas actuales, igual que `ClientProjectModel`.
 */
export class DiagnosisFlow {
  constructor(
    private readonly content: DiagnosisContent,
    private readonly answers: Record<string, string>,
  ) {}

  /** Rubro elegido (id de la opción), o `undefined` si todavía no se eligió. */
  get rubroId(): string | undefined {
    return this.answers["rubro"];
  }

  /** Preguntas propias del rubro elegido; vacío hasta que se elige uno. */
  private get branchSteps(): DiagnosisStep[] {
    return this.rubroId ? (this.content.branches[this.rubroId] ?? []) : [];
  }

  /** Recorrido completo: rubro + preguntas del rubro + pasos comunes. */
  get steps(): DiagnosisStep[] {
    return [this.content.rubroStep, ...this.branchSteps, ...this.content.commonSteps];
  }

  /**
   * Cantidad total de pasos. Antes de elegir rubro asume 2 preguntas de rama
   * (todas las ramas tienen esa cantidad), así la barra de progreso no salta.
   */
  get total(): number {
    const branchLength = this.rubroId ? this.branchSteps.length : 2;
    return 1 + branchLength + this.content.commonSteps.length;
  }

  /** El paso en una posición del recorrido, si existe. */
  stepAt(index: number): DiagnosisStep | undefined {
    return this.steps[index];
  }

  /** Recomendación personalizada según el rubro elegido. */
  get recommendation(): string | undefined {
    return this.rubroId ? this.content.recommendations[this.rubroId] : undefined;
  }

  /**
   * Traduce las respuestas en el prefill del formulario: el servicio concreto
   * sale de la necesidad elegida y el mensaje combina la recomendación con un
   * resumen legible de todo lo respondido.
   */
  buildPrefill(): ContactPrefill {
    const needId = this.answers["necesidad"];
    const service = needId ? this.content.services[needId] : undefined;
    const recommendation = this.recommendation;

    const summary = this.steps
      .map((step) => {
        const chosen = step.options.find((option) => option.id === this.answers[step.id]);
        return chosen ? `${step.question} ${chosen.label}` : null;
      })
      .filter(Boolean)
      .join(" · ");

    return {
      ...(service ? { service } : {}),
      diagnosis: summary,
      message: recommendation ? `${recommendation}\n\n(${summary})` : summary,
    };
  }
}
