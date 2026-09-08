import type { CompanyRecord } from "@toolsdevs/shared";
import { randomUUID, readCollection, writeCollection } from "./jsonStore.js";
import { companiesFile } from "./paths.js";

async function readAll(): Promise<CompanyRecord[]> {
  return readCollection<CompanyRecord>(companiesFile);
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
