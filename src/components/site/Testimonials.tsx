import { ArrowRight, Star } from "lucide-react";
import c1 from "@/assets/client-1.jpg";
import c2 from "@/assets/client-2.jpg";
import c3 from "@/assets/client-3.jpg";
import c4 from "@/assets/client-4.jpg";
import c5 from "@/assets/client-5.jpg";
import c6 from "@/assets/client-6.jpg";

const clients = [
  { image: c1, model: "Moto UFO JJ01", name: "Rafael Santini", city: "Valinhos" },
  { image: c2, model: "Scooter X12 HE6", name: "Caio Siciliano", city: "Paulínia" },
  { image: c3, model: "Scooter X12 HE6", name: "João Vinicius", city: "Campinas" },
  { image: c4, model: "Patinete Z4", name: "Danilo Furtado", city: "Cliente verificado" },
  { image: c5, model: "Patinete 08530", name: "Edvaldo Santana", city: "Cliente verificado" },
  { image: c6, model: "Triciclo XE11BG", name: "Natalino de Sousa", city: "Cliente verificado" },
];

export function Testimonials() {
  return (
    <section id="clientes" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal max-w-3xl">
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Prova social
          </span>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
            Quem já escolheu a Scooter & Cia, recomenda
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <figure
              key={client.name}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-muted">
                <img
                  src={client.image}
                  alt={`Cliente ${client.name} com seu ${client.model}`}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/90 via-ink/10 to-transparent" />

                <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1.5 text-[0.6rem] font-bold tracking-[0.16em] text-lime-foreground uppercase">
                  Levou para casa
                </span>

                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-bold text-ink-foreground">
                    {client.model}
                  </p>
                  <p className="mt-1 text-sm text-ink-foreground/80">{client.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-ink-foreground/60">{client.city}</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-lime">
                      5,0 <Star className="size-3.5 fill-current" />
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="reveal mt-14 flex justify-center">
          <a
            href="#contato"
            className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-9 py-4.5 text-sm font-bold tracking-[0.1em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)]"
          >
            Garantir a minha
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
