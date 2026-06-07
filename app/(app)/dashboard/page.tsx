import MetricCard from "@/app/components/MetricCard";
import { supabase } from "@/app/lib/supabase";
import { Users, DollarSign, Ticket, Percent } from "lucide-react";

type Lead = {
  id: string;
  empresa: string;
  valor: number;
  tipo: string;
  etapa: string;
};

export default async function DashboardPage() {
  const { data: leads, error } = await supabase.from("leads").select("*");

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard Comercial</h1>
        <p className="mt-4 text-red-600">Erro ao carregar: {error.message}</p>
      </div>
    );
  }

  const lista: Lead[] = leads ?? [];

  // Cálculos das métricas
  const leadsAtivos = lista.filter((l) => l.etapa !== "Fechado").length;
  const receitaPrevista = lista.reduce((soma, l) => soma + l.valor, 0);
  const ticketMedio = lista.length > 0 ? receitaPrevista / lista.length : 0;
  const fechados = lista.filter((l) => l.etapa === "Fechado").length;
  const taxaConversao =
    lista.length > 0 ? Math.round((fechados / lista.length) * 100) : 0;

  // Formatação em reais
  const formatarReal = (valor: number) =>
    "R$ " + valor.toLocaleString("pt-BR");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard Comercial</h1>
      <p className="mt-2 text-zinc-600">Bem-vindo ao Vanzak Configurator.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Leads Ativos"
          value={String(leadsAtivos)}
          icon={Users}
        />
        <MetricCard
          title="Receita Prevista"
          value={formatarReal(receitaPrevista)}
          icon={DollarSign}
        />
        <MetricCard
          title="Ticket Médio"
          value={formatarReal(ticketMedio)}
          icon={Ticket}
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${taxaConversao}%`}
          icon={Percent}
        />
      </div>
    </div>
  );
}