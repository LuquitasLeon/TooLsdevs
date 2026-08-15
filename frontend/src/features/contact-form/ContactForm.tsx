import { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { z } from "zod";
import {
  contactRequestSchema,
  HONEYPOT_FIELD,
  type ContactFieldErrors,
} from "@toolsdevs/shared";
import Card from "@/components/ui/Card";
import { useContent, useI18n } from "@/features/i18n/useI18n";
import { submitContact } from "./submitContact";

/** Contexto que el diagnóstico deja al formulario para llegar precargado. */
export interface ContactPrefill {
  service?: string;
  diagnosis?: string;
  message?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm({ prefill }: { prefill?: ContactPrefill }) {
  const { ui } = useContent();
  const { locale } = useI18n();
  const form = ui.form;
  const formId = useId();

  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  // El honeypot no es estado de React: no queremos re-renderizar por él, sólo
  // leerlo al enviar. Un ref alcanza.
  const honeypotRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const formData = new FormData(event.currentTarget);
    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      phone: formData.get("phone") || undefined,
      message: formData.get("message"),
      service: prefill?.service,
      diagnosis: prefill?.diagnosis,
      locale,
      [HONEYPOT_FIELD]: honeypotRef.current?.value || undefined,
    };

    // Validación en el cliente con el MISMO esquema que el servidor: feedback
    // inmediato sin una ida y vuelta a la red.
    const parsed = contactRequestSchema.safeParse(raw);
    if (!parsed.success) {
      setFieldErrors(z.flattenError(parsed.error).fieldErrors);
      return;
    }

    setStatus("sending");
    const result = await submitContact(parsed.data);

    if (result.ok) {
      setStatus("success");
      return;
    }

    setStatus("error");
    if (result.fields) setFieldErrors(result.fields);
    setGeneralError(result.message ?? form.errorGeneric);
  }

  if (status === "success") {
    return (
      <Card padding="roomy" accent="teal">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 py-6 text-center"
          role="status"
        >
          <CheckCircle2 size={44} className="text-brand-green" aria-hidden="true" />
          <h3 className="font-display text-xl font-semibold text-fg">{form.successTitle}</h3>
          <p className="max-w-sm text-muted/90">{form.successText}</p>
        </motion.div>
      </Card>
    );
  }

  const sending = status === "sending";

  return (
    <Card padding="roomy">
      <h2 className="font-display text-xl font-semibold text-fg">{form.title}</h2>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate>
        <Field
          id={`${formId}-name`}
          name="name"
          label={form.nameLabel}
          autoComplete="name"
          error={fieldErrors.name?.[0]}
          required
        />
        <Field
          id={`${formId}-email`}
          name="email"
          type="email"
          label={form.emailLabel}
          autoComplete="email"
          error={fieldErrors.email?.[0]}
          required
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${formId}-company`}
            name="company"
            label={`${form.companyLabel} (${form.optional})`}
            autoComplete="organization"
            error={fieldErrors.company?.[0]}
          />
          <Field
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            label={`${form.phoneLabel} (${form.optional})`}
            autoComplete="tel"
            error={fieldErrors.phone?.[0]}
          />
        </div>

        {prefill?.service && (
          <p className="rounded-lg border border-brand-teal/20 bg-brand-teal/[0.06] px-4 py-2.5 text-sm text-muted">
            <span className="text-faint">{form.serviceLabel}: </span>
            {prefill.service}
          </p>
        )}

        <Field
          id={`${formId}-message`}
          name="message"
          label={form.messageLabel}
          error={fieldErrors.message?.[0]}
          textarea
          defaultValue={prefill?.message}
          required
        />

        {/* Honeypot: fuera de la vista y del recorrido de teclado. Una persona
            no lo ve ni lo tabula; un bot que completa todo, sí. El contenedor
            lleva `aria-hidden`, así que ni la etiqueta ni el campo llegan a un
            lector de pantalla y no hace falta traducir el texto. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${formId}-website`}>Leave this field empty</label>
          <input
            ref={honeypotRef}
            id={`${formId}-website`}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {generalError && (
          <p className="rounded-lg border border-red-400/30 bg-red-400/[0.08] px-4 py-3 text-sm text-danger-text" role="alert">
            {generalError}
          </p>
        )}

        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transform-none"
        >
          {sending ? form.sending : form.submit}
          {!sending && (
            <Send
              size={16}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          )}
        </button>
      </form>
    </Card>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  textarea?: boolean;
  defaultValue?: string;
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  error,
  required = false,
  textarea = false,
  defaultValue,
}: FieldProps) {
  const errorId = `${id}-error`;
  const base =
    "w-full rounded-lg border bg-line/[0.03] px-4 py-3 text-sm text-fg placeholder:text-faint " +
    "transition-colors focus:outline-none focus-visible:border-brand-teal " +
    (error ? "border-red-400/50" : "border-line/10");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={base}
        />
      )}
      {error && (
        <p id={errorId} className="text-sm text-danger-text">
          {error}
        </p>
      )}
    </div>
  );
}
