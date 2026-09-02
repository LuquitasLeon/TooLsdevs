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
        "Tell us a bit about your business and in five steps we'll put together a proposal tailored to your industry. Every answer refines what we recommend.",
      start: "Start",
      rubroStep: {
        id: "rubro",
        question: "What does your business do?",
        options: [
          { id: "tienda", label: "Retail, a shop or selling products" },
          { id: "salud", label: "Health: practice, clinic or professional" },
          { id: "gastronomia", label: "Food: restaurant, café or delivery" },
          { id: "profesional", label: "A firm or professional services" },
          { id: "educacion", label: "Education: institute, academy or courses" },
          { id: "industria", label: "Industry, logistics or distribution" },
          { id: "institucion", label: "Institution, NGO or organization" },
          { id: "medios", label: "Media, content or communications" },
          { id: "otro", label: "Another industry / not sure yet" },
        ],
      },
      branches: {
        tienda: [
          {
            id: "tienda1",
            question: "How do you sell today?",
            options: [
              { id: "local", label: "Only in the physical store" },
              { id: "redes", label: "Through social media and WhatsApp" },
              { id: "online", label: "I already have an online store" },
              { id: "empezando", label: "Not selling yet, just starting" },
            ],
          },
          {
            id: "tienda2",
            question: "What gives you the most trouble?",
            options: [
              { id: "stock", label: "Keeping track of stock" },
              { id: "pedidos", label: "Taking and organizing orders" },
              { id: "encontrar", label: "Getting found and selling online" },
              { id: "cobrar", label: "Getting paid and invoicing" },
            ],
          },
        ],
        salud: [
          {
            id: "salud1",
            question: "How do you handle appointments today?",
            options: [
              { id: "telefono", label: "By phone or WhatsApp" },
              { id: "papel", label: "On paper or a spreadsheet" },
              { id: "sistema", label: "With a system, but a clunky one" },
              { id: "ninguno", label: "I don't handle appointments" },
            ],
          },
          {
            id: "salud2",
            question: "What would you improve for your patients?",
            options: [
              { id: "info", label: "That they find info and specialties" },
              { id: "autoturno", label: "That they book on their own" },
              { id: "seguimiento", label: "Reminders and follow-up" },
              { id: "confianza", label: "Presence and trust online" },
            ],
          },
        ],
        gastronomia: [
          {
            id: "gastro1",
            question: "How do you take orders?",
            options: [
              { id: "telefono", label: "By phone and WhatsApp" },
              { id: "apps", label: "Through third-party delivery apps" },
              { id: "mostrador", label: "At the counter" },
              { id: "ninguno", label: "Not selling online yet" },
            ],
          },
          {
            id: "gastro2",
            question: "What would you like to add?",
            options: [
              { id: "carta", label: "An always-updated digital menu" },
              { id: "pedidos", label: "Your own online ordering" },
              { id: "reservas", label: "Table reservations" },
              { id: "fidelizar", label: "Loyalty for returning customers" },
            ],
          },
        ],
        profesional: [
          {
            id: "prof1",
            question: "How do clients reach you today?",
            options: [
              { id: "boca", label: "Word of mouth" },
              { id: "redes", label: "Through social media" },
              { id: "web", label: "I have a website, but a weak one" },
              { id: "poco", label: "Hardly any come from the internet" },
            ],
          },
          {
            id: "prof2",
            question: "What would help you most?",
            options: [
              { id: "confianza", label: "A website that builds trust" },
              { id: "agenda", label: "Booking consultations online" },
              { id: "automatizar", label: "Automating forms and replies" },
              { id: "seguimiento", label: "Organizing client follow-up" },
            ],
          },
        ],
        educacion: [
          {
            id: "edu1",
            question: "How do students enroll today?",
            options: [
              { id: "mensaje", label: "By message or phone" },
              { id: "formularios", label: "With scattered forms" },
              { id: "sistema", label: "With a system, but a limited one" },
              { id: "presencial", label: "In person only" },
            ],
          },
          {
            id: "edu2",
            question: "What do you want to offer?",
            options: [
              { id: "captar", label: "Showcase the offering and attract students" },
              { id: "pagos", label: "Online enrollment and payments" },
              { id: "cursos", label: "Online courses and content" },
              { id: "seguimiento", label: "Student follow-up" },
            ],
          },
        ],
        industria: [
          {
            id: "ind1",
            question: "How do you run operations today?",
            options: [
              { id: "excel", label: "With Excel spreadsheets" },
              { id: "papel", label: "With paper and WhatsApp" },
              { id: "sistema", label: "A system, but an incomplete one" },
              { id: "nada", label: "Without a clear system" },
            ],
          },
          {
            id: "ind2",
            question: "What do you need to sort out first?",
            options: [
              { id: "stock", label: "Stock and inventory" },
              { id: "repartos", label: "Deliveries and logistics" },
              { id: "reportes", label: "Reports and statistics" },
              { id: "integrar", label: "Connecting areas that don't talk today" },
            ],
          },
        ],
        institucion: [
          {
            id: "inst1",
            question: "What is your main goal?",
            options: [
              { id: "comunicar", label: "Communicate your message" },
              { id: "sumar", label: "Sign up members or supporters" },
              { id: "eventos", label: "Organize events or campaigns" },
              { id: "transparencia", label: "Transparency and information" },
            ],
          },
          {
            id: "inst2",
            question: "How do you communicate today?",
            options: [
              { id: "redes", label: "Only through social media" },
              { id: "web", label: "With an outdated website" },
              { id: "boca", label: "Word of mouth" },
              { id: "nada", label: "We have no presence yet" },
            ],
          },
        ],
        medios: [
          {
            id: "med1",
            question: "Where do you publish today?",
            options: [
              { id: "redes", label: "Only on social media" },
              { id: "blog", label: "On a blog or basic site" },
              { id: "portal", label: "On a portal, but slow or dated" },
              { id: "empezando", label: "We're just starting" },
            ],
          },
          {
            id: "med2",
            question: "What matters most to you?",
            options: [
              { id: "lectura", label: "Speed and reading experience" },
              { id: "autonomia", label: "Publishing easily, on your own" },
              { id: "audiencia", label: "Growing audience and SEO" },
              { id: "monetizar", label: "Adding subscriptions or ads" },
            ],
          },
        ],
        otro: [
          {
            id: "otro1",
            question: "What best describes your situation?",
            options: [
              { id: "idea", label: "I have a new idea" },
              { id: "digitalizar", label: "I want to digitize my business" },
              { id: "problema", label: "I need to solve a specific problem" },
              { id: "asesor", label: "I'm looking for general advice" },
            ],
          },
          {
            id: "otro2",
            question: "What do you have set up today?",
            options: [
              { id: "nada", label: "Nothing yet" },
              { id: "redes", label: "Social media" },
              { id: "web", label: "A basic website" },
              { id: "sistema", label: "A system that fell short" },
            ],
          },
        ],
      },
      commonSteps: [
        {
          id: "necesidad",
          question: "To wrap up, what kind of solution do you picture?",
          options: [
            { id: "vender", label: "Sell online and show my catalog" },
            { id: "gestion", label: "Get organized: stock, orders and customers" },
            { id: "presencia", label: "A professional website that represents me" },
            { id: "medida", label: "A system or app tailored to how I work" },
            { id: "automatizar", label: "Automate manual, repetitive tasks" },
            { id: "seguridad", label: "Protect my data, my site or my network" },
            { id: "infraestructura", label: "Improve my network or infrastructure" },
            { id: "asesoramiento", label: "I'm not sure, I'd like some advice" },
          ],
        },
        {
          id: "etapa",
          question: "When do you need it?",
          options: [
            { id: "explorando", label: "Just exploring, no rush" },
            { id: "pronto", label: "In the coming weeks" },
            { id: "urgente", label: "As soon as possible, it's urgent" },
          ],
        },
      ],
      back: "Back",
      resultTitle: "What we'd suggest for you",
      recommendations: {
        tienda:
          "For a shop like yours, the ideal is an online store with a catalog, cart and stock control —even across branches— plus a panel to manage orders, customers and sales. That's exactly what ToolsShop solves: sell around the clock and keep the back office in one place.",
        salud:
          "For a practice or health center we build a clear site with your specialties, professionals and direct WhatsApp contact, and if you need it, a system to organize appointments and patients. So people find everything without having to call.",
        gastronomia:
          "For food businesses we combine an appetizing site with your always-updated menu and, if you want, online ordering, reservations or delivery. Fewer scattered calls and messages, more orders coming in neatly.",
        profesional:
          "For a firm or professional service, a website that builds trust and captures inquiries, with the option to automate appointments, forms and client follow-up. So your online presence works for you.",
        educacion:
          "For an educational institution, a clear site to showcase your offering and enroll students, and if you add online courses, a platform to manage content, payments and progress. So signing up is as simple as a click.",
        industria:
          "For industry or logistics we build custom management systems —stock, deliveries, real-time reports— and automate what today lives in spreadsheets and messages. A single source of truth for the whole team.",
        institucion:
          "For an institution or organization we build a platform to communicate your message, sign up members or supporters and keep information tidy, like we did for the Partido Demócrata Progresista. So your message reaches people and they join easily.",
        medios:
          "For a media or content project, a fast, easy-to-read magazine-style portal with your own panel to publish without depending on anyone, like La Posta 381. So your content takes center stage.",
        otro:
          "We work across very different industries, so we start by listening to your case and propose the tailored solution —development, management, security or infrastructure— that fits best. Tell us and we'll figure it out together.",
      },
      services: {
        vender: "Online store with stock control (ToolsShop)",
        gestion: "Management system (stock, orders and customers)",
        presencia: "Institutional website",
        medida: "Custom web application",
        automatizar: "Process automation",
        seguridad: "Cybersecurity and audits",
        infraestructura: "Infrastructure and networks",
        asesoramiento: "Tailored advice",
      },
      toForm: "Let's talk about this",
      restart: "Start over",
      progress: "Step {current} of {total}",
    },
  },
};
