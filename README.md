# ToolsDevs

Sitio web de **ToolsDevs** — desarrollo de software y ciberseguridad, Tucumán, Argentina.

> No vendemos software. Creamos herramientas.

## Estructura

El repositorio está dividido en tres paquetes coordinados con npm workspaces:

| Paquete | Qué es | Stack |
|---|---|---|
| [`frontend/`](frontend) | El sitio público | Vite · React 19 · Tailwind 4 · TypeScript · Framer Motion |
| [`backend/`](backend) | API del formulario de contacto | Node · Express 5 · TypeScript |
| [`shared/`](shared) | Tipos y esquemas usados por ambos | Zod · TypeScript |

`shared/` existe por una razón concreta: el esquema de validación del formulario se escribe **una sola vez** y lo importan los dos lados. También contiene las interfaces de todo el contenido del sitio (`SiteContent`, `TeamMember`, `HomeTeaser`, etc.), así cualquier cambio en la estructura de datos lo marca TypeScript antes de publicar.

## Arrancar el proyecto

Requiere Node 20 o superior.

```bash
npm install
```

Copiá las variables de entorno del backend y completá lo que haga falta:

```bash
cp backend/.env.example backend/.env
```

Y levantá todo junto — frontend en `:5173`, backend en `:3001`:

```bash
npm run dev
```

El frontend hace proxy de `/api` hacia el backend, así que en desarrollo no hay que configurar CORS.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta frontend y backend a la vez |
| `npm run build` | Compila los tres paquetes |
| `npm run typecheck` | Chequea tipos en todo el repositorio |
| `npm run lint` | Pasa oxlint sobre el frontend |
| `npm run preview` | Sirve el build de producción del frontend |

Cada paquete acepta los mismos comandos por separado con `-w`, por ejemplo `npm run dev -w backend`.

## Arquitectura del contenido

El contenido del sitio está centralizado en [`frontend/src/content/`](frontend/src/content), separado por idioma (`es/` y `en/`), tipado completamente desde `shared/src/types/content.ts`. Agregar un idioma nuevo rompe la compilación si le falta alguna clave — es intencional.

### Home como vitrina

La página principal es un recorrido corto: presenta lo más importante de cada sección y redirige al detalle. Las páginas hijas tienen la información completa:

| Sección | Home | Página hija |
|---|---|---|
| Servicios | Teaser con 3 highlights + CTA | Lista completa + Stack |
| Metodología | Teaser con 3 highlights + CTA | Proceso paso a paso |
| Por qué elegirnos | Resumen 3 razones + CTA | 8 razones completas |
| Stack tecnológico | — | Solo en `/servicios` |
| Equipo | — | Solo en `/como-trabajamos` |

### Datos de contacto

Viven en [`frontend/src/content/contact.ts`](frontend/src/content/contact.ts), fuera de las traducciones, porque no cambian según el idioma.

### Fotos del equipo

Las fotos de los integrantes se guardan en [`frontend/public/team/`](frontend/public/team/):

```
frontend/public/team/
  santiago.jpg   → Santiago Nicolás Ferreyra Appas
  ismael.jpg     → Ismael Lucas León
  luciano.jpg    → Luciano Agustín Llanos
```

Si una foto no existe, la card muestra las iniciales del integrante como fallback.

## i18n (internacionalización)

El sitio soporta español e inglés. El toggle de idioma es una píldora deslizante (CSS `transform` con `cubic-bezier` tipo spring) en la navbar. El cambio de idioma hace un fade-in sincronizado con `useLayoutEffect` para evitar el salto de layout que produce el cambio de tamaño entre textos.

El idioma activo se persiste en `localStorage` y se detecta automáticamente desde `navigator.language` en la primera visita.

## Al desplegar: redirección al index

El sitio tiene rutas reales (`/servicios`, `/proyectos/:slug`, …) pero se sirve como un único `index.html`. **El hosting tiene que redirigir todas las rutas a `/index.html`**, o entrar directamente a `toolsdevs.com/servicios` va a devolver un 404.

- **Vercel** — crear `vercel.json` con `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Netlify / Cloudflare Pages** — crear `frontend/public/_redirects` con `/*  /index.html  200`
- **Nginx (VPS)** — en el bloque `server`: `try_files $uri $uri/ /index.html;`

En desarrollo Vite ya lo hace solo, así que el problema sólo aparece en producción.

## El formulario de contacto

El formulario (`frontend/src/features/contact-form`) valida en el navegador con el **mismo** esquema `zod` que usa el backend (`shared`), así que un error se ve al instante y además se vuelve a validar en el servidor.

El backend (`POST /api/contact`) tiene honeypot, rate limiting por IP, CORS restringido y envío por [Resend](https://resend.com). **Sin las variables `RESEND_API_KEY` / `MAIL_FROM` / `MAIL_TO`, el servidor no falla**: registra cada consulta en el log en vez de mandar el mail, así el formulario se puede probar de punta a punta en desarrollo sin cuenta de Resend.

El **diagnóstico interactivo** de la página de contacto guía por tres preguntas y, al terminar, precarga el formulario con el servicio recomendado — la consulta llega con contexto.

## Decisiones que conviene conocer

- **El logo es un SVG vectorial** ([`frontend/public/logo.svg`](frontend/public/logo.svg) y el componente `LogoMark`), reconstruido a partir del PNG original. Pesa 1,2 KB en lugar de 294 KB y cada trazo se anima por separado en el hero.
- **El backend expone la app de Express sin `listen()`** ([`backend/src/app.ts`](backend/src/app.ts)). `server.ts` la levanta en un VPS y un handler serverless puede envolver la misma app: cambiar de hosting no toca la lógica.
- **Las animaciones respetan `prefers-reduced-motion`**. No es un detalle estético: para algunas personas el movimiento produce mareo real.
- **Code splitting por página** con `React.lazy()` + `Suspense`. Cada página es un chunk separado que se carga solo cuando se navega a ella.
- **Las fotos del equipo tienen fallback a iniciales**. Si la imagen no carga o no existe, la card muestra un avatar con las iniciales del integrante sobre un gradiente de marca.

## Contacto

devstools.arg@gmail.com · [@tools.devs](https://instagram.com/tools.devs) · Tucumán, Argentina
