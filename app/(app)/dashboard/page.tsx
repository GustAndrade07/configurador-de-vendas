import MetricCard from "@/app/components/MetricCard";
import { Users, DollarSign, Ticket, Percent } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard Comercial</h1>
      <p className="mt-2 text-zinc-600">Bem-vindo ao Vanzak Configurator.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Leads Ativos" value="25" icon={Users} />
        <MetricCard title="Receita Prevista" value="R$ 150.000" icon={DollarSign} />
        <MetricCard title="Ticket Médio" value="R$ 6.000" icon={Ticket} />
        <MetricCard title="Taxa de Conversão" value="35%" icon={Percent} />
      </div>
    </div>
  );
}