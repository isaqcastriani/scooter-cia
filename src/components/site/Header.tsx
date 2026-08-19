import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const nav = [
  { label: "Veículos", href: "#veiculos" },
  { label: "Por que a Scooter & Cia", href: "#diferenciais" },
  { label: "Clientes", href: "#clientes" },
  { label: "Dúvidas", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ink/85 shadow-lift backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#topo" className="group flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-lime text-lime-foreground transition-transform duration-300 group-hover:scale-105">
            <Zap className="size-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg leading-none font-bold tracking-tight text-ink-foreground">
            Scooter <span className="text-lime">&</span> Cia
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-ink-foreground/70 transition-colors hover:text-ink-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-lime after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="inline-flex items-center justify-center rounded-full bg-lime px-4 py-2.5 text-[0.7rem] font-bold tracking-[0.12em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] md:px-6 md:text-xs"
        >
          Falar com especialista
        </a>
      </div>
      <div
        className={`h-px w-full bg-linear-to-r from-transparent via-lime/40 to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
    </header>
  );
}
