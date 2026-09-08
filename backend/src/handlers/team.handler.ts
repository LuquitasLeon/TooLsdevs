import type { Request, Response } from "express";
import { z } from "zod";
import { teamMemberInputSchema } from "@toolsdevs/shared";
import {
  createTeamMember,
  deleteTeamMember,
  listTeamMembers,
  updateTeamMember,
} from "../data/team.repo.js";
import { deleteUploadedFile, uploadedFilePublicPath } from "../services/uploads.js";

export async function handleListTeam(_req: Request, res: Response): Promise<void> {
  const members = await listTeamMembers();
  res.status(200).json({ ok: true, members });
}

export async function handleCreateTeamMember(req: Request, res: Response): Promise<void> {
  const parsed = teamMemberInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  const photo = req.file ? uploadedFilePublicPath(req.file.filename) : undefined;
  const member = await createTeamMember({ ...parsed.data, photo });
  res.status(201).json({ ok: true, member });
}

export async function handleUpdateTeamMember(req: Request, res: Response): Promise<void> {
  const parsed = teamMemberInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  const existing = (await listTeamMembers()).find((member) => member.id === req.params["id"]);
  if (!existing) {
    res.status(404).json({ ok: false, error: "No se encontró ese integrante." });
    return;
  }

  const photo = req.file ? uploadedFilePublicPath(req.file.filename) : existing.photo;
  const updated = await updateTeamMember(req.params["id"] as string, { ...parsed.data, photo });

  // Si se subió una foto nueva y la anterior era un archivo del admin (no un
  // asset estático del sitio), no la dejamos huérfana en el disco.
  if (req.file && existing.photo && existing.photo !== photo) {
    await deleteUploadedFile(existing.photo);
  }

  res.status(200).json({ ok: true, member: updated });
}

export async function handleDeleteTeamMember(req: Request, res: Response): Promise<void> {
  const existing = (await listTeamMembers()).find((member) => member.id === req.params["id"]);
  const removed = await deleteTeamMember(req.params["id"] as string);

  if (!removed) {
    res.status(404).json({ ok: false, error: "No se encontró ese integrante." });
    return;
  }

  if (existing?.photo) await deleteUploadedFile(existing.photo);
  res.status(200).json({ ok: true });
}
