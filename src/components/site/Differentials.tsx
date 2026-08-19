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

export function Differentials() {
  return (
    <section id="diferenciais" className="surface-ink relative overflow-hidden py-24 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 size-[30rem] rounded-full bg-lime/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-lime uppercase">
              Diferenciais
            </span>
            <h2 className="mt-4 text-3xl leading-tight font-bold text-balance text-ink-foreground sm:text-4xl lg:text-5xl">
              Por que comprar na Scooter & Cia?
            </h2>
          </div>
          <a
            href="#contato"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-foreground/20 px-6 py-3.5 text-xs font-bold tracking-[0.1em] text-ink-foreground uppercase transition-colors duration-300 hover:border-lime hover:text-lime"
          >
            Falar com especialista
          </a>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="reveal group relative bg-ink-soft/60 p-7 transition-colors duration-500 hover:bg-ink-soft md:p-8"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-ink-foreground/8 text-2xl transition-transform duration-500 group-hover:-translate-y-1">
                {item.icon}
              </span>
              <h3 className="mt-6 font-display text-lg leading-snug font-bold text-ink-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-foreground/65">{item.text}</p>
              <span className="absolute inset-x-0 bottom-0 h-0.5 w-0 bg-lime transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
