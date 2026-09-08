import type { ProductSlideRecord } from "@toolsdevs/shared";
import { randomUUID, readCollection, writeCollection } from "./jsonStore.js";
import { productSlidesFile } from "./paths.js";

/** Contenido original, hardcodeado, que vivía en los diccionarios es/en. */
const SEED: ReadonlyArray<Omit<ProductSlideRecord, "id" | "createdAt" | "updatedAt">> = [
  {
    image: "/producto/01-tienda-online-inicio.png",
    titleEs: "Tu empresa online, 24/7",
    titleEn: "Your business online, 24/7",
    descriptionEs: "Presencia profesional con tu marca y catálogo, lista para vender a toda hora.",
    descriptionEn: "A professional presence with your brand and catalog, ready to sell around the clock.",
    order: 0,
  },
  {
    image: "/producto/02-catalogo-productos.png",
    titleEs: "Catálogo digital con buscador y filtros",
    titleEn: "Digital catalog with search and filters",
    descriptionEs:
      "Tus clientes encuentran el producto ideal en segundos, con imágenes, precio y stock actualizados.",
    descriptionEn:
      "Your customers find the right product in seconds, with images, price and up-to-date stock.",
    order: 1,
  },
  {
    image: "/producto/03-ficha-producto.png",
    titleEs: "Fichas de producto que venden",
    titleEn: "Product pages that sell",
    descriptionEs:
      "Galería, precio, stock y descripción en una vista clara, con un clic para agregar al carrito.",
    descriptionEn: "Gallery, price, stock and description in one clear view, one click to add to cart.",
    order: 2,
  },
  {
    image: "/producto/04-carrito-checkout.png",
    titleEs: "Carrito simple y confiable",
    titleEn: "A simple, reliable cart",
    descriptionEs: "Resumen del pedido y cálculo automático de totales y envío: menos fricción, más ventas.",
    descriptionEn: "Order summary with automatic totals and shipping: less friction, more sales.",
    order: 3,
  },
  {
    image: "/producto/05-gestion-stock.png",
    titleEs: "Mejor control del stock entre sucursales",
    titleEn: "Better stock control across branches",
    descriptionEs: "Stock por sucursal en tiempo real y exportación a PDF/Excel con un clic.",
    descriptionEn: "Real-time stock per branch and one-click export to PDF/Excel.",
    order: 4,
  },
  {
    image: "/producto/06-analitica-ventas.png",
    titleEs: "Decisiones con datos, no con intuición",
    titleEn: "Decisions from data, not gut feeling",
    descriptionEs:
      "Ingresos, pedidos, ticket promedio y productos más vendidos, con gráficos y exportación.",
    descriptionEn: "Revenue, orders, average ticket and best-sellers, with charts and export.",
    order: 5,
  },
  {
    image: "/producto/07-gestion-pedidos.png",
    titleEs: "Todos tus pedidos en un solo lugar",
    titleEn: "All your orders in one place",
    descriptionEs: "Estado, cliente, forma de pago y total de cada venta, de principio a fin.",
    descriptionEn: "Status, customer, payment method and total of every sale, end to end.",
    order: 6,
  },
  {
    image: "/producto/08-base-clientes.png",
    titleEs: "Tu base de clientes siempre a mano",
    titleEn: "Your customer base always at hand",
    descriptionEs: "Contactos centralizados para fidelizar y volver a vender.",
    descriptionEn: "Centralized contacts to build loyalty and sell again.",
    order: 7,
  },
  {
    image: "/producto/09-usuarios-roles.png",
    titleEs: "Cada quien con su acceso",
    titleEn: "Everyone with their own access",
    descriptionEs: "Roles de administrador, vendedor y cliente para trabajar en equipo con seguridad.",
    descriptionEn: "Admin, seller and customer roles to work as a team, securely.",
    order: 8,
  },
  {
    image: "/producto/10-servicios-postventa.png",
    titleEs: "Post-venta profesional que fideliza",
    titleEn: "Professional after-sales that builds loyalty",
    descriptionEs:
      "Recibí y gestioná solicitudes con estados y seguimiento; tus clientes se sienten acompañados.",
    descriptionEn: "Receive and manage requests with statuses and tracking; your customers feel supported.",
    order: 9,
  },
  {
    image: "/producto/11-personalizacion-web.png",
    titleEs: "Actualizá tu web sin programar",
    titleEn: "Update your site without coding",
    descriptionEs: "Cambiá banners y ofertas del inicio desde un panel simple, cuando quieras.",
    descriptionEn: "Change homepage banners and offers from a simple panel, whenever you want.",
    order: 10,
  },
  {
    image: "/producto/12-contenido-institucional.png",
    titleEs: "Contá tu historia",
    titleEn: "Tell your story",
    descriptionEs: "Editá visión, misión y estructura de la empresa que verán tus clientes.",
    descriptionEn: "Edit the company's vision, mission and structure that your customers will see.",
    order: 11,
  },
  {
    image: "/producto/13-favoritos.png",
    titleEs: "Lista de deseos para tus clientes",
    titleEn: "A wishlist for your customers",
    descriptionEs:
      "Cada cliente guarda sus productos favoritos y vuelve a comprarlos en un clic: más recompra y fidelización.",
    descriptionEn:
      "Each customer saves their favorite products and buys them again in one click: more repeat sales and loyalty.",
    order: 12,
  },
  {
    image: "/producto/14-vendedor-punto-venta.png",
    titleEs: "Punto de venta para tu equipo",
    titleEn: "A point of sale for your team",
    descriptionEs:
      "El vendedor registra ventas en el mostrador: elige cliente y sucursal, aplica descuentos o cuotas y confirma el pedido al instante.",
    descriptionEn:
      "Sellers register sales at the counter: pick customer and branch, apply discounts or installments and confirm the order instantly.",
    order: 13,
  },
];

async function readAll(): Promise<ProductSlideRecord[]> {
  const slides = await readCollection<ProductSlideRecord>(productSlidesFile);
  if (slides.length > 0) return slides;

  // Primer arranque: no hay archivo de datos todavía, sembramos con el
  // contenido que antes vivía hardcodeado en el sitio.
  const now = new Date().toISOString();
  const seeded = SEED.map((slide) => ({
    ...slide,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  }));
  await writeCollection(productSlidesFile, seeded);
  return seeded;
}

export async function listProductSlides(): Promise<ProductSlideRecord[]> {
  const slides = await readAll();
  return [...slides].sort((a, b) => a.order - b.order);
}

export async function createProductSlide(
  input: Omit<ProductSlideRecord, "id" | "createdAt" | "updatedAt">,
): Promise<ProductSlideRecord> {
  const slides = await readAll();
  const now = new Date().toISOString();
  const record: ProductSlideRecord = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
  await writeCollection(productSlidesFile, [...slides, record]);
  return record;
}

export async function updateProductSlide(
  id: string,
  input: Omit<ProductSlideRecord, "id" | "createdAt" | "updatedAt">,
): Promise<ProductSlideRecord | null> {
  const slides = await readAll();
  const index = slides.findIndex((slide) => slide.id === id);
  if (index === -1) return null;

  const updated: ProductSlideRecord = {
    ...input,
    id,
    createdAt: slides[index]!.createdAt,
    updatedAt: new Date().toISOString(),
  };
  const next = [...slides];
  next[index] = updated;
  await writeCollection(productSlidesFile, next);
  return updated;
}

export async function deleteProductSlide(id: string): Promise<boolean> {
  const slides = await readAll();
  const next = slides.filter((slide) => slide.id !== id);
  if (next.length === slides.length) return false;
  await writeCollection(productSlidesFile, next);
  return true;
}
