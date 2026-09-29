import { createContext } from "react";

export type AuthStatus = "checking" | "authenticated" | "anonymous";

export interface AdminAuthValue {
  status: AuthStatus;
  email: string | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => Promise<void>;
}

export const AdminAuthContext = createContext<AdminAuthValue | null>(null);
