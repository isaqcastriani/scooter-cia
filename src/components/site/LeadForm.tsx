import { memo, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Zap } from "lucide-react";
import { CTA_LABEL, LEAD_WEBHOOK, PICK_VEHICLE_EVENT, SITE } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const questions = [
  {
    name: "veiculo",
    title: "Qual veículo você procura?",
    options: [
      "Scooter elétrica",
      "Moto elétrica",
      "Bicicleta elétrica",
      "Patinete elétrico",
      "Ainda não sei, quero ajuda para escolher",
    ],
  },
  {
    name: "uso",
    title: "Para que você vai usar?",
    options: [
      "Ir e voltar do trabalho / dia a dia",
      "Trabalhar com entregas",
      "Lazer / passeio",
      "Quero alugar",
    ],
  },
  {
    name: "cidade",
    title: "Em qual cidade você mora?",
    options: ["Hortolândia", "Campinas", "Sumaré", "Outra cidade"],
  },
  {
    name: "investimento",
    title: "Quanto você pretende investir?",
    options: ["R$ 4 a 7 mil", "R$ 7 a 10 mil", "R$ 10 a 15 mil"],
  },
  {
    name: "pagamento",
    title: "Como pretende pagar?",
    options: [
      "À vista (Pix/dinheiro, com desconto)",
      "Cartão de crédito em até 21x",
      "Financiamento / boleto",
    ],
  },
] as const;

const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

/**
 * Campos ocultos preenchidos pelo script de UTM (public/gpc-utm.js), que troca
 * "{utm_*}" pelo valor da URL. Memoizado sem props para o React nunca
 * re-renderizar: em input hidden, reaplicar defaultValue apagaria o valor.
 */
const UtmFields = memo(function UtmFields() {
  return UTM_FIELDS.map((name) => (
    <input key={name} type="hidden" name={name} defaultValue={`{${name}}`} className="gpc_campo" />
  ));
});

const benefits = [
  "Indicação do modelo certo para o seu uso",
  "Até 21x no cartão ou desconto à vista",
  "Loja física e oficina exclusiva em Hortolândia",
  "Frete grátis para Hortolândia, Campinas e Sumaré",
];

const TOTAL_STEPS = questions.length + 1;

const FORM_FIELDS = ["nome", "whatsapp", "email", ...UTM_FIELDS];

type Lead = Record<string, string> & { nome: string; whatsapp: string; email: string };
type Errors = Partial<Record<"nome" | "whatsapp" | "email", string>>;

function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(data: Lead): Errors {
  const errors: Errors = {};
  if (data.nome.trim().length < 2) errors.nome = "Informe seu nome.";
  const digits = data.whatsapp.replace(/\D/g, "");
  if (digits.length < 10) errors.whatsapp = "Informe um WhatsApp com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
    errors.email = "Informe um e-mail válido.";
  return errors;
}

export function LeadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");

  const isContactStep = step === questions.length;
  const progress = ((step + (status === "done" ? 1 : 0)) / TOTAL_STEPS) * 100;
  const current = questions[step];
  const canAdvance = !!current && !!answers[current.name];

  // Cards de categoria pré-selecionam o veículo e pulam direto para a 2ª pergunta.
  useEffect(() => {
    const onPick = (e: Event) => {
      const veiculo = (e as CustomEvent<string>).detail;
      setAnswers((prev) => ({ ...prev, veiculo }));
      setStep((s) => (s === 0 ? 1 : s));
    };
    window.addEventListener(PICK_VEHICLE_EVENT, onPick);
    return () => window.removeEventListener(PICK_VEHICLE_EVENT, onPick);
  }, []);

  function choose(name: string, value: string) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    // Pequena pausa para o usuário ver a opção marcada antes de avançar.
    window.setTimeout(() => setStep((s) => Math.min(s + 1, questions.length)), 220);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isContactStep || status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries([
      ...questions.map((q) => [q.name, answers[q.name] ?? ""]),
      ...FORM_FIELDS.map((k) => [k, String(fd.get(k) ?? "").trim()]),
    ]) as Lead;
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      formRef.current
        ?.querySelector<HTMLInputElement>(`[name="${Object.keys(found)[0]}"]`)
        ?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(LEAD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          pagina: window.location.href,
          enviado_em: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Só dispara depois do envio bem-sucedido.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "gtm.formSubmit",
      });

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "mt-2 block h-13 w-full rounded-2xl border bg-ink-foreground/[0.06] px-4 text-base text-ink-foreground placeholder:text-ink-foreground/45 outline-none transition-colors focus:border-lime focus:bg-ink-foreground/[0.09] focus:ring-2 focus:ring-lime/25";

  return (
    <section
      id="orcamento"
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--ink-deep)_0%,var(--ink)_45%,var(--ink-deep)_100%)] text-ink-foreground"
    >
      {/* Começa no mesmo tom em que o Hero termina: sem emenda entre as seções. */}
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />
      <div className="pointer-events-none absolute top-1/4 -right-24 size-[24rem] rounded-full bg-lime/10 blur-3xl md:size-[34rem]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-5 md:px-8 md:py-28 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:py-32">
        {/* Copy */}
        <div className="reveal">
          <span className="text-[0.7rem] font-semibold tracking-[0.22em] text-lime uppercase">
            Fale com um especialista
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,6.5vw,2.4rem)] leading-[1.05] font-bold text-balance text-ink-foreground sm:text-5xl">
            Seu próximo veículo elétrico começa aqui.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
            Conte o que você procura e um especialista da Scooter &amp; Cia indica o modelo ideal
            para a sua rotina, com as melhores condições de pagamento.
          </p>

          <hr className="my-8 max-w-xl border-ink-foreground/12" />

          <ul className="space-y-4">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink-foreground/90">
                <Check className="mt-0.5 size-5 shrink-0 text-lime" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-3">
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-4 sm:p-5">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink-foreground/60 uppercase">
                Loja física
              </p>
              <p className="mt-1.5 font-display text-base font-bold text-ink-foreground sm:text-lg">
                {SITE.city} / {SITE.state}
              </p>
            </div>
            <div className="rounded-2xl border border-ink-foreground/12 bg-ink-foreground/[0.04] p-4 sm:p-5">
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink-foreground/60 uppercase">
                Pagamento
              </p>
              <p className="mt-1.5 font-display text-base font-bold text-ink-foreground sm:text-lg">
                Até 21x no cartão
              </p>
            </div>
          </div>
        </div>

        {/* Card do formulário */}
        <div id="formulario" className="reveal relative scroll-mt-0 lg:scroll-mt-12">
          <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-linear-to-br from-lime/30 via-transparent to-transparent opacity-70" />
          <div className="relative rounded-[2rem] border border-ink-foreground/12 bg-ink-soft/80 p-5 shadow-lift backdrop-blur-xl sm:p-8">
            <div className="text-center">
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-lime/15 text-lime">
                <Zap className="size-5" strokeWidth={2.5} />
              </span>
              <h3 className="mt-4 text-2xl font-bold text-ink-foreground sm:text-[1.7rem]">
                {status === "done" ? "Obrigado pelo contato!" : "Encontre o veículo ideal."}
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink-foreground/75">
                {status === "done"
                  ? "Recebemos suas respostas com sucesso."
                  : "Responda 5 perguntas rápidas e um especialista entra em contato."}
              </p>
            </div>

            {/* Progresso */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-foreground/70">
                <span>
                  {status === "done" ? "Concluído" : `Etapa ${step + 1} de ${TOTAL_STEPS}`}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink-foreground/10"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Progresso do formulário"
              >
                <div
                  className="h-full rounded-full bg-lime transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {status === "done" ? (
              <div className="mt-8 text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-lime text-lime-foreground">
                  <Check className="size-8" strokeWidth={3} />
                </span>
                <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-ink-foreground/85">
                  Em breve um especialista da Scooter &amp; Cia vai falar com você no WhatsApp que
                  você informou para indicar o modelo ideal para a sua rotina.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-6">
                <UtmFields />

                {questions.map((q, qi) => (
                  <fieldset key={q.name} hidden={step !== qi} className="min-w-0">
                    <legend className="text-lg font-bold text-ink-foreground sm:text-xl">
                      {q.title}
                    </legend>
                    {/* Botões em vez de radios nativos: o navegador não restaura respostas antigas. */}
                    <div role="radiogroup" aria-label={q.title} className="mt-4 grid gap-2.5">
                      {q.options.map((opt) => {
                        const checked = answers[q.name] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            onClick={() => choose(q.name, opt)}
                            className={`group flex min-h-14 w-full cursor-pointer items-center gap-3.5 rounded-2xl border px-4 py-3 text-left text-[0.98rem] font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-lime/60 ${
                              checked
                                ? "border-lime bg-lime/12 text-ink-foreground"
                                : "border-ink-foreground/14 bg-ink-foreground/[0.04] text-ink-foreground/90 hover:border-ink-foreground/30 hover:bg-ink-foreground/[0.07]"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                checked ? "border-lime bg-lime" : "border-ink-foreground/35"
                              }`}
                            >
                              {checked && (
                                <Check className="size-3 text-lime-foreground" strokeWidth={3.5} />
                              )}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}

                <fieldset hidden={!isContactStep} className="min-w-0">
                  <legend className="text-lg font-bold text-ink-foreground sm:text-xl">
                    Para quem o especialista deve ligar?
                  </legend>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label
                        htmlFor="lead-nome"
                        className="text-[0.72rem] font-semibold tracking-[0.12em] text-ink-foreground/75 uppercase"
                      >
                        Nome
                      </label>
                      <input
                        id="lead-nome"
                        name="nome"
                        autoComplete="name"
                        placeholder="Seu nome completo"
                        aria-invalid={!!errors.nome}
                        aria-describedby={errors.nome ? "lead-nome-erro" : undefined}
                        className={`${inputClass} ${errors.nome ? "border-red-400" : "border-ink-foreground/16"}`}
                      />
                      {errors.nome && (
                        <p id="lead-nome-erro" className="mt-1.5 text-sm text-red-300">
                          {errors.nome}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="lead-whatsapp"
                          className="text-[0.72rem] font-semibold tracking-[0.12em] text-ink-foreground/75 uppercase"
                        >
                          WhatsApp
                        </label>
                        <input
                          id="lead-whatsapp"
                          name="whatsapp"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          placeholder="(19) 99999-9999"
                          value={phone}
                          onChange={(e) => setPhone(maskPhone(e.target.value))}
                          aria-invalid={!!errors.whatsapp}
                          aria-describedby={errors.whatsapp ? "lead-whatsapp-erro" : undefined}
                          className={`${inputClass} ${errors.whatsapp ? "border-red-400" : "border-ink-foreground/16"}`}
                        />
                        {errors.whatsapp && (
                          <p id="lead-whatsapp-erro" className="mt-1.5 text-sm text-red-300">
                            {errors.whatsapp}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-email"
                          className="text-[0.72rem] font-semibold tracking-[0.12em] text-ink-foreground/75 uppercase"
                        >
                          E-mail
                        </label>
                        <input
                          id="lead-email"
                          name="email"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="voce@email.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "lead-email-erro" : undefined}
                          className={`${inputClass} ${errors.email ? "border-red-400" : "border-ink-foreground/16"}`}
                        />
                        {errors.email && (
                          <p id="lead-email-erro" className="mt-1.5 text-sm text-red-300">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-lime px-6 text-sm font-bold tracking-[0.06em] text-lime-foreground uppercase transition-all duration-300 hover:brightness-105 hover:shadow-[var(--shadow-lime)] disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4.5 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        {CTA_LABEL}
                        <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p role="alert" className="mt-3 text-center text-sm text-red-300">
                      Não conseguimos enviar agora. Tente de novo em instantes.
                    </p>
                  )}
                </fieldset>

                <div className="mt-5 flex min-h-6 items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-ink-foreground/75 transition-colors hover:text-ink-foreground"
                    >
                      <ArrowLeft className="size-4" />
                      Voltar
                    </button>
                  ) : (
                    <span />
                  )}
                  {!isContactStep && canAdvance && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 rounded-full py-1 text-sm font-semibold text-lime transition-colors hover:brightness-110"
                    >
                      Avançar
                      <ArrowRight className="size-4" />
                    </button>
                  )}
                </div>

                <p className="mt-5 text-center text-xs leading-relaxed text-ink-foreground/60">
                  Usamos seus dados apenas para responder ao seu contato sobre o seu veículo
                  elétrico.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
