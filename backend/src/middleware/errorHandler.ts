import type { ErrorRequestHandler, RequestHandler } from "express";
import { isProduction } from "../config/env.js";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ ok: false, error: "Recurso no encontrado." });
};

/**
 * Manejo centralizado de errores.
 *
 * Hacia afuera siempre sale un mensaje genérico: los detalles de un error
 * interno le sirven a un atacante para mapear el sistema. El detalle real queda
 * en el log del servidor, que es donde tiene que estar.
 */
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error("[error]", error);

  if (error instanceof Error && error.message.startsWith("Origen no autorizado")) {
    res.status(403).json({ ok: false, error: "Origen no autorizado." });
    return;
  }

  res.status(500).json({
    ok: false,
    error: "Ocurrió un error inesperado. Escribinos por WhatsApp mientras lo resolvemos.",
    ...(isProduction ? {} : { detail: error instanceof Error ? error.message : String(error) }),
  });
};
