import { useEffect, useState } from "react";
import { ArrowRight, MapPin, ShieldCheck, Star } from "lucide-react";
import heroRider from "@/assets/hero-rider.webp";
import { WhatsappIcon } from "./WhatsappIcon";
import { WA } from "@/lib/site";

const tags = ["Scooters elétricas", "Motos elétricas", "Bikes elétricas", "Patinetes elétricos"];

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Parallax só no desktop e só para quem não pediu menos movimento.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    if (reduced.matches || !wide.matches) return;

    const onScroll = () => setOffset(Math.min(window.scrollY, 600));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="topo"
      className="surface-ink relative flex overflow-hidden lg:min-h-svh lg:items-center"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 -right-24 size-[26rem] rounded-full bg-lime/10 blur-3xl md:size-[36rem]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pt-20 pb-12 sm:px-5 sm:pt-24 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-8 lg:pt-20 lg:pb-6">
        <div className="animate-hero-in">
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.66rem] font-semibold tracking-[0.16em] text-ink-foreground/80 uppercase sm:text-[0.68rem]">
            <MapPin className="size-3.5 shrink-0 text-lime" />
            Hortolândia / SP
          </span>

          <h1 className="mt-5 text-[clamp(1.9rem,7.5vw,2.5rem)] leading-[1.02] font-bold text-balance text-ink-foreground uppercase sm:mt-6 sm:text-5xl lg:mt-3 lg:text-[clamp(2.1rem,2.9vw,2.8rem)]">
            Veículos elétricos em <span className="text-gradient-lime">Hortolândia</span> e região
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-foreground/75 sm:text-lg lg:mt-2.5">
            Encontre a moto, scooter, bike ou patinete elétrico ideal para você
          </p>

          <div className="mt-6 max-w-xl rounded-2xl border border-lime/25 bg-lime/8 p-4 backdrop-blur-sm sm:p-5 lg:mt-3 lg:p-3.5">
            <p className="text-[0.95rem] leading-relaxed text-ink-foreground/90 sm:text-base">
              <span className="font-display font-bold text-lime">
                Até 21x no cartão ou 5% OFF à vista.
              </span>{" "}
              Escolha seu modelo e conte com condições facilitadas para comprar.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-4">
            <a
              href={WA.especialista}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-lime px-6 text-[0.8rem] font-bold tracking-[0.08em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] sm:px-7 sm:text-sm sm:tracking-[0.1em]"
            >
              <WhatsappIcon className="size-4.5 shrink-0" />
              Falar com especialista
              <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#veiculos"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-ink-foreground/20 px-6 text-sm font-semibold text-ink-foreground/85 transition-colors duration-300 hover:border-lime/50 hover:text-ink-foreground"
            >
              Ver modelos
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink-foreground/10 pt-6 lg:mt-4 lg:pt-3">
            {tags.map((tag, i) => (
              <li key={tag} className="flex items-center gap-3">
                <span className="text-[0.8rem] font-medium text-ink-foreground/70 sm:text-sm">
                  {tag}
                </span>
                {i < tags.length - 1 && (
                  <span aria-hidden className="text-lime/60">
                    •
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div
            className="relative animate-hero-in"
            style={{ transform: `translate3d(0, ${offset * -0.05}px, 0)` }}
          >
            {/* Halo por trás do recorte — separa a scooter escura do fundo ink */}
            <div className="pointer-events-none absolute inset-x-2 top-6 bottom-8 rounded-[50%] bg-lime/22 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-10 top-1/4 bottom-1/4 rounded-[50%] bg-ink-foreground/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-8 bottom-4 h-10 rounded-[50%] bg-ink/80 blur-2xl" />

            <img
              src={heroRider}
              alt="Cliente da Scooter & Cia pilotando uma scooter elétrica"
              width={1096}
              height={1400}
              fetchPriority="high"
              decoding="async"
              className="relative mx-auto w-[74%] max-w-[17rem] [filter:drop-shadow(0_0_1px_oklch(0.97_0.01_140/0.55))_drop-shadow(0_0_26px_oklch(0.87_0.21_128/0.28))_drop-shadow(0_28px_44px_oklch(0_0_0/0.55))] sm:w-full sm:max-w-md lg:max-h-[46svh] lg:w-auto lg:max-w-none lg:object-contain"
            />

            <div className="glass-chip animate-float-soft absolute bottom-0 left-0 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 lg:bottom-2">
              <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-ink-foreground/60 uppercase">
                Condição
              </p>
              <p className="font-display text-lg font-bold text-lime sm:text-xl">21x</p>
              <p className="text-[0.7rem] text-ink-foreground/70 sm:text-xs">no cartão</p>
            </div>

            <div className="glass-chip absolute top-0 left-0 flex items-center gap-2 rounded-full px-3 py-2 sm:left-2 sm:px-4 sm:py-2.5 lg:top-4">
              <ShieldCheck className="size-4 shrink-0 text-lime" />
              <span className="text-[0.7rem] font-semibold text-ink-foreground/85 sm:text-xs">
                Loja física + oficina
              </span>
            </div>

            <a
              href="#clientes"
              className="glass-chip absolute right-0 bottom-0 flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors hover:border-lime/40 lg:bottom-2"
            >
              <Star className="size-3.5 shrink-0 fill-lime text-lime" />
              <span className="text-[0.7rem] font-semibold text-ink-foreground/85 sm:text-xs">
                5,0 · clientes reais
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
