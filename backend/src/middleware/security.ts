import cors from "cors";
import helmet from "helmet";
import type { RequestHandler } from "express";
import { env } from "../config/env.js";

/**
 * Cabeceras de seguridad. La API sólo devuelve JSON, así que se puede cerrar
 * mucho más que en un servidor que sirve HTML.
 */
export const securityHeaders: RequestHandler = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  },
  crossOriginResourcePolicy: { policy: "same-site" },
  referrerPolicy: { policy: "no-referrer" },
});

/**
 * CORS restringido a los orígenes declarados en `CORS_ORIGINS`.
 *
 * Sin esto, cualquier sitio podría usar nuestra API para mandar mails desde el
 * navegador de sus visitantes.
 */
export const corsPolicy: RequestHandler = cors({
  origin(origin, callback) {
    // Las peticiones sin origen (curl, health checks, apps móviles) se permiten:
    // no hay navegador de por medio, así que CORS no aporta nada ahí.
    if (!origin || env.CORS_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origen no autorizado: ${origin}`));
  },
  methods: ["GET", "POST", "OPTIONS"],
  maxAge: 86_400,
});
