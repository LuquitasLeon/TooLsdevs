import type { Request, Response } from "express";
import { z } from "zod";
import { productSlideInputSchema } from "@toolsdevs/shared";
import {
  createProductSlide,
  deleteProductSlide,
  listProductSlides,
  updateProductSlide,
} from "../data/productSlides.repo.js";
import { deleteUploadedFile, uploadedFilePublicPath } from "../services/uploads.js";

export async function handleListProductSlides(_req: Request, res: Response): Promise<void> {
  const slides = await listProductSlides();
  res.status(200).json({ ok: true, slides });
}

export async function handleCreateProductSlide(req: Request, res: Response): Promise<void> {
  const parsed = productSlideInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  if (!req.file) {
    res.status(400).json({ ok: false, error: "Falta la captura del carrusel." });
    return;
  }

  const image = uploadedFilePublicPath(req.file.filename);
  const slide = await createProductSlide({ ...parsed.data, image });
  res.status(201).json({ ok: true, slide });
}

export async function handleUpdateProductSlide(req: Request, res: Response): Promise<void> {
  const parsed = productSlideInputSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  const existing = (await listProductSlides()).find((slide) => slide.id === req.params["id"]);
  if (!existing) {
    res.status(404).json({ ok: false, error: "No se encontró esa captura." });
    return;
  }

  const image = req.file ? uploadedFilePublicPath(req.file.filename) : existing.image;
  const updated = await updateProductSlide(req.params["id"] as string, { ...parsed.data, image });

  if (req.file && existing.image !== image) {
    await deleteUploadedFile(existing.image);
  }

  res.status(200).json({ ok: true, slide: updated });
}

export async function handleDeleteProductSlide(req: Request, res: Response): Promise<void> {
  const existing = (await listProductSlides()).find((slide) => slide.id === req.params["id"]);
  const removed = await deleteProductSlide(req.params["id"] as string);

  if (!removed) {
    res.status(404).json({ ok: false, error: "No se encontró esa captura." });
    return;
  }

  if (existing) await deleteUploadedFile(existing.image);
  res.status(200).json({ ok: true });
}
