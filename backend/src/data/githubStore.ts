import { env } from "../config/env.js";

const API_BASE = "https://api.github.com";

interface GitHubFile {
  content: string;
  sha: string;
}

function contentsUrl(path: string): string {
  return `${API_BASE}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${path}`;
}

function request(path: string, init?: RequestInit): Promise<Response> {
  return fetch(path, {
    ...init,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...init?.headers,
    },
  });
}

/** Lee un archivo de la rama de datos. `null` si todavía no existe. */
export async function getFile(path: string): Promise<GitHubFile | null> {
  const response = await request(`${contentsUrl(path)}?ref=${env.GITHUB_DATA_BRANCH}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`GitHub: no se pudo leer "${path}" (${response.status})`);
  }

  const body = (await response.json()) as { content: string; sha: string };
  return { content: Buffer.from(body.content, "base64").toString("utf8"), sha: body.sha };
}

/** Crea o reemplaza un archivo de texto en la rama de datos. */
export async function putFile(path: string, content: string, message: string): Promise<void> {
  const existing = await getFile(path);
  const response = await request(contentsUrl(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, "utf8").toString("base64"),
      branch: env.GITHUB_DATA_BRANCH,
      sha: existing?.sha,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub: no se pudo escribir "${path}" (${response.status}): ${detail}`);
  }
}

/** Sube un archivo binario (ya en base64) como contenido nuevo. */
export async function putBinaryFile(path: string, base64Content: string, message: string): Promise<void> {
  const response = await request(contentsUrl(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: base64Content, branch: env.GITHUB_DATA_BRANCH }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub: no se pudo subir "${path}" (${response.status}): ${detail}`);
  }
}

/** Borra un archivo de la rama de datos. No falla si ya no existe. */
export async function deleteFile(path: string, message: string): Promise<void> {
  const existing = await getFile(path);
  if (!existing) return;

  const response = await request(contentsUrl(path), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha: existing.sha, branch: env.GITHUB_DATA_BRANCH }),
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`GitHub: no se pudo borrar "${path}" (${response.status})`);
  }
}

/** URL pública (raw) de un archivo de la rama de datos. */
export function rawUrl(path: string): string {
  return `https://raw.githubusercontent.com/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/${env.GITHUB_DATA_BRANCH}/${path}`;
}
