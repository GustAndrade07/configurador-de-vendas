"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type DadosStatus = { status: string; quantidade: number };
type DadosCliente = { cliente: string; receita: number };

type Props = {
  porStatus: DadosStatus[];
  porCliente: DadosCliente[];
};

const CORES = ["#a1a1aa", "#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export default function FinanceiroCharts({ porStatus, porCliente }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Gráfico de pizza: propostas por status */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">
          Propostas por status
        </h2>
        {porStatus.length === 0 ? (
          <p className="text-zinc-400">Nenhuma proposta ainda.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={porStatus}
                dataKey="quantidade"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {porStatus.map((_, index) => (
                  <Cell key={index} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Gráfico de barras: receita por cliente */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">Receita por cliente</h2>
        {porCliente.length === 0 ? (
          <p className="text-zinc-400">Nenhuma proposta ainda.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={porCliente}>
              <XAxis dataKey="cliente" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip
                formatter={(valor) => "R$ " + Number(valor).toLocaleString("pt-BR")}
              />
              <Bar dataKey="receita" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}