import { useEffect, useState } from "react";
import type { CompanyRecord } from "@toolsdevs/shared";
import { listCompanies } from "@/lib/api";

export function useCompanies() {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    listCompanies().then((result) => {
      if (cancelled) return;
      if (result.ok) setCompanies(result.data.companies);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { companies, loading };
}
