import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { adminLogin, adminLogout, adminMe } from "@/lib/api";
import { AdminAuthContext } from "./context";
import type { AdminAuthValue, AuthStatus } from "./context";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    adminMe().then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setEmail(result.data.email);
        setStatus("authenticated");
      } else {
        setStatus("anonymous");
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (loginEmail: string, password: string) => {
    const result = await adminLogin(loginEmail, password);
    if (result.ok) {
      setEmail(result.data.email);
      setStatus("authenticated");
      return { ok: true };
    }
    return { ok: false, message: result.message };
  }, []);

  const logout = useCallback(async () => {
    await adminLogout();
    setEmail(null);
    setStatus("anonymous");
  }, []);

  const value = useMemo<AdminAuthValue>(
    () => ({ status, email, login, logout }),
    [status, email, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
