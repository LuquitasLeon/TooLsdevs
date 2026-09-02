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

/**
 * Un cliente cuyo sitio construimos, mostrado en la vitrina de trabajos.
 *
 * A diferencia del modelo anterior —fichas internas con problema/solución— cada
 * tarjeta ahora enlaza al sitio real del cliente. Cuando todavía no hay sitio
 * publicado, `url` queda ausente y la tarjeta se muestra como "Próximamente".
 */
export interface ClientProject {
  /** Nombre de la institución o empresa. */
  name: string;
  /** Ruta al logo, relativa a /public. */
  logo: string;
  /** Rubro o tipo de sitio (ej. "Salud", "Medios", "Ciberseguridad"). */
  category: string;
  /** Descripción corta de lo que hicimos. */
  summary: string;
  /** URL del sitio en vivo. Ausente cuando todavía no se publicó. */
  url?: string;
  /** Marca el proyecto como "Próximamente" cuando aún no hay link. */
  comingSoon?: boolean;
}

/** Una diapositiva del producto estrella: captura + texto que la explica. */
export interface ProductSlide {
  /** Ruta a la captura, relativa a /public. */
  image: string;
  title: string;
  description: string;
}

/**
 * El producto propio destacado en la vitrina.
 *
 * Es lo que ToolsDevs vende como producto terminado, así que se muestra en
 * grande con un carrusel lento de capturas para que se pueda leer cada vista.
 */
export interface FeaturedProduct {
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  /** Etiqueta que lo distingue como producto propio (ej. "Producto estrella"). */
  badge: string;
  slides: ProductSlide[];
  cta: CallToAction;
}

export interface ProjectsContent {
  eyebrow: string;
  title: string;
  intro: string;
  /** Volanta encima del carrusel de logos de clientes. */
  clientsEyebrow: string;
  /** Etiqueta "Próximamente" para proyectos todavía sin link. */
  comingSoonLabel: string;
  /** Texto del botón que abre el sitio del cliente. */
  visitLabel: string;
  /** El producto propio, mostrado en grande al frente de la sección. */
  featured: FeaturedProduct;
  /** Los sitios de clientes, en tarjetas y en el carrusel de logos. */
  clients: ClientProject[];
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
  /** CTA al listado completo de proyectos, usado en la portada. */
  allProjects: string;
  notFoundTitle: string;
  notFoundText: string;
  notFoundCta: string;
  contactHeading: string;
  contactText: string;
  contactEyebrow: string;
  loading: string;
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
  /**
   * Primer paso: elegir el rubro. Es el que define qué preguntas siguen, para
   * que el diagnóstico se sienta hecho a la medida de cada negocio.
   */
  rubroStep: DiagnosisStep;
  /** Preguntas propias de cada rubro, indexadas por el id de la opción de rubro. */
  branches: Record<string, DiagnosisStep[]>;
  /** Pasos finales compartidos por todos los rubros (objetivo y etapa). */
  commonSteps: DiagnosisStep[];
  back: string;
  resultTitle: string;
  /** Recomendación personalizada por rubro, indexada por el id de la opción de rubro. */
  recommendations: Record<string, string>;
  /** Servicio concreto sugerido según la necesidad, indexado por el id de esa opción. */
  services: Record<string, string>;
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
