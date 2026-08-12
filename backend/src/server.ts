import { createApp } from "./app.js";
import { env, mailerConfigured } from "./config/env.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`[toolsdevs-api] escuchando en http://localhost:${env.PORT} (${env.NODE_ENV})`);
  if (!mailerConfigured) {
    console.warn(
      "[toolsdevs-api] el envío de mails está sin configurar: " +
        "faltan RESEND_API_KEY, MAIL_FROM o MAIL_TO en el .env",
    );
  }
});

/** Cierre ordenado: termina las peticiones en curso antes de salir. */
function shutdown(signal: string) {
  console.log(`[toolsdevs-api] ${signal} recibido, cerrando...`);
  server.close(() => process.exit(0));
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
