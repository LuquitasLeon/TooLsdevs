import type { ClientProject } from "@toolsdevs/shared";

/**
 * Modelo de dominio de un proyecto de cliente.
 *
 * Encapsula las reglas de presentación —si tiene link, si va como
 * "Próximamente"— para que las vistas no repartan esos `if` por todos lados.
 * Es una capa fina sobre el dato plano del diccionario: la vista pide
 * comportamiento (`hasLink()`), no vuelve a interpretar los campos.
 */
export class ClientProjectModel {
  constructor(private readonly data: ClientProject) {}

  get name(): string {
    return this.data.name;
  }

  get logo(): string {
    return this.data.logo;
  }

  get category(): string {
    return this.data.category;
  }

  get summary(): string {
    return this.data.summary;
  }

  get url(): string | undefined {
    return this.data.url;
  }

  /** Tiene un sitio publicado al que enlazar. */
  hasLink(): boolean {
    return typeof this.data.url === "string" && this.data.url.length > 0;
  }

  /** Se muestra como "Próximamente": marcado a mano o sin link todavía. */
  isComingSoon(): boolean {
    return this.data.comingSoon === true || !this.hasLink();
  }

  /** Envuelve una lista de datos crudos en modelos, para las vistas. */
  static fromList(list: ClientProject[]): ClientProjectModel[] {
    return list.map((item) => new ClientProjectModel(item));
  }
}
