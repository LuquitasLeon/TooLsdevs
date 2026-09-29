/** Un integrante fundador, tal como lo administra el panel. */
export interface TeamMemberRecord {
  id: string;
  name: string;
  roleEs: string;
  roleEn: string;
  detailEs: string;
  detailEn: string;
  /** Formación o especialidad adicional, cuando corresponde. */
  extraEs?: string;
  extraEn?: string;
  /** Ruta a la foto, relativa a la raíz del sitio (`/uploads/...` o `/team/...`). */
  photo?: string;
  /** Posición en la grilla: menor primero. */
  order: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Una empresa cliente: aparece en el carrusel de logos y como tarjeta en la
 * página de Proyectos (`ClientsMarquee` / `ClientCard`, ya existentes).
 */
export interface CompanyRecord {
  id: string;
  name: string;
  /** Ruta al logo, relativa a la raíz del sitio. */
  logo: string;
  categoryEs: string;
  categoryEn: string;
  summaryEs: string;
  summaryEn: string;
  /** URL del sitio en vivo. Ausente cuando todavía no se publicó. */
  url?: string;
  /** Se muestra como "Próximamente" aunque no tenga URL, o si se marca a mano. */
  comingSoon: boolean;
  /** Posición en el carrusel y en la grilla: menor primero. */
  order: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Una captura del carrusel del producto propio (ToolsShop), mostrado en
 * `FeaturedProduct`.
 */
export interface ProductSlideRecord {
  id: string;
  /** Ruta a la captura, relativa a la raíz del sitio. */
  image: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  /** Posición en el carrusel: menor primero. */
  order: number;
  createdAt: string;
  updatedAt: string;
}
