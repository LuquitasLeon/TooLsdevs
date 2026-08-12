import express from "express";
import { env, mailerConfigured } from "./config/env.js";
import { corsPolicy, securityHeaders } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.route.js";

/**
 * Construye la aplicación de Express **sin** ponerla a escuchar.
 *
 * Es a propósito: `server.ts` la levanta en un VPS y un handler serverless puede
 * envolver esta misma app. Cuando se decida el hosting, no hay que tocar nada
 * de la lógica.
 */
export function createApp() {
  const app = express();

  // Cuántos proxies confiar para leer la IP real del visitante. Con esto mal
  // configurado el rate limit deja de funcionar sin avisar.
  app.set("trust proxy", env.TRUST_PROXY_HOPS);
  app.disable("x-powered-by");

  app.use(securityHeaders);
  app.use(corsPolicy);
  // Un formulario de contacto no necesita más que esto; el límite evita que
  // alguien intente saturar el proceso mandando megabytes de JSON.
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "toolsdevs-api",
      environment: env.NODE_ENV,
      mailer: mailerConfigured ? "configurado" : "sin configurar",
    });
  });

  app.use("/api", contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
