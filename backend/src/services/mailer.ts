import { Resend } from "resend";
import type { ContactForm } from "@toolsdevs/shared";
import { env, mailerConfigured } from "../config/env.js";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

/** Escapa lo que va dentro del HTML del mail: el mensaje lo escribe un desconocido. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(data: ContactForm) {
  const lines: [string, string | undefined][] = [
    ["Nombre", data.name],
    ["Email", data.email],
    ["Empresa", data.company],
    ["Teléfono", data.phone],
    ["Servicio de interés", data.service],
    ["Diagnóstico", data.diagnosis],
    ["Idioma", data.locale],
  ];

  const rows = lines
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b;">${label}</td>` +
        `<td style="padding:4px 0;color:#0f172a;">${escapeHtml(value ?? "")}</td></tr>`,
    )
    .join("");

  const html =
    `<div style="font-family:system-ui,sans-serif;max-width:560px;">` +
    `<h2 style="color:#0f172a;">Nueva consulta desde la web</h2>` +
    `<table style="border-collapse:collapse;font-size:14px;">${rows}</table>` +
    `<p style="margin-top:16px;color:#0f172a;white-space:pre-wrap;">${escapeHtml(data.message)}</p>` +
    `</div>`;

  const text =
    lines
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n") + `\n\nMensaje:\n${data.message}`;

  return { html, text };
}

/**
 * Envía la consulta del formulario por mail.
 *
 * Si el mailer no está configurado (falta la API key), en vez de fallar registra
 * la consulta en el log. Así el formulario se puede probar de punta a punta en
 * desarrollo sin cuenta de Resend, y en producción el arranque ya avisa que
 * falta configurarlo.
 */
export async function sendContactEmail(data: ContactForm): Promise<void> {
  if (!resend || !mailerConfigured) {
    console.info("[contacto] (mailer sin configurar) consulta recibida de", data.email);
    return;
  }

  const { html, text } = buildEmail(data);

  const { error } = await resend.emails.send({
    from: env.MAIL_FROM as string,
    to: env.MAIL_TO as string,
    // Responder al mail lleva directo a quien escribió, sin copiar la dirección.
    replyTo: data.email,
    subject: `Consulta web — ${data.name}`,
    html,
    text,
  });

  if (error) {
    // Se relanza para que el handler lo tome: el visitante ve un error genérico
    // y el detalle queda en el log del servidor.
    throw new Error(`Resend rechazó el envío: ${error.message}`);
  }
}
