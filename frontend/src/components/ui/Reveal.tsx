import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}

/**
 * Sin animación, a propósito.
 *
 * Hubo un parpadeo de texto persistente en Safari/iOS que sobrevivió a sacar
 * el blur, el desplazamiento en Y y hasta reducir todo a un fundido de solo
 * opacidad — así que se saca la animación del todo acá. El nombre y la firma
 * del componente quedan igual para no tocar los ~20 lugares que lo usan.
 */
export default function Reveal({ children, className = "" }: RevealProps) {
  return <div className={className}>{children}</div>;
}
