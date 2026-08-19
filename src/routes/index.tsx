import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Differentials } from "@/components/site/Differentials";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/hooks/use-reveal";

const title = "Veículos Elétricos em Hortolândia | Scooter & Cia";
const description =
  "Motos, scooters, bikes e patinetes elétricos em Hortolândia/SP. Até 21x no cartão ou 5% OFF à vista. Loja física e oficina exclusiva para clientes.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <Differentials />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
