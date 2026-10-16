import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Link, NavLink } from "react-router";
import Container from "@/components/layout/Container";
import Logo from "@/components/brand/Logo";
import Divider from "@/components/ui/Divider";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { useContent } from "@/features/i18n/useI18n";
import { contact } from "@/content";
import { routes } from "@/app/routes";

export default function Footer() {
  const { nav, ui } = useContent();

  // Base sólida (`bg-surface`, la misma que las tarjetas) en vez de un tinte
  // al 10%: con el ícono flotando casi directo sobre la página, un fondo tan
  // tenue lo deja "escondido" — acá el color queda en el borde y el ícono.
  const socialLinks = [
    {
      label: "Email",
      href: `mailto:${contact.email}`,
      Icon: Mail,
      external: false,
      colorClass:
        "bg-surface text-brand-teal-text border-brand-teal/30 hover:bg-surface-hover hover:border-brand-teal/50",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp[0]?.number ?? ""}`,
      Icon: MessageCircle,
      external: true,
      colorClass:
        "bg-surface text-brand-green-text border-brand-green/30 hover:bg-surface-hover hover:border-brand-green/50",
    },
    {
      label: "Instagram",
      href: contact.instagram,
      Icon: InstagramIcon,
      external: true,
      colorClass:
        "bg-surface text-accent-violet-text border-accent-violet/30 hover:bg-surface-hover hover:border-accent-violet/50",
    },
  ];

  return (
    <footer className="relative py-10">
      <Divider />
      <Container className="flex flex-col gap-8">
        {/* Logo + social icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to={routes.home} className="shrink-0">
            <Logo className="h-7 w-7" wordmarkClassName="text-sm" />
          </Link>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon, external, colorClass }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                aria-label={label}
                className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${colorClass}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-sm text-faint">
          <MapPin size={14} aria-hidden="true" />
          {contact.location}
        </div>

        {/* Nav links */}
        <nav
          aria-label={ui.mainNav}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-line/5 pt-6"
        >
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="text-xs text-faint hover:text-fg transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-center text-xs text-faint">
          © {new Date().getFullYear()} ToolsDevs. Desarrollamos ideas, construimos soluciones.
        </p>
      </Container>
    </footer>
  );
}
