import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CTA_LABEL, FORM_HREF } from "@/lib/site";
import c1 from "@/assets/client-1.jpg";
import c2 from "@/assets/client-2.jpg";
import c3 from "@/assets/client-3.jpg";
import c4 from "@/assets/client-4.jpg";
import c5 from "@/assets/client-5.jpg";
import c6 from "@/assets/client-6.jpg";
import c7 from "@/assets/client-7.jpg";
import c8 from "@/assets/client-8.jpg";
import c9 from "@/assets/client-9.jpg";

/** Clientes reais da Scooter & Cia — fotos e dados dos depoimentos publicados. */
const clients = [
  { image: c1, model: "Bike MBE R002", name: "Rafael Melo", city: "Campinas", badge: "Bike" },
  { image: c2, model: "Moto UFO JJ01", name: "Rafael Santini", city: "Valinhos", badge: "1000W" },
  { image: c3, model: "Scooter X12 HE6", name: "Caio Siciliano", city: "Paulínia", badge: "1000W" },
  {
    image: c4,
    model: "Scooter X12 HE6",
    name: "João Vinicius",
    city: "Campinas",
    badge: "Scooter",
  },
  {
    image: c5,
    model: "Patinete 08530",
    name: "Rodrigo Valente",
    city: "Cliente verificado",
    badge: "Patinete",
  },
  {
    image: c6,
    model: "UFO ZE300",
    name: "José Roberto",
    city: "Cliente verificado",
    badge: "600W",
  },
  {
    image: c7,
    model: "Patinete Z4",
    name: "Danilo Furtado",
    city: "Cliente verificado",
    badge: "1200W",
  },
  {
    image: c8,
    model: "Patinete 08530",
    name: "Edvaldo Santana",
    city: "Cliente verificado",
    badge: "Patinete",
  },
  {
    image: c9,
    model: "Triciclo XE11BG",
    name: "Natalino de Sousa",
    city: "Cliente verificado",
    badge: "Triciclo",
  },
];

export function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => {
      setSelected(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return (
    <section id="clientes" className="bg-background py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
              Prova social
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,5.5vw,2rem)] leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
              Quem já escolheu a Scooter &amp; Cia, recomenda
            </h2>
            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                5,0
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-lime text-lime" />
                  ))}
                </span>
              </span>
              <span aria-hidden>•</span>
              <span>{clients.length} clientes que levaram o veículo para casa</span>
            </p>
          </div>

          {/* Controles do carrossel — no mobile o swipe já resolve */}
          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label="Depoimento anterior"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-lime hover:bg-lime hover:text-lime-foreground"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label="Próximo depoimento"
              className="flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:border-lime hover:bg-lime hover:text-lime-foreground"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true, containScroll: "trimSnaps" }}
          className="reveal mt-10 md:mt-14"
        >
          <CarouselContent className="-ml-4">
            {clients.map((client) => (
              <CarouselItem
                key={`${client.name}-${client.model}`}
                className="basis-[82%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <figure className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                  <div className="relative aspect-4/5 overflow-hidden bg-muted">
                    <img
                      src={client.image}
                      alt={`${client.name} com o ${client.model} adquirido na Scooter & Cia`}
loading="eager"
                      decoding="async"
                      width={760}
                      height={950}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 82vw"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/92 via-ink/15 to-transparent" />

                    <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1.5 text-[0.6rem] font-bold tracking-[0.16em] text-lime-foreground uppercase">
                      Levou para casa
                    </span>
                    <span className="glass-chip absolute top-4 right-4 rounded-full px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.12em] text-ink-foreground uppercase">
                      {client.badge}
                    </span>

                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-display text-base font-bold text-ink-foreground sm:text-lg">
                        {client.model}
                      </p>
                      <p className="mt-1 text-sm text-ink-foreground/80">{client.name}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="text-xs text-ink-foreground/60">{client.city}</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-lime">
                          5,0 <Star className="size-3.5 fill-current" />
                        </span>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex justify-center gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir para o depoimento ${i + 1}`}
              aria-current={i === selected}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === selected ? "w-6 bg-lime" : "w-1.5 bg-border hover:bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center md:mt-14">
          <a
            href={FORM_HREF}
            className="group inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-lime px-8 text-[0.8rem] font-bold tracking-[0.08em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] sm:px-9 sm:text-sm sm:tracking-[0.1em]"
          >
            {CTA_LABEL}
            <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
