import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { TeamMemberRecord } from "@toolsdevs/shared";
import { createTeamMember, deleteTeamMember, listTeamMembers, updateTeamMember } from "@/lib/api";

const emptyForm = {
  name: "",
  roleEs: "",
  roleEn: "",
  detailEs: "",
  detailEn: "",
  extraEs: "",
  extraEn: "",
  order: "0",
};

export default function TeamAdmin() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    setLoading(true);
    const result = await listTeamMembers();
    if (result.ok) setMembers(result.data.members);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  function startEdit(member: TeamMemberRecord) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      roleEs: member.roleEs,
      roleEn: member.roleEn,
      detailEs: member.detailEs,
      detailEn: member.detailEn,
      extraEs: member.extraEs ?? "",
      extraEn: member.extraEn ?? "",
      order: String(member.order),
    });
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
    for (const [key, value] of Object.entries(form)) data.set(key, value);
    if (file) data.set("image", file);

    const result = editingId
      ? await updateTeamMember(editingId, data)
      : await createTeamMember(data);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message ?? "No se pudo guardar.");
      return;
    }

    cancelEdit();
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar este fundador?")) return;
    await deleteTeamMember(id);
    if (editingId === id) cancelEdit();
    await refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Fundadores</h1>
        <p className="mt-1 text-sm text-slate-400">
          Tarjetas del equipo que se muestran en "Cómo trabajamos".
        </p>
      </div>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="grid gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1.5 text-sm text-slate-200 sm:col-span-2">
          Nombre
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Rol (ES)
          <input
            required
            value={form.roleEs}
            onChange={(event) => setForm({ ...form, roleEs: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Rol (EN)
          <input
            required
            value={form.roleEn}
            onChange={(event) => setForm({ ...form, roleEn: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Detalle (ES)
          <input
            required
            value={form.detailEs}
            onChange={(event) => setForm({ ...form, detailEs: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Detalle (EN)
          <input
            required
            value={form.detailEn}
            onChange={(event) => setForm({ ...form, detailEn: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Extra (ES, opcional)
          <input
            value={form.extraEs}
            onChange={(event) => setForm({ ...form, extraEs: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Extra (EN, opcional)
          <input
            value={form.extraEn}
            onChange={(event) => setForm({ ...form, extraEn: event.target.value })}
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

        <label className="flex flex-col gap-1.5 text-sm text-slate-200 sm:col-span-2">
          Foto {editingId ? "(dejar vacío para no cambiarla)" : "(opcional)"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-3.5 file:py-1.5 file:text-slate-200"
          />
        </label>

        <div className="flex gap-2 sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-5 py-2.5 text-sm font-semibold text-navy-950 disabled:opacity-60"
          >
            {submitting ? "Guardando…" : editingId ? "Guardar cambios" : "Agregar fundador"}
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

        {error && <p className="text-sm text-red-400 sm:col-span-2">{error}</p>}
      </form>

      {loading ? (
        <p className="text-sm text-slate-400">Cargando…</p>
      ) : members.length === 0 ? (
        <p className="text-sm text-slate-400">Todavía no hay fundadores cargados.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/5">
                  {member.photo && (
                    <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-slate-400">{member.roleEs}</p>
                  <p className="text-xs text-slate-500">Orden: {member.order}</p>
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(member)}
                  className="flex-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(member.id)}
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
