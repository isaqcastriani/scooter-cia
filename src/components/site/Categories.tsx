import { ArrowRight } from "lucide-react";
import catScooter from "@/assets/cat-scooter.jpg";
import catMoto from "@/assets/cat-moto.jpg";
import catBike from "@/assets/cat-bike.jpg";
import catPatinete from "@/assets/cat-patinete.jpg";
import { FORM_HREF, PICK_VEHICLE_EVENT } from "@/lib/site";

const items = [
  {
    icon: "🛵",
    title: "Scooters Elétricas",
    text: "Tecnologia e praticidade para seus deslocamentos urbanos.",
    image: catScooter,
    alt: "Scooter elétrica branca disponível na Scooter & Cia",
    veiculo: "Scooter elétrica",
    cta: "Quero minha scooter",
  },
  {
    icon: "🏍️",
    title: "Motos Elétricas",
    text: "Mais desempenho e autonomia para seus deslocamentos.",
    image: catMoto,
    alt: "Moto elétrica azul disponível na Scooter & Cia",
    veiculo: "Moto elétrica",
    cta: "Quero minha moto",
  },
  {
    icon: "🚲",
    title: "Bikes Elétricas",
    text: "Assistência elétrica para pedalar com mais conforto e liberdade.",
    image: catBike,
    alt: "Bike elétrica fat bike disponível na Scooter & Cia",
    veiculo: "Bicicleta elétrica",
    cta: "Quero minha bike",
  },
  {
    icon: "🛴",
    title: "Patinetes Elétricos",
    text: "Agilidade para pequenos trajetos, com praticidade para o dia a dia.",
    image: catPatinete,
    alt: "Patinete elétrico disponível na Scooter & Cia",
    veiculo: "Patinete elétrico",
    cta: "Quero meu patinete",
  },
];

export function Categories() {
  return (
    <section id="veiculos" className="relative bg-background py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="reveal max-w-3xl">
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Catálogo
          </span>
          <h2 className="mt-4 text-[clamp(1.6rem,5.5vw,2rem)] leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
            Encontre o veículo elétrico{" "}
            <span className="relative inline-block">
              ideal para você
              <span className="absolute inset-x-0 -bottom-1 -z-10 h-2.5 rounded-full bg-lime/45" />
            </span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14">
          {items.map((item, i) => (
            <a
              key={item.title}
              href={FORM_HREF}
              onClick={() =>
                window.dispatchEvent(new CustomEvent(PICK_VEHICLE_EVENT, { detail: item.veiculo }))
              }
              className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-lime/40 hover:shadow-lift"
              style={{ transitionDelay: `${(i % 2) * 70}ms` }}
            >
              <div className="relative aspect-4/3 overflow-hidden bg-ink">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={1100}
                  height={825}
                  sizes="(min-width: 1024px) 620px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
                <span aria-hidden className="absolute bottom-4 left-5 text-3xl">
                  {item.icon}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7">
                <h3 className="font-display text-lg font-bold sm:text-xl">{item.title}</h3>
                <p className="mt-2 mb-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mb-6">
                  {item.text}
                </p>
                <span className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-xs font-bold tracking-[0.1em] text-ink-foreground uppercase transition-all duration-300 group-hover:bg-lime group-hover:text-lime-foreground sm:w-fit">
                  {item.cta}
                  <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
