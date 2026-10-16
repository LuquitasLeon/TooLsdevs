import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

/** Raíz del workspace `backend/` (dos niveles arriba de `src/data`). */
export const backendRoot = join(here, "..", "..");

export const dataDir = join(backendRoot, "data");
export const uploadsDir = join(backendRoot, "uploads");

/** Carpeta de `data/uploads/` dentro de la rama de datos en GitHub. */
export const uploadsGithubDir = "data/uploads";

/** Dónde vive una colección: en disco local (dev) y en la rama de datos (prod). */
export interface CollectionPath {
  local: string;
  github: string;
}

function collection(filename: string): CollectionPath {
  return { local: join(dataDir, filename), github: `data/${filename}` };
}

export const companiesFile = collection("companies.json");
export const teamFile = collection("team.json");
export const productSlidesFile = collection("productSlides.json");
