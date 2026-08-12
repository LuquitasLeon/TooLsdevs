import { Router } from "express";
import { contactRateLimit } from "../middleware/rateLimit.js";
import { handleContact } from "../handlers/contact.handler.js";

export const contactRouter: Router = Router();

/**
 * El envío del formulario es lo único con rate limit: es el único endpoint que
 * dispara una acción con costo (mandar un mail). El resto de la API sólo lee.
 *
 * `handleContact` es async y puede rechazar; se envuelve para que cualquier
 * error caiga en el manejador central en vez de dejar la petición colgada.
 */
contactRouter.post("/contact", contactRateLimit, (req, res, next) => {
  handleContact(req, res).catch(next);
});
