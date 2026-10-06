import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTA_LABEL, FORM_HREF } from "@/lib/site";
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <section id="faq" className="bg-secondary/50 py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-[clamp(1.6rem,5.5vw,2rem)] leading-tight font-bold text-balance sm:text-4xl">
            Perguntas frequentes sobre veículos elétricos
          </h2>
          <a
            href={FORM_HREF}
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-xs font-bold tracking-[0.1em] text-ink-foreground uppercase transition-all duration-300 hover:shadow-lift md:mt-8"
          >
            {CTA_LABEL}
          </a>
        </div>

        <Accordion type="single" collapsible className="reveal w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="border-b border-border/80 last:border-b-0"
            >
              <AccordionTrigger className="py-5 text-left font-display text-[0.95rem] font-semibold hover:no-underline data-[state=open]:text-foreground sm:text-base">
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
