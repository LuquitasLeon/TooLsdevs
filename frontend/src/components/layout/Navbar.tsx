import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import LocaleToggle from "@/features/i18n/LocaleToggle";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";
import { cn } from "@/lib/cn";
import Container from "./Container";

export default function Navbar() {
  const { nav, ui } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar el menú con Escape: quien navega con teclado espera poder salir sin
  // tener que tabular hasta el botón. Y al cerrarlo, el foco vuelve al botón —
  // si no, queda suelto al principio de la página.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors",
      isActive ? "text-white" : "text-slate-300 hover:text-white",
    );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-navy-950/85 backdrop-blur-md border-b border-white/10 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <Container className="relative flex h-16 sm:h-20 items-center justify-between gap-4">
        <Link to={routes.home} className="shrink-0" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" wordmarkClassName="text-base sm:text-lg" />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LocaleToggle />
          <Button to={routes.contact} size="md">
            {ui.contactCta}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleToggle />
          <button
            ref={toggleRef}
            type="button"
            className="text-white p-2 -mr-2"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Montado siempre: si el panel entrara y saliera del DOM en cada toggle,
          Chrome tendría que crear la capa de composición del backdrop-blur de
          cero cada vez, y eso se ve como un flash blanco. Solo animamos su
          alto/opacidad, nunca su montaje. `inert` lo saca del tab order y de
          lectores de pantalla mientras está cerrado.
          El `will-change` de acá abajo evita que esa capa se siga armando
          recién al tocar el botón (con alto 0 el navegador la puede estar
          descartando igual): le avisamos de antemano. */}
      <motion.nav
        id="menu-movil"
        aria-label={ui.mainNav}
        initial={false}
        animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
        transition={{ duration: 0.25 }}
        style={{ willChange: "height, opacity, backdrop-filter" }}
        className="md:hidden overflow-hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-md"
        inert={!open}
      >
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-3 text-sm font-medium hover:bg-white/5",
                  isActive ? "text-white bg-white/5" : "text-slate-200",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button to={routes.contact} onClick={() => setOpen(false)} className="mt-2">
            {ui.contactCta}
          </Button>
        </Container>
      </motion.nav>
    </header>
  );
}
