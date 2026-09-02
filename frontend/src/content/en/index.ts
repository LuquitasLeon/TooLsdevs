import type { SiteContent } from "@toolsdevs/shared";
import { routes } from "@/app/routes";

/**
 * Versión en inglés del contenido.
 *
 * Las rutas se mantienen en español a propósito: son las mismas URLs para todo
 * el mundo, así un enlace compartido funciona sin importar en qué idioma lo
 * abrieron.
 */
export const en: SiteContent = {
  locale: "en",

  nav: [
    { label: "Services", href: routes.services },
    { label: "Projects", href: routes.projects },
    { label: "How we work", href: routes.process },
  ],

  hero: {
    eyebrow: "Software development · Cybersecurity · Tucumán, Argentina",
    title: "We build tools",
    subtitle: "We develop ideas, we build solutions.",
    description:
      "We turn your company's problems into custom technology — with security built in from the very first line of code.",
    ctaPrimary: { label: "See our services", href: routes.services },
    ctaSecondary: { label: "Get in touch", href: routes.contact },
  },

  about: {
    eyebrow: "Who we are",
    title: "Three friends, one shared idea",
    paragraphs: [
      "ToolsDevs was founded by three friends and classmates from the Tucumán Regional Faculty of the National Technological University (UTN FRT), driven by the same goal: to grow, and to bring the market solutions that until then did not exist — for small businesses and large companies alike.",
      "We are a young company set on delivering services that make life easier for shop owners and for any business that needs to take the leap into technology, making our way in the market with fresh ideas and custom-built solutions.",
    ],
    mission: {
      title: "Mission",
      text: "At ToolsDevs we take our clients' problems and turn them into custom, cutting-edge development and cybersecurity solutions that drive their company's growth.",
    },
    vision: {
      title: "Vision",
      text: "To become a benchmark in technology development and cybersecurity across northwestern Argentina, taking our solutions to an international level through constant innovation and tools that solve real, everyday problems.",
    },
  },

  team: {
    eyebrow: "Our team",
    title: "Software technicians, graduates of UTN FRT",
    intro: "We work across every area of the company.",
    members: [
    {
      name: "Santiago Nicolás Ferreyra Appas",
      role: "Co-founder",
      detail: "Software Technician (UTN FRT)",
      photo: "/team/santiago.jpg",
    },
    {
      name: "Ismael Lucas León",
      role: "Co-founder",
      detail: "Software Technician (UTN FRT)",
      photo: "/team/ismael.jpg",
    },
    {
      name: "Luciano Agustín Llanos",
      role: "Co-founder",
      detail: "Software Technician (UTN FRT)",
      extra: "Cybersecurity Specialist — postgraduate diploma awarded by UTN",
      photo: "/team/luciano.jpg",
    },
    ],
  },

  services: {
    eyebrow: "What we do",
    title: "Our services",
    intro:
      "At ToolsDevs we design and build technology that helps companies and organisations streamline their processes, improve productivity and meet the challenges of going digital.",
    groups: [
      {
        id: "desarrollo",
        title: "Software Development",
        items: [
          "Corporate websites",
          "Management systems",
          "Web applications",
          "Desktop applications",
          "Process automation",
          "Systems integration",
          "SaaS solutions",
          "Custom-built tools",
        ],
      },
      {
        id: "seguridad",
        title: "Cybersecurity & Infrastructure",
        items: [
          "Security audits",
          "Web application security",
          "Wi-Fi network security",
          "Network infrastructure",
          "Structured cabling",
          "Rack assembly and organisation",
          "Security best practices",
        ],
      },
    ],
    callout:
      "What sets us apart: we build every web and desktop application applying, from the design stage, the same security standards we use when auditing our clients. Security is not bolted on at the end — it is there from the first line of code.",
  },

  problems: {
    eyebrow: "Challenges",
    title: "What problems do we solve?",
    intro:
      "Technology should help a business grow, not get in its way. At ToolsDevs we help solve challenges such as:",
    items: [
      "Manual processes that eat up time and resources.",
      "Information that is scattered and disorganised.",
      "The need to digitise a company's day-to-day operations.",
      "Outdated websites — or none at all.",
      "Systems that cannot keep up as the business grows.",
      "Information security risks.",
      "Inefficient or poorly configured networks.",
      "The need to centralise information and automate repetitive tasks.",
    ],
    callout:
      "Every project starts by understanding the client's problem, so the solution is built specifically for their reality.",
  },

  process: {
    eyebrow: "Method",
    title: "How we work",
    intro:
      "We believe a good project does not start by writing code, but by understanding the needs of whoever trusts us. That is why we follow a clear, transparent method:",
    steps: [
      {
        title: "First meeting",
        text: "We listen to the client, understand their processes and spot opportunities to improve.",
      },
      {
        title: "Analysis and planning",
        text: "We study the best technical solution, define the scope of the project and put together a tailored proposal.",
      },
      {
        title: "Design and development",
        text: "We build the tool using modern technology and applying good development and security practices from the start.",
      },
      {
        title: "Testing and validation",
        text: "We verify that the system works correctly before it goes live.",
      },
      {
        title: "Rollout",
        text: "We put the solution into production, supporting the client throughout the process.",
      },
      {
        title: "Support and continuous improvement",
        text: "We keep providing assistance, maintenance and new features as the company grows.",
      },
    ],
  },

  projects: {
    eyebrow: "Our work",
    title: "Projects already online",
    intro:
      "These are some of the sites and systems we built for real clients. Go in and take a look.",
    clientsEyebrow: "Companies that trust us",
    comingSoonLabel: "Coming soon",
    visitLabel: "Visit site",
    featured: {
      eyebrow: "Our own product",
      name: "ToolsShop",
      tagline: "Your online store and your management, in one system",
      description:
        "Our featured system: a complete e-commerce and management platform. Sell online 24/7, control stock across branches, manage orders, customers and roles, and make decisions with real data. All with separate admin, seller and customer views.",
      badge: "Featured system",
      cta: { label: "I want ToolsShop for my business", href: routes.contact },
      slides: [
        {
          image: "/producto/01-tienda-online-inicio.png",
          title: "Your business online, 24/7",
          description:
            "A professional presence with your brand and catalog, ready to sell around the clock.",
        },
        {
          image: "/producto/02-catalogo-productos.png",
          title: "Digital catalog with search and filters",
          description:
            "Your customers find the right product in seconds, with images, price and up-to-date stock.",
        },
        {
          image: "/producto/03-ficha-producto.png",
          title: "Product pages that sell",
          description:
            "Gallery, price, stock and description in one clear view, one click to add to cart.",
        },
        {
          image: "/producto/04-carrito-checkout.png",
          title: "A simple, reliable cart",
          description:
            "Order summary with automatic totals and shipping: less friction, more sales.",
        },
        {
          image: "/producto/05-gestion-stock.png",
          title: "Better stock control across branches",
          description:
            "Real-time stock per branch and one-click export to PDF/Excel.",
        },
        {
          image: "/producto/06-analitica-ventas.png",
          title: "Decisions from data, not gut feeling",
          description:
            "Revenue, orders, average ticket and best-sellers, with charts and export.",
        },
        {
          image: "/producto/07-gestion-pedidos.png",
          title: "All your orders in one place",
          description:
            "Status, customer, payment method and total of every sale, end to end.",
        },
        {
          image: "/producto/08-base-clientes.png",
          title: "Your customer base always at hand",
          description:
            "Centralized contacts to build loyalty and sell again.",
        },
        {
          image: "/producto/09-usuarios-roles.png",
          title: "Everyone with their own access",
          description:
            "Admin, seller and customer roles to work as a team, securely.",
        },
        {
          image: "/producto/10-servicios-postventa.png",
          title: "Professional after-sales that builds loyalty",
          description:
            "Receive and manage requests with statuses and tracking; your customers feel supported.",
        },
        {
          image: "/producto/11-personalizacion-web.png",
          title: "Update your site without coding",
          description:
            "Change homepage banners and offers from a simple panel, whenever you want.",
        },
        {
          image: "/producto/12-contenido-institucional.png",
          title: "Tell your story",
          description:
            "Edit the company's vision, mission and structure that your customers will see.",
        },
        {
          image: "/producto/13-favoritos.png",
          title: "A wishlist for your customers",
          description:
            "Each customer saves their favorite products and buys them again in one click: more repeat sales and loyalty.",
        },
        {
          image: "/producto/14-vendedor-punto-venta.png",
          title: "A point of sale for your team",
          description:
            "Sellers register sales at the counter: pick customer and branch, apply discounts or installments and confirm the order instantly.",
        },
      ],
    },
    clients: [
      {
        name: "Consultorios Villa Carmela",
        logo: "/logos/ConsultoriosVC.png",
        category: "Health",
        summary:
          "Institutional site for a health center in Villa Carmela: medical specialties, professionals, consulting-room rental and direct WhatsApp contact.",
        url: "https://www.consultoriovc.com/",
      },
      {
        name: "Partido Demócrata Progresista",
        logo: "/logos/PartidoDemocrataProgresista.png",
        category: "Institutional / Political",
        summary:
          "Platform for the PDP's Tucumán district: presents the government plan across five pillars, with membership and volunteer sign-up sections.",
        url: "https://partido-democrata-progresista.vercel.app/",
      },
      {
        name: "EndPoint Security",
        logo: "/logos/EndPoint.png",
        category: "Cybersecurity",
        summary:
          "Corporate site for a cybersecurity company: prevention, protection and incident-response services, training and its own Cyber Challenge.",
        url: "https://web-iota-two-64.vercel.app/",
      },
      {
        name: "La Posta 381",
        logo: "/logos/LaPosta381.jpeg",
        category: "Media / News",
        summary:
          "A magazine-style portal to inform the people of Tucumán: news, articles and local current affairs with a fast reading experience. In development.",
        comingSoon: true,
      },
    ],
  },

  stack: {
    eyebrow: "Technology",
    title: "What we work with",
    intro:
      "We pick modern technology with an active community and long-term support. We do not use something because it is trendy, but because the project calls for it.",
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
      { id: "redes", name: "Networking & cabling", category: "infraestructura" },
      { id: "auditorias", name: "Web audits", category: "seguridad" },
      { id: "hardening", name: "Server hardening", category: "seguridad" },
      { id: "wifi", name: "Wi-Fi security", category: "seguridad" },
    ],
  },

  homeTeasers: {
    services: {
      eyebrow: "Services",
      title: "Custom solutions for your business",
      highlights: [
        "We build management systems and automate repetitive processes",
        "We create websites and applications with security built in from the design stage",
        "We offer SaaS solutions on a monthly fee, with no high upfront cost",
      ],
      cta: { label: "See all our services", href: routes.services },
    },
    process: {
      eyebrow: "Method",
      title: "How we approach every project",
      highlights: [
        "We start by listening: we understand your problem before writing a single line of code",
        "We propose a tailored solution with a clear scope and budget",
        "We support you through the rollout and beyond",
      ],
      cta: { label: "See how we work", href: routes.process },
    },
  },

  whyUs: {
    eyebrow: "Clients choose us because...",
    title: "Why choose us?",
    intro:
      "Because we understand that every company is different, and we believe technology should adapt to the business, not the other way round. At ToolsDevs we work as our clients' technology partners, getting involved in every project to build tools that produce real results.",
    homeCta: { label: "See why clients choose us", href: routes.process },
    reasons: [
      "We build fully custom solutions.",
      "We analyse every need before proposing a solution.",
      "We build security in from the design stage.",
      "We use modern, scalable technology.",
      "You talk directly to the people building your system.",
      "We support you before, during and after every rollout.",
      "We work with commitment, transparency and a focus on results.",
      "We create tools designed to grow alongside each company.",
    ],
  },

  philosophy: {
    eyebrow: "Philosophy",
    title: "Our philosophy",
    paragraphs: [
      "At ToolsDevs we do not believe every company needs the same system. We believe every business has its own processes, goals and challenges.",
      "That is why we do not build generic solutions: we create tools designed to solve real problems, simplify daily work and support the growth of those who trust us.",
    ],
    quote: "We don't sell software. We build tools.",
  },

  ui: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mainNav: "Main",
    contactCta: "Get in touch",
    languageLabel: "Change language",
    allProjects: "See all projects",
    notFoundTitle: "This page doesn't exist",
    notFoundText:
      "The link may be misspelled, or the page may have moved. Head back to the home page and carry on from there.",
    notFoundCta: "Go to home page",
    contactHeading: "We turn your company's problem into a tool",
    contactText: "Tell us what you need and we'll get back to you shortly.",
    contactEyebrow: "Contact",
    loading: "Loading…",
    form: {
      title: "Write to us",
      nameLabel: "Name",
      emailLabel: "Email",
      companyLabel: "Company",
      phoneLabel: "Phone",
      messageLabel: "How can we help?",
      optional: "optional",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Thanks for reaching out!",
      successText: "We got your message and will get back to you shortly.",
      errorGeneric: "We couldn't send your message. Try again or reach us on WhatsApp.",
      serviceLabel: "Service of interest",
    },
    diagnosis: {
      eyebrow: "Quick diagnosis",
      title: "Not sure where to start?",
      intro:
        "Answer three quick questions and we'll tell you which solution fits your need best.",
      start: "Start",
      steps: [
        {
          id: "problema",
          question: "What's your main challenge today?",
          options: [
            { id: "procesos", label: "Manual tasks that eat up my time" },
            { id: "presencia", label: "I have no web presence, or it's outdated" },
            { id: "sistema", label: "I need a custom system for my business" },
            { id: "seguridad", label: "I'm worried about the security of my data or networks" },
          ],
        },
        {
          id: "rubro",
          question: "What does your company do?",
          options: [
            { id: "comercio", label: "Shop or retail" },
            { id: "servicios", label: "Professional services" },
            { id: "industria", label: "Industry or logistics" },
            { id: "otro", label: "Other" },
          ],
        },
        {
          id: "etapa",
          question: "What stage are you at?",
          options: [
            { id: "idea", label: "It's an idea, I'm exploring" },
            { id: "creciendo", label: "I'm up and running and want to improve" },
            { id: "urgente", label: "I have a specific problem to solve" },
          ],
        },
      ],
      back: "Back",
      resultTitle: "What we recommend",
      recommendations: {
        procesos:
          "A custom web platform or a management system that automates those repetitive tasks and centralises your information.",
        presencia:
          "A professional, fast, mobile-first corporate website, so people can find and contact you with ease.",
        sistema:
          "A custom web application that follows your business's real process, or a SaaS solution on a monthly fee to start with less investment.",
        seguridad:
          "A security audit of your applications and networks, plus best practices and monitoring in place.",
      },
      toForm: "Let's talk about this",
      restart: "Start over",
      progress: "Step {current} of {total}",
    },
  },
};
