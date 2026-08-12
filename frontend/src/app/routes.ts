/**
 * Las rutas del sitio en un solo lugar.
 *
 * Las usan el router, la navegación, el sitemap y los enlaces internos: si una
 * cambia, se cambia acá y no hay forma de que quede un enlace roto suelto.
 */
export const routes = {
  home: "/",
  services: "/servicios",
  projects: "/proyectos",
  project: (slug: string) => `/proyectos/${slug}`,
  process: "/como-trabajamos",
  contact: "/contacto",
} as const;

/** Patrón que consume el router para la ficha de un proyecto. */
export const PROJECT_ROUTE_PATTERN = "/proyectos/:slug";
