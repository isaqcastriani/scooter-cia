import { ArrowUpRight } from "lucide-react";
import catScooter from "@/assets/cat-scooter.jpg";
import catMoto from "@/assets/cat-moto.jpg";
import catBike from "@/assets/cat-bike.jpg";
import catPatinete from "@/assets/cat-patinete.jpg";

const items = [
  {
    icon: "🛵",
    title: "Scooters Elétricas",
    text: "Tecnologia e praticidade para seus deslocamentos urbanos.",
    image: catScooter,
    span: "lg:col-span-3",
  },
  {
    icon: "🏍️",
    title: "Motos Elétricas",
    text: "Mais desempenho e autonomia para seus deslocamentos.",
    image: catMoto,
    span: "lg:col-span-3",
  },
  {
    icon: "🚲",
    title: "Bikes Elétricas",
    text: "Assistência elétrica para pedalar com mais conforto e liberdade.",
    image: catBike,
    span: "lg:col-span-3",
  },
  {
    icon: "🛴",
    title: "Patinetes Elétricos",
    text: "Agilidade para pequenos trajetos, com praticidade para o dia a dia.",
    image: catPatinete,
    span: "lg:col-span-3",
  },
];

export function Categories() {
  return (
    <section id="veiculos" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal max-w-3xl">
          <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
            Catálogo
          </span>
          <h2 className="mt-4 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
            Encontre o veículo elétrico{" "}
            <span className="relative inline-block">
              ideal para você
              <span className="absolute inset-x-0 -bottom-1 h-2.5 -z-10 rounded-full bg-lime/45" />
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {items.map((item, i) => (
            <article
              key={item.title}
              className={`reveal group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-lime/40 hover:shadow-lift ${item.span}`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="relative aspect-16/11 overflow-hidden bg-ink">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 to-transparent" />
                <span className="absolute bottom-4 left-5 text-3xl">{item.icon}</span>
              </div>

              <div className="flex items-start justify-between gap-4 p-6 md:p-7">
                <div>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-lime-foreground">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
