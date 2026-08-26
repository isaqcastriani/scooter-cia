import { useEffect, useState } from "react";
import { WhatsappIcon } from "./WhatsappIcon";
import { WA } from "@/lib/site";

/** Botão flutuante de WhatsApp — aparece depois que o usuário passa do Hero. */
export function WhatsappFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WA.geral}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Scooter & Cia no WhatsApp"
      className={`fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-14 items-center justify-center rounded-full bg-lime text-lime-foreground shadow-[var(--shadow-lime)] transition-all duration-400 hover:scale-105 sm:right-6 sm:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-lime/40 [animation-duration:2.6s]" />
      <WhatsappIcon className="size-7" />
    </a>
  );
}
