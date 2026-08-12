import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Link, NavLink } from "react-router";
import Container from "@/components/layout/Container";
import Logo from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { useContent } from "@/features/i18n/useI18n";
import { contact } from "@/content";
import { routes } from "@/app/routes";

export default function Footer() {
  const { nav, ui } = useContent();

  const socialLinks = [
    {
      label: "Email",
      href: `mailto:${contact.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp[0]?.number ?? ""}`,
      Icon: MessageCircle,
      external: true,
    },
    {
      label: "Instagram",
      href: contact.instagram,
      Icon: InstagramIcon,
      external: true,
    },
  ];

  return (
    <footer className="border-t border-white/5 py-10">
      <Container className="flex flex-col gap-8">
        {/* Logo + social icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to={routes.home} className="shrink-0">
            <Logo className="h-7 w-7" wordmarkClassName="text-sm" />
          </Link>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-brand-teal/40 hover:text-brand-teal hover:bg-brand-teal/5"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-1.5 text-sm text-slate-400">
          <MapPin size={14} aria-hidden="true" />
          {contact.location}
        </div>

        {/* Nav links */}
        <nav
          aria-label={ui.mainNav}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/5 pt-6"
        >
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ToolsDevs. Desarrollamos ideas, construimos soluciones.
        </p>
      </Container>
    </footer>
  );
}
