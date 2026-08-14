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
      name: "Lucas Ismael León",
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
    title: "Case studies and completed projects",
    intro:
      "Since day one we have built solutions for all kinds of organisations and companies, always focused on solving real needs.",
    // NOTE: every card here is flagged `draft: true`. The problem/solution/
    // results text and the figures are PLACEHOLDERS that show how a complete
    // case study looks. When real data replaces them, remove `draft: true` from
    // that card and the notice disappears on its own.
    items: [
      {
        slug: "sistema-gestion-logistica",
        title: "Logistics Management System",
        summary:
          "A platform to manage deliveries, customers, products and operational statistics end to end.",
        category: "desarrollo",
        client: "Logistics company — Tucumán",
        featured: true,
        draft: true,
        year: "2024",
        problem:
          "Delivery tracking lived across separate spreadsheets and WhatsApp messages. There was no single view of the day, data-entry mistakes were common, and putting together a monthly report took hours.",
        solution:
          "We built a centralised web platform with a real-time delivery board, customer and product management, and automatic reports. Each role only sees what it needs, with security applied from the design stage.",
        results: [
          "Report preparation cut from hours to minutes.",
          "A single source of truth for the whole delivery team.",
          "Fewer data-entry errors thanks to automatic validation.",
        ],
        stack: ["react", "typescript", "node", "postgresql"],
        images: [
          {
            src: "/proyectos/gestion-logistica.svg",
            alt: "Illustrative sketch of the logistics dashboard with metrics, a chart and a delivery map",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "sitios-web-institucionales",
        title: "Corporate Websites",
        summary:
          "Professional websites for companies, organisations and shops looking to strengthen their online presence.",
        category: "desarrollo",
        client: "Businesses and organisations in northwestern Argentina",
        featured: true,
        draft: true,
        problem:
          "Many local businesses had no web presence, or relied on an outdated page that no longer reflected what they did and worked poorly on mobile.",
        solution:
          "We designed and built fast, accessible, mobile-first corporate sites, focused on making the business easy to find and easy to contact.",
        results: [
          "A professional digital presence ready to share.",
          "Sites that load fast and look good on any screen.",
          "Better ranking in local searches.",
        ],
        stack: ["react", "typescript", "tailwind"],
        images: [
          {
            src: "/proyectos/sitio-institucional.svg",
            alt: "Illustrative sketch of a corporate website with a hero, menu and cards",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "plataformas-web-personalizadas",
        title: "Custom Web Platforms",
        summary: "Web applications shaped entirely around each client's internal processes.",
        category: "desarrollo",
        client: "Several clients",
        featured: false,
        draft: true,
        problem:
          "Off-the-shelf systems forced each company to bend its way of working to the software, rather than the other way round, leaving important tasks outside the system.",
        solution:
          "We built custom platforms that follow each client's real process: the flows, states and permissions are the ones they already use, now organised and automated.",
        results: [
          "The system adapts to the business, not the other way round.",
          "Repetitive tasks automated.",
          "Centralised information the whole team can reach.",
        ],
        stack: ["react", "typescript", "node", "postgresql", "docker"],
        images: [
          {
            src: "/proyectos/plataforma-web.svg",
            alt: "Illustrative sketch of a custom web platform with a board, a form and a process flow",
            width: 800,
            height: 500,
          },
        ],
      },
      {
        slug: "soluciones-saas",
        title: "SaaS Solutions",
        summary:
          "Platforms on a monthly subscription, cutting upfront costs and guaranteeing ongoing maintenance.",
        category: "desarrollo",
        client: "Small and medium businesses",
        featured: true,
        draft: true,
        problem:
          "Owning a system meant a high upfront investment many small businesses could not afford — and being left without maintenance afterwards.",
        solution:
          "We offer our tools as a service, with an affordable monthly fee that includes hosting, updates and support, so the client pays to use it, not to get started.",
        results: [
          "Upfront cost reduced to a minimum.",
          "Updates and maintenance included.",
          "The client grows and the system keeps up.",
        ],
        stack: ["react", "typescript", "node", "postgresql", "nginx"],
      },
      {
        slug: "infraestructura-tecnologica",
        title: "Technology Infrastructure",
        summary:
          "Network design and rollout, structured cabling and rack assembly to improve connectivity and security.",
        category: "infraestructura",
        client: "Companies in Tucumán",
        featured: false,
        draft: true,
        problem:
          "Networks put together without planning, with messy cabling and poorly placed equipment, causing outages, slowdowns and security blind spots.",
        solution:
          "We redesigned the network infrastructure: structured cabling, tidy racks and well-configured equipment, documenting everything so future maintenance is simple.",
        results: [
          "A more stable, faster connection.",
          "Tidy, documented infrastructure.",
          "A base ready to grow without redoing everything.",
        ],
        stack: ["redes", "linux", "hardening"],
      },
      {
        slug: "seguridad-informatica",
        title: "Information Security",
        summary:
          "Assessment and rollout of protective measures for business applications and networks.",
        category: "seguridad",
        client: "Companies in Tucumán",
        featured: false,
        draft: true,
        problem:
          "Applications and networks in production with no security review, with known vulnerabilities exposed and no clear plan in case of an incident.",
        solution:
          "We audited the applications and the network, fixed the vulnerabilities we found and put best practices and monitoring in place, following the same standard we apply to what we build.",
        results: [
          "Vulnerabilities found and fixed.",
          "Security best practices in place.",
          "A team with clear criteria to keep the protection up.",
        ],
        stack: ["auditorias", "hardening", "wifi"],
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
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    backToProjects: "Back to projects",
    viewProject: "View project",
    allProjects: "See all projects",
    filterAll: "All",
    categories: {
      desarrollo: "Development",
      infraestructura: "Infrastructure",
      seguridad: "Security",
    },
    projectClient: "Client",
    projectProblem: "The problem",
    projectSolution: "The solution",
    projectResults: "Results",
    projectStack: "Technologies",
    draftBadge: "Sample",
    draftNotice:
      "The details of this case are illustrative placeholders. We will soon replace them with real project information.",
    notFoundTitle: "This page doesn't exist",
    notFoundText:
      "The link may be misspelled, or the page may have moved. Head back to the home page and carry on from there.",
    notFoundCta: "Go to home page",
    contactHeading: "We turn your company's problem into a tool",
    contactText: "Tell us what you need and we'll get back to you shortly.",
    contactEyebrow: "Contact",
    loading: "Loading…",
    backToTop: "Back to top",
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
