import jwt from "jsonwebtoken";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { env, isProduction } from "../config/env.js";

export const SESSION_COOKIE = "toolsdevs_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 horas: bastante para una sesión de trabajo, poco para un token robado.

interface SessionPayload {
  email: string;
}

/** Cómo se setea/limpia la cookie de sesión, en un solo lugar. */
export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  // En local (http) el navegador descarta una cookie "Secure" sin HTTPS.
  secure: isProduction,
  path: "/",
};

export function signSession(email: string): string {
  if (!env.JWT_SECRET) throw new Error("JWT_SECRET no configurado");
  return jwt.sign({ email } satisfies SessionPayload, env.JWT_SECRET, {
    expiresIn: SESSION_TTL_SECONDS,
  });
}

function readSession(token: string | undefined): SessionPayload | null {
  if (!token || !env.JWT_SECRET) return null;
  try {
    return jwt.verify(token, env.JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

/** Exige una sesión de admin válida. Sin ella, corta la petición con 401. */
export const requireAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined;
  const session = readSession(token);

  if (!session) {
    res.status(401).json({ error: "No autenticado." });
    return;
  }

  res.locals.adminEmail = session.email;
  next();
};

export const maxSessionAgeSeconds = SESSION_TTL_SECONDS;
