import { useEffect, useState } from "react";
import type { ClientProject } from "@toolsdevs/shared";
import { listCompanies } from "@/lib/api";
import { useI18n } from "@/features/i18n/useI18n";

/**
 * Empresas cliente, tal como las administra el panel — traducidas al idioma
 * activo y ya en la forma que esperan `ClientsMarquee`/`ClientCard`.
 */
export function useClients() {
  const { locale } = useI18n();
  const [clients, setClients] = useState<ClientProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    listCompanies().then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setClients(
          result.data.companies.map((company) => ({
            name: company.name,
            logo: company.logo,
            category: locale === "en" ? company.categoryEn : company.categoryEs,
            summary: locale === "en" ? company.summaryEn : company.summaryEs,
            url: company.url,
            comingSoon: company.comingSoon,
          })),
        );
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { clients, loading };
}
