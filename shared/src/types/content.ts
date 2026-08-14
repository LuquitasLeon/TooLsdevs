import type { Locale } from "../schemas/contact.js";

/**
 * Formas del contenido institucional del sitio.
 *
 * Viven acá y no en el frontend porque el backend también las necesita: el mail
 * de contacto arma su cuerpo con el nombre del servicio consultado, y el
 * diagnóstico interactivo manda referencias a estos mismos identificadores.
 */

export interface WhatsappContact {
  /** Nombre de quien atiende ese número. */
  name: string;
  /** Número en formato internacional sin símbolos, para el enlace wa.me. */
  number: string;
  /** El mismo número formateado para mostrar. */
  label: string;
}

export interface ContactInfo {
  email: string;
  instagram: string;
  location: string;
  whatsapp: WhatsappContact[];
}

export interface NavItem {
  label: string;
  /** Destino: ancla dentro de la página o ruta del sitio. */
  href: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: CallToAction;
  ctaSecondary: CallToAction;
}

export interface Statement {
  title: string;
  text: string;
}

export interface AboutContent {
  /** Volanta chica sobre el titulo. */
  eyebrow: string;
  title: string;
  paragraphs: string[];
  mission: Statement;
  vision: Statement;
}

export interface TeamMember {
  name: string;
  role: string;
  detail: string;
  /** Formación o especialidad adicional, cuando corresponde. */
  extra?: string;
  /** Ruta a la foto del integrante, relativa a /public. */
  photo?: string;
}

/** Las dos patas del negocio: lo que se construye y lo que se protege. */
export type ServiceCategory = "desarrollo" | "seguridad";

export interface ServiceGroup {
  id: ServiceCategory;
  title: string;
  items: string[];
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  intro: string;
  groups: ServiceGroup[];
  callout: string;
}

export interface ProblemsContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
  callout: string;
}

export interface ProcessStep {
  title: string;
  text: string;
}

export interface ProcessContent {
  eyebrow: string;
  title: string;
  intro: string;
  steps: ProcessStep[];
}

/** Categorías con las que se filtra el listado de proyectos. */
export type ProjectCategory = "desarrollo" | "infraestructura" | "seguridad";

export interface ProjectsContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: Project[];
}

export interface ProjectImage {
  src: string;
  /** Texto alternativo: obligatorio, es lo que hace la ficha accesible. */
  alt: string;
  /** Dimensiones explícitas para que la imagen no empuje el layout al cargar. */
  width: number;
  height: number;
}

export interface Project {
  /** Identificador de la URL: /proyectos/:slug */
  slug: string;
  title: string;
  /** Una línea para la tarjeta del listado. */
  summary: string;
  category: ProjectCategory;
  /**
   * Cómo se nombra al cliente. Por defecto anonimizado
   * ("Empresa de logística — Tucumán"); el nombre real sólo si lo autorizó.
   */
  client: string;
  /** Si aparece entre los destacados de la portada. */
  featured: boolean;
  year?: string;

  /**
   * Marca la ficha como contenido de ejemplo, todavía sin datos reales.
   *
   * Mientras esté en `true`, la ficha muestra un aviso visible en el sitio. Es
   * a propósito: un caso de éxito inventado que se publica sin querer es una
   * promesa falsa a un cliente. Al cargar los datos reales se borra este campo
   * y el aviso desaparece solo.
   */
  draft?: boolean;

  /*
   * Lo que sigue es el detalle de la ficha. Es opcional porque depende de
   * material que hay que pedirle al cliente —capturas, permisos, números
   * reales— y no queremos inventarlo. La página de detalle muestra cada bloque
   * sólo si está cargado, así un caso puede publicarse y completarse después.
   */
  problem?: string;
  solution?: string;
  /** Resultados concretos y medibles, que es lo que convence a quien lee. */
  results?: string[];
  /** Tecnologías usadas, referenciando los ids de StackItem. */
  stack?: string[];
  images?: ProjectImage[];
}

export type StackCategory = "frontend" | "backend" | "datos" | "infraestructura" | "seguridad";

export interface StackItem {
  id: string;
  name: string;
  category: StackCategory;
}

export interface StackContent {
  eyebrow: string;
  title: string;
  intro: string;
  items: StackItem[];
}

export interface WhyUsContent {
  eyebrow: string;
  title: string;
  intro: string;
  reasons: string[];
  homeCta: CallToAction;
}

export interface HomeTeaser {
  eyebrow: string;
  title: string;
  highlights: string[];
  cta: CallToAction;
}

export interface PhilosophyContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  quote: string;
}

/**
 * Textos de interfaz: botones, etiquetas y mensajes que no son contenido
 * institucional pero igual hay que traducir.
 */
export interface UiContent {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  mainNav: string;
  contactCta: string;
  languageLabel: string;
  backToProjects: string;
  viewProject: string;
  allProjects: string;
  filterAll: string;
  categories: Record<ProjectCategory, string>;
  projectClient: string;
  projectProblem: string;
  projectSolution: string;
  projectResults: string;
  projectStack: string;
  /** Aviso que acompaña a las fichas todavía sin datos reales. */
  draftNotice: string;
  draftBadge: string;
  notFoundTitle: string;
  notFoundText: string;
  notFoundCta: string;
  contactHeading: string;
  contactText: string;
  contactEyebrow: string;
  loading: string;
  backToTop: string;
  form: ContactFormContent;
  diagnosis: DiagnosisContent;
}

/** Textos del formulario de contacto. */
export interface ContactFormContent {
  title: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  phoneLabel: string;
  messageLabel: string;
  optional: string;
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  errorGeneric: string;
  serviceLabel: string;
}

/** Un paso del diagnóstico interactivo. */
export interface DiagnosisOption {
  /** Identificador estable, para no depender del texto traducido. */
  id: string;
  label: string;
}

export interface DiagnosisStep {
  /** Identificador del paso: qué se pregunta (problema, rubro, etapa…). */
  id: string;
  question: string;
  options: DiagnosisOption[];
}

/**
 * Diagnóstico interactivo: guía a la persona por unas preguntas y desemboca en
 * el formulario ya con contexto.
 */
export interface DiagnosisContent {
  eyebrow: string;
  title: string;
  intro: string;
  start: string;
  steps: DiagnosisStep[];
  back: string;
  resultTitle: string;
  /** Recomendación según el problema elegido, indexada por el id de la opción. */
  recommendations: Record<string, string>;
  toForm: string;
  restart: string;
  progress: string;
}

export interface TeamContent {
  eyebrow: string;
  title: string;
  intro: string;
  members: TeamMember[];
}

/**
 * Todo el contenido del sitio en un idioma.
 *
 * Que sea un único tipo es lo que hace que agregar un idioma sea seguro: si
 * falta una sola clave en la traducción, TypeScript lo marca antes de que
 * alguien encuentre un hueco en la página.
 */
export interface SiteContent {
  locale: Locale;
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  team: TeamContent;
  services: ServicesContent;
  problems: ProblemsContent;
  process: ProcessContent;
  projects: ProjectsContent;
  stack: StackContent;
  whyUs: WhyUsContent;
  philosophy: PhilosophyContent;
  homeTeasers: {
    services: HomeTeaser;
    process: HomeTeaser;
  };
  ui: UiContent;
}
