import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

/**
 * Límite de envíos por IP para el formulario.
 *
 * No pretende frenar un ataque coordinado, sino lo que realmente pasa: un bot
 * suelto o alguien apretando "enviar" veinte veces. Para lo primero está el
 * WAF del proveedor de hosting.
 */
export const contactRateLimit = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    ok: false,
    error: "Demasiadas consultas seguidas. Probá de nuevo en unos minutos.",
  },
});
