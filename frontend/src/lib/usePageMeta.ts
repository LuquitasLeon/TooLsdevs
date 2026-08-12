import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
}

function setMetaTag(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let tag = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

/**
 * Título y descripción por página.
 *
 * En una aplicación de una sola página el `<title>` no cambia solo al navegar,
 * y es lo que se ve en la pestaña, en el historial y al compartir un enlace.
 * La Etapa 5 suma acá las etiquetas Open Graph y el JSON-LD.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMetaTag("description", description);
    setLinkTag("canonical", window.location.origin + window.location.pathname);
  }, [title, description]);
}
