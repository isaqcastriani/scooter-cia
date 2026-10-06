import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import { CTA_LABEL, FORM_HREF } from "@/lib/site";

const nav = [
  { label: "Veículos", href: "#veiculos" },
  { label: "Por que a Scooter & Cia", href: "#diferenciais" },
  { label: "Clientes", href: "#clientes" },
  { label: "Orçamento", href: FORM_HREF },
  { label: "Dúvidas", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do corpo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-ink/90 shadow-lift backdrop-blur-xl supports-[backdrop-filter]:bg-ink/75"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:h-18 md:px-8">
        <a href="#topo" className="shrink-0 transition-opacity duration-300 hover:opacity-85">
          <img
            src={logo}
            alt="Scooter & Cia"
            width={1858}
            height={651}
            className="h-9 w-auto sm:h-10 md:h-11"
          />
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

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={FORM_HREF}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-lime px-4 text-[0.7rem] font-bold tracking-[0.1em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] md:px-6 md:text-xs"
          >
            <span className="hidden sm:inline">{CTA_LABEL}</span>
            <span className="sm:hidden">Meu veículo ideal</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex size-11 items-center justify-center rounded-full border border-ink-foreground/20 text-ink-foreground transition-colors hover:border-lime/50 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={`h-px w-full bg-linear-to-r from-transparent via-lime/40 to-transparent transition-opacity duration-500 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-b border-ink-foreground/10 bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-5">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-ink-foreground/8 text-base font-medium text-ink-foreground/85 transition-colors last:border-b-0 hover:text-lime"
            >
              {item.label}
            </a>
          ))}
          <a
            href={FORM_HREF}
            onClick={() => setOpen(false)}
            className="my-3 flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime text-sm font-bold text-lime-foreground"
          >
            {CTA_LABEL}
          </a>
        </nav>
      </div>
    </header>
  );
}
