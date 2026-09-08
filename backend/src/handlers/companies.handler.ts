import type { Request, Response } from "express";
import { z } from "zod";
import { companyInputSchema } from "@toolsdevs/shared";
import {
  createCompany,
  deleteCompany,
  listCompanies,
  updateCompany,
} from "../data/companies.repo.js";
import { deleteUploadedFile, uploadedFilePublicPath } from "../services/uploads.js";

export async function handleListCompanies(_req: Request, res: Response): Promise<void> {
  const companies = await listCompanies();
  res.status(200).json({ ok: true, companies });
}

export async function handleCreateCompany(req: Request, res: Response): Promise<void> {
  const parsed = companyInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  if (!req.file) {
    res.status(400).json({ ok: false, error: "Falta el logo de la empresa." });
    return;
  }

  const logo = uploadedFilePublicPath(req.file.filename);
  const company = await createCompany({ ...parsed.data, logo });
  res.status(201).json({ ok: true, company });
}

export async function handleUpdateCompany(req: Request, res: Response): Promise<void> {
  const parsed = companyInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  const existing = (await listCompanies()).find((company) => company.id === req.params["id"]);
  if (!existing) {
    res.status(404).json({ ok: false, error: "No se encontró esa empresa." });
    return;
  }

  const logo = req.file ? uploadedFilePublicPath(req.file.filename) : existing.logo;
  const updated = await updateCompany(req.params["id"] as string, { ...parsed.data, logo });

  if (req.file && existing.logo !== logo) {
    await deleteUploadedFile(existing.logo);
  }

  res.status(200).json({ ok: true, company: updated });
}

export async function handleDeleteCompany(req: Request, res: Response): Promise<void> {
  const existing = (await listCompanies()).find((company) => company.id === req.params["id"]);
  const removed = await deleteCompany(req.params["id"] as string);

  if (!removed) {
    res.status(404).json({ ok: false, error: "No se encontró esa empresa." });
    return;
  }

  if (existing) await deleteUploadedFile(existing.logo);
  res.status(200).json({ ok: true });
}
