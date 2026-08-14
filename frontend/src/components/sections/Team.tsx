import { ShieldCheck, User } from "lucide-react";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { useContent } from "@/features/i18n/useI18n";

function initials(name: string): string {
  const parts = name.split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export default function Team() {
  const { team } = useContent();
  return (
    <section className="relative overflow-hidden py-section sm:py-section-lg border-t border-white/5">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent-violet/15 blur-[110px]" />

      <Container className="relative flex flex-col gap-12">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} description={team.intro} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <Card className="group flex flex-col items-center text-center gap-5 py-8 px-6">
                {/* Avatar */}
                <div className="relative h-28 w-28 shrink-0 rounded-full overflow-hidden ring-2 ring-brand-teal/40 shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-violet to-brand-teal font-display text-2xl font-bold text-navy-950">
                      {initials(member.name)}
                    </div>
                  )}
                </div>

                {/* Identity */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-white leading-tight">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-brand-teal tracking-wide">
                    {member.role}
                  </p>
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2 w-full text-left">
                  <div className="flex items-start gap-2 text-sm text-slate-200/90">
                    <User size={15} className="mt-0.5 shrink-0 text-slate-400" />
                    <span>{member.detail}</span>
                  </div>
                  {member.extra && (
                    <div className="flex items-start gap-2 text-sm text-slate-200/90">
                      <ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand-green" />
                      <span>{member.extra}</span>
                    </div>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
