import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { routes } from "@/app/routes";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { status } = useAdminAuth();

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <span className="text-sm text-slate-400">Verificando sesión…</span>
      </div>
    );
  }

  if (status === "anonymous") {
    return <Navigate to={routes.adminLogin} replace />;
  }

  return <>{children}</>;
}
