import Container from "@/components/layout/Container";
import PageTransition from "@/components/layout/PageTransition";
import LogoMark from "@/components/brand/LogoMark";
import Button from "@/components/ui/Button";
import { useContent } from "@/features/i18n/useI18n";
import { routes } from "@/app/routes";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  const { ui } = useContent();

  usePageMeta({ title: `${ui.notFoundTitle} | ToolsDevs`, description: ui.notFoundText });

  return (
    <PageTransition>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[120px]" />

        <Container className="relative flex flex-col items-center gap-7 text-center">
          <LogoMark className="h-20 w-20 opacity-60" animate={false} />
          <p className="font-display text-6xl font-bold text-gradient">404</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-fg text-balance">
            {ui.notFoundTitle}
          </h1>
          <p className="max-w-md text-base sm:text-lg text-muted/90 text-pretty">
            {ui.notFoundText}
          </p>
          <Button to={routes.home}>{ui.notFoundCta}</Button>
        </Container>
      </section>
    </PageTransition>
  );
}
