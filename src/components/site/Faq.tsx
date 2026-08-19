import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Precisa de CNH para dirigir uma scooter ou moto elétrica?",
    a: "Depende do modelo e da classificação do veículo. Na Scooter & Cia, nossa equipe orienta você sobre as exigências de cada modelo.",
  },
  {
    q: "Qual a autonomia de uma scooter ou moto elétrica?",
    a: "A autonomia varia conforme o modelo, bateria, peso e condições de uso. Consulte a autonomia específica do veículo escolhido.",
  },
  {
    q: "Quanto custa uma scooter elétrica?",
    a: "O preço varia de acordo com o modelo e suas especificações. Consulte nossos modelos e condições de pagamento.",
  },
  {
    q: "Quanto custa uma moto elétrica?",
    a: "Os valores variam conforme o modelo e configuração. Trabalhamos com diferentes opções de motos elétricas.",
  },
  {
    q: "Patinete elétrico é indicado para adultos?",
    a: "Sim. Temos modelos de patinetes elétricos voltados para diferentes necessidades e perfis de uso.",
  },
  {
    q: "Bike elétrica precisa de CNH?",
    a: "As exigências dependem das características e da classificação da bicicleta elétrica. Nossa equipe pode orientar você sobre cada modelo.",
  },
  {
    q: "Posso parcelar a compra?",
    a: "Sim. Você pode parcelar em até 21x no cartão, ou optar por 5% OFF à vista.",
  },
  {
    q: "Posso testar o veículo antes de comprar?",
    a: "Sim. Você pode visitar nossa loja física em Hortolândia e conhecer os modelos disponíveis.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-balance sm:text-4xl">
            Perguntas frequentes sobre veículos elétricos
          </h2>
          <a
            href="#contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-xs font-bold tracking-[0.1em] text-ink-foreground uppercase transition-all duration-300 hover:shadow-lift"
          >
            Falar com especialista
          </a>
        </div>

        <Accordion type="single" collapsible className="reveal w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="border-b border-border/80 last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline data-[state=open]:text-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
