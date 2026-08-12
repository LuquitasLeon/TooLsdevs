import { z } from "zod";

/** Idiomas soportados por el sitio. */
export const localeSchema = z.enum(["es", "en"]);
export type Locale = z.infer<typeof localeSchema>;

/**
 * Campos que completa una persona en el formulario de contacto.
 *
 * Este esquema es la única fuente de verdad de la validación: lo usa el
 * formulario del frontend para dar feedback inmediato y lo vuelve a aplicar el
 * backend antes de tocar nada. Si sólo validara el navegador, cualquiera podría
 * saltearse las reglas con un `curl`.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Necesitamos tu nombre (al menos 2 caracteres)." })
    .max(80, { error: "El nombre es demasiado largo." }),

  // Primero se limpia y después se valida: al copiar y pegar una dirección es
  // muy común arrastrar un espacio, y sería absurdo rechazarla por eso.
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z
        .email({ error: "Revisá el correo, no parece válido." })
        .max(160, { error: "El correo es demasiado largo." }),
    ),

  company: z
    .string()
    .trim()
    .max(120, { error: "El nombre de la empresa es demasiado largo." })
    .optional(),

  phone: z
    .string()
    .trim()
    .max(40, { error: "El teléfono es demasiado largo." })
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, { error: "Contanos un poco más: al menos 10 caracteres." })
    .max(2000, { error: "El mensaje es demasiado largo (máximo 2000 caracteres)." }),

  /** Servicio de interés, precargado por el diagnóstico interactivo. */
  service: z.string().trim().max(120).optional(),

  /** Resumen de las respuestas del diagnóstico, para que la consulta llegue con contexto. */
  diagnosis: z.string().trim().max(600).optional(),

  /** Idioma en el que la persona estaba navegando, para responderle en el mismo. */
  locale: localeSchema.default("es"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;
/** Los valores tal como salen del formulario, antes de que Zod aplique los defaults. */
export type ContactFormInput = z.input<typeof contactFormSchema>;

/**
 * Lo que realmente viaja al backend: los campos del formulario más el honeypot.
 *
 * `website` es un campo invisible para las personas. El esquema lo acepta con
 * cualquier valor a propósito: si acá lo rechazáramos, el backend respondería un
 * error de validación y le revelaría al bot que existe la trampa. La detección
 * se hace después, en el handler, que responde 200 como si todo hubiera salido
 * bien y descarta la consulta en silencio.
 */
export const contactRequestSchema = contactFormSchema.extend({
  website: z.string().optional(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;

/** Nombre del campo honeypot, compartido para que frontend y backend no se desincronicen. */
export const HONEYPOT_FIELD = "website" as const;

/** Errores por campo, en el formato que consume el formulario. */
export type ContactFieldErrors = Partial<Record<keyof ContactForm, string[]>>;
