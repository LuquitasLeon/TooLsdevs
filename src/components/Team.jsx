import { ShieldCheck, User } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import { team } from "../data/content";

function initials(name) {
  const [first, second] = name.split(" ");
  return `${first[0]}${second?.[0] ?? ""}`;
}

export default function Team() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 border-t border-white/5">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-[110px]" />

      <Container className="relative flex flex-col gap-12">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/90">
            Nuestro equipo
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Técnicos programadores, graduados de la UTN FRT
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-200/90">
            Trabajamos de manera integral en todas las áreas de la empresa.
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7 transition-colors hover:border-brand-teal/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-teal font-display text-base font-bold text-navy-950">
                  {initials(member.name)}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-teal">{member.role}</p>
                <div className="mt-4 flex items-start gap-2 text-sm text-slate-200/90">
                  <User size={16} className="mt-0.5 shrink-0 text-slate-500" />
                  <span>{member.detail}</span>
                </div>
                {member.extra && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-slate-200/90">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    <span>{member.extra}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
