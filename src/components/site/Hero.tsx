import { useEffect, useState } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import heroScooter from "@/assets/hero-scooter.jpg";

const tags = [
  "Scooters elétricas",
  "Motos elétricas",
  "Bikes elétricas",
  "Patinetes elétricos",
];

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(Math.min(window.scrollY, 600));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="topo" className="surface-ink relative overflow-hidden">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-40 -right-24 size-[36rem] rounded-full bg-lime/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-32 pb-20 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-40 lg:pb-28">
        <div className="animate-hero-in">
          <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-ink-foreground/80 uppercase">
            <MapPin className="size-3.5 text-lime" />
            Hortolândia / SP
          </span>

          <h1 className="mt-6 text-4xl leading-[0.98] font-bold text-balance text-ink-foreground uppercase sm:text-5xl lg:text-6xl">
            Veículos elétricos em{" "}
            <span className="text-gradient-lime">Hortolândia</span> e região
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-foreground/75">
            Encontre a moto, scooter, bike ou patinete elétrico ideal para você
          </p>

          <div className="mt-7 max-w-xl rounded-2xl border border-lime/25 bg-lime/8 p-5 backdrop-blur-sm">
            <p className="text-base leading-relaxed text-ink-foreground/90">
              <span className="font-display font-bold text-lime">
                Até 21x no cartão ou 5% OFF à vista.
              </span>{" "}
              Escolha seu modelo e conte com condições facilitadas para comprar.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-4 text-sm font-bold tracking-[0.1em] text-lime-foreground uppercase transition-all duration-300 hover:shadow-[var(--shadow-lime)] hover:brightness-105"
            >
              Falar com especialista
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#veiculos"
              className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-6 py-4 text-sm font-semibold text-ink-foreground/85 transition-colors duration-300 hover:border-lime/50 hover:text-ink-foreground"
            >
              Ver modelos
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink-foreground/10 pt-6">
            {tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="text-sm font-medium text-ink-foreground/70">{tag}</span>
                {i < tags.length - 1 && <span className="text-lime/60">•</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="relative animate-hero-in"
            style={{ transform: `translate3d(0, ${offset * -0.05}px, 0)` }}
          >
            <div className="pointer-events-none absolute inset-x-6 bottom-4 h-40 rounded-full bg-lime/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-ink-foreground/10 bg-ink-soft/40 shadow-lift">
              <img
                src={heroScooter}
                alt="Scooter elétrica premium disponível na Scooter & Cia em Hortolândia"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            <div className="glass-chip animate-float-soft absolute -bottom-6 left-4 rounded-2xl px-5 py-4 md:left-8">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-ink-foreground/60 uppercase">
                Condição
              </p>
              <p className="font-display text-xl font-bold text-lime">21x</p>
              <p className="text-xs text-ink-foreground/70">no cartão</p>
            </div>

            <div className="glass-chip absolute -top-4 right-4 flex items-center gap-2 rounded-full px-4 py-2.5">
              <ShieldCheck className="size-4 text-lime" />
              <span className="text-xs font-semibold text-ink-foreground/85">
                Loja física + oficina
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
