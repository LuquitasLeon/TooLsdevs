import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { adminLoginSchema } from "@toolsdevs/shared";
import { adminConfigured, env } from "../config/env.js";
import { SESSION_COOKIE, maxSessionAgeSeconds, sessionCookieOptions, signSession } from "../middleware/auth.js";

export async function handleAdminLogin(req: Request, res: Response): Promise<void> {
  if (!adminConfigured) {
    res.status(503).json({
      ok: false,
      error: "El panel de administración no está configurado en este entorno.",
    });
    return;
  }

  const parsed = adminLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      ok: false,
      error: "Revisá los datos del formulario.",
      fields: z.flattenError(parsed.error).fieldErrors,
    });
    return;
  }

  const { email, password } = parsed.data;

  // Comparación siempre a través de bcrypt: nunca se guarda ni se compara la
  // contraseña en texto plano, ni siquiera la del único admin.
  const emailMatches = email === env.ADMIN_EMAIL;
  const passwordMatches = await bcrypt.compare(password, env.ADMIN_PASSWORD_HASH!);

  if (!emailMatches || !passwordMatches) {
    res.status(401).json({ ok: false, error: "Correo o contraseña incorrectos." });
    return;
  }

  const token = signSession(email);
  res.cookie(SESSION_COOKIE, token, { ...sessionCookieOptions, maxAge: maxSessionAgeSeconds * 1000 });
  res.status(200).json({ ok: true, email });
}

export function handleAdminLogout(_req: Request, res: Response): void {
  res.clearCookie(SESSION_COOKIE, sessionCookieOptions);
  res.status(200).json({ ok: true });
}

export function handleAdminMe(_req: Request, res: Response): void {
  res.status(200).json({ ok: true, email: res.locals["adminEmail"] as string });
}
