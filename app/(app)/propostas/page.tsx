import { createClientServer } from "@/app/lib/supabase-server";
import StatusSelect from "@/app/components/StatusSelect";

type Proposta = {
  id: string;
  cliente: string;
  preco_final: number;
  margem: number;
  complexidade: string;
  itens: string[];
  status: string;
  created_at: string;
};

export default async function PropostasPage() {
  const supabase = await createClientServer();
  const { data: propostas, error } = await supabase
    .from("propostas")
    .select("*")
    .order("created_at", { ascending: false });

  const lista: Proposta[] = propostas ?? [];

  const formatar = (v: number) =>
    "R$ " + v.toLocaleString("pt-BR", { maximumFractionDigits: 0 });

  const corStatus = (status: string) => {
    if (status === "Aceita") return "bg-green-100 text-green-700";
    if (status === "Enviada") return "bg-blue-100 text-blue-700";
    return "bg-zinc-100 text-zinc-600";
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Propostas</h1>
      <p className="mt-2 text-zinc-600">Propostas geradas para os clientes.</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 text-sm text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Cliente</th>
              <th className="px-4 py-3 font-medium">Preço</th>
              <th className="px-4 py-3 font-medium">Margem</th>
              <th className="px-4 py-3 font-medium">Complexidade</th>
              <th className="px-4 py-3 font-medium">Itens</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-zinc-400">
                  {error ? `Erro: ${error.message}` : "Nenhuma proposta gerada."}
                </td>
              </tr>
            ) : (
              lista.map((p) => (
                <tr key={p.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {p.cliente}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    {formatar(p.preco_final)}
                  </td>
                  <td className="px-4 py-3 text-green-600">
                    {formatar(p.margem)}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{p.complexidade}</td>
                  <td className="px-4 py-3 text-zinc-500 text-sm">
                    {p.itens.length} {p.itens.length === 1 ? "item" : "itens"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect
                      id={p.id}
                      status={p.status}
                      cor={corStatus(p.status)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}