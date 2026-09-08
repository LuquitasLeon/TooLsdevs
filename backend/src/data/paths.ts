import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

/** Raíz del workspace `backend/` (dos niveles arriba de `src/data`). */
export const backendRoot = join(here, "..", "..");

export const dataDir = join(backendRoot, "data");
export const uploadsDir = join(backendRoot, "uploads");

export const companiesFile = join(dataDir, "companies.json");
export const teamFile = join(dataDir, "team.json");
