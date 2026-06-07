import { exigirAdmin } from "@/app/lib/auth";

export default async function ConfiguracoesPage() {
  await exigirAdmin();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <p className="mt-2 text-zinc-600">Ajustes do sistema e da conta.</p>
    </div>
  );
}