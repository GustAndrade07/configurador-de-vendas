"use client";

import { useState } from "react";

const PRECO_BASE = 4000;

const INTEGRACOES = [
  { id: "erp", label: "ERP", preco: 2000 },
  { id: "gateway", label: "Gateway de pagamento", preco: 1000 },
  { id: "logistica", label: "Logística / Frete", preco: 1200 },
  { id: "crm", label: "CRM / Email marketing", preco: 900 },
  { id: "whatsapp", label: "WhatsApp", preco: 600 },
];

const EXTRAS = [
  { id: "seo", label: "SEO técnico", preco: 1500 },
  { id: "carrinho", label: "Recuperação de carrinho", preco: 1000 },
  { id: "blog", label: "Blog", preco: 800 },
  { id: "upsell", label: "Upsell / Cross-sell", preco: 700 },
];

const MULTIPLICADOR = { Template: 1.0, Custom: 1.6 };
const MARGEM = 0.4;

export default function ConfiguradorPage() {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [complexidade, setComplexidade] = useState<"Template" | "Custom">(
    "Template"
  );

  function toggleItem(id: string) {
    setSelecionados((atual) =>
      atual.includes(id)
        ? atual.filter((item) => item !== id)
        : [...atual, id]
    );
  }

  const todosItens = [...INTEGRACOES, ...EXTRAS];
  const somaItens = todosItens
    .filter((item) => selecionados.includes(item.id))
    .reduce((soma, item) => soma + item.preco, 0);

  const subtotal = PRECO_BASE + somaItens;
  const precoFinal = subtotal * MULTIPLICADOR[complexidade];
  const margem = precoFinal * MARGEM;

  const formatar = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Configurador de Projeto</h1>
      <p className="mt-2 text-zinc-600">
        Monte o projeto e veja o preço em tempo real.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Coluna de seleção (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Integrações */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-zinc-800">Integrações</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {INTEGRACOES.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 cursor-pointer hover:bg-zinc-50"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                    />
                    {item.label}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {formatar(item.preco)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Extras */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-zinc-800">Extras</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {EXTRAS.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 cursor-pointer hover:bg-zinc-50"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                    />
                    {item.label}
                  </span>
                  <span className="text-sm text-zinc-500">
                    {formatar(item.preco)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Complexidade */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-zinc-800">Complexidade</h2>
            <div className="flex gap-3">
              {(["Template", "Custom"] as const).map((opcao) => (
                <button
                  key={opcao}
                  onClick={() => setComplexidade(opcao)}
                  className={`rounded-lg border px-6 py-2 font-medium transition-colors ${
                    complexidade === opcao
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {opcao}
                  {opcao === "Custom" && (
                    <span className="ml-1 text-xs opacity-80">×1.6</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Resumo (1/3) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 rounded-xl border border-zinc-200 bg-white p-6">
            <h2 className="mb-4 font-semibold text-zinc-800">Resumo</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-zinc-600">
                <span>Base</span>
                <span>{formatar(PRECO_BASE)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Itens selecionados</span>
                <span>{formatar(somaItens)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Complexidade</span>
                <span>×{MULTIPLICADOR[complexidade]}</span>
              </div>
              <hr className="my-3 border-zinc-200" />
              <div className="flex justify-between text-lg font-bold text-zinc-900">
                <span>Preço Final</span>
                <span>{formatar(precoFinal)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Margem estimada (40%)</span>
                <span>{formatar(margem)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}