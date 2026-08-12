import type { ContactInfo } from "@toolsdevs/shared";

/** Datos de contacto: no dependen del idioma, así que viven fuera de las traducciones. */
export const contact: ContactInfo = {
  email: "devstools.arg@gmail.com",
  instagram: "https://instagram.com/tools.devs",
  location: "Tucumán, Argentina",
  whatsapp: [
    { name: "Lucas León", number: "5493816097898", label: "+54 9 3816097898" },
    { name: "Luciano Llanos", number: "5493813259224", label: "+54 9 3813259224" },
    { name: "Nicolás Ferreyra", number: "5493816484455", label: "+54 9 3816484455" },
  ],
};
