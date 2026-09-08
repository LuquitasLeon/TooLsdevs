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
  process: "/como-trabajamos",
  contact: "/contacto",
  adminLogin: "/admin/login",
  admin: "/admin",
  adminCompanies: "/admin/empresas",
  adminTeam: "/admin/fundadores",
} as const;
