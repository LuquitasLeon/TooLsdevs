import ProcessSection from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import WhyUs from "@/components/sections/WhyUs";
import PageHeader from "@/components/layout/PageHeader";
import PageTransition from "@/components/layout/PageTransition";
import ContactCta from "@/components/sections/ContactCta";
import { useContent } from "@/features/i18n/useI18n";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Process() {
  const { process } = useContent();

  usePageMeta({ title: `${process.title} | ToolsDevs`, description: process.intro });

  return (
    <PageTransition>
      <PageHeader eyebrow={process.eyebrow} title={process.title} description={process.intro} />
      <ProcessSection hideHeading />
      <Team />
      <WhyUs />
      <ContactCta />
    </PageTransition>
  );
}
