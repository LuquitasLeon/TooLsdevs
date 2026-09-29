import { useContext } from "react";
import { AdminAuthContext } from "./context";

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) {
    throw new Error("useAdminAuth debe usarse dentro de <AdminAuthProvider>");
  }
  return value;
}
