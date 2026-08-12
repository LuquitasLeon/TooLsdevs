import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Lleva la vista al principio al cambiar de página.
 *
 * Sin esto, ir de una ficha larga a otra página deja a la persona a mitad de
 * camino, mirando un texto que no pidió. Si la URL trae un ancla, se respeta.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    // `instant` y no `smooth`: al cambiar de página no queremos ver todo el
    // recorrido de vuelta, queremos estar arriba.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
