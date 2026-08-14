import type { ProjectCategory } from "@toolsdevs/shared";
import type { Accent } from "@/components/ui/Card";

/** Mismo criterio que categoryStyles en Stack.tsx: cada categoría, un color. */
export const projectCategoryAccent: Record<ProjectCategory, Accent> = {
  desarrollo: "teal",
  infraestructura: "violet",
  seguridad: "amber",
};

export const projectCategoryText: Record<ProjectCategory, string> = {
  desarrollo: "text-brand-teal/90",
  infraestructura: "text-accent-violet",
  seguridad: "text-accent-amber",
};
