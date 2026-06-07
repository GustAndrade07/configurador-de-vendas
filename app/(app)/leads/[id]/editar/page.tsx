import { supabase } from "@/app/lib/supabase";
import { atualizarLead } from "../../actions";
import { notFound } from "next/navigation";
import Link from "next/link";

const ETAPAS = [
  "Novo Lead",
  "Diagnóstico",
  "Proposta Enviada",
  "Negociação",
  "Fechado",
];

export default async function EditarLeadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (!lead) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Editar Lead</h1>
      <p className="mt-2 text-zinc-600">Atualize os dados de {lead.empresa}.</p>

      <form
        action={atualizarLead}
        className="mt-6 flex max-w-md flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6"
      >
        <input type="hidden" name="id" value={lead.id} />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Empresa</label>
          <input
            name="empresa"
            required
            defaultValue={lead.empresa}
            className="rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Valor (R$)</label>
          <input
            name="valor"
            type="number"
            required
            defaultValue={lead.valor}
            className="rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-700">Tipo</label>
          <select
            name="tipo"
            defaultValue={lead.tipo}
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
            defaultValue={lead.etapa}
            className="rounded-lg border border-zinc-300 px-3 py-2"
          >
            {ETAPAS.map((etapa) => (
              <option key={etapa} value={etapa}>
                {etapa}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
          >
            Salvar
          </button>
          <Link
            href="/leads"
            className="rounded-lg border border-zinc-300 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}