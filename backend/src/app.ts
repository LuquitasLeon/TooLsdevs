import { mkdirSync } from "node:fs";
import express from "express";
import cookieParser from "cookie-parser";
import { adminConfigured, env, mailerConfigured } from "./config/env.js";
import { corsPolicy, securityHeaders } from "./middleware/security.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { contactRouter } from "./routes/contact.route.js";
import { authRouter } from "./routes/auth.route.js";
import { teamRouter } from "./routes/team.route.js";
import { companiesRouter } from "./routes/companies.route.js";
import { dataDir, uploadsDir } from "./data/paths.js";

/**
 * Construye la aplicación de Express **sin** ponerla a escuchar.
 *
 * Es a propósito: `server.ts` la levanta en un VPS y un handler serverless puede
 * envolver esta misma app. Cuando se decida el hosting, no hay que tocar nada
 * de la lógica.
 */
export function createApp() {
  // El directorio de datos y el de subidas tienen que existir antes de que
  // multer o el JSON store intenten escribir en ellos.
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(uploadsDir, { recursive: true });

  const app = express();

  // Cuántos proxies confiar para leer la IP real del visitante. Con esto mal
  // configurado el rate limit deja de funcionar sin avisar.
  app.set("trust proxy", env.TRUST_PROXY_HOPS);
  app.disable("x-powered-by");

  app.use(securityHeaders);
  app.use(corsPolicy);
  app.use(cookieParser());
  // Un formulario de contacto no necesita más que esto; el límite evita que
  // alguien intente saturar el proceso mandando megabytes de JSON.
  app.use(express.json({ limit: "32kb" }));

  // Las imágenes subidas desde el admin se sirven cross-origin (el frontend
  // vive en otro dominio), así que necesitan su propia política de CORP.
  app.use("/uploads", (_req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  });
  app.use("/uploads", express.static(uploadsDir, { maxAge: "7d" }));

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "toolsdevs-api",
      environment: env.NODE_ENV,
      mailer: mailerConfigured ? "configurado" : "sin configurar",
      admin: adminConfigured ? "configurado" : "sin configurar",
    });
  });

  app.use("/api", contactRouter);
  app.use("/api", authRouter);
  app.use("/api", teamRouter);
  app.use("/api", companiesRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
