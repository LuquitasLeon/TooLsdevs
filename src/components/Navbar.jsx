import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Container from "./ui/Container";
import { nav } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-navy-950/85 backdrop-blur-md border-b border-white/10 transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <Container className="relative flex h-16 sm:h-20 items-center justify-between">
        <a href="#inicio" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" wordmarkClassName="text-base sm:text-lg" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-lg shadow-brand-teal/20 transition-transform hover:scale-105"
        >
          Contactanos
        </a>

        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-md"
          >
            <Container className="flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-200 hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-green to-brand-teal px-5 py-3 text-sm font-semibold text-navy-950"
              >
                Contactanos
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
