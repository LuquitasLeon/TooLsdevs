import { useState } from "react";
import type { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { routes } from "@/app/routes";

export default function AdminLogin() {
  const { status, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (status === "authenticated") {
    return <Navigate to={routes.adminCompanies} replace />;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message ?? "No se pudo iniciar sesión.");
      return;
    }

    navigate(routes.adminCompanies, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-6">
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-navy-900/60 p-8"
      >
        <h1 className="font-display text-xl font-semibold text-white">Panel de administración</h1>
        <p className="mt-1 text-sm text-slate-400">Iniciá sesión para editar el contenido del sitio.</p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-slate-200">
            Correo
            <input
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm text-slate-200">
            Contraseña
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-5 py-2.5 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? "Entrando…" : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
