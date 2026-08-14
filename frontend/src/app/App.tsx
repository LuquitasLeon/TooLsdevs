import { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTopButton from "@/components/layout/BackToTopButton";
import { I18nProvider } from "@/features/i18n/I18nProvider";
import { useContent, useI18n } from "@/features/i18n/useI18n";
import ScrollToTop from "./ScrollToTop";
import { PROJECT_ROUTE_PATTERN, routes } from "./routes";

/*
 * Cada página se carga por separado: quien entra a la portada no descarga el
 * código de la ficha de proyecto ni el del formulario. La portada se importa
 * de forma directa porque es la que se ve primero y no queremos que espere.
 */
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const Projects = lazy(() => import("@/pages/Projects"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const Process = lazy(() => import("@/pages/Process"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

/** Espacio reservado mientras llega el código de una página. */
function PageFallback() {
  const { ui } = useContent();
  return (
    <div className="flex min-h-screen items-center justify-center" role="status" aria-live="polite">
      <span className="text-sm text-slate-400">{ui.loading}</span>
    </div>
  );
}

function Layout() {
  const { ui } = useContent();
  const { locale } = useI18n();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);

  useLayoutEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    const el = wrapperRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "0";
    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.2s ease";
      el.style.opacity = "1";
    });
    return () => cancelAnimationFrame(raf);
  }, [locale]);

  return (
    <div ref={wrapperRef} className="min-h-screen overflow-x-hidden bg-navy-950">
      {/* Primer elemento enfocable de la página: permite saltar la navegación
          sin tener que tabular por todos los enlaces del menú. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-teal focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-navy-950"
      >
        {ui.skipToContent}
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="contenido">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.services} element={<Services />} />
            <Route path={routes.projects} element={<Projects />} />
            <Route path={PROJECT_ROUTE_PATTERN} element={<ProjectDetail />} />
            <Route path={routes.process} element={<Process />} />
            <Route path={routes.contact} element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </I18nProvider>
  );
}
