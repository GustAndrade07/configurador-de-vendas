import { createClientServer } from "@/app/lib/supabase-server";
import ConfiguradorClient from "@/app/components/ConfiguradorClient";

type ItemPreco = {
  id: string;
  label: string;
  categoria: string;
  valor: number;
};

export default async function ConfiguradorPage() {
  const supabase = await createClientServer();
  const { data } = await supabase.from("configuracoes_preco").select("*");

  const itensPreco: ItemPreco[] = data ?? [];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Configurador de Projeto</h1>
      <p className="mt-2 text-zinc-600">
        Monte o projeto e veja o preço em tempo real.
      </p>

      <ConfiguradorClient itensPreco={itensPreco} />
    </div>
  );
}