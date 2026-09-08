import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { ProductSlideRecord } from "@toolsdevs/shared";
import {
  createProductSlide,
  deleteProductSlide,
  listProductSlides,
  updateProductSlide,
} from "@/lib/api";

const emptyForm = {
  titleEs: "",
  titleEn: "",
  descriptionEs: "",
  descriptionEn: "",
  order: "0",
};

export default function ProductSlidesAdmin() {
  const [slides, setSlides] = useState<ProductSlideRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refresh() {
    setLoading(true);
    const result = await listProductSlides();
    if (result.ok) setSlides(result.data.slides);
    setLoading(false);
  }

  useEffect(() => {
    void refresh();
  }, []);

  function startEdit(slide: ProductSlideRecord) {
    setEditingId(slide.id);
    setForm({
      titleEs: slide.titleEs,
      titleEn: slide.titleEn,
      descriptionEs: slide.descriptionEs,
      descriptionEn: slide.descriptionEn,
      order: String(slide.order),
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
      ? await updateProductSlide(editingId, data)
      : await createProductSlide(data);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message ?? "No se pudo guardar.");
      return;
    }

    cancelEdit();
    await refresh();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar esta captura del carrusel?")) return;
    await deleteProductSlide(id);
    if (editingId === id) cancelEdit();
    await refresh();
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Carrusel del producto</h1>
        <p className="mt-1 text-sm text-slate-400">
          Capturas de ToolsShop que se muestran en la vitrina de "Proyectos".
        </p>
      </div>

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="grid gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-6 sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Título (ES)
          <input
            required
            value={form.titleEs}
            onChange={(event) => setForm({ ...form, titleEs: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Título (EN)
          <input
            required
            value={form.titleEn}
            onChange={(event) => setForm({ ...form, titleEn: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Descripción (ES)
          <textarea
            required
            rows={3}
            value={form.descriptionEs}
            onChange={(event) => setForm({ ...form, descriptionEs: event.target.value })}
            className="rounded-lg border border-white/15 bg-navy-950 px-3.5 py-2.5 text-white outline-none focus:border-brand-teal"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-slate-200">
          Descripción (EN)
          <textarea
            required
            rows={3}
            value={form.descriptionEn}
            onChange={(event) => setForm({ ...form, descriptionEn: event.target.value })}
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
          Captura {editingId ? "(dejar vacío para no cambiarla)" : ""}
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
            {submitting ? "Guardando…" : editingId ? "Guardar cambios" : "Agregar captura"}
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
      ) : slides.length === 0 ? (
        <p className="text-sm text-slate-400">Todavía no hay capturas cargadas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-900/60 p-5"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-lg bg-white/5">
                <img src={slide.image} alt={slide.titleEs} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-white">{slide.titleEs}</p>
                <p className="text-xs text-slate-400">Orden: {slide.order}</p>
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(slide)}
                  className="flex-1 rounded-full border border-white/15 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/5"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(slide.id)}
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
