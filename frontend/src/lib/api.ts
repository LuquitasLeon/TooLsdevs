import type { CompanyRecord, TeamMemberRecord } from "@toolsdevs/shared";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; message?: string };

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      credentials: "include",
      ...init,
      headers: {
        ...(init?.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...init?.headers,
      },
    });

    const body = (await response.json().catch(() => null)) as
      | (T & { ok?: boolean; error?: string })
      | null;

    if (!response.ok) {
      return { ok: false, message: body?.error ?? "Ocurrió un error." };
    }

    return { ok: true, data: body as T };
  } catch {
    return { ok: false, message: "No se pudo conectar con el servidor." };
  }
}

// --- Sesión ---

export function adminLogin(email: string, password: string) {
  return request<{ email: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function adminLogout() {
  return request<Record<string, never>>("/api/admin/logout", { method: "POST" });
}

export function adminMe() {
  return request<{ email: string }>("/api/admin/me");
}

// --- Empresas ---

export function listCompanies() {
  return request<{ companies: CompanyRecord[] }>("/api/companies");
}

export function createCompany(formData: FormData) {
  return request<{ company: CompanyRecord }>("/api/admin/companies", {
    method: "POST",
    body: formData,
  });
}

export function updateCompany(id: string, formData: FormData) {
  return request<{ company: CompanyRecord }>(`/api/admin/companies/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteCompany(id: string) {
  return request<Record<string, never>>(`/api/admin/companies/${id}`, { method: "DELETE" });
}

// --- Fundadores ---

export function listTeamMembers() {
  return request<{ members: TeamMemberRecord[] }>("/api/team");
}

export function createTeamMember(formData: FormData) {
  return request<{ member: TeamMemberRecord }>("/api/admin/team", {
    method: "POST",
    body: formData,
  });
}

export function updateTeamMember(id: string, formData: FormData) {
  return request<{ member: TeamMemberRecord }>(`/api/admin/team/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteTeamMember(id: string) {
  return request<Record<string, never>>(`/api/admin/team/${id}`, { method: "DELETE" });
}
