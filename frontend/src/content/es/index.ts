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
      name: "Ismael Lucas León",
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
    title: "Proyectos que ya están online",
    intro:
      "Estos son algunos de los sitios y sistemas que construimos para clientes reales. Entrá y conocelos.",
    clientsEyebrow: "Empresas que confían en nosotros",
    comingSoonLabel: "Próximamente",
    visitLabel: "Visitar sitio",
    featured: {
      eyebrow: "Producto propio",
      name: "ToolsShop",
      tagline: "Tu tienda online y tu gestión, en un solo sistema",
      description:
        "Nuestro sistema destacado: una plataforma completa de e-commerce y gestión. Vendé online las 24 horas, controlá el stock entre sucursales, gestioná pedidos, clientes y roles, y tomá decisiones con datos reales. Todo con vistas separadas de administrador, vendedor y cliente.",
      badge: "Sistema destacado",
      cta: { label: "Quiero ToolsShop para mi empresa", href: routes.contact },
      slides: [
        {
          image: "/producto/01-tienda-online-inicio.png",
          title: "Tu empresa online, 24/7",
          description:
            "Presencia profesional con tu marca y catálogo, lista para vender a toda hora.",
        },
        {
          image: "/producto/02-catalogo-productos.png",
          title: "Catálogo digital con buscador y filtros",
          description:
            "Tus clientes encuentran el producto ideal en segundos, con imágenes, precio y stock actualizados.",
        },
        {
          image: "/producto/03-ficha-producto.png",
          title: "Fichas de producto que venden",
          description:
            "Galería, precio, stock y descripción en una vista clara, con un clic para agregar al carrito.",
        },
        {
          image: "/producto/04-carrito-checkout.png",
          title: "Carrito simple y confiable",
          description:
            "Resumen del pedido y cálculo automático de totales y envío: menos fricción, más ventas.",
        },
        {
          image: "/producto/05-gestion-stock.png",
          title: "Mejor control del stock entre sucursales",
          description:
            "Stock por sucursal en tiempo real y exportación a PDF/Excel con un clic.",
        },
        {
          image: "/producto/06-analitica-ventas.png",
          title: "Decisiones con datos, no con intuición",
          description:
            "Ingresos, pedidos, ticket promedio y productos más vendidos, con gráficos y exportación.",
        },
        {
          image: "/producto/07-gestion-pedidos.png",
          title: "Todos tus pedidos en un solo lugar",
          description:
            "Estado, cliente, forma de pago y total de cada venta, de principio a fin.",
        },
        {
          image: "/producto/08-base-clientes.png",
          title: "Tu base de clientes siempre a mano",
          description:
            "Contactos centralizados para fidelizar y volver a vender.",
        },
        {
          image: "/producto/09-usuarios-roles.png",
          title: "Cada quien con su acceso",
          description:
            "Roles de administrador, vendedor y cliente para trabajar en equipo con seguridad.",
        },
        {
          image: "/producto/10-servicios-postventa.png",
          title: "Post-venta profesional que fideliza",
          description:
            "Recibí y gestioná solicitudes con estados y seguimiento; tus clientes se sienten acompañados.",
        },
        {
          image: "/producto/11-personalizacion-web.png",
          title: "Actualizá tu web sin programar",
          description:
            "Cambiá banners y ofertas del inicio desde un panel simple, cuando quieras.",
        },
        {
          image: "/producto/12-contenido-institucional.png",
          title: "Contá tu historia",
          description:
            "Editá visión, misión y estructura de la empresa que verán tus clientes.",
        },
        {
          image: "/producto/13-favoritos.png",
          title: "Lista de deseos para tus clientes",
          description:
            "Cada cliente guarda sus productos favoritos y vuelve a comprarlos en un clic: más recompra y fidelización.",
        },
        {
          image: "/producto/14-vendedor-punto-venta.png",
          title: "Punto de venta para tu equipo",
          description:
            "El vendedor registra ventas en el mostrador: elige cliente y sucursal, aplica descuentos o cuotas y confirma el pedido al instante.",
        },
      ],
    },
    clients: [
      {
        name: "Consultorios Villa Carmela",
        logo: "/logos/ConsultoriosVC.png",
        category: "Salud",
        summary:
          "Sitio institucional para un centro de salud en Villa Carmela: especialidades médicas, profesionales, alquiler de consultorios y contacto directo por WhatsApp.",
        url: "https://www.consultoriovc.com/",
      },
      {
        name: "Partido Demócrata Progresista",
        logo: "/logos/PartidoDemocrataProgresista.png",
        category: "Institucional / Político",
        summary:
          "Plataforma del distrito Tucumán del PDP: presenta el plan de gobierno en cinco ejes, con secciones de afiliación y sumatoria de voluntarios.",
        url: "https://partido-democrata-progresista.vercel.app/",
      },
      {
        name: "EndPoint Security",
        logo: "/logos/EndPoint.png",
        category: "Ciberseguridad",
        summary:
          "Sitio corporativo de una empresa de ciberseguridad: servicios de prevención, protección y respuesta a incidentes, capacitaciones y su propio Cyber Challenge.",
        url: "https://web-iota-two-64.vercel.app/",
      },
      {
        name: "La Posta 381",
        logo: "/logos/LaPosta381.jpeg",
        category: "Medios / Noticias",
        summary:
          "Portal estilo revista para informar al tucumano: noticias, notas y actualidad local con una experiencia de lectura ágil. En desarrollo.",
        comingSoon: true,
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
    allProjects: "Ver todos los proyectos",
    notFoundTitle: "Esta página no existe",
    notFoundText:
      "El enlace puede estar mal escrito o la página pudo haberse movido. Volvé al inicio y seguí desde ahí.",
    notFoundCta: "Ir al inicio",
    contactHeading: "Convertimos el problema de tu empresa en una herramienta",
    contactText: "Contanos qué necesitás y te respondemos a la brevedad.",
    contactEyebrow: "Contacto",
    loading: "Cargando…",
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
