import ServicesSection from "@/components/sections/Services";
import Problems from "@/components/sections/Problems";
import Stack from "@/components/sections/Stack";
import PageTransition from "@/components/layout/PageTransition";
import PageHeader from "@/components/layout/PageHeader";
import ContactCta from "@/components/sections/ContactCta";
import { useContent } from "@/features/i18n/useI18n";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Services() {
  const { services } = useContent();

  usePageMeta({ title: `${services.title} | ToolsDevs`, description: services.intro });

  return (
    <PageTransition>
      <PageHeader eyebrow={services.eyebrow} title={services.title} description={services.intro} />
      <ServicesSection hideHeading />
      <Problems />
      <Stack />
      <ContactCta />
    </PageTransition>
  );
}
