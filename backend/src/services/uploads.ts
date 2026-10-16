import { randomUUID } from "node:crypto";
import { unlink, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { githubStorageConfigured } from "../config/env.js";
import * as githubStore from "../data/githubStore.js";
import { uploadsDir, uploadsGithubDir } from "../data/paths.js";

const UPLOADS_PUBLIC_PREFIX = "/uploads/";

function guessExt(mimetype: string): string {
  switch (mimetype) {
    case "image/png":
      return ".png";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    default:
      return ".jpg";
  }
}

/**
 * Guarda una imagen subida desde el admin y devuelve la URL pública a usar
 * como `logo`/`photo`/`image`. En producción (con `GITHUB_TOKEN`) la sube a
 * la rama de datos del repo y devuelve su URL raw; en desarrollo local la
 * escribe en disco y devuelve una ruta `/uploads/...` servida por Express.
 */
export async function storeUploadedImage(file: Express.Multer.File): Promise<string> {
  const ext = extname(file.originalname).toLowerCase() || guessExt(file.mimetype);
  const filename = `${randomUUID()}${ext}`;

  if (githubStorageConfigured) {
    const path = `${uploadsGithubDir}/${filename}`;
    await githubStore.putBinaryFile(
      path,
      file.buffer.toString("base64"),
      `chore(uploads): agregar ${filename}`,
    );
    return githubStore.rawUrl(path);
  }

  await writeFile(join(uploadsDir, filename), file.buffer);
  return `${UPLOADS_PUBLIC_PREFIX}${filename}`;
}

/**
 * Borra un archivo subido desde el admin, si corresponde.
 *
 * Sólo actúa sobre archivos que este servicio haya escrito (local `/uploads/...`
 * o la URL raw de la rama de datos): las fotos "de fábrica" (`/team/...`, etc.)
 * son assets estáticos del frontend.
 */
export async function deleteUploadedFile(publicPathOrUrl: string): Promise<void> {
  if (githubStorageConfigured) {
    const prefix = `${githubStore.rawUrl(uploadsGithubDir)}/`;
    if (!publicPathOrUrl.startsWith(prefix)) return;
    const filename = publicPathOrUrl.slice(prefix.length);
    await githubStore.deleteFile(`${uploadsGithubDir}/${filename}`, `chore(uploads): borrar ${filename}`);
    return;
  }

  if (!publicPathOrUrl.startsWith(UPLOADS_PUBLIC_PREFIX)) return;
  const filename = publicPathOrUrl.slice(UPLOADS_PUBLIC_PREFIX.length);
  try {
    await unlink(join(uploadsDir, filename));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}
