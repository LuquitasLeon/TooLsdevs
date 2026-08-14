import { useRef, useState } from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/features/contact-form/ContactForm";
import type { ContactPrefill } from "@/features/contact-form/ContactForm";
import Diagnostico from "@/features/diagnostico/Diagnostico";
import { useContent } from "@/features/i18n/useI18n";
import { contact } from "@/content";
import { usePageMeta } from "@/lib/usePageMeta";

/**
 * Página de contacto.
 *
 * Tres caminos hacia lo mismo: el diagnóstico interactivo (para quien no sabe
 * qué pedir), el formulario directo, y los canales de siempre (WhatsApp, mail).
 * Al terminar el diagnóstico, el formulario aparece precargado con el contexto.
 */
export default function Contact() {
  const { ui } = useContent();
  const [prefill, setPrefill] = useState<ContactPrefill>();
  const formRef = useRef<HTMLDivElement>(null);

  usePageMeta({ title: `${ui.contactEyebrow} | ToolsDevs`, description: ui.contactText });

  const handleDiagnosisComplete = (result: ContactPrefill) => {
    setPrefill(result);
    // Llevar la vista al formulario ya precargado: la persona ve el resultado
    // de su diagnóstico convertido en el primer paso de la consulta.
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <PageTransition>
      <PageHeader
        eyebrow={ui.contactEyebrow}
        title={ui.contactHeading}
        description={ui.contactText}
        accent="amber"
      />

      <section className="pb-section sm:pb-section-lg">
        <Container className="flex flex-col gap-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            <Reveal className="lg:sticky lg:top-28">
              <Diagnostico onComplete={handleDiagnosisComplete} />
            </Reveal>

            <Reveal delay={0.08}>
              <div ref={formRef} className="scroll-mt-28">
                <ContactForm prefill={prefill} />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <Card className="flex flex-col gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <MessageCircle size={22} aria-hidden="true" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">WhatsApp</h2>
                <div className="flex flex-col gap-2">
                  {contact.whatsapp.map((person) => (
                    <a
                      key={person.number}
                      href={`https://wa.me/${person.number}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-300 hover:text-brand-teal transition-colors"
                      aria-label={`Escribir por WhatsApp a ${person.name}, ${person.label}`}
                    >
                      {person.name}
                    </a>
                  ))}
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.06}>
              <Card className="flex flex-col gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">Email</h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-slate-300 hover:text-brand-teal transition-colors break-all"
                >
                  {contact.email}
                </a>
              </Card>
            </Reveal>

            <Reveal delay={0.12}>
              <Card className="flex flex-col gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-slate-300">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">
                  {contact.location}
                </h2>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
