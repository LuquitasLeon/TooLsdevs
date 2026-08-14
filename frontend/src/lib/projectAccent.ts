import type { ProjectCategory } from "@toolsdevs/shared";

/** Mismo criterio que categoryStyles en Stack.tsx: cada categoría, un color. */
export const projectCategoryText: Record<ProjectCategory, string> = {
  desarrollo: "text-brand-teal/90",
  infraestructura: "text-accent-violet",
  seguridad: "text-accent-amber",
};
