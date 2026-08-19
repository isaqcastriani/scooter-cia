import { ArrowRight, MapPin, Zap } from "lucide-react";

export function FinalCta() {
  return (
    <section id="contato" className="surface-ink relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-24 right-1/4 size-[28rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.16em] text-ink-foreground/80 uppercase">
            <MapPin className="size-3.5 text-lime" />
            Hortolândia / SP
          </span>
          <h2 className="mt-6 text-3xl leading-tight font-bold text-balance text-ink-foreground uppercase sm:text-4xl lg:text-5xl">
            Escolha seu modelo com{" "}
            <span className="text-gradient-lime">condições facilitadas</span>
          </h2>
          <p className="mt-5 text-lg text-ink-foreground/70">
            Até 21x no cartão ou 5% OFF à vista.
          </p>
          <a
            href="#contato"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-lime px-9 py-4.5 text-sm font-bold tracking-[0.1em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)]"
          >
            Falar com especialista
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-ink-foreground/10 pt-8 md:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-lime text-lime-foreground">
              <Zap className="size-4" strokeWidth={2.5} />
            </span>
            <span className="font-display font-bold text-ink-foreground">
              Scooter <span className="text-lime">&</span> Cia
            </span>
          </div>
          <p className="text-xs text-ink-foreground/50">
            Veículos elétricos • Loja física em Hortolândia/SP
          </p>
        </footer>
      </div>
    </section>
  );
}
