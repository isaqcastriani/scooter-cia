/** Dados de contato e conversão da Scooter & Cia. */

export const SITE = {
  name: "Scooter & Cia",
  city: "Hortolândia",
  state: "SP",
  region: "Hortolândia e região",
  phoneLabel: "(19) 99860-5136",
  phoneE164: "+5519998605136",
  url: "https://lp.scooterecia.com.br/",
} as const;

/** Âncora do card do formulário (não da seção): no mobile o lead cai direto nas perguntas. */
export const FORM_HREF = "#formulario";

/** Texto padrão de todos os CTAs. */
export const CTA_LABEL = "Encontrar meu veículo ideal";

/** Webhook do Make que recebe o lead e repassa para o SDR. */
export const LEAD_WEBHOOK = "https://hook.us1.make.celonis.com/1stlolyli9czw9ifogsjrj6pfobkewar";

/** Evento que os cards de categoria disparam para pré-selecionar o veículo no formulário. */
export const PICK_VEHICLE_EVENT = "scooter:pick-vehicle";
