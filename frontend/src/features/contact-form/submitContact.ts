import type { ContactFieldErrors, ContactRequest } from "@toolsdevs/shared";

/** En producción la URL sale de una variable de entorno; en desarrollo Vite hace proxy de /api. */
const API_URL = import.meta.env.VITE_API_URL ?? "";

export type SubmitResult =
  | { ok: true }
  | { ok: false; message?: string; fields?: ContactFieldErrors };

/**
 * Envía la consulta al backend.
 *
 * Toda la lógica de red vive acá: si mañana cambia el proveedor de hosting o la
 * URL, se toca este archivo y nada más. El formulario sólo sabe "enviar y
 * recibir un resultado".
 */
export async function submitContact(data: ContactRequest): Promise<SubmitResult> {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) return { ok: true };

    // El backend devuelve errores por campo con el mismo formato que espera el
    // formulario, así que se reenvían tal cual.
    const body = (await response.json().catch(() => null)) as {
      error?: string;
      fields?: ContactFieldErrors;
    } | null;

    return {
      ok: false,
      ...(body?.error ? { message: body.error } : {}),
      ...(body?.fields ? { fields: body.fields } : {}),
    };
  } catch {
    // Sin conexión, servidor caído, CORS: no hay respuesta que leer.
    return { ok: false };
  }
}
