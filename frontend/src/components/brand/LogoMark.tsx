import { useEffect, useId, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * El logo de ToolsDevs como SVG vectorial.
 *
 * Reconstruido a mano midiendo el PNG original: pesa ~2 KB en vez de 294 KB,
 * escala sin perder nitidez y —lo importante para el hero— cada trazo se puede
 * animar por separado, cosa imposible con una imagen.
 *
 * El orden de los trazos es el orden en el que se dibujan: primero el contorno
 * de la cara, después los ojos, la nariz, la boca y por último las llaves.
 */
const STROKES = [
  // Contorno de la cara: arranca arriba a la izquierda y baja por la derecha.
  "M140.5 94.5A73.5 73.5 0 0 1 214 21h278A74 74 0 0 1 566 95v190.5",
  // Contorno inferior, después del corte del lado derecho.
  "M566 353.5V491a84 84 0 0 1-84 84H283a43 43 0 0 1-43-43v-62",
  // Boca.
  "M170 460h245",
  // Nariz en forma de L.
  "M335.5 264.5v117a12 12 0 0 0 12 12h67",
] as const;

const EYES = [
  "M192.5 158.5h44a52 52 0 0 1 52 52v24a52 52 0 0 1-52 52h-44a52 52 0 0 1-52-52v-24a52 52 0 0 1 52-52Z",
  "M435 158.5h41a52 52 0 0 1 52 52v24a52 52 0 0 1-52 52h-41a52 52 0 0 1-52-52v-24a52 52 0 0 1 52-52Z",
] as const;

/** Centros de cada ojo, medidos sobre el original. Ahí van las pupilas. */
const PUPILS = [
  { cx: 214.5, cy: 222.5 },
  { cx: 455.5, cy: 222.5 },
] as const;

const PUPIL_RADIUS = 25;
/** Cuánto se puede desplazar la pupila sin salirse del hueco del ojo. */
const PUPIL_TRAVEL_X = 30;
const PUPIL_TRAVEL_Y = 20;
/** El contorno del ojo acompaña muy poquito, para dar sensación de profundidad. */
const EYE_TRAVEL_X = 7;
const EYE_TRAVEL_Y = 5;

/** La llave `{`. La `}` es la misma reflejada, así no duplicamos el trazado. */
const BRACE =
  "M77 243C60 243 50 251 50 258v28c0 8-10 21.5-19 21.5 9 0 19 13.5 19 21.5v28c0 7 10 15 27 15";

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

interface LogoMarkProps {
  className?: string;
  /** Dibuja el logo trazo por trazo al aparecer. */
  animate?: boolean;
  /**
   * Suma pupilas que siguen al cursor por toda la página.
   *
   * Sólo para el logo grande del hero: en la barra y el pie la marca tiene que
   * leerse como identidad, no como personaje.
   */
  interactive?: boolean;
  /**
   * Nombre accesible. Si no se pasa, el logo se marca como decorativo — que es
   * lo correcto cuando al lado ya está escrito "ToolsDevs".
   */
  title?: string;
  colorFrom?: string;
  colorTo?: string;
}

export default function LogoMark({
  className = "h-10 w-10",
  animate = true,
  interactive = false,
  title,
  colorFrom = "#84f866",
  colorTo = "#57d1d2",
}: LogoMarkProps) {
  // Cada instancia necesita su propio id de gradiente: dos ids iguales en la
  // misma página hacen que el segundo logo herede el gradiente del primero.
  const gradientId = useId();
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animate && !prefersReducedMotion;
  const svgRef = useRef<SVGSVGElement>(null);

  // Posición del cursor respecto del centro del logo, normalizada a -1..1.
  const aimX = useMotionValue(0);
  const aimY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(aimX, spring);
  const smoothY = useSpring(aimY, spring);

  const pupilX = useTransform(smoothX, (v) => v * PUPIL_TRAVEL_X);
  const pupilY = useTransform(smoothY, (v) => v * PUPIL_TRAVEL_Y);
  const eyeOffsetX = useTransform(smoothX, (v) => v * EYE_TRAVEL_X);
  const eyeOffsetY = useTransform(smoothY, (v) => v * EYE_TRAVEL_Y);

  // Las unidades importan: `translate(13 10)` es sintaxis de atributo SVG y como
  // valor CSS es inválido, así que el navegador lo descarta sin avisar.
  const pupilTransform = useMotionTemplate`translate(${pupilX}px, ${pupilY}px)`;
  const eyeTransform = useMotionTemplate`translate(${eyeOffsetX}px, ${eyeOffsetY}px)`;

  const tracking = interactive && !prefersReducedMotion;

  useEffect(() => {
    if (!tracking) return;
    const element = svgRef.current;
    if (!element) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!lastEvent) return;
      const bounds = element.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      // Se divide por algo más grande que el propio logo para que la mirada
      // recorra un buen tramo de pantalla antes de llegar al tope.
      aimX.set(clamp((lastEvent.clientX - centerX) / (bounds.width * 1.4), 1));
      aimY.set(clamp((lastEvent.clientY - centerY) / (bounds.height * 1.4), 1));
    };

    // Leer la posición del elemento fuerza al navegador a recalcular el layout;
    // agrupándolo en un frame se hace una vez por cuadro y no una por evento.
    const onPointerMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [tracking, aimX, aimY]);

  const draw = (index: number) =>
    shouldAnimate
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: 1.1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const },
            opacity: { duration: 0.2, delay: index * 0.12 },
          },
        }
      : {};

  return (
    <svg
      ref={svgRef}
      viewBox="12 1 667 593"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={gradientId} x1="20" y1="0" x2="671" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={colorFrom} />
          <stop offset="1" stopColor={colorTo} />
        </linearGradient>
      </defs>

      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={22}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {STROKES.map((d, i) => (
          <motion.path key={d} d={d} {...draw(i)} />
        ))}

        <motion.g style={tracking ? { transform: eyeTransform } : undefined}>
          {EYES.map((d, i) => (
            <motion.path key={d} d={d} {...draw(i + 2)} />
          ))}
        </motion.g>

        <motion.path d={BRACE} {...draw(4)} />
        <g transform="translate(691,0) scale(-1,1)">
          <motion.path d={BRACE} {...draw(4)} />
        </g>
      </g>

      {interactive && (
        // Dos grupos separados a propósito: el de afuera lleva el desplazamiento
        // del seguimiento y el de adentro la aparición. Si ambos escribieran
        // sobre `transform`, uno pisaría al otro.
        <motion.g style={tracking ? { transform: pupilTransform } : undefined}>
          <motion.g
            fill={`url(#${gradientId})`}
            initial={shouldAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            // Las pupilas aparecen al final, cuando los ojos ya están dibujados.
            transition={{ duration: 0.5, delay: shouldAnimate ? 1 : 0 }}
          >
            {PUPILS.map((pupil) => (
              <circle key={pupil.cx} cx={pupil.cx} cy={pupil.cy} r={PUPIL_RADIUS} />
            ))}
          </motion.g>
        </motion.g>
      )}
    </svg>
  );
}
