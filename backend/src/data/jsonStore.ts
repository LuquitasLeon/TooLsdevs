import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Persistencia mínima a disco, en JSON.
 *
 * Alcanza para el panel de admin mientras el proyecto vive en un único
 * servidor de toda la vida (VPS) o en local. El día que el backend se
 * despliegue como funciones serverless (Vercel) esto hay que cambiarlo por
 * una base de datos real: el filesystem ahí es efímero y no se comparte
 * entre invocaciones.
 */
export async function readCollection<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/** Escritura atómica: escribe a un archivo temporal y lo renombra encima del real. */
export async function writeCollection<T>(filePath: string, data: T[]): Promise<void> {
  await mkdir(dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${randomUUID()}.tmp`;
  await writeFile(tmpPath, JSON.stringify(data, null, 2), "utf8");
  await rename(tmpPath, filePath);
}

export { randomUUID };
