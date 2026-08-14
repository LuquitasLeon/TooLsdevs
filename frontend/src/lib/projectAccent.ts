import type { ProjectCategory } from "@toolsdevs/shared";

/** Mismo criterio que categoryStyles en Stack.tsx: cada categoría, un color. */
export const projectCategoryText: Record<ProjectCategory, string> = {
  desarrollo: "text-brand-teal-text/90",
  infraestructura: "text-accent-violet-text",
  seguridad: "text-accent-amber-text",
};
