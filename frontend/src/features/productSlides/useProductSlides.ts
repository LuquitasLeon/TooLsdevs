import { useEffect, useState } from "react";
import type { ProductSlide } from "@toolsdevs/shared";
import { listProductSlides } from "@/lib/api";
import { useI18n } from "@/features/i18n/useI18n";

/** Capturas del carrusel del producto propio, tal como las administra el panel. */
export function useProductSlides() {
  const { locale } = useI18n();
  const [slides, setSlides] = useState<ProductSlide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    listProductSlides().then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setSlides(
          result.data.slides.map((slide) => ({
            image: slide.image,
            title: locale === "en" ? slide.titleEn : slide.titleEs,
            description: locale === "en" ? slide.descriptionEn : slide.descriptionEs,
          })),
        );
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return { slides, loading };
}
