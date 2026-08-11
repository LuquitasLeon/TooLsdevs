import { Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import Logo from "./Logo";
import { InstagramIcon } from "./icons/SocialIcons";
import { contact } from "../data/content";

const socials = [{ label: "Instagram", href: contact.instagram, Icon: InstagramIcon }];

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/5 pt-24 pb-10 sm:pt-32">
      <Container className="flex flex-col gap-14">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-teal/90">
            Contacto
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
            Convertimos el problema de tu empresa en una herramienta
          </h2>
          <p className="text-base sm:text-lg text-slate-300/90">
            Contanos qué necesitás y te respondemos a la brevedad.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            {contact.whatsapp.map((person) => (
              <a
                key={person.number}
                href={`https://wa.me/${person.number}`}
                target="_blank"
                rel="noreferrer"
                title={person.label}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-6 py-3 text-sm font-semibold text-navy-950 shadow-lg shadow-brand-teal/20 transition-transform hover:scale-105"
              >
                <MessageCircle size={16} />
                {person.name}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            <Mail size={18} />
            {contact.email}
          </a>
        </Reveal>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
          <a href="#inicio" className="shrink-0">
            <Logo className="h-7 w-7" wordmarkClassName="text-sm" />
          </a>

          <div className="flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin size={16} />
            {contact.location}
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand-teal/40 hover:text-brand-teal"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ToolsDevs. Desarrollamos ideas, construimos soluciones.
        </p>
      </Container>
    </footer>
  );
}
