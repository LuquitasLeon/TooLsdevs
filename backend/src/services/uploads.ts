import { unlink } from "node:fs/promises";
import { join } from "node:path";
import { uploadsDir } from "../data/paths.js";

const UPLOADS_PUBLIC_PREFIX = "/uploads/";

export function uploadedFilePublicPath(filename: string): string {
  return `${UPLOADS_PUBLIC_PREFIX}${filename}`;
}

/**
 * Borra un archivo subido desde el admin, si corresponde.
 *
 * Sólo actúa sobre rutas `/uploads/...`: las fotos "de fábrica" (`/team/...`)
 * son assets estáticos del frontend, no algo que este servicio haya escrito.
 */
export async function deleteUploadedFile(publicPath: string): Promise<void> {
  if (!publicPath.startsWith(UPLOADS_PUBLIC_PREFIX)) return;

  const filename = publicPath.slice(UPLOADS_PUBLIC_PREFIX.length);
  try {
    await unlink(join(uploadsDir, filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}
