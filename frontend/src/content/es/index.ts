import type { SiteContent } from "@toolsdevs/shared";
import { routes } from "@/app/routes";

export const es: SiteContent = {
  locale: "es",

  nav: [
    { label: "Servicios", href: routes.services },
    { label: "Proyectos", href: routes.projects },
    { label: "Cómo trabajamos", href: routes.process },
  ],

  hero: {
    eyebrow: "Desarrollo de software · Ciberseguridad · Tucumán, Argentina",
    title: "Creamos herramientas",
    subtitle: "Desarrollamos ideas, construimos soluciones.",
    description:
      "Transformamos los problemas de tu empresa en soluciones tecnológicas a medida — con la seguridad incorporada desde la primera línea de código.",
    ctaPrimary: { label: "Ver servicios", href: routes.services },
    ctaSecondary: { label: "Contactanos", href: routes.contact },
  },

  about: {
    eyebrow: "Quiénes somos",
    title: "Tres amigos, una misma idea",
    paragraphs: [
      "ToolsDevs nació de la mano de tres amigos y compañeros de la Facultad Regional Tucumán de la Universidad Tecnológica Nacional (UTN FRT), unidos por las mismas ganas: crecer y ofrecer al mercado soluciones que hasta entonces no existían, tanto para pequeñas como para grandes empresas.",
      "Somos una empresa joven que busca brindar servicios que le hagan la vida más fácil al comerciante y a cualquier empresa que necesite dar el salto hacia la tecnología, abriéndonos paso en el mercado con ideas frescas y soluciones a medida.",
    ],
    mission: {
      title: "Misión",
      text: "En ToolsDevs tomamos los problemas de nuestros clientes y los transformamos en soluciones tecnológicas de desarrollo y ciberseguridad, a medida y de vanguardia, que impulsan el crecimiento de su empresa.",
    },
    vision: {
      title: "Visión",
      text: "Ser una empresa referente en desarrollo tecnológico y ciberseguridad en todo el NOA, proyectando nuestras soluciones a nivel internacional, a través de la innovación constante y la creación de herramientas que resuelvan problemas reales del día a día.",
    },
  },

  team: {
    eyebrow: "Nuestro equipo",
    title: "Técnicos programadores, graduados de la UTN FRT",
    intro: "Trabajamos de manera integral en todas las áreas de la empresa.",
    members: [
    {
      name: "Santiago Nicolás Ferreyra Appas",
      role: "Cofundador",
      detail: "Técnico Programador (UTN FRT)",
      photo: "/team/santiago.jpg",
    },
    {
      name: "Lucas Ismael León",
      role: "Cofundador",
      detail: "Técnico Programador (UTN FRT)",
      photo: "/team/ismael.jpg",
    },
    {
      name: "Luciano Agustín Llanos",
      role: "Cofundador",
      detail: "Técnico Programador (UTN FRT)",
      extra: "Especialista en Ciberseguridad — Diplomatura otorgada por la UTN",
      photo: "/team/luciano.jpg",
    },
    ],
  },

  services: {
    eyebrow: "Qué hacemos",
    title: "Nuestros servicios",
    intro:
      "En ToolsDevs diseñamos y desarrollamos herramientas tecnológicas que ayudan a empresas y organizaciones a optimizar sus procesos, mejorar su productividad y afrontar los desafíos de la transformación digital.",
    groups: [
      {
        id: "desarrollo",
        title: "Desarrollo de Software",
        items: [
          "Desarrollo de sitios web institucionales",
          "Desarrollo de sistemas de gestión",
          "Desarrollo de aplicaciones web",
          "Desarrollo de aplicaciones de escritorio",
          "Automatización de procesos",
          "Integración de sistemas",
          "Soluciones SaaS (Software como Servicio)",
          "Desarrollo de herramientas a medida",
        ],
      },
      {
        id: "seguridad",
        title: "Ciberseguridad e Infraestructura",
        items: [
          "Auditorías de seguridad",
          "Seguridad en aplicaciones web",
          "Seguridad en redes Wi-Fi",
          "Infraestructura de redes",
          "Cableado estructurado",
          "Armado y organización de racks",
          "Implementación de buenas prácticas de seguridad",
        ],
      },
    ],
    callout:
      "Nuestro plus: desarrollamos cada aplicación web y de escritorio aplicando desde el diseño los mismos estándares de seguridad que utilizamos al auditar a nuestros clientes. La seguridad no se agrega al final: viene incorporada desde la primera línea de código.",
  },

  problems: {
    eyebrow: "Desafíos",
    title: "¿Qué problemas resolvemos?",
    intro:
      "La tecnología debe ser una herramienta para hacer crecer un negocio, no un obstáculo. En ToolsDevs ayudamos a resolver desafíos como:",
    items: [
      "Procesos manuales que consumen tiempo y recursos.",
      "Falta de organización de la información.",
      "Necesidad de digitalizar la operación de una empresa.",
      "Sitios web desactualizados o inexistentes.",
      "Sistemas que no se adaptan al crecimiento del negocio.",
      "Riesgos de seguridad informática.",
      "Redes poco eficientes o mal configuradas.",
      "Necesidad de centralizar información y automatizar tareas repetitivas.",
    ],
    callout:
      "Cada proyecto comienza entendiendo el problema del cliente para desarrollar una solución pensada específicamente para su realidad.",
  },

  process: {
    eyebrow: "Metodología",
    title: "¿Cómo trabajamos?",
    intro:
      "Creemos que un buen proyecto no comienza escribiendo código, sino entendiendo las necesidades de quien confía en nosotros. Por eso seguimos una metodología de trabajo clara y transparente:",
    steps: [
      {
        title: "Reunión inicial",
        text: "Escuchamos al cliente, comprendemos sus procesos y detectamos oportunidades de mejora.",
      },
      {
        title: "Análisis y planificación",
        text: "Estudiamos la mejor solución tecnológica, definimos el alcance del proyecto y elaboramos una propuesta personalizada.",
      },
      {
        title: "Diseño y desarrollo",
        text: "Construimos la herramienta utilizando tecnologías modernas y aplicando buenas prácticas de desarrollo y seguridad desde el inicio.",
      },
      {
        title: "Pruebas y validación",
        text: "Verificamos el correcto funcionamiento del sistema antes de su implementación.",
      },
      {
        title: "Implementación",
        text: "Ponemos la solución en funcionamiento acompañando al cliente durante todo el proceso.",
      },
      {
        title: "Soporte y mejora continua",
        text: "Continuamos brindando asistencia, mantenimiento y evolución del sistema para acompañar el crecimiento de la empresa.",
      },
    ],
  },

  projects: {
    eyebrow: "Trabajos realizados",
    title: "Casos de uso y proyectos realizados",
    intro:
      "Desde nuestros inicios desarrollamos soluciones para distintos tipos de organizaciones y empresas, enfocándonos siempre en resolver necesidades reales.",
    // NOTA: todas estas fichas están marcadas con `draft: true`. Los textos de
    // problema/solución/resultados y las cifras son de EJEMPLO, para mostrar
    // cómo se ve una ficha completa. Al reemplazarlos por datos reales, borrar
    // `draft: true` de esa ficha y el aviso desaparece solo.
    items: [
      {
        slug: "sistema-gestion-logistica",
        title: "Sistema de Gestión Logística",
        summary:
          "Plataforma para la administración integral de repartos, clientes, productos y estadísticas operativas.",
        category: "desarrollo",
        client: "Empresa de logística — Tucumán",
        featured: true,
        draft: true,
        year: "2024",
        problem:
          "El seguimiento de repartos se llevaba en planillas separadas y mensajes de WhatsApp. No había una vista única del día, los errores de carga eran frecuentes y armar un informe mensual llevaba horas.",
        solution:
          "Desarrollamos una plataforma web centralizada con panel de repartos en tiempo real, gestión de clientes y productos, y reportes automáticos. Cada rol accede sólo a lo que necesita, con la seguridad aplicada desde el diseño.",
        results: [
          "Reducción del tiempo de armado de informes de horas a minutos.",
          "Una única fuente de verdad para todo el equipo de reparto.",
          "Menos errores de carga gracias a validaciones automáticas.",
        ],
        stack: ["react", "typescript", "node", "postgresql"],
        images: [
          {
            src: "/proyectos/gestion-logistica.svg",
            alt: "Boceto ilustrativo del panel de gestión logística con indicadores, gráfico y mapa de repartos",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "sitios-web-institucionales",
        title: "Sitios Web Institucionales",
        summary:
          "Páginas web profesionales para empresas, organizaciones y comercios que buscan fortalecer su presencia digital.",
        category: "desarrollo",
        client: "Comercios y organizaciones del NOA",
        featured: true,
        draft: true,
        problem:
          "Muchos comercios de la región no tenían presencia web o dependían de una página desactualizada que no reflejaba lo que hacían ni funcionaba bien en el celular.",
        solution:
          "Diseñamos y desarrollamos sitios institucionales rápidos, accesibles y pensados para móviles primero, con foco en que el cliente pueda encontrarlos y contactarlos con facilidad.",
        results: [
          "Presencia digital profesional lista para compartir.",
          "Sitios que cargan rápido y se ven bien en cualquier pantalla.",
          "Mejor posicionamiento en búsquedas locales.",
        ],
        stack: ["react", "typescript", "tailwind"],
        images: [
          {
            src: "/proyectos/sitio-institucional.svg",
            alt: "Boceto ilustrativo de un sitio web institucional con portada, menú y tarjetas",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "plataformas-web-personalizadas",
        title: "Plataformas Web Personalizadas",
        summary:
          "Aplicaciones web adaptadas completamente a los procesos internos de cada cliente.",
        category: "desarrollo",
        client: "Varios clientes",
        featured: false,
        draft: true,
        problem:
          "Los sistemas genéricos del mercado obligaban a cada empresa a adaptar su forma de trabajar al software, en vez de al revés, dejando tareas importantes fuera del sistema.",
        solution:
          "Construimos plataformas a medida que siguen el proceso real de cada cliente: los flujos, los estados y los permisos son los que ya usan, ahora ordenados y automatizados.",
        results: [
          "El sistema se adapta al negocio, no al revés.",
          "Tareas repetitivas automatizadas.",
          "Información centralizada y accesible para el equipo.",
        ],
        stack: ["react", "typescript", "node", "postgresql", "docker"],
        images: [
          {
            src: "/proyectos/plataforma-web.svg",
            alt: "Boceto ilustrativo de una plataforma web a medida con tablero, formulario y flujo de proceso",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "soluciones-saas",
        title: "Soluciones SaaS",
        summary:
          "Plataformas bajo modalidad de alquiler mensual, que reducen costos iniciales y aseguran mantenimiento continuo.",
        category: "desarrollo",
        client: "Pymes del NOA",
        featured: true,
        draft: true,
        problem:
          "Adquirir un sistema propio implicaba una inversión inicial alta que muchas pymes no podían afrontar, y quedarse sin mantenimiento después.",
        solution:
          "Ofrecemos nuestras herramientas como servicio, con una cuota mensual accesible que incluye hosting, actualizaciones y soporte, para que el cliente pague por usar y no por empezar.",
        results: [
          "Costo inicial reducido al mínimo.",
          "Actualizaciones y mantenimiento incluidos.",
          "El cliente crece y el sistema lo acompaña.",
        ],
        stack: ["react", "typescript", "node", "postgresql", "nginx"],
      },
      {
        slug: "infraestructura-tecnologica",
        title: "Infraestructura Tecnológica",
        summary:
          "Diseño e implementación de redes, cableado estructurado y armado de racks para mejorar la conectividad y la seguridad.",
        category: "infraestructura",
        client: "Empresas de Tucumán",
        featured: false,
        draft: true,
        problem:
          "Redes armadas sin planificación, con cableado desordenado y equipos mal ubicados, que generaban cortes, lentitud y puntos ciegos de seguridad.",
        solution:
          "Rediseñamos la infraestructura de red: cableado estructurado, racks ordenados y equipamiento bien configurado, documentando todo para que el mantenimiento futuro sea simple.",
        results: [
          "Conexión más estable y rápida.",
          "Infraestructura ordenada y documentada.",
          "Base lista para crecer sin rehacer todo.",
        ],
        stack: ["redes", "linux", "hardening"],
      },
      {
        slug: "seguridad-informatica",
        title: "Seguridad Informática",
        summary:
          "Evaluación e implementación de medidas de protección para aplicaciones y redes empresariales.",
        category: "seguridad",
        client: "Empresas de Tucumán",
        featured: false,
        draft: true,
        problem:
          "Aplicaciones y redes en producción sin una revisión de seguridad, con vulnerabilidades conocidas expuestas y sin un plan claro ante un incidente.",
        solution:
          "Auditamos las aplicaciones y la red, corregimos las vulnerabilidades encontradas y dejamos implementadas buenas prácticas y monitoreo, siguiendo el mismo estándar que aplicamos a lo que desarrollamos.",
        results: [
          "Vulnerabilidades detectadas y corregidas.",
          "Buenas prácticas de seguridad implementadas.",
          "Equipo con criterios claros para mantener la protección.",
        ],
        stack: ["auditorias", "hardening", "wifi"],
      },
    ],
  },

  stack: {
    eyebrow: "Tecnologías",
    title: "Con qué trabajamos",
    intro:
      "Elegimos tecnologías modernas, con comunidad activa y soporte a largo plazo. No usamos algo porque esté de moda, sino porque el proyecto lo pide.",
    items: [
      { id: "react", name: "React", category: "frontend" },
      { id: "typescript", name: "TypeScript", category: "frontend" },
      { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
      { id: "node", name: "Node.js", category: "backend" },
      { id: "express", name: "Express", category: "backend" },
      { id: "python", name: "Python", category: "backend" },
      { id: "postgresql", name: "PostgreSQL", category: "datos" },
      { id: "mysql", name: "MySQL", category: "datos" },
      { id: "docker", name: "Docker", category: "infraestructura" },
      { id: "linux", name: "Linux", category: "infraestructura" },
      { id: "nginx", name: "Nginx", category: "infraestructura" },
      { id: "redes", name: "Redes y cableado", category: "infraestructura" },
      { id: "auditorias", name: "Auditorías web", category: "seguridad" },
      { id: "hardening", name: "Hardening de servidores", category: "seguridad" },
      { id: "wifi", name: "Seguridad Wi-Fi", category: "seguridad" },
    ],
  },

  homeTeasers: {
    services: {
      eyebrow: "Servicios",
      title: "Soluciones a medida para tu empresa",
      highlights: [
        "Desarrollamos sistemas de gestión y automatizamos procesos repetitivos",
        "Creamos sitios web y aplicaciones con seguridad incorporada desde el diseño",
        "Ofrecemos soluciones SaaS con cuota mensual, sin inversión inicial alta",
      ],
      cta: { label: "Ver todos los servicios", href: routes.services },
    },
    process: {
      eyebrow: "Metodología",
      title: "Cómo encaramos cada proyecto",
      highlights: [
        "Empezamos escuchando: entendemos tu problema antes de escribir código",
        "Proponemos una solución a medida con alcance y presupuesto claro",
        "Te acompañamos en la implementación y después del lanzamiento",
      ],
      cta: { label: "Conocé nuestra metodología", href: routes.process },
    },
  },

  whyUs: {
    eyebrow: "Nos eligen porque...",
    title: "¿Por qué elegirnos?",
    intro:
      "Porque entendemos que cada empresa es diferente y creemos que la tecnología debe adaptarse al negocio, y no al revés. En ToolsDevs trabajamos como socios tecnológicos de nuestros clientes, involucrándonos en cada proyecto para desarrollar herramientas que generen resultados reales.",
    homeCta: { label: "Ver por qué nos eligen", href: routes.process },
    reasons: [
      "Desarrollamos soluciones completamente personalizadas.",
      "Analizamos cada necesidad antes de proponer una solución.",
      "Incorporamos seguridad desde el diseño del proyecto.",
      "Utilizamos tecnologías modernas y escalables.",
      "Brindamos comunicación directa con quienes desarrollan el sistema.",
      "Ofrecemos acompañamiento antes, durante y después de cada implementación.",
      "Trabajamos con compromiso, transparencia y orientación a resultados.",
      "Creamos herramientas pensadas para crecer junto a cada empresa.",
    ],
  },

  philosophy: {
    eyebrow: "Filosofía",
    title: "Nuestra filosofía",
    paragraphs: [
      "En ToolsDevs no creemos que todas las empresas necesiten el mismo sistema. Creemos que cada negocio tiene procesos, objetivos y desafíos propios.",
      "Por eso no desarrollamos soluciones genéricas: creamos herramientas tecnológicas pensadas para resolver problemas reales, simplificar el trabajo diario y acompañar el crecimiento de quienes confían en nosotros.",
    ],
    quote: "No vendemos software. Creamos herramientas.",
  },

  ui: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    mainNav: "Principal",
    contactCta: "Contactanos",
    languageLabel: "Cambiar idioma",
    backToProjects: "Volver a proyectos",
    viewProject: "Ver el proyecto",
    allProjects: "Ver todos los proyectos",
    filterAll: "Todos",
    categories: {
      desarrollo: "Desarrollo",
      infraestructura: "Infraestructura",
      seguridad: "Seguridad",
    },
    projectClient: "Cliente",
    projectProblem: "El problema",
    projectSolution: "La solución",
    projectResults: "Resultados",
    projectStack: "Tecnologías",
    draftBadge: "Ejemplo",
    draftNotice:
      "Los datos de este caso son ilustrativos, a modo de ejemplo. Pronto los reemplazaremos por información real del proyecto.",
    notFoundTitle: "Esta página no existe",
    notFoundText:
      "El enlace puede estar mal escrito o la página pudo haberse movido. Volvé al inicio y seguí desde ahí.",
    notFoundCta: "Ir al inicio",
    contactHeading: "Convertimos el problema de tu empresa en una herramienta",
    contactText: "Contanos qué necesitás y te respondemos a la brevedad.",
    contactEyebrow: "Contacto",
    loading: "Cargando…",
    backToTop: "Volver arriba",
    form: {
      title: "Escribinos",
      nameLabel: "Nombre",
      emailLabel: "Email",
      companyLabel: "Empresa",
      phoneLabel: "Teléfono",
      messageLabel: "¿En qué te podemos ayudar?",
      optional: "opcional",
      submit: "Enviar consulta",
      sending: "Enviando…",
      successTitle: "¡Gracias por escribirnos!",
      successText: "Recibimos tu consulta y te respondemos a la brevedad.",
      errorGeneric:
        "No pudimos enviar la consulta. Probá de nuevo o escribinos por WhatsApp.",
      serviceLabel: "Servicio de interés",
    },
    diagnosis: {
      eyebrow: "Diagnóstico",
      title: "¿No sabés por dónde empezar?",
      intro:
        "Respondé tres preguntas rápidas y te decimos qué solución encaja mejor con tu necesidad.",
      start: "Empezar",
      steps: [
        {
          id: "problema",
          question: "¿Cuál es tu principal desafío hoy?",
          options: [
            { id: "procesos", label: "Tareas manuales que me consumen tiempo" },
            { id: "presencia", label: "No tengo presencia web o está desactualizada" },
            { id: "sistema", label: "Necesito un sistema a medida para mi negocio" },
            { id: "seguridad", label: "Me preocupa la seguridad de mis datos o redes" },
          ],
        },
        {
          id: "rubro",
          question: "¿A qué se dedica tu empresa?",
          options: [
            { id: "comercio", label: "Comercio o local" },
            { id: "servicios", label: "Servicios profesionales" },
            { id: "industria", label: "Industria o logística" },
            { id: "otro", label: "Otro" },
          ],
        },
        {
          id: "etapa",
          question: "¿En qué etapa estás?",
          options: [
            { id: "idea", label: "Es una idea, estoy explorando" },
            { id: "creciendo", label: "Ya opero y quiero mejorar" },
            { id: "urgente", label: "Tengo un problema puntual que resolver" },
          ],
        },
      ],
      back: "Atrás",
      resultTitle: "Lo que te recomendamos",
      recommendations: {
        procesos:
          "Una plataforma web a medida o un sistema de gestión que automatice esas tareas repetitivas y centralice tu información.",
        presencia:
          "Un sitio web institucional profesional, rápido y pensado para móviles, para que te encuentren y te contacten con facilidad.",
        sistema:
          "Una aplicación web personalizada que siga el proceso real de tu negocio, o una solución SaaS con cuota mensual para arrancar con menor inversión.",
        seguridad:
          "Una auditoría de seguridad de tus aplicaciones y redes, más la implementación de buenas prácticas y monitoreo.",
      },
      toForm: "Hablemos de esto",
      restart: "Empezar de nuevo",
      progress: "Paso {current} de {total}",
    },
  },
};
