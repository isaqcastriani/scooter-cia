/** Dados de contato e links de conversão da Scooter & Cia. */

export const WHATSAPP_NUMBER = "5519998605136";

export const SITE = {
  name: "Scooter & Cia",
  city: "Hortolândia",
  state: "SP",
  region: "Hortolândia e região",
phoneLabel: "(19) 99860-5136",
  phoneE164: "+5519998605136",
  url: "https://lp.scooterecia.com.br/",
} as const;

/** Monta um link de WhatsApp com a mensagem já preenchida. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const fromGoogle = "Olá. Vim do Google e gostaria de receber mais informações sobre";

/** Mensagem do CTA principal e do botão flutuante. */
const especialistaMsg =
  "Olá. Vim do Google e quero falar com um especialista para escolher o veículo elétrico ideal para mim.";

/** Links de CTA por contexto — cada origem chega com a mensagem certa. */
export const WA = {
  geral: whatsappLink(especialistaMsg),
  especialista: whatsappLink(especialistaMsg),
  scooter: whatsappLink(`${fromGoogle} as scooters elétricas da Scooter & Cia.`),
  moto: whatsappLink(`${fromGoogle} as motos elétricas da Scooter & Cia.`),
  bike: whatsappLink(`${fromGoogle} as bikes elétricas da Scooter & Cia.`),
  patinete: whatsappLink(`${fromGoogle} os patinetes elétricos da Scooter & Cia.`),
  garantir: whatsappLink(
    "Olá. Vim do Google, vi os depoimentos de clientes e quero garantir o meu veículo elétrico.",
  ),
  loja: whatsappLink(
    "Olá. Vim do Google e gostaria de agendar uma visita à loja física em Hortolândia.",
  ),
} as const;
