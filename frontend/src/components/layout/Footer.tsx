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
      colorClass:
        "bg-brand-teal/10 text-brand-teal border-brand-teal/20 hover:bg-brand-teal/20 hover:border-brand-teal/40",
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/${contact.whatsapp[0]?.number ?? ""}`,
      Icon: MessageCircle,
      external: true,
      colorClass:
        "bg-brand-green/10 text-brand-green border-brand-green/20 hover:bg-brand-green/20 hover:border-brand-green/40",
    },
    {
      label: "Instagram",
      href: contact.instagram,
      Icon: InstagramIcon,
      external: true,
      colorClass:
        "bg-violet-400/10 text-violet-300 border-violet-400/20 hover:bg-violet-400/20 hover:border-violet-400/40",
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
