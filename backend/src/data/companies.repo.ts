import type { CompanyRecord } from "@toolsdevs/shared";
import { randomUUID, readCollection, writeCollection } from "./jsonStore.js";
import { companiesFile } from "./paths.js";

/** Contenido original, hardcodeado, que vivía en los diccionarios es/en. */
const SEED: ReadonlyArray<Omit<CompanyRecord, "id" | "createdAt" | "updatedAt">> = [
  {
    name: "Consultorios Villa Carmela",
    logo: "/logos/ConsultoriosVC.png",
    categoryEs: "Salud",
    categoryEn: "Health",
    summaryEs:
      "Sitio institucional para un centro de salud en Villa Carmela: especialidades médicas, profesionales, alquiler de consultorios y contacto directo por WhatsApp.",
    summaryEn:
      "Institutional site for a health center in Villa Carmela: medical specialties, professionals, consulting-room rental and direct WhatsApp contact.",
    url: "https://www.consultoriovc.com/",
    comingSoon: false,
    order: 0,
  },
  {
    name: "Partido Demócrata Progresista",
    logo: "/logos/PartidoDemocrataProgresista.png",
    categoryEs: "Institucional / Político",
    categoryEn: "Institutional / Political",
    summaryEs:
      "Plataforma del distrito Tucumán del PDP: presenta el plan de gobierno en cinco ejes, con secciones de afiliación y sumatoria de voluntarios.",
    summaryEn:
      "Platform for the PDP's Tucumán district: presents the government plan across five pillars, with membership and volunteer sign-up sections.",
    url: "https://partido-democrata-progresista.vercel.app/",
    comingSoon: false,
    order: 1,
  },
  {
    name: "EndPoint Security",
    logo: "/logos/EndPoint.png",
    categoryEs: "Ciberseguridad",
    categoryEn: "Cybersecurity",
    summaryEs:
      "Sitio corporativo de una empresa de ciberseguridad: servicios de prevención, protección y respuesta a incidentes, capacitaciones y su propio Cyber Challenge.",
    summaryEn:
      "Corporate site for a cybersecurity company: prevention, protection and incident-response services, training and its own Cyber Challenge.",
    url: "https://web-iota-two-64.vercel.app/",
    comingSoon: false,
    order: 2,
  },
  {
    name: "La Posta 381",
    logo: "/logos/LaPosta381.jpeg",
    categoryEs: "Medios / Noticias",
    categoryEn: "Media / News",
    summaryEs:
      "Portal estilo revista para informar al tucumano: noticias, notas y actualidad local con una experiencia de lectura ágil. En desarrollo.",
    summaryEn:
      "A magazine-style portal to inform the people of Tucumán: news, articles and local current affairs with a fast reading experience. In development.",
    comingSoon: true,
    order: 3,
  },
];

async function readAll(): Promise<CompanyRecord[]> {
  const companies = await readCollection<CompanyRecord>(companiesFile);
  if (companies.length > 0) return companies;

  // Primer arranque: no hay archivo de datos todavía, sembramos con el
  // contenido que antes vivía hardcodeado en el sitio.
  const now = new Date().toISOString();
  const seeded = SEED.map((company) => ({
    ...company,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
  await writeCollection(companiesFile, seeded);
  return seeded;
}

export async function listCompanies(): Promise<CompanyRecord[]> {
  const companies = await readAll();
  return [...companies].sort((a, b) => a.order - b.order);
}

export async function createCompany(
  input: Omit<CompanyRecord, "id" | "createdAt" | "updatedAt">,
): Promise<CompanyRecord> {
  const companies = await readAll();
  const now = new Date().toISOString();
  const record: CompanyRecord = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  await writeCollection(companiesFile, [...companies, record]);
  return record;
}

export async function updateCompany(
  id: string,
  input: Omit<CompanyRecord, "id" | "createdAt" | "updatedAt">,
): Promise<CompanyRecord | null> {
  const companies = await readAll();
  const index = companies.findIndex((company) => company.id === id);
  if (index === -1) return null;

  const updated: CompanyRecord = {
    ...input,
    id,
    createdAt: companies[index]!.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const next = [...companies];
  next[index] = updated;
  await writeCollection(companiesFile, next);
  return updated;
}

export async function deleteCompany(id: string): Promise<boolean> {
  const companies = await readAll();
  const next = companies.filter((company) => company.id !== id);
  if (next.length === companies.length) return false;
  await writeCollection(companiesFile, next);
  return true;
}
