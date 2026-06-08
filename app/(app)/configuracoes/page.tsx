import { exigirAdmin } from "@/app/lib/auth";
import { createClientServer } from "@/app/lib/supabase-server";
import { atualizarPrecos } from "./actions";

type ItemPreco = {
  id: string;
  label: string;
  categoria: string;
  valor: number;
};

export default async function ConfiguracoesPage() {
  const perfil = await exigirAdmin();

  const supabase = await createClientServer();
  const { data } = await supabase
    .from("configuracoes_preco")
    .select("*")
    .order("categoria");

  const itens: ItemPreco[] = data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <p className="mt-2 text-zinc-600">Ajustes do sistema e da conta.</p>

      {/* Perfil */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 font-semibold text-zinc-800">Seu perfil</h2>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div>
            <p className="text-zinc-500">Nome</p>
            <p className="font-medium text-zinc-900">{perfil.nome ?? "—"}</p>
          </div>
          <div>
            <p className="text-zinc-500">Email</p>
            <p className="font-medium text-zinc-900">{perfil.email}</p>
          </div>
          <div>
            <p className="text-zinc-500">Perfil</p>
            <p className="font-medium text-zinc-900">
              {perfil.role === "admin" ? "Administrador" : "Comercial"}
            </p>
          </div>
        </div>
      </div>

      {/* Valores do configurador */}
      <form
        action={atualizarPrecos}
        className="mt-6 rounded-xl border border-zinc-200 bg-white p-6"
      >
        <h2 className="mb-1 font-semibold text-zinc-800">
          Valores do Configurador
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          Ajuste os preços usados no cálculo das propostas.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-zinc-700">
                {item.label}
                <span className="ml-1 text-xs text-zinc-400">
                  ({item.categoria})
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                name={item.id}
                defaultValue={item.valor}
                className="rounded-lg border border-zinc-300 px-3 py-2"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}