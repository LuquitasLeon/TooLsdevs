import type { TeamMemberRecord } from "@toolsdevs/shared";
import { randomUUID, readCollection, writeCollection } from "./jsonStore.js";
import { teamFile } from "./paths.js";

/** Contenido original, hardcodeado, que vivía en los diccionarios es/en. */
const SEED: ReadonlyArray<Omit<TeamMemberRecord, "id" | "createdAt" | "updatedAt">> = [
  {
    name: "Santiago Nicolás Ferreyra Appas",
    roleEs: "Cofundador",
    roleEn: "Co-founder",
    detailEs: "Técnico Programador (UTN FRT)",
    detailEn: "Software Technician (UTN FRT)",
    photo: "/team/santiago.jpg",
    order: 0,
  },
  {
    name: "Ismael Lucas León",
    roleEs: "Cofundador",
    roleEn: "Co-founder",
    detailEs: "Técnico Programador (UTN FRT)",
    detailEn: "Software Technician (UTN FRT)",
    photo: "/team/ismael.jpg",
    order: 1,
  },
  {
    name: "Luciano Agustín Llanos",
    roleEs: "Cofundador",
    roleEn: "Co-founder",
    detailEs: "Técnico Programador (UTN FRT)",
    detailEn: "Software Technician (UTN FRT)",
    extraEs: "Especialista en Ciberseguridad — Diplomatura otorgada por la UTN",
    extraEn: "Cybersecurity Specialist — postgraduate diploma awarded by UTN",
    photo: "/team/luciano.jpg",
    order: 2,
  },
];

async function readAll(): Promise<TeamMemberRecord[]> {
  const members = await readCollection<TeamMemberRecord>(teamFile);
  if (members.length > 0) return members;

  // Primer arranque: no hay archivo de datos todavía, sembramos con el
  // contenido que antes vivía hardcodeado en el sitio.
  const now = new Date().toISOString();
  const seeded = SEED.map((member) => ({
    ...member,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
  await writeCollection(teamFile, seeded);
  return seeded;
}

export async function listTeamMembers(): Promise<TeamMemberRecord[]> {
  const members = await readAll();
  return [...members].sort((a, b) => a.order - b.order);
}

export async function createTeamMember(
  input: Omit<TeamMemberRecord, "id" | "createdAt" | "updatedAt">,
): Promise<TeamMemberRecord> {
  const members = await readAll();
  const now = new Date().toISOString();
  const record: TeamMemberRecord = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  await writeCollection(teamFile, [...members, record]);
  return record;
}

export async function updateTeamMember(
  id: string,
  input: Omit<TeamMemberRecord, "id" | "createdAt" | "updatedAt">,
): Promise<TeamMemberRecord | null> {
  const members = await readAll();
  const index = members.findIndex((member) => member.id === id);
  if (index === -1) return null;

  const updated: TeamMemberRecord = {
    ...input,
    id,
    createdAt: members[index]!.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const next = [...members];
  next[index] = updated;
  await writeCollection(teamFile, next);
  return updated;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const members = await readAll();
  const next = members.filter((member) => member.id !== id);
  if (next.length === members.length) return false;
  await writeCollection(teamFile, next);
  return true;
}
