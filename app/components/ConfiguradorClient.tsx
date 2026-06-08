"use client";

import { useState } from "react";
import { salvarProposta } from "@/app/(app)/configurador/actions";

type ItemPreco = {
  id: string;
  label: string;
  categoria: string;
  valor: number;
};

type Props = {
  itensPreco: ItemPreco[];
};

export default function ConfiguradorClient({ itensPreco }: Props) {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [complexidade, setComplexidade] = useState<"Template" | "Custom">(
    "Template"
  );
  const [cliente, setCliente] = useState("");

  // Separa os valores por categoria
  const precoBase =
    itensPreco.find((i) => i.id === "base")?.valor ?? 0;
  const integracoes = itensPreco.filter((i) => i.categoria === "integracao");
  const extras = itensPreco.filter((i) => i.categoria === "extra");
  const multTemplate =
    itensPreco.find((i) => i.id === "mult_template")?.valor ?? 1;
  const multCustom =
    itensPreco.find((i) => i.id === "mult_custom")?.valor ?? 1.6;

  function toggleItem(id: string) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((i) => i !== id) : [...atual, id]
    );
  }

  const todosItens = [...integracoes, ...extras];
  const somaItens = todosItens
    .filter((item) => selecionados.includes(item.id))
    .reduce((soma, item) => soma + item.valor, 0);

  const multiplicador = complexidade === "Custom" ? multCustom : multTemplate;
  const subtotal = precoBase + somaItens;
  const precoFinal = subtotal * multiplicador;
  const margem = precoFinal * 0.4;

  const formatar = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-zinc-800">Integrações</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {integracoes.map((item) => (
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
                  {formatar(item.valor)}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-zinc-800">Extras</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {extras.map((item) => (
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
                  {formatar(item.valor)}
                </span>
              </label>
            ))}
          </div>
        </section>

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
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-8 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="mb-4 font-semibold text-zinc-800">Resumo</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-600">
              <span>Base</span>
              <span>{formatar(precoBase)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Itens selecionados</span>
              <span>{formatar(somaItens)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span>Complexidade</span>
              <span>×{multiplicador}</span>
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

          <form action={salvarProposta} className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              placeholder="Nome do cliente"
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <input type="hidden" name="cliente" value={cliente} />
            <input type="hidden" name="precoFinal" value={precoFinal} />
            <input type="hidden" name="margem" value={margem} />
            <input type="hidden" name="complexidade" value={complexidade} />
            <input type="hidden" name="itens" value={JSON.stringify(selecionados)} />
            <button
              type="submit"
              disabled={!cliente}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              Salvar como proposta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}