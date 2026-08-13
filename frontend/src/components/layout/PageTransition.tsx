import type { ReactNode } from "react";

/**
 * Sin animación, a propósito — mismo motivo que `Reveal`: el fundido +
 * desplazamiento en Y (transform) que tenía antes provocaba el mismo
 * parpadeo de texto en Safari/iOS que ya se sacó de todos los demás lugares
 * del sitio. El nombre y la firma quedan igual para no tocar las 7 páginas
 * que lo usan.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
