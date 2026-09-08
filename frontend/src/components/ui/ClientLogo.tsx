interface LogoStyle {
  /** coin: moneda blanca · floatWide: logo transparente ancho · floatCircle: insignia circular sin fondo */
  kind: "coin" | "floatWide" | "floatCircle";
  /** Ajuste fino de encuadre dentro del contenedor. */
  transform?: string;
}

/**
 * Cómo se dibuja cada logo, según cómo viene el archivo original.
 *
 * Es metadato de presentación, no de contenido, así que vive acá y no en el
 * diccionario: cada logo trae su fondo pegado distinto (blanco, negro o
 * transparente) y necesita un trato propio para verse bien sobre el navy.
 *   · VC y PDP vienen con fondo blanco → moneda blanca circular (el recorte
 *     redondo evita el cuadrado blanco), con el logo agrandado y centrado.
 *   · EndPoint ya es transparente → va directo, flotando.
 *   · La Posta es una insignia circular sobre negro → una máscara redonda
 *     recorta las esquinas negras y la deja flotar limpia.
 */
const LOGO_STYLES: Record<string, LogoStyle> = {
  "/logos/ConsultoriosVC.png": { kind: "coin", transform: "scale(1.5)" },
  "/logos/PartidoDemocrataProgresista.png": { kind: "coin", transform: "translate(3px, -2px) scale(1.12)" },
  "/logos/EndPoint.png": { kind: "floatWide" },
  "/logos/LaPosta381.jpeg": { kind: "floatCircle", transform: "scale(1.04)" },
};

/** Logo desconocido (a futuro): moneda blanca, que sirve para cualquier fondo. */
const DEFAULT_STYLE: LogoStyle = { kind: "coin" };

interface Props {
  logo: string;
  name: string;
  /** Diámetro de la moneda / círculo, y alto del logo ancho. */
  size: number;
  /** Ancho máximo para los logos anchos (EndPoint). */
  wideMaxWidth?: number;
}

export default function ClientLogo({ logo, name, size, wideMaxWidth }: Props) {
  const style = LOGO_STYLES[logo] ?? DEFAULT_STYLE;
  const alt = `Logo de ${name}`;

  if (style.kind === "coin") {
    return (
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-lg shadow-black/30 ring-1 ring-white/50"
        style={{ height: size, width: size }}
      >
        <img
          src={logo}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain"
          style={{ transform: style.transform }}
        />
      </div>
    );
  }

  if (style.kind === "floatCircle") {
    return (
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ height: size, width: size }}
      >
        <img
          src={logo}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          style={{ transform: style.transform }}
        />
      </div>
    );
  }

  // floatWide (EndPoint): transparente, se ajusta por alto y con tope de ancho.
  return (
    <div
      className="flex shrink-0 items-center justify-center"
      style={{ height: size, maxWidth: wideMaxWidth ?? size * 2 }}
    >
      <img
        src={logo}
        alt={alt}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
        style={{ transform: style.transform }}
      />
    </div>
  );
}
