import { ArrowRight, MapPin, Zap } from "lucide-react";
import { WhatsappIcon } from "./WhatsappIcon";
import { SITE, WA } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="contato" className="surface-ink relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-24 right-1/4 size-[20rem] rounded-full bg-lime/10 blur-3xl md:size-[28rem]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-5 md:px-8 md:py-28 lg:py-32">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.64rem] font-semibold tracking-[0.16em] text-ink-foreground/80 uppercase sm:text-[0.66rem]">
            <MapPin className="size-3.5 shrink-0 text-lime" />
            {SITE.city} / {SITE.state}
          </span>
          <h2 className="mt-6 text-[clamp(1.6rem,5.5vw,2rem)] leading-tight font-bold text-balance text-ink-foreground uppercase sm:text-4xl lg:text-5xl">
            Escolha seu modelo com <span className="text-gradient-lime">condições facilitadas</span>
          </h2>
          <p className="mt-5 text-base text-ink-foreground/70 sm:text-lg">
            Até 21x no cartão ou 5% OFF à vista.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 md:mt-9">
            <a
              href={WA.especialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-lime px-8 text-[0.8rem] font-bold tracking-[0.08em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] sm:w-auto sm:px-9 sm:text-sm sm:tracking-[0.1em]"
            >
              <WhatsappIcon className="size-4.5 shrink-0" />
              Falar com especialista
              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={WA.loja}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border border-ink-foreground/20 px-7 text-sm font-semibold text-ink-foreground/85 transition-colors duration-300 hover:border-lime/50 hover:text-ink-foreground sm:w-auto"
            >
              Agendar visita à loja
            </a>
          </div>

          <p className="mt-6 text-sm text-ink-foreground/60">
            Atendimento por WhatsApp:{" "}
            <a
              href={WA.geral}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-lime underline-offset-4 hover:underline"
            >
              {SITE.phoneLabel}
            </a>
          </p>
        </div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-ink-foreground/10 pt-8 text-center md:mt-20 md:flex-row md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-lime text-lime-foreground">
              <Zap className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-ink-foreground">
              Scooter <span className="text-lime">&amp;</span> Cia
            </span>
          </div>
          <p className="text-xs text-ink-foreground/50">
            Veículos elétricos • Loja física em {SITE.city}/{SITE.state}
          </p>
        </footer>
      </div>
    </section>
  );
}
