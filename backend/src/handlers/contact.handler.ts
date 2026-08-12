import type { Request, Response } from "express";
import { z } from "zod";
import { contactRequestSchema, HONEYPOT_FIELD } from "@toolsdevs/shared";
import { sendContactEmail } from "../services/mailer.js";

/**
 * Procesa una consulta del formulario de contacto.
 *
 * Validación con el MISMO esquema que usa el navegador: aunque el frontend ya
 * filtró, acá se vuelve a validar porque un `POST` con `curl` se saltea el
 * frontend entero.
 */
export async function handleContact(req: Request, res: Response): Promise<void> {
  const parsed = contactRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      // Errores por campo, en el formato que el formulario ya sabe mostrar.
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  // El honeypot es un campo invisible: si viene con algo, lo completó un bot.
  // Se responde 200 a propósito, para no darle pistas de que fue detectado.
  const honeypot = parsed.data[HONEYPOT_FIELD];
  if (honeypot) {
    res.status(200).json({ ok: true });
    return;
  }

  // Al mail sólo van los campos del formulario, nunca el honeypot.
  const { website: _website, ...form } = parsed.data;
  await sendContactEmail(form);

  res.status(200).json({ ok: true });
}
