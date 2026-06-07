import { supabase } from "@/app/lib/supabase";

type Lead = {
  id: string;
  empresa: string;
  valor: number;
  tipo: string;
  etapa: string;
};

const ETAPAS = [
  "Novo Lead",
  "Diagnóstico",
  "Proposta Enviada",
  "Negociação",
  "Fechado",
];

export default async function PipelinePage() {
  const { data: leads, error } = await supabase.from("leads").select("*");

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
        <p className="mt-4 text-red-600">Erro ao carregar: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
      <p className="mt-2 text-zinc-600">Acompanhe os negócios em andamento.</p>

      <div className="mt-8 flex gap-4 overflow-x-auto">
        {ETAPAS.map((etapa) => {
          const dealsDaEtapa = (leads ?? []).filter(
            (lead) => lead.etapa === etapa
          );

          return (
            <div
              key={etapa}
              className="w-72 flex-shrink-0 rounded-xl bg-zinc-100 p-4"
            >
              <h2 className="mb-4 text-sm font-semibold text-zinc-700">
                {etapa}
              </h2>

              <div className="flex flex-col gap-3">
                {dealsDaEtapa.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-lg bg-white p-4 shadow-sm border border-zinc-100"
                  >
                    <p className="font-medium text-zinc-900">{lead.empresa}</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      R$ {lead.valor.toLocaleString("pt-BR")}{" "}
                      <span className="text-zinc-400">· {lead.tipo}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}