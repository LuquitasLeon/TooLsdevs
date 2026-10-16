import { randomUUID } from "node:crypto";
import { githubStorageConfigured } from "../config/env.js";
import * as githubStore from "./githubStore.js";
import * as localStore from "./localStore.js";
import type { CollectionPath } from "./paths.js";

export { randomUUID };

/**
 * Lee una colección. En producción (con `GITHUB_TOKEN`) vive como JSON en la
 * rama de datos del repo; en desarrollo local, como archivo en disco.
 */
export async function readCollection<T>(path: CollectionPath): Promise<T[]> {
  if (!githubStorageConfigured) return localStore.readCollection<T>(path.local);

  const file = await githubStore.getFile(path.github);
  if (!file) return [];
  return JSON.parse(file.content) as T[];
}

export async function writeCollection<T>(path: CollectionPath, data: T[]): Promise<void> {
  if (!githubStorageConfigured) {
    await localStore.writeCollection(path.local, data);
    return;
  }

  await githubStore.putFile(
    path.github,
    JSON.stringify(data, null, 2),
    `chore(data): actualizar ${path.github}`,
  );
}
