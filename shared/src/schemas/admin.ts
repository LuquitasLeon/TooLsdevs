import { z } from "zod";

/**
 * Validación de los campos de texto de un fundador. Se usa igual en el
 * formulario del admin y en el backend antes de tocar el archivo de datos.
 * La foto se valida aparte (es un archivo, no un campo de este esquema).
 */
export const teamMemberInputSchema = z.object({
  name: z.string().trim().min(2, { error: "Falta el nombre." }).max(120),
  roleEs: z.string().trim().min(2, { error: "Falta el rol en español." }).max(80),
  roleEn: z.string().trim().min(2, { error: "Falta el rol en inglés." }).max(80),
  detailEs: z.string().trim().min(2, { error: "Falta el detalle en español." }).max(300),
  detailEn: z.string().trim().min(2, { error: "Falta el detalle en inglés." }).max(300),
  extraEs: z.string().trim().max(300).optional(),
  extraEn: z.string().trim().max(300).optional(),
  order: z.coerce.number().int().min(0).max(9999).default(0),
});

export type TeamMemberInput = z.infer<typeof teamMemberInputSchema>;

/** Validación de los campos de texto de una empresa cliente (el logo se valida aparte). */
export const companyInputSchema = z.object({
  name: z.string().trim().min(1, { error: "Falta el nombre de la empresa." }).max(80),
  categoryEs: z.string().trim().min(1, { error: "Falta el rubro en español." }).max(80),
  categoryEn: z.string().trim().min(1, { error: "Falta el rubro en inglés." }).max(80),
  summaryEs: z.string().trim().min(2, { error: "Falta el resumen en español." }).max(400),
  summaryEn: z.string().trim().min(2, { error: "Falta el resumen en inglés." }).max(400),
  url: z
    .string()
    .trim()
    .max(300)
    .refine((value) => value === "" || z.url().safeParse(value).success, {
      error: "El link no parece una URL válida.",
    })
    .optional(),
  // Llega de un checkbox: "on"/"true" cuando está marcado, ausente si no.
  comingSoon: z.preprocess(
    (value) => value === "on" || value === "true" || value === true,
    z.boolean(),
  ),
  order: z.coerce.number().int().min(0).max(9999).default(0),
});

export type CompanyInput = z.infer<typeof companyInputSchema>;

/** Credenciales del login del admin. */
export const adminLoginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email({ error: "Correo inválido." })),
  password: z.string().min(1, { error: "Falta la contraseña." }).max(200),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
