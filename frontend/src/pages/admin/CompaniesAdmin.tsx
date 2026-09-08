import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { CompanyRecord } from "@toolsdevs/shared";
import { createCompany, deleteCompany, listCompanies, updateCompany } from "@/lib/api";

const emptyForm = { name: "", link: "", order: "0" };

export default function CompaniesAdmin() {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    setLoading(true);
    const result = await listCompanies();
    if (result.ok) setCompanies(result.data.companies);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  function startEdit(company: CompanyRecord) {
    setEditingId(company.id);
    setForm({ name: company.name, link: company.link ?? "", order: String(company.order) });
    setFile(null);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const data = new FormData();
    data.set("name", form.name);
    data.set("link", form.link);
    data.set("order", form.order);
    if (file) data.set("image", file);

    const result = editingId ? await updateCompany(editingId, data) : await createCompany(data);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message ?? "No se pudo guardar.");
      return;
    }

    cancelEdit();
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar esta empresa del carrusel?")) return;
    await deleteCompany(id);
    if (editingId === id) cancelEdit();
    await refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Empresas</h1>
        <p className="mt-1 text-sm text-slate-400">
          Logos del carrusel de "empresas que trabajan con nosotros" en la portada.
        </p>
      </div>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:flex-row sm:flex-wrap sm:items-end"
      >
        <label className="flex flex-1 min-w-[180px] flex-col gap-1.5 text-sm text-slate-200">
          Nombre
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-1 min-w-[180px] flex-col gap-1.5 text-sm text-slate-200">
          Link (opcional)
          <input
            type="url"
            placeholder="https://…"
            value={form.link}
            onChange={(event) => setForm({ ...form, link: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex w-24 flex-col gap-1.5 text-sm text-slate-200">
          Orden
          <input
            type="number"
            min={0}
            value={form.order}
            onChange={(event) => setForm({ ...form, order: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-1 min-w-[220px] flex-col gap-1.5 text-sm text-slate-200">
          Logo {editingId ? "(dejar vacío para no cambiarlo)" : ""}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3.5 file:py-1.5 file:text-slate-200"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-5 py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
          >
            {submitting ? "Guardando…" : editingId ? "Guardar cambios" : "Agregar empresa"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-slate-200 hover:bg-white/5"
            >
              Cancelar
            </button>
          )}
        </div>

        {error && <p className="w-full text-sm text-red-400">{error}</p>}
      </form>

      {loading ? (
        <p className="text-sm text-slate-400">Cargando…</p>
      ) : companies.length === 0 ? (
        <p className="text-sm text-slate-400">Todavía no hay empresas cargadas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-5"
            >
              <div className="flex h-16 items-center justify-center rounded-lg bg-white/5 p-3">
                <img src={company.logo} alt={company.name} className="h-full w-auto object-contain" />
              </div>
              <div>
                <p className="font-semibold text-white">{company.name}</p>
                <p className="text-xs text-slate-400">Orden: {company.order}</p>
                {company.link && (
                  <a
                    href={company.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs text-brand-teal hover:underline"
                  >
                    {company.link}
                  </a>
                )}
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(company)}
                  className="flex-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(company.id)}
                  className="flex-1 rounded-full border border-red-400/30 px-3 py-1.5 text-xs text-red-300 hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
