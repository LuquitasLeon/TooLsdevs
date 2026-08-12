import dotenv from "dotenv";
import { z } from "zod";

/**
 * En desarrollo, el `.env` del proyecto manda sobre lo que ya haya en el
 * entorno: si alguien tiene un `PORT` global exportado (cosa habitual), no
 * queremos que se lleve puesto lo que dice el archivo.
 *
 * En producción es al revés: el hosting inyecta las variables reales y el `.env`
 * no debe pisarlas.
 */
dotenv.config({ override: process.env["NODE_ENV"] !== "production", quiet: true });

/**
 * Configuración del servidor, validada al arrancar.
 *
 * Si falta una variable o está mal escrita, el proceso muere acá con un mensaje
 * claro — en vez de fallar en producción recién cuando alguien manda el
 * formulario y el mail no sale.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),

  /** Orígenes autorizados a llamar a la API, separados por coma. */
  CORS_ORIGINS: z
    .string()
    .default("http://localhost:5173")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),

  /** Clave de Resend. Sin ella el servidor arranca igual, pero no envía mails. */
  RESEND_API_KEY: z.string().min(1).optional(),
  /** Remitente verificado en Resend (ej: "ToolsDevs <web@toolsdevs.com>"). */
  MAIL_FROM: z.string().min(1).optional(),
  /** Casilla que recibe las consultas del formulario. */
  MAIL_TO: z.email().optional(),

  /** Cantidad de envíos permitidos por IP dentro de la ventana. */
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  /** Ventana del rate limit, en minutos. */
  RATE_LIMIT_WINDOW_MINUTES: z.coerce.number().int().positive().default(15),

  /**
   * Cuántos proxies hay delante del servidor. En un VPS detrás de Nginx es 1.
   * Importa porque de esto depende que el rate limit vea la IP real y no la del
   * proxy — con el valor mal puesto, o no limita a nadie o limita a todos juntos.
   */
  TRUST_PROXY_HOPS: z.coerce.number().int().min(0).default(0),
});

/**
 * En un archivo `.env`, `CLAVE=` significa "no la configuré todavía", no
 * "configurala como cadena vacía". Las vaciamos antes de validar para que los
 * campos opcionales se comporten como uno espera.
 */
function withoutEmptyValues(source: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined && value.trim() !== ""),
  );
}

const parsed = envSchema.safeParse(withoutEmptyValues(process.env));

if (!parsed.success) {
  const detail = z.prettifyError(parsed.error);
  throw new Error(`Configuración inválida en las variables de entorno:\n${detail}`);
}

export const env = parsed.data;

export const isProduction = env.NODE_ENV === "production";

/** El envío de mails sólo está disponible si las tres variables están puestas. */
export const mailerConfigured = Boolean(env.RESEND_API_KEY && env.MAIL_FROM && env.MAIL_TO);
