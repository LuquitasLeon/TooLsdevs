import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Persistencia a disco, en JSON. Sólo para desarrollo local: en Vercel el
 * filesystem es de solo lectura y efímero, así que ahí se usa `githubStore`
 * (ver `jsonStore.ts`, que elige entre los dos).
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
