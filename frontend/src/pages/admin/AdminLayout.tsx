import { NavLink, Outlet, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { routes } from "@/app/routes";
import { cn } from "@/lib/cn";

const links = [
  { to: routes.adminCompanies, label: "Empresas" },
  { to: routes.adminTeam, label: "Fundadores" },
  { to: routes.adminProductSlides, label: "Carrusel del producto" },
];

export default function AdminLayout() {
  const { email, logout } = useAdminAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate(routes.adminLogin, { replace: true });
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <header className="border-b border-white/10 bg-navy-900/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-8">
            <span className="font-display text-lg font-semibold">
              ToolsDevs <span className="text-brand-teal">Admin</span>
            </span>
            <nav className="flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-white/10 text-white" : "text-slate-300 hover:text-white",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {email && <span className="text-sm text-slate-400">{email}</span>}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm text-slate-200 transition-colors hover:bg-white/5"
            >
              <LogOut size={14} aria-hidden="true" />
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
