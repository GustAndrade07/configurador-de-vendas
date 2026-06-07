import { createClientServer } from "@/app/lib/supabase-server";
import { criarLead, deletarLead } from "./actions";
import Link from "next/link";


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

export default async function LeadsPage() {
  const supabase = await createClientServer();
  const { data: leads, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });

  const lista: Lead[] = leads ?? [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Leads</h1>
      <p className="mt-2 text-zinc-600">Cadastre e acompanhe seus leads.</p>

      {/* Formulário de cadastro */}
      <form
        action={criarLead}
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Empresa</label>
          <input
            name="empresa"
            required
            className="rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="Nome da empresa"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Valor (R$)</label>
          <input
            name="valor"
            type="number"
            required
            className="rounded-lg border border-zinc-300 px-3 py-2"
            placeholder="10000"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Tipo</label>
          <select
            name="tipo"
            className="rounded-lg border border-zinc-300 px-3 py-2"
          >
            <option value="Template">Template</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Etapa</label>
          <select
            name="etapa"
            className="rounded-lg border border-zinc-300 px-3 py-2"
          >
            {ETAPAS.map((etapa) => (
              <option key={etapa} value={etapa}>
                {etapa}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Cadastrar
          </button>
        </div>
      </form>

      {/* Lista de leads */}
      <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-left">
          <thead className="bg-zinc-50 text-sm text-zinc-500">
            <tr>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Valor</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Etapa</th>
              <th className="px-4 py-3 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-400">
                  {error ? `Erro: ${error.message}` : "Nenhum lead cadastrado."}
                </td>
              </tr>
            ) : (
              lista.map((lead) => (
                <tr key={lead.id} className="border-t border-zinc-100">
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {lead.empresa}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">
                    R$ {lead.valor.toLocaleString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{lead.tipo}</td>
                  <td className="px-4 py-3 text-zinc-600">{lead.etapa}</td>
                 <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/leads/${lead.id}/editar`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    Editar
                  </Link>
                  <form action={deletarLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button
                      type="submit"
                      className="text-sm text-red-600 hover:text-red-800 hover:underline"
                    >
                      Excluir
                    </button>
                  </form>
                </div>
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