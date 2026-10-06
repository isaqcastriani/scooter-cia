import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Categories } from "@/components/site/Categories";
import { Differentials } from "@/components/site/Differentials";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { LeadForm } from "@/components/site/LeadForm";
import { FinalCta } from "@/components/site/FinalCta";
import { useReveal } from "@/hooks/use-reveal";
import { SITE } from "@/lib/site";
import { faqs } from "@/lib/faq";
import heroRider from "@/assets/hero-rider.webp";

const title = "Veículos Elétricos em Hortolândia | Scooter & Cia";
const description =
  "Motos, scooters, bikes e patinetes elétricos em Hortolândia/SP. Até 21x no cartão ou 5% OFF à vista. Loja física e oficina exclusiva para clientes.";
const ogImage = `${SITE.url}og-image.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
links: [
      { rel: "canonical", href: SITE.url },
      { rel: "preload", href: heroRider, as: "image", type: "image/webp" },
    ],
  }),
  component: Index,
});

/** Dados estruturados para o Google entender a loja e as dúvidas frequentes. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}#loja`,
      name: SITE.name,
      description,
      url: SITE.url,
      image: ogImage,
      telephone: SITE.phoneE164,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.state,
        addressCountry: "BR",
      },
      areaServed: SITE.region,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        bestRating: "5",
        reviewCount: "9",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE.url}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

function Index() {
  useReveal();

  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <Hero />
      <LeadForm />
      <Categories />
      <Differentials />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
