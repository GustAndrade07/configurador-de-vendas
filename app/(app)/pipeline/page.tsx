type Deal = {
  empresa: string;
  valor: string;
  tipo: "Template" | "Custom";
};

type Coluna = {
  titulo: string;
  deals: Deal[];
};

const colunas: Coluna[] = [
  {
    titulo: "Novo Lead",
    deals: [
      { empresa: "Empresa ABC", valor: "R$ 10.000", tipo: "Template" },
      { empresa: "Loja XYZ", valor: "R$ 15.000", tipo: "Custom" },
    ],
  },
  {
    titulo: "Diagnóstico",
    deals: [{ empresa: "Tech Store", valor: "R$ 20.000", tipo: "Template" }],
  },
  {
    titulo: "Proposta Enviada",
    deals: [{ empresa: "Fashion Shop", valor: "R$ 30.000", tipo: "Custom" }],
  },
  {
    titulo: "Negociação",
    deals: [{ empresa: "Beta Ltda", valor: "R$ 50.000", tipo: "Template" }],
  },
  {
    titulo: "Fechado",
    deals: [],
  },
];

export default function PipelinePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Pipeline de Vendas</h1>
      <p className="mt-2 text-zinc-600">Acompanhe os negócios em andamento.</p>

      <div className="mt-8 flex gap-4 overflow-x-auto">
        {colunas.map((coluna) => (
          <div
            key={coluna.titulo}
            className="w-72 flex-shrink-0 rounded-xl bg-zinc-100 p-4"
          >
            <h2 className="mb-4 text-sm font-semibold text-zinc-700">
              {coluna.titulo}
            </h2>

            <div className="flex flex-col gap-3">
              {coluna.deals.map((deal) => (
                <div
                  key={deal.empresa}
                  className="rounded-lg bg-white p-4 shadow-sm border border-zinc-100"
                >
                  <p className="font-medium text-zinc-900">{deal.empresa}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {deal.valor}{" "}
                    <span className="text-zinc-400">· {deal.tipo}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}