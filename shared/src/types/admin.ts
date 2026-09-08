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

/** Una empresa que aparece en el carrusel de logos. */
export interface CompanyRecord {
  id: string;
  name: string;
  /** Ruta al logo, relativa a la raíz del sitio. */
  logo: string;
  link?: string;
  /** Posición en el carrusel: menor primero. */
  order: number;
  createdAt: string;
  updatedAt: string;
}
