import storeFront from "@/assets/store-front.jpg";
import workshop from "@/assets/workshop.jpg";
import rideAction from "@/assets/ride-action.jpg";
import { CTA_LABEL, FORM_HREF } from "@/lib/site";

const items = [
  {
    icon: "🏪",
    title: "Loja física em Hortolândia",
    text: "Veja os modelos de perto e compre com mais segurança.",
  },
  {
    icon: "🛠️",
    title: "Oficina exclusiva para clientes",
    text: "Suporte especializado para manter seu veículo sempre em dia.",
  },
  {
    icon: "💳",
    title: "Condições facilitadas",
    text: "Até 21x no cartão ou 5% OFF à vista.",
  },
  {
    icon: "🤝",
    title: "Atendimento especializado",
    text: "Tire suas dúvidas e escolha o modelo ideal para sua necessidade.",
  },
];

const photos = [
  {
    image: storeFront,
    alt: "Fachada da loja física da Scooter & Cia em Hortolândia",
    label: "A loja",
    caption: "Showroom em Hortolândia/SP",
    w: 462,
    h: 346,
  },
  {
    image: workshop,
    alt: "Oficina da Scooter & Cia com bancada e ferramentas",
    label: "A oficina",
    caption: "Estrutura exclusiva para clientes",
    w: 760,
    h: 1013,
  },
  {
    image: rideAction,
    alt: "Cliente pilotando uma moto elétrica comprada na Scooter & Cia",
    label: "O test ride",
    caption: "Experimente antes de comprar",
    w: 1400,
    h: 875,
  },
];

export function Differentials() {
  return (
    <section
      id="diferenciais"
      className="surface-ink relative overflow-hidden py-20 md:py-28 lg:py-32"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-[22rem] rounded-full bg-lime/8 blur-3xl md:size-[30rem]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-lime uppercase">
              Diferenciais
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,5.5vw,2rem)] leading-tight font-bold text-balance text-ink-foreground sm:text-4xl lg:text-5xl">
              Por que comprar na Scooter & Cia?
            </h2>
          </div>
          <a
            href={FORM_HREF}
            className="inline-flex min-h-12 w-fit items-center gap-2 rounded-full border border-ink-foreground/20 px-6 text-xs font-bold tracking-[0.1em] text-ink-foreground uppercase transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            {CTA_LABEL}
          </a>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="reveal group relative bg-ink-soft/60 p-6 transition-colors duration-500 hover:bg-ink-soft sm:p-7 md:p-8"
              style={{ transitionDelay: `${(i % 2) * 70}ms` }}
            >
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-2xl bg-ink-foreground/8 text-2xl transition-transform duration-500 group-hover:-translate-y-1"
              >
                {item.icon}
              </span>
              <h3 className="mt-5 font-display text-base leading-snug font-bold text-ink-foreground sm:mt-6 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{item.text}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-lime transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Estrutura real: loja, oficina e test ride */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <figure
              key={photo.label}
              className="reveal group relative overflow-hidden rounded-3xl border border-ink-foreground/10 last:sm:col-span-2 last:lg:col-span-1"
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div className="aspect-16/10 overflow-hidden bg-ink-soft">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  width={photo.w}
                  height={photo.h}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[0.6rem] font-bold tracking-[0.18em] text-lime uppercase">
                  {photo.label}
                </span>
                <p className="mt-1 font-display text-sm font-bold text-ink-foreground sm:text-base">
                  {photo.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
