import { exigirAdmin } from "@/app/lib/auth";
import { createClientServer } from "@/app/lib/supabase-server";
import MetricCard from "@/app/components/MetricCard";
import { DollarSign, TrendingUp, FileText, CheckCircle } from "lucide-react";
import FinanceiroCharts from "@/app/components/FinanceiroCharts";

type Proposta = {
  cliente: string;
  preco_final: number;
  margem: number;
  status: string;
};

export default async function FinanceiroPage() {
  await exigirAdmin();

  const supabase = await createClientServer();
  const { data: propostas } = await supabase
    .from("propostas")
    .select("cliente, preco_final, margem, status");

  const lista: Proposta[] = propostas ?? [];

  // Cálculos
  const receitaTotal = lista.reduce((s, p) => s + p.preco_final, 0);
  const margemTotal = lista.reduce((s, p) => s + p.margem, 0);
  const totalPropostas = lista.length;
  const aceitas = lista.filter((p) => p.status === "Aceita").length;

  // Contagem por status
  const porStatus = lista.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});

  // Formato pro gráfico de pizza (lista de objetos)
  const dadosStatus = Object.entries(porStatus).map(([status, quantidade]) => ({
    status,
    quantidade,
  }));

  // Formato pro gráfico de barras (receita por cliente)
  const dadosCliente = lista.map((p) => ({
    cliente: p.cliente,
    receita: p.preco_final,
  }));

  const formatar = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Financeiro</h1>
      <p className="mt-2 text-zinc-600">Visão consolidada das propostas.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita Total"
          value={formatar(receitaTotal)}
          icon={DollarSign}
        />
        <MetricCard
          title="Margem Total"
          value={formatar(margemTotal)}
          icon={TrendingUp}
        />
        <MetricCard
          title="Total de Propostas"
          value={String(totalPropostas)}
          icon={FileText}
        />
        <MetricCard
          title="Propostas Aceitas"
          value={String(aceitas)}
          icon={CheckCircle}
        />
      </div>

      <FinanceiroCharts porStatus={dadosStatus} porCliente={dadosCliente} />
      
      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">Propostas por status</h2>
        {Object.keys(porStatus).length === 0 ? (
          <p className="text-zinc-400">Nenhuma proposta ainda.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(porStatus).map(([status, qtd]) => (
              <div
                key={status}
                className="flex items-center justify-between border-b border-zinc-100 pb-2"
              >
                <span className="text-zinc-700">{status}</span>
                <span className="font-medium text-zinc-900">{qtd}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
